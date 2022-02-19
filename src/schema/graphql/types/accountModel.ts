import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import { UID } from "./uidModel";
// ANCHOR: Defining Account overview type containing basic account details
export const Account = new GraphQLObjectType(
    {
        name:"Account",
        description:"Defining overview of a given account",
        fields:()=>({   
            
            id:{type:UID},
            followersCount:{type:GraphQLInt},
            FollowingCount:{type:GraphQLInt},
            FriendCount:{type:GraphQLInt},
            mediaCount:{type:GraphQLInt}
            
            
        })
    })