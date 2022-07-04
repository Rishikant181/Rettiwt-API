// This file contains various graphql types related to handling of data related to tweets

// PACKAGE LIBS
import {
    GraphQLList,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLUnionType
} from "graphql";

// CUSTOM LIBS

// TYPES
import { User, UserList } from './UserTypes';
import { Cursor } from './Global';

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
            type: UserList,
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
            type: TweetList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of quotes list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveTweetQuotes(parent.id, args.count, args.all, args.cursor, parent.quoteCount)
        },
        likeCount: { type: GraphQLInt },
        likers: {
            type: UserList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of likers list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveTweetLikers(parent.id, args.count, args.all, args.cursor, parent.likeCount)
        },
        retweetCount: { type: GraphQLInt },
        retweeters: {
            type: UserList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of retweeters list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveTweetRetweeters(parent.id, args.count, args.all, args.cursor, parent.retweetCount)
        },
        replyCount: { type: GraphQLInt },
        replies: {
            type: TweetList,
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
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of replies list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args) => resolveTweetReplies(parent.id, args.count, args.all, args.cursor, parent.replyCount)
        }
    })
});

export const TweetList = new GraphQLList(new GraphQLUnionType({
    name: 'TweetCursorUnion',
    description: 'A union type which can either be a Tweet or a Cursor, used in cursored tweet lists',
    types: [Tweet, Cursor],
    resolveType: (data) => {
        // If it has an id field => this is a Tweet object
        if(data.id) {
            return Tweet;
        }
        // If it has a value field => this is a cursor object
        else if(data.value) {
            return Cursor;
        }
    }
}));