// PACKAGE
import { GraphQLList, GraphQLString, GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLUnionType, GraphQLType } from "graphql";

// TYPES
import { User, UserList } from './UserTypes';
import { Cursor } from './Global';

// RESOLVERS
import TweetResolver from '../resolvers/TweetResolver';
import UserResolver from "../resolvers/UserResolver";

export const TweetTokens: GraphQLObjectType = new GraphQLObjectType({
    name: 'TweetTokens',
    description: 'Additional extracted tokens from the tweet like mentions, hashtags, etc',
    fields: () => ({
        hashtags: { type: new GraphQLList(GraphQLString) },
        urls: { type: new GraphQLList(GraphQLString) },
        mentionedUsers: {
            type: UserList,
            resolve: (parent, args, context) => parent.mentionedUsers.map((user: string) => new UserResolver(context).resolveUserDetails('', user))
        },
        media: { type: new GraphQLList(GraphQLString) },
    })
});

export const Tweet: GraphQLObjectType = new GraphQLObjectType({
    name: 'Tweet',
    description: 'The details of single tweet',
    fields: () => ({
        id: { type: GraphQLString },
        tweetBy: {
            type: User,
            resolve: (parent, args, context) => new UserResolver(context).resolveUserDetails('', parent.tweetBy)
        },
        createdAt: { type: GraphQLString },
        entities: { type: TweetTokens },
        quoted: {
            type: Tweet,
            resolve: (parent, args, context) => parent.quoted ? new TweetResolver(context).resolveTweet(parent.quoted) : undefined
        },
        fullText: { type: GraphQLString },
        replyTo: {
            type: Tweet,
            resolve: (parent, args, context) => parent.replyTo ? new TweetResolver(context).resolveTweet(parent.replyTo) : undefined
        },
        lang: { type: GraphQLString },
        quoteCount: { type: GraphQLInt },
        quotes: {
            type: TweetList,
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of quotes to fetch, must be >= 1",
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
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweetQuotes(parent.id, args.count, args.all, args.cursor, parent.quoteCount)
        },
        likeCount: { type: GraphQLInt },
        likers: {
            type: UserList,
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of likers to fetch, must be >= 10 (when no cursor if provided)",
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
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweetLikers(parent.id, args.count, args.all, args.cursor, parent.likeCount)
        },
        retweetCount: { type: GraphQLInt },
        retweeters: {
            type: UserList,
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of retweeters to fetch, must be >= 10 (when no cursor if provided)",
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
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweetRetweeters(parent.id, args.count, args.all, args.cursor, parent.retweetCount)
        },
        replyCount: { type: GraphQLInt }
        /**
         * THIS IS DISABLED FOR USE FOR NOW BECAUSE TWITTER DOESN'T HAVE ANY ENDPOINT FOR FETCHING REPLIES.
         * THE DATA THIS RETURNS IS INCONSISTENT!
         */
        /*
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
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweetReplies(parent.id, args.count, args.all, args.cursor, parent.replyCount)
        }
        */
    })
});

export const TweetList: GraphQLList<GraphQLType> = new GraphQLList(new GraphQLUnionType({
    name: 'TweetCursorUnion',
    description: 'A union type which can either be a Tweet or a Cursor, used in cursored tweet lists',
    types: [Tweet, Cursor],
    resolveType: (data) => {
        // If it has fullText field => this is a Tweet object
        if(data.fullText) {
            return Tweet;
        }
        // If it has a value field => this is a cursor object
        else if(data.value) {
            return Cursor;
        }
    }
}));