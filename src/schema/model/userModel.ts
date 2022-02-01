
import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql'
import { UID } from './uidModel'

export const targetUser = new GraphQLObjectType(
    {
        name:"Target User",
        description:"Initial Target User",
        fields:()=>({   id:{type:UID},
            
            follower:{type:new GraphQLList(UID)},           //TODO: test if UID works 
            
            following:{type:new GraphQLList(UID)},          //TODO: than test if we can forward User itself as type
            
            RecentTweet:{type:new GraphQLList(UID),
                        args:{size:{type:GraphQLInt}}},
            
            LikedTweet:{type:new GraphQLList(UID),
                        args:{size:{type:GraphQLInt}}},
            _hierarchy:{type:GraphQLInt}

            
        })
    })

