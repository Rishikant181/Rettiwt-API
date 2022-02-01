import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql'
import {UID} from './uidModel'
export const Tweet = new GraphQLObjectType(
    {
        name:"Tweet",
        description:"Basic Tweet object model That stores all basics of a tweet",
        fields:()=>({   
            
            id:{type:UID},
            content:{type:Content},
            retweets:{type:new GraphQLList(UID)},
            likes:{type:new GraphQLList(UID)},
            comments:{type:new GraphQLList(UID)},
            
            
        })
    
    
    })
const Content =new GraphQLObjectType({
    name:"coreMedia",
    description:"Basic Tweet",
    fields:()=>({
        media:{type:new GraphQLList(GraphQLString)},
        rawText:{type:GraphQLString},
        filters:{type:Filter},


    })

}

)


export const Filter = new GraphQLObjectType(
    {
        name:"Filter",
        description:"Stores words extracted from text that has special meaning",
        fields:()=>({   
            mentions:{type:new GraphQLList(UID)},
            urls:{type:new GraphQLList(GraphQLString)},
            hashtags:{type:new GraphQLList(GraphQLString)}           
            
        })
    
    
    })
