import {GraphQLInt, GraphQLObjectType, GraphQLString, } from 'graphql'
export const UID =new GraphQLObjectType(
    {
        name:'Root_UID',
        description: 'Root Unique ID defining Rest id for developer reference and screen name for Layman twitter reference',
        fields:()=>(
            {
                rest_id:{type: GraphQLInt},
                screen_name:{type:GraphQLString},
            })
            
    }
)
