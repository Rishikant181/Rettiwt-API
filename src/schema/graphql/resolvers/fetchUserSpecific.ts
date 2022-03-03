import {UserAccountService} from "../../../services/DataServices/UserAccountService"
import { config } from "../../../config/env";
import { User } from "../../types/UserAccountData";
import { UID, UIDTYPE } from "./helpers/internalObjectTypes/UID";
import { JSONUserObject } from "./helpers/internalObjectTypes/UserObject";
import { Response } from "../../types/HTTP";
import { restructureUserObject } from "./helpers/restructuring";
var getUser = new UserAccountService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie']
);


export function getFollowersUIDList(screenName:string):Array<{screenName:string,restID:string,TYPE:UIDTYPE}>{
    
    //SECTION: Initialisation
    let followersList:UID[]=[];
    let cursor='';
    let resolved:Response<{ followers: User[], next: string }>;//Stores pre-proccessed data from tweetFetch service 
    
	//!SECTION: Initialisation
    
    for(
        async()=>{await getUser.getUserFollowers(screenName,20,cursor).then(res=>{resolved=res;});};
        //@ts-ignore
        resolved.success&&resolved.error.message==='';//Checking if incoming data is valid or not
        async()=>{await getUser.getUserFollowers(screenName,20,resolved.data.next).then(res=>{resolved=res;});}//Updating check for next batch

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

                   
export function getFollowingsUIDList(screenName:string):Array<{screenName:string,restID:string,TYPE:UIDTYPE}>{
    
    //SECTION: Initialisation
    let followingsList:UID[]=[];
    let cursor='';
    let resolved:Response<{ followers: User[], next: string }>;
    
	//!SECTION: Initialisation
    
    for(
        //@ts-ignore
        async()=>{await getUser.getUserFollowings(screenName,20,cursor).then(res=>{resolved=res;});};
        //@ts-ignore
        resolved.success&&resolved.error.message==='';//Checking if incoming data is valid or not
        //@ts-ignore
        async()=>{await getUser.getUserFollowings(screenName,20,resolved.data.next).then(res=>{resolved=res;});}//Updating check for next batch

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
    	userInstance=restructureUserObject(res)})
    }
    //@ts-ignore
    return userInstance;
}