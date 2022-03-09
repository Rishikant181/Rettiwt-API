// This file contains various graphql types related to handling of data related to tweets

// PACKAGE LIBS
import {
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt
} from "graphql";

// CUSTOM LIBS

// TYPES
import {
    UserID
} from './UserTypes';


export const TweetTokens = new GraphQLObjectType({
    name: 'TweetTokens',
    description: 'Additional extracted tokens from the tweet like mentions, hashtags, etc',
    fields: {
        hashtags: { type: new GraphQLList(GraphQLString) },
        urls: { type: new GraphQLList(GraphQLString) },
        mentionedUsers: { type: new GraphQLList(UserID) },
        media: { type: new GraphQLList(GraphQLString) },
    }
});

export const Tweet = new GraphQLObjectType({
    name: 'Tweet',
    description: 'The details of single tweet',
    fields: {
        id: { type: GraphQLString },
        tweetBy: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        entities: { type: TweetTokens },
        quoted: { type: GraphQLString },
        fullText: { type: GraphQLString },
        replyTo: { type: GraphQLString },
        lang: { type: GraphQLString },
        quoteCount: { type: GraphQLInt },
        replyCount: { type: GraphQLInt },
        retweetCount: { type: GraphQLInt },
    }
})