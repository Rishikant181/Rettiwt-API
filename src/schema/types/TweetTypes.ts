// This file contains various graphql types related to handling of data related to tweets

// PACKAGE LIBS
import {
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean
} from "graphql";

// CUSTOM LIBS

// TYPES
import { User } from './UserTypes';

// RESOLVERS
import {
    resolveTweet,
    resolveTweetQuotes,
    resolveTweetLikers,
    resolveTweetReplies,
    resolveTweetRetweeters
} from '../resolvers/TweetSpecific';

import { resolveUserDetails } from "../resolvers/UserSpecific";


export const TweetTokens = new GraphQLObjectType({
    name: 'TweetTokens',
    description: 'Additional extracted tokens from the tweet like mentions, hashtags, etc',
    fields: () => ({
        hashtags: { type: new GraphQLList(GraphQLString) },
        urls: { type: new GraphQLList(GraphQLString) },
        mentionedUsers: {
            type: new GraphQLList(User),
            resolve: (parent) => parent.mentionedUsers.map((user: any) => resolveUserDetails('', user.id))
        },
        media: { type: new GraphQLList(GraphQLString) },
    })
});

//@ts-ignore
export const Tweet = new GraphQLObjectType({
    name: 'Tweet',
    description: 'The details of single tweet',
    fields: () => ({
        id: { type: GraphQLString },
        tweetBy: {
            type: User,
            resolve: (parent, args) => resolveUserDetails('', parent.tweetBy)
        },
        createdAt: { type: GraphQLString },
        entities: { type: TweetTokens },
        quoted: { type: GraphQLString },
        fullText: { type: GraphQLString },
        replyTo: {
            type: Tweet,
            resolve: (parent, args) => resolveTweet(parent.replyTo)
        },
        lang: { type: GraphQLString },
        quoteCount: { type: GraphQLInt },
        quotes: {
            type: new GraphQLList(Tweet),
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of quotes to fetch",
                    defaultValue: 10
                },
                all: {
                    type: GraphQLBoolean,
                    description: "Whether to fetch all quotes",
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveTweetQuotes(parent.id, args.count, args.all, parent.quoteCount)
        },
        likeCount: { type: GraphQLInt },
        likers: {
            type: new GraphQLList(User),
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of likers to fetch",
                    defaultValue: 10
                },
                all: {
                    type: GraphQLBoolean,
                    description: "Whether to fetch all likers",
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveTweetLikers(parent.id, args.count, args.all, parent.likeCount)
        },
        retweetCount: { type: GraphQLInt },
        retweeters: {
            type: new GraphQLList(User),
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of retweeters to fetch",
                    defaultValue: 10
                },
                all: {
                    type: GraphQLBoolean,
                    description: "Whether to fetch all likers",
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveTweetRetweeters(parent.id, args.count, args.all, parent.retweetCount)
        },
        replyCount: { type: GraphQLInt },
        replies: {
            type: new GraphQLList(Tweet),
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of replies to fetch",
                    defaultValue: 10
                },
                all: {
                    type: GraphQLBoolean,
                    description: "Whether to fetch all replies",
                    defaultValue: false
                }
            },
            resolve: (parent, args) => resolveTweetReplies(parent.id, args.count, args.all, parent.replyCount)
        }
    })
});