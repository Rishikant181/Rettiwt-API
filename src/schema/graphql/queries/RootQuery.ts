import GraphiQL from "graphiql";
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

//importing dependancy Graphql schemas
import { UID } from "../types/uidModel";
import { User } from "../types/userModel";
import { Tweet } from "../types/tweetModel";

//Importing resolver function
import {fetchTweetsViaScreenName} from "../resolvers/fetchTweetSpecific"
import { parseUserDetails } from "../resolvers/fetchUserSpecific";




const fetchTwitterData = new GraphQLObjectType({
    name:'rootQuery',
    
    
    fields:()=>({
        targetUser:{
            type:User,
            args:{UserID:{type:GraphQLString!}},
            resolve(parent,args){
                return parseUserDetails(args.UserID);
            }
        },
        targetTweet:{
            type:Tweet,
            args:{UserID:{type:GraphQLString!},
                  Count:{type:GraphQLInt}
                },
            resolve(parent,args){
                return fetchTweetsViaScreenName(args.UserID,args.Count);
            }
        }
    })
})
module.exports=new GraphQLSchema({
    query:fetchTwitterData
})