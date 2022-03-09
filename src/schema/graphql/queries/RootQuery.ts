// PACKAGE LIBS
import {
    GraphQLObjectType, GraphQLString
} from 'graphql'

export const rootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        test: {
            type: GraphQLString,
            resolve: () => "GraphQL Works!"
        }
    }
})