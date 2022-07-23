// PACKAGE LIBS
import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

// CUSTOM LIBS

// TYPES
import { User } from '../types/UserTypes'
import { Tweet, TweetList } from '../types/TweetTypes';
import { LoginCredentials } from 'src/types/Authentication';

// RESOLVERS
import { resolveUserDetails } from '../resolvers/UserSpecific';
import { resolveTweet, resolveTweets } from '../resolvers/TweetSpecific';
import { resolveUserLogin } from '../resolvers/AccountSpecific';

export const rootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        test: {
            type: GraphQLString,
            resolve: () => "GraphQL Works!"
        },
        User: {
            type: User,
            description: "Returns the details of the twitter user with given user name",
            args: {
                userName: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => resolveUserDetails(args.userName, args.id)
        },
        Tweet: {
            type: Tweet,
            description: "Returns a single tweet given it's id",
            args: {
                id!: { type: GraphQLString }
            },
            resolve: (parent, args) => resolveTweet(args.id)
        },
        Tweets: {
            type: TweetList,
            description: "Returns the list of tweets matching the given criteria",
            args: {
                fromUsers: { type: new GraphQLList(GraphQLString) },
                toUsers: { type: new GraphQLList(GraphQLString) },
                mentions: { type: new GraphQLList(GraphQLString) },
                hashtags: { type: new GraphQLList(GraphQLString) },
                words: { type: new GraphQLList(GraphQLString) },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                quoted: { type: GraphQLString },
                count: { type: GraphQLInt, defaultValue: 20 },
                cursor: { type: GraphQLString, defaultValue: '' }
            },
            resolve: (parent, args) => resolveTweets(args)
        },
        Login: {
            type: GraphQLBoolean,
            description: "Logs in into the given twitter account",
            args: {
                email: { type: GraphQLString },
                userName: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (parent, args) => resolveUserLogin(args as LoginCredentials)
        }
    }
})