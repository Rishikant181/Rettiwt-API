// This file contains various queries for sending data related to a twitter user

// PACKAGE LIBS
import {
    GraphQLString
} from 'graphql';

// CUSTOM LIBS

// TYPES
import {
    User
} from '../types/UserTypes';

export const UserDetails = {
    type: User,
    description: 'Get the details of a twitter user with the given user name',
    args: {
        userName!: { type: GraphQLString }
    },
    resolve: (parent: any, args: any) => "Rishikant Sahu"
};