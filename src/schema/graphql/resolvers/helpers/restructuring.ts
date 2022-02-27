import { GraphQLObjectType } from "graphql";
import { User } from "src/schema/types/UserAccountData";
import { Response } from "src/schema/types/HTTP";
import { getFollowersUIDList,getFollowingsUIDList } from "../fetchUserSpecific";
import { UIDTYPE } from "./internalObjectTypes/UID";



//returns Restructured User Object 
export const restructureUserObject=(res:Response<User>)=>({
    UID:{
        'screenName':res.data.user.userName,
        'restID':res.data.user.id,    
        'TYPE':UIDTYPE.USER
    },
    'followers':getFollowersUIDList(res.data.user.userName,res.data.followersCount),
    'followings':getFollowingsUIDList(res.data.user.userName,res.data.followersCount),
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
export const restructureTweetObject=(res:Response<>)



