// This file contains various graphql types related to handling of data having a global scope

// PACKAGE LIBS
import { GraphQLString, GraphQLObjectType, } from "graphql";

export const Cursor = new GraphQLObjectType({
    name: 'Cursor',
    description: 'Cursor data for the next batch of list data',
    fields: () => ({
        value: { type: GraphQLString }
    })
});