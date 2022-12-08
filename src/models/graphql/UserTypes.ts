// This file contains various graphql types related to handling of data related to user

// PACKAGE LIBS
import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLUnionType
} from 'graphql';

// CUSTOM LIBS

// TYPES
import { Tweet, TweetList } from './TweetTypes'
import { Cursor } from './Global';

// RESOLVERS
import { resolveUserLikes, resolveUserFollowers, resolveUserFollowing } from '../../resolvers/UserSpecific';
import { resolveTweet, resolveTweets } from '../../resolvers/TweetSpecific';

//@ts-ignore
export const User = new GraphQLObjectType({
    name: 'User',
    description: 'The details of a single target twitter user',
    fields: () => ({
        id: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        description: { type: GraphQLString },
        isVerified: { type: GraphQLBoolean },
        location: { type: GraphQLString },
        pinnedTweet: {
            type: Tweet,
            resolve: (parent, args) => (parent.pinnedTweet) ? resolveTweet(parent.pinnedTweet) : undefined
        },
        profileBanner: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        favouritesCount: { type: GraphQLInt },
        likes: {
            type: TweetList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of likes list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveUserLikes(parent.id, args.count, args.all, args.cursor, parent.favouritesCount)
        },
        followersCount: { type: GraphQLInt },
        followers: {
            type: UserList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of followers list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveUserFollowers(parent.id, args.count, args.all, args.cursor, parent.followersCount)
        },
        followingsCount: { type: GraphQLInt },
        following: {
            type: UserList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of followers list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveUserFollowing(parent.id, args.count, args.all, args.cursor, parent.followingsCount)
        },
        statusesCount: { type: GraphQLInt },
        tweets: {
            type: TweetList,
            args: {
                toUsers: { type: new GraphQLList(GraphQLString) },
                mentions: { type: new GraphQLList(GraphQLString) },
                hashtags: { type: new GraphQLList(GraphQLString) },
                words: { type: new GraphQLList(GraphQLString) },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                count: { type: GraphQLInt, defaultValue: 1 },
                all: { type: GraphQLBoolean, defaultValue: false },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of tweets list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveTweets({ fromUsers: [parent.userName], ...args, count: (args.all ? parent.statusesCount : args.count) })
        }
    })
});

//@ts-ignore
export const UserList = new GraphQLList(new GraphQLUnionType({
    name: 'UserCursorUnion',
    description: 'A union type which can either be a User or a Cursor, used in cursored User lists',
    types: [User, Cursor],
    resolveType: (data) => {
        // If it has a createdAt field => this is a User object
        if(data.createdAt) {
            return User;
        }
        // If it has a value field => this is a Cursor object
        else if(data.value) {
            return Cursor;
        }
    }
}));