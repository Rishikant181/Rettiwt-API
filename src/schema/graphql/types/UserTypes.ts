// This file contains various graphql types related to handling of data related to user

// PACKAGE LIBS
import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

// CUSTOM LIBS

// TYPES
import { Tweet } from './TweetTypes'

// RESOLVERS
import {
    resolveUserLikes,
    resolveUserFollowers,
    resolveUserFollowing
} from '../resolvers/UserSpecific';
import {
    resolveTweet,
    resolveTweets
} from '../resolvers/TweetSpecific';

export const UserID = new GraphQLObjectType({
    name: 'UserID',
    description: 'The identification details of a single target twitter user',
    fields: () => ({
        id: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString }
    })
});

//@ts-ignore
export const User = new GraphQLObjectType({
    name: 'User',
    description: 'The details of a single target twitter user',
    fields: () => ({
        user: { type: UserID },
        createdAt: { type: GraphQLString },
        description: { type: GraphQLString },
        isVerified: { type: GraphQLBoolean },
        location: { type: GraphQLString },
        pinnedTweet: {
            type: Tweet,
            resolve: (parent, args) => resolveTweet(parent.pinnedTweet)
        },
        profileBanner: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        favouritesCount: { type: GraphQLInt },
        likes: {
            type: new GraphQLList(Tweet),
            args: {
                count: {
                    description: "The number of liked tweets to fetch",
                    type: GraphQLInt,
                    defaultValue: 10
                },
                all: {
                    description: "Whether to fetch all tweets liked by user",
                    type: GraphQLBoolean,
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveUserLikes(parent.user.id, args.count, args.all, parent.favouritesCount)
        },
        followersCount: { type: GraphQLInt },
        followers: {
            type: new GraphQLList(User),
            args: {
                count: {
                    description: "The number of followers to fetch",
                    type: GraphQLInt,
                    defaultValue: 20
                },
                all: {
                    description: "Whether to fetch all followers list",
                    type: GraphQLBoolean,
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveUserFollowers(parent.user.id, args.count, args.all, parent.followersCount)
        },
        followingsCount: { type: GraphQLInt },
        following: {
            type: new GraphQLList(User),
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of followings to fetch",
                    defaultValue: 20
                },
                all: {
                    description: "Whether to fetch all followings list",
                    type: GraphQLBoolean,
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveUserFollowing(parent.user.id, args.count, args.all, parent.followingsCount)
        },
        statusesCount: { type: GraphQLInt },
        tweets: {
            type: new GraphQLList(Tweet),
            args: {
                toUsers: { type: new GraphQLList(GraphQLString) },
                mentions: { type: new GraphQLList(GraphQLString) },
                hashtags: { type: new GraphQLList(GraphQLString) },
                words: { type: new GraphQLList(GraphQLString) },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                count: { type: GraphQLInt, defaultValue: 1 }
            },
            resolve: (parent, args) => resolveTweets({ fromUsers: [parent.user.userName], ...args })
        }
    })
});