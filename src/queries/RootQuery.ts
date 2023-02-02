// PACKAGE
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

// TYPES
import { User } from '../models/graphql/UserTypes';
import { Tweet, TweetList } from '../models/graphql/TweetTypes';
import { TweetFilter } from '../types/Tweet';

// RESOLVERS
import UserResolver from '../resolvers/UserResolver';
import TweetResolver from '../resolvers/TweetResolver';

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
            resolve: (parent, args, context) => new UserResolver(context).resolveUserDetails(args.userName, args.id)
        },
        Tweet: {
            type: Tweet,
            description: "Returns a single tweet given it's id",
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweet(args.id)
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
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweets(args as TweetFilter, args.count, args.cursor)
        }
    }
})