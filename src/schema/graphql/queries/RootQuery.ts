import GraphiQL from "graphiql";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "src/schema/graphql/types/userModel";
import { UID } from "../types/uidModel";

//Importing resolver function
import { parseUserDetails } from "../resolvers/fetchUserSpecific";
import { UserID } from "src/schema/types/UserAccountData";


export const TwitterUser = new GraphQLObjectType({
    name:'RootUserQuery',
    description: '',
    fields:()=>({
        targetUser:{
            type:User,
            args:{UserID:{type:GraphQLString!}},
            resolve(parent,args){
                return parseUserDetails(args.UserID)
            }
        }
    })
})
