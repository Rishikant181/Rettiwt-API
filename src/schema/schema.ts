// PACKAGE LIBS
import { GraphQLSchema } from 'graphql';

// CUSTOM LIBS
import { rootQuery } from './queries/RootQuery';

// Defining the graphql schema
export const schema = new GraphQLSchema({
    query: rootQuery
})