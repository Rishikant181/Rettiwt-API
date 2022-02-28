import { GraphQLObjectType } from "graphql";
import { User,UserID } from "src/schema/types/UserAccountData";
import { Response } from "src/schema/types/HTTP";
import { getFollowersUIDList,getFollowingsUIDList } from "../fetchUserSpecific";
import { UIDTYPE,UID } from "./internalObjectTypes/UID";
import { Tweet } from "src/schema/types/TweetData";
import { fetchRetweets,fetchlikes, fetchReplies} from "../fetchTweetSpecific";


export const expandUserList=(users:UserID[])=>{
    var mentionList:UID[]=[]
    for(let user of users){
        mentionList.push({restID:user.id,
                         screenName:user.userName,
                         TYPE:UIDTYPE.USER})
    }
    return mentionList;
}

//returns Restructured User Object 
export const restructureUserObject=(res:Response<User>)=>({
    UID:{
        'screenName':res.data.user.userName,
        'restID':res.data.user.id,    
        'TYPE':UIDTYPE.USER
    },
    'followers':getFollowersUIDList(res.data.user.userName),
    'followings':getFollowingsUIDList(res.data.user.userName),
    'Meta':{
        'fullName':res.data.user.fullName,
        'profileImage':res.data.profileImage,
        'bannerImage':res.data.profileBanner,
        'accountCreationDate':res.data.createdAt,
        'statusCount':res.data.statusesCount,
        'bio':res.data.description,
        'isVerified':res.data.isVerified,
        'followerCount':res.data.followersCount,
        'favouriteCount':res.data.favouritesCount,
        'followingCount':res.data.followingsCount
    }
})
export const restructureTweetObject=(res:Tweet)=>({
    id:{
        restID:res.id,
        screenName:'',
        TYPE:UIDTYPE.TWEET
    },
    tweetBy:{
        restID:'',
        screenName:res.tweetBy,
        TYPE:UIDTYPE.USER
    },
    content:{
        media:res.entities.media,
        rawText:res.fullText,
        filters:{
            mentions:expandUserList(res.entities.mentionedUsers),
            urls:res.entities.urls,
            hashtags:res.entities.hastags
        }
    },
    retweets:fetchRetweets(res.id),
    likes:fetchlikes(res.id),
    comments:fetchReplies(res.id)
})



