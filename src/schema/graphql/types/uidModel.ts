import {GraphQLEnumType, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, } from 'graphql'
import { argsToArgsConfig } from 'graphql/type/definition';

const UIDTYPE = new GraphQLEnumType({
    name: 'UIDTYPE',
    values: {
        TWEET: {
            value: 1
        },
        USER: {
            value: 0
        },
        UNDEFINED: {
            value: 2
        },
    },
});

export const UID =new GraphQLObjectType(
    {
        name:'Root_UID',
        description: 'Root Unique ID defining Rest id for developer reference and screen name for Layman twitter reference',
        fields:()=>(
            {
                rest_id:{type: GraphQLID},
                screen_name:{type:GraphQLString},
                type:{type:UIDTYPE}

            })
            
            
    }
)
