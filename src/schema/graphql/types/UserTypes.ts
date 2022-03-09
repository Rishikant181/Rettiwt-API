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

// RESOLVERS
import {
    resolveUserFollowers,
    resolveUserFollowing
} from '../resolvers/UserSpecific';

export const UserID = new GraphQLObjectType({
    name: 'UserID',
    description: 'The identification details of a single target twitter user',
    fields: {
        id: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString }
    }
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
        favouritesCount: { type: GraphQLInt },
        followersCount: { type: GraphQLInt },
        followers: {
            type: new GraphQLList(User),
            args: {
                count: {
                    description: "The number of followers to fetch",
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => resolveUserFollowers(parent.user.id, args.count)
        },
        followingsCount: { type: GraphQLInt },
        following: {
            type: new GraphQLList(User),
            args: {
                count: {
                    description: "The number of followings to fetch",
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => resolveUserFollowing(parent.user.id, args.count)
        },
        statusesCount: { type: GraphQLInt },
        location: { type: GraphQLString },
        pinnedTweets: { type: GraphQLString },
        profileBanner: { type: GraphQLString },
        profileImage: { type: GraphQLString },
    })
});