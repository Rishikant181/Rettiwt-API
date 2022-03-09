// This file contains various graphql types related to handling of data related to user

// PACKAGE LIBS
import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} from 'graphql';

export const UserID = new GraphQLObjectType({
    name: 'UserID',
    description: 'The identification details of a single target twitter user',
    fields: {
        restId: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString }
    }
});

export const User = new GraphQLObjectType({
    name: 'User',
    description: 'The details of a single target twitter user',
    fields: {
        id: { type: UserID },
        createdAt: { type: GraphQLString },
        description: { type: GraphQLString },
        isVerified: { type: GraphQLBoolean },
        favouritesCount: { type: GraphQLInt },
        followersCount: { type: GraphQLInt },
        followingsCount: { type: GraphQLInt },
        statusesCount: { type: GraphQLInt },
        location: { type: GraphQLString },
        pinnedTweets: { type: GraphQLString },
        profileBanner: { type: GraphQLString },
        profileImage: { type: GraphQLString },
    }
});