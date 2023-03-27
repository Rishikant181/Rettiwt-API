// PACKAGE
import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLUnionType, GraphQLType } from 'graphql';

// TYPES
import { Tweet, TweetList } from './TweetTypes'
import { Cursor } from './Global';
import { TweetFilter } from '../../models/args/TweetFilter';

// RESOLVERS
import UserResolver from '../resolvers/UserResolver';
import TweetResolver from '../resolvers/TweetResolver';

export const User: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    description: 'The details of a single target twitter user',
    fields: () => ({
        id: { type: GraphQLString },
        userName: { type: GraphQLString },
        fullName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        description: { type: GraphQLString },
        isVerified: { type: GraphQLBoolean },
        location: { type: GraphQLString },
        pinnedTweet: {
            type: Tweet,
            resolve: (parent, args, context) => (parent.pinnedTweet) ? new TweetResolver(context).resolveTweet(parent.pinnedTweet) : undefined
        },
        profileBanner: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        favouritesCount: { type: GraphQLInt },
        likes: {
            type: TweetList,
            args: {
                count: {
                    description: "The number of liked tweets to fetch, must be >= 40 (when no cursor if provided)",
                    type: GraphQLInt,
                    defaultValue: 10
                },
                all: {
                    description: "Whether to fetch all tweets liked by user",
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of likes list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args, context) => new UserResolver(context).resolveUserLikes(parent.id, args.count, args.all, args.cursor, parent.favouritesCount)
        },
        followersCount: { type: GraphQLInt },
        followers: {
            type: UserList,
            args: {
                count: {
                    description: "The number of followers to fetch, must be >= 40 (when no cursor is provided)",
                    type: GraphQLInt,
                    defaultValue: 40
                },
                all: {
                    description: "Whether to fetch all followers list",
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of followers list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args, context) => new UserResolver(context).resolveUserFollowers(parent.id, args.count, args.all, args.cursor, parent.followersCount)
        },
        followingsCount: { type: GraphQLInt },
        following: {
            type: UserList,
            args: {
                count: {
                    type: GraphQLInt,
                    description: "The number of followings to fetch, must be >= 40 (when no cursor is provided)",
                    defaultValue: 40
                },
                all: {
                    description: "Whether to fetch all followings list",
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of followers list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args, context) => new UserResolver(context).resolveUserFollowing(parent.id, args.count, args.all, args.cursor, parent.followingsCount)
        },
        statusesCount: { type: GraphQLInt },
        tweets: {
            type: TweetList,
            args: {
                count: {
                    description: "The number of tweets to fetch, must be >= 1",
                    type: GraphQLInt,
                    defaultValue: 10
                },
                all: {
                    description: "Whether to fetch all tweets made by user",
                    type: GraphQLBoolean,
                    defaultValue: false
                },
                cursor: {
                    type: GraphQLString,
                    description: 'The cursor to the batch of tweets list to fetch',
                    defaultValue: ''
                }
            },
            resolve: (parent, args, context) => new TweetResolver(context).resolveTweets({ fromUsers: [parent.userName] } as TweetFilter, args.all ? parent.statusesCount : args.count, args.cursor)
        }
    })
});

export const UserList: GraphQLList<GraphQLType> = new GraphQLList(new GraphQLUnionType({
    name: 'UserCursorUnion',
    description: 'A union type which can either be a User or a Cursor, used in cursored User lists',
    types: [User, Cursor],
    resolveType: (data) => {
        // If it has a userName field => this is a User object
        if(data.userName) {
            return User;
        }
        // If it has a value field => this is a Cursor object
        else if(data.value) {
            return Cursor;
        }
    }
}));