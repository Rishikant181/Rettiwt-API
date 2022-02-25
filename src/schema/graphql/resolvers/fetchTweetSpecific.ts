import {TweetService} from "../../../services/DataServices/TweetService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";
import { Tweet,TweetFilter} from "src/schema/types/TweetData";



var fetchTweets=new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie'])


export const parseTweetDetails:any=(screenName:string)=>{
    

    

}
function FetchTweetViaFilter(){
    
}

function fetchTweetViaScreenName(screenName:string,Count:number):Tweet[]{
    var screenNameOnlyFilter= new TweetFilter(
        {count:Count,
        fromUsers:[screenName]}
        )

    var cursor='';
    
    
    
    async()=>{
        await fetchTweets.getTweets(screenNameOnlyFilter,cursor).then(res=>{

            var Tweetlist=res.data.tweets
            
            var JSONTweetObject
        })
    }

}

