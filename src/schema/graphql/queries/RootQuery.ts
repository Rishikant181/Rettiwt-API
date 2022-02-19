import GraphiQL from "graphiql";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "src/schema/graphql/types/userModel";
import { UID } from "../types/uidModel";


export const TwitterUser = new GraphQLObjectType({
    name:'RootUserQuery',
    description: '',
    fields:()=>({
        targetUser:{
            type:User,
            args:{UserID:{type:GraphQLString!}},
            resolve:{
                
            }
        }
    })
})
