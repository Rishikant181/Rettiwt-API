import {UserAccountService} from "../../../services/DataServices/UserAccountService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";
import { User } from "src/schema/types/UserAccountData";
import { UIDTYPE } from "src/schema/graphql/resolvers/helpers/internalObjectTypes/UID";
import { type } from "os";
import { Response } from "src/schema/types/HTTP";
var getUser = new UserAccountService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie']
);

export type JSONUserObject={
    UID:{
        screenName:string,
        restID:string,
        TYPE:UIDTYPE
    },
    followers:{
        screenName:string,
        restID:string,
        TYPE:UIDTYPE
    }[],
    followings:{
        screenName:string,
        restID:string,
        TYPE:UIDTYPE
    }[],
    Meta:{
        fullName:string,
        profileImage:string,
        bannerImage:string,
        accountCreationDate:string,
        statusCount:number,
        bio:string,
        isVerified:boolean,
        followerCount:number,
        favouriteCount:number,
        followingCount:number,

    }

}

export function getFollowersUIDList(screenName:string,count:number):Array<{screenName:string,restID:string,TYPE:UIDTYPE}>{
    
    //SECTION: Initialisation
    let followersList:{
        screenName:string,
        restID:string,
        TYPE:UIDTYPE
    }[]=[];
    let cursor='';
    let resolved:Response<{ followers: User[], next: string }>;//Stores pre-proccessed data from tweetFetch service 
    
	//!SECTION: Initialisation
    
    for(
        async()=>{getUser.getUserFollowers(screenName,20,cursor).then(res=>{resolved=res;});};
        //@ts-ignore
        resolved.success&&resolved.error.message==='';//Checking if incoming data is valid or not
        async()=>{getUser.getUserFollowers(screenName,20,resolved.data.next).then(res=>{resolved=res;});}//Updating check for next batch

    )
    {
        //@ts-ignore
        for(let Followers of resolved.data.followers)
        {
            followersList.push(
                {
                    screenName:Followers.user.userName,
                    restID:Followers.user.id,
                    TYPE:UIDTYPE.USER});
        }
    }
    
    return followersList;
}                    

                   
export function getFollowingsUIDList(screenName:string,count:number):Array<{screenName:string,restID:string,TYPE:UIDTYPE}>{
    
    //SECTION: Initialisation
    let followingsList:{
        restID:string,
        screenName:string,
        TYPE:UIDTYPE
    }[]=[];
    let cursor='';
    let resolved:Response<{ followers: User[], next: string }>;
    
	//!SECTION: Initialisation
    
    for(
        //@ts-ignore
        async()=>{getUser.getUserFollowings(screenName,20,cursor).then(res=>{resolved=res;});};
        //@ts-ignore
        resolved.success&&resolved.error.message==='';//Checking if incoming data is valid or not
        //@ts-ignore
        async()=>{getUser.getUserFollowings(screenName,20,resolved.data.next).then(res=>{resolved=res;});}//Updating check for next batch

    )
    {
        //@ts-ignore
        for(let Followings of resolved.data.followers)
        {
            followingsList.push(
                {
                    screenName:Followings.user.userName,
                    restID:Followings.user.id,
                    TYPE:UIDTYPE.USER});
        }
    }
    
    return followingsList;
}           
    

    




//ANCHOR: main entry Point 
export const parseUserDetails=(screenName:string):JSONUserObject=>{

    var userInstance:JSONUserObject;
    async ()=>{
	await getUser.getUserAccountDetails(screenName).then(res =>{
        
    	userInstance={
            'UID':{
                'screenName':screenName,
                'restID':res.data.user.id,    
                'TYPE':0
            },
            'followers':getFollowersUIDList(screenName,res.data.followersCount),
            'followings':getFollowingsUIDList(screenName,res.data.followersCount),
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
			}}
		}	)}
        //@ts-ignore
		return userInstance
}