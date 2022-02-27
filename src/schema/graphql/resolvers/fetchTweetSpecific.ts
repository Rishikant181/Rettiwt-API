import {TweetService} from "../../../services/DataServices/TweetService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";
import { Tweet,TweetFilter} from "src/schema/types/TweetData";
import { BooleanValueNode, GraphQLList } from "graphql";
import { UIDTYPE } from "src/schema/graphql/resolvers/helpers/internalObjectTypes/UID";
import { Response } from "src/schema/types/HTTP";
import { User } from "src/schema/types/UserAccountData";


var fetchTweets=new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie'])



export type JSONTweetObject={
    //Object that defines a tweet to be forwarded to the clients
    id:{
        restID:string,
        Type:UIDTYPE,
    },
    tweetBy:{id:{
        restID:string,
        screenName:string,
        Type:{type:UIDTYPE}
    }
    }
    content:{
        media:string[],
        rawText:string,
        filter:{
            mentions:{restID:string,
                screenName:string,
                Type:UIDTYPE}[],
            urls:string[],
            hashtags:string[]
        }
    },
    retweets:{restID:string,
        screenName:string,
        Type:UIDTYPE}[],
    likes:{restID:string,
        screenName:string,
        Type:UIDTYPE}[],
    comments:{restID:string,
        screenName:string,
        Type:UIDTYPE}[],

}


export const parseTweetDetails:any=(screenName:string)=>{

}

function fetchRetweet(tweetID:string,Count:number):{restID:string,Type:UIDTYPE}[]{
    var RetweetUIDList:{restID:string,Type:UIDTYPE}[]=[];
    var Resolved:Response<{retweeters:User[],next:string}>
    var cursor='';
    for(
        async()=>{
            await fetchTweets.getTweetRetweeters(tweetID,Count,cursor).then(res=>{Resolved=res})};
        //@ts-ignore
        Resolved.success&&Resolved.error.message==='';
        async()=>{
            //@ts-ignore    
            await fetchTweets.getTweetRetweeters(tweetID,Count,Resolved.data.next).then(res=>{Resolved=res})}
    )
    {
        //@ts-ignore
        for(let retweeter of Resolved.data.retweeters)
        {
            RetweetUIDList.push(
                {
                    restID=retweeter.user.id,
                    
                    Type:UIDTYPE.USER
                })

        }
    }
    return RetweetUIDList;
}


function fetchTweetViaScreenName(screenName:string,Count?:number){
    
    Count=Count??-1;
    var screenNameOnlyFilter= new TweetFilter(
        {count:Count,
        fromUsers:[screenName]
    });

    var tweetInstance:JSONTweetObject;
    var cursor='';

    let promiseValidity:boolean;
    async()=>{
        await fetchTweets.getTweets(screenNameOnlyFilter,cursor).then(res=>{
            if(res.success===true&&res.error.message!=="")
            {promiseValidity=true}
            for(let tweetEntry of res.data.tweets){
                tweetInstance={
                    'id':{restID:tweetEntry.id,
                            Type:UIDTYPE.TWEET},
                    'tweetBy':tweetEntry.tweetBy,//@Rishikant181 REVIEW:Why in the world is it returning a string
                    
                    'content':{
                        'media':tweetEntry.entities.media,
                        'rawText': tweetEntry.fullText,
                        'filter': {
                            'mentions': tweetEntry.entities.mentionedUsers,
                            'urls':tweetEntry.entities.urls,
                            'hashtags':tweetEntry.entities.hastags
                        }
                    },
                    'retweets':fetchRetweet()
                }
                }
            }
        })
    }
    
    while(Count!=0 && promiseValidity ){
    
    }
    async()=>{
        await fetchTweets.getTweets(screenNameOnlyFilter,cursor).then(res=>{

            var Tweetlist=res.data.tweets
            
            var JSONTweetObject
        })
    }

}

