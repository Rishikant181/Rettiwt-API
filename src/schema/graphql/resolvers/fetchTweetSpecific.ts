import {TweetService} from "../../../services/DataServices/TweetService"
import { config } from "../../../config/env";
import { Tweet,TweetFilter} from "src/schema/types/TweetData";
import { BooleanValueNode, GraphQLList } from "graphql";
import { UID, UIDTYPE } from "src/schema/graphql/resolvers/helpers/internalObjectTypes/UID";
import { Response } from "src/schema/types/HTTP";
import { User } from "src/schema/types/UserAccountData";
import { restructureTweetObject } from "./helpers/restructuring";
import { JSONTweetObject } from "./helpers/internalObjectTypes/tweetObject";


var fetchTweets=new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie'])




export function fetchRetweets(tweetID:string):UID[]{
    var RetweetUIDList:UID[]=[];
    var Resolved:Response<{retweeters:User[],next:string}>
    var cursor='';
    for(
        async()=>{
            await fetchTweets.getTweetRetweeters(tweetID,20,cursor).then(res=>{Resolved=res})};
        //@ts-ignore
        Resolved.success&&Resolved.error.message==='';
        async()=>{
            //@ts-ignore    
            await fetchTweets.getTweetRetweeters(tweetID,20,Resolved.data.next).then(res=>{Resolved=res})}
    )
    {
        //@ts-ignore
        for(let retweeter of Resolved.data.retweeters)
        {
            RetweetUIDList.push(
                {
                    restID:retweeter.user.id,
                    screenName:retweeter.user.userName,
                    TYPE:UIDTYPE.USER
                })

        }
    }
    return RetweetUIDList;
}
export function fetchlikes(tweetID:string){
    let resolved:Response<{likers:User[],next:string}>;
    let cursor='';
    let likerList:UID[]=[];
    for(
        async()=>{
            await fetchTweets.getTweetLikers(tweetID,20,cursor).then(res=>{resolved=res;});
        };
        //@ts-ignore
        resolved.success&&resolved.error.message==='';
        async()=>{await fetchTweets.getTweetLikers(tweetID,20,resolved.data.next).then(res=>{resolved=res;});}
    )
    {
        //@ts-ignore
        for(let likers of resolved.data.likers){
            likerList.push(
                {
                    screenName:likers.user.userName,
                    restID:likers.user.id,
                    TYPE:UIDTYPE.USER});
        }
    }
    return likerList;
}
export function fetchReplies(tweetID:string){
    let resolved:Response<{replies:Tweet[],next:string}>;
    let cursor='';
    let repliesList:UID[]=[];
    for(
        async()=>{
            await fetchTweets.getTweetReplies(tweetID,cursor)
        };
        //@ts-ignore
        resolved.success&&resolved.error.message==='';
        async()=>{
            await fetchTweets.getTweetReplies(tweetID,cursor)
        }
    )
    {
        //@ts-ignore
        for(let replies of resolved.data.replies){
            repliesList.push({
                screenName:'',
                restID:replies.id,
                TYPE:UIDTYPE.TWEET
            })
        }
    }
    return repliesList;
}


export function fetchTweetViaScreenName(screenName:string,Count?:number){
    
    Count=Count??-1;
    var screenNameOnlyFilter= new TweetFilter(
        {count:Count,
        fromUsers:[screenName]
    });//This TweetFilter uses filter feature to filter out a specific users tweets
    let resolved:Response<{tweets:Tweet[],next:string}>;
    var tweetList:JSONTweetObject[]=[];
    var cursor='';

    let promiseValidity:boolean;


    for(
        async()=>{
            await fetchTweets.getTweets(screenNameOnlyFilter,cursor).then(res=>{
                //@ts-ignore
                resolved=res;});};
        //@ts-ignore
        resolved.success&&resolved.error.message==='';
        async()=>{
            await fetchTweets.getTweets(screenNameOnlyFilter,resolved.data.next).then(res=>{
                //@ts-ignore
                resolved=res;});}           
    )//@ts-ignore
        for(let eachTweet of resolved.data.tweets)
            tweetList.push(restructureTweetObject(eachTweet));
}

