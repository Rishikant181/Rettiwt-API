// PACKAGE
import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

// TYPES
import { User } from '../types/UserTypes';
import { Tweet, TweetList } from '../types/TweetTypes';
import { TweetFilter } from '../../models/args/TweetFilter';

// RESOLVERS
import UserResolver from '../resolvers/UserResolver';
import TweetResolver from '../resolvers/TweetResolver';
import AccountResolver from '../resolvers/AccountResolver';

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
                sinceId: { type: GraphQLString },
                quoted: { type: GraphQLString },
                links: { type: GraphQLBoolean, defaultValue: false },
                count: { type: GraphQLInt, defaultValue: 10 },
                cursor: { type: GraphQLString, defaultValue: '' }
            },
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweets(args as TweetFilter, args.count, args.cursor)
        },
        Login: {
            type: GraphQLString,
            description: "Returns the cookies that can be used to fetch data from twitter",
            args: {
                email: { type: GraphQLString },
                userName: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: (parent, args, context) => new AccountResolver(context).resolveLogin(args.email, args.userName, args.password)
        }
    }
})