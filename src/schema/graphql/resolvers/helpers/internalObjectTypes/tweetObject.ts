import { UID } from "./UID";

export type JSONTweetObject={
    //Object that defines a tweet to be forwarded to the clients
    id:UID,
    tweetBy:UID
    content:{
        media:string[],
        rawText:string,
        filters:{
            mentions:UID[],
            urls:string[],
            hashtags:string[]
        }
    },
    retweets:UID[],
    likes:UID[],
    comments:UID[]
}