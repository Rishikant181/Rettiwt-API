import {TweetService} from "../../../services/DataServices/TweetService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";
import { Tweet,TweetFilter} from "src/schema/types/TweetData";
import { BooleanValueNode } from "graphql";



var fetchTweets=new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie'])


export const parseTweetDetails:any=(screenName:string)=>{
    

    

}

function fetchRetweet(tweetID:string,Count:number){
    var RetweetList:string[];
    var 
}


function fetchTweetViaScreenName(screenName:string,Count?:number){
    
    Count=Count??-1;
    var screenNameOnlyFilter= new TweetFilter(
        {count:Count,
        fromUsers:[screenName]
    });

    var JSONTweetObject:any;
    var cursor='';

    let promiseValidity:boolean;
    async()=>{
        await fetchTweets.getTweets(screenNameOnlyFilter,cursor).then(res=>{
            if(res.success===true&&res.error.message!=="")
            {promiseValidity=true}
            for(let tweetEntry of res.data.tweets){
                JSONTweetObject={
                    'id':{
                        'rest_id':tweetEntry.id,
                        'tweet_by':tweetEntry.tweetBy,
                        'content':{
                            'media':tweetEntry.entities.media,
                            'rawText': tweetEntry.fullText,
                            'filter': {
                                'mentions': tweetEntry.entities.mentionedUsers,
                                'urls':tweetEntry.entities.urls,
                                'hashtags':tweetEntry.entities.hastags
                            }
                        },
                        'retweets':tweetEntry..
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

