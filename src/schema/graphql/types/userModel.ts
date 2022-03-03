
import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql'

import { UID } from './uidModel'

export const User = new GraphQLObjectType(
    {
        name:"User",
        description:"Initial Target User",
        fields:()=>({   id:{type:UID},
            
            followers:{type:new GraphQLList(UID)},           //TODO: test if UID works 
            
            followings:{type:new GraphQLList(UID)},          //TODO: than test if we can forward User itself as type
            
            RecentTweet:{type:new GraphQLList(UID),
                        args:{size:{type:GraphQLInt!}}
            },
            
            LikedTweet:{type:new GraphQLList(UID),
                        args:{size:{type:GraphQLInt!}}},
            
            
           
            
                
        })
    })
//TODO: Add meta USer Model
//REVIEW: Check if every thing is working
