// PACKAGE LIBS
import {
    GraphQLObjectType,
    GraphQLString
} from 'graphql'

// CUSTOM LIBS

// TYPES
import { User } from '../types/UserTypes'

// RESOLVERS
import { resolveUserDetails } from '../resolvers/UserSpecific';

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
        }
    }
})