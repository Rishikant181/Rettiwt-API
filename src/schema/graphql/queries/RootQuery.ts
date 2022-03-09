// PACKAGE LIBS
import {
    GraphQLObjectType, GraphQLString
} from 'graphql'

// CUSTOM LIBS

// QUERIES

import {
    UserDetails
} from './UserQueries';

export const rootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        test: {
            type: GraphQLString,
            resolve: () => "GraphQL Works!"
        },
        UserDetails: UserDetails
    }
})