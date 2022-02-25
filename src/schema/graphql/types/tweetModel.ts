import {GraphQLEnumType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, } from 'graphql'
import {UID} from './uidModel'

//SECTION Base Level:Base
export const Tweet = new GraphQLObjectType(
    {
        name:"Tweet",
        description:"Basic Tweet object model That stores all basics of a tweet",
        fields:()=>({   
            
            id:{type:UID},
            tweet_by:{type:UID},
            content:{type:Content},
            retweets:{type:new GraphQLList(UID)},
            likes:{type:new GraphQLList(UID)},
            comments:{type:new GraphQLList(UID)},
            Type:{type:GraphQLInt},
            meta:{type:Meta
            }

            
        })
    
    
    })
//SECTION Base Level:2
const Content =new GraphQLObjectType({
    name:"Content",
    description:"Content type define types of data a tweet will store",
    fields:()=>({
        media:{type:new GraphQLList(GraphQLString)},
        rawText:{type:GraphQLString},
        filters:{type:Filter}


    })

})
//!SECTION Base Level:2

//SECTION Base Level:2
const Meta =new GraphQLObjectType({
    name:"metaData",
    description:"Define the meta datas for a tweet",
    fields:()=>({
        creationDate:{type:GraphQLString},
        device:{type:GraphQLString}

    })
})
//!SECTION Base Level:Base


//SECTION Base Level:3
const Filter = new GraphQLObjectType(
    {
        name:"Filter",
        description:"Stores words extracted from text that has special meaning",
        fields:()=>({   
            mentions:{type:new GraphQLList(UID)},
            urls:{type:new GraphQLList(GraphQLString)},
            hashtags:{type:new GraphQLList(GraphQLString)}           
            
        })
    
    
    })
    //!SECTION Base Level:3
//!SECTION Base Level:Base






