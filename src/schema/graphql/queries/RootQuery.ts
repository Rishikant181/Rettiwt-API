// PACKAGE LIBS
import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

// CUSTOM LIBS

// TYPES
import { User } from '../types/UserTypes'
import { Tweet } from '../types/TweetTypes';

// RESOLVERS
import { resolveUserDetails } from '../resolvers/UserSpecific';
import {
    resolveTweet,
    resolveTweets
} from '../resolvers/TweetSpecific';

export const rootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        test: {
            type: GraphQLString,
            resolve: () => "GraphQL Works!"
        },
        UserDetails: {
            type: User,
            description: "Returns the details of the twitter user with given user name",
            args: {
                userName!: { type: GraphQLString }
            },
            resolve: (parent, args) => resolveUserDetails(args.userName)
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
            type: new GraphQLList(Tweet),
            description: "Returns the list of tweets matching the given criteria",
            args: {
                fromUsers: { type: new GraphQLList(GraphQLString) },
                toUsers: { type: new GraphQLList(GraphQLString) },
                mentions: { type: new GraphQLList(GraphQLString) },
                hashtags: { type: new GraphQLList(GraphQLString) },
                words: { type: new GraphQLList(GraphQLString) },
                startDate: { type: GraphQLString },
                endDate: { type: GraphQLString },
                count: { type: GraphQLInt, defaultValue: 20 }
            },
            resolve: (parent, args) => resolveTweets(args)
        }
    }
})