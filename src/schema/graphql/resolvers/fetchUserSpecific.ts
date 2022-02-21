import {UserAccountService} from "../../../services/DataServices/UserAccountService"
import { UID } from "../types/uidModel"
import { config } from "../../../config/env";
import { User } from "src/schema/types/UserAccountData";
var getUser = new UserAccountService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie']
);


function getFollowersUIDList(screenName:string,count:number):Array<string>{
    
    let FollowerList: Array<string>=[];

    let cursor='';
    let PromiseFL=getUser.getUserFollowers(screenName,20,cursor);
    let PromiseValidity:string
    while(count>=0){
        //Iterating withing the current batch of User List to filter out UserID only and add it to our client side FollowerList
        PromiseFL.then(res=>{
            res.data.followers.forEach(({user})=>FollowerList.push(user.userName));

        })
        if(count%20<20){
            PromiseFL.then(res=>{cursor=res.data.next});
            count=count%20;
            PromiseFL=getUser.getUserFollowers(screenName,count,cursor);
        }
        else{
            PromiseFL.then(res=>{cursor=res.data.next});
            count-=20;
            PromiseFL=getUser.getUserFollowers(screenName,20,cursor);
        }}
    
    return FollowerList;

}
async function getFollowingUIDList(screenName:string,count:number):Promise<User[]>{
    
    let FollowingList: Array<string>=[];

    let cursor='';
    let PromiseFL=getUser.getUserFollowing(screenName,20,cursor);
    let PromiseRes:any;
    PromiseFL.then(res=>{
        PromiseRes=res.data;
   })
    let PromiseValidity:string
    while(count>=0){
        //Iterating withing the current batch of User List to filter out UserID only and add it to our client side FollowerList
        // PromiseFL.then(res=>{
        //     res.data.following.forEach(({user})=>FollowingList.push(user.userName));

        // })
        // PromiseRes.data.following.forEach(({user})=>FollowingList.push(user.userName)
        for(let Following of PromiseRes.following){FollowingList.push(Following)}

        if(count%20<20){
            PromiseFL.then(res=>{cursor=res.data.next});
            count=count%20;
            PromiseFL=getUser.getUserFollowing(screenName,count,cursor);
        }
        else{
            PromiseFL.then(res=>{cursor=res.data.next});
            count-=20;
            PromiseFL=getUser.getUserFollowing(screenName,20,cursor);
        }}
    
    return FollowingList;

}



export const parseUserDetails:any=(screenName:string)=>{

    
    getUser.getUserAccountDetails(screenName).then(res =>{
        var JSONUserObject={
            'UID':{
                'screen_name':screenName,
                'type':"UserID",
                // 'restID':res.data.private.restID // TODO: RISHIKANT add rest id    
            },
            'followers':getFollowersUIDList(screenName,res.data.followersCount),
            'following':getFollowingUIDList(screenName,res.data.followersCount),
            'Meta':{
                'fullname':res.data.user.fullName,
                'Profile image':res.data.profileImage,
                'Banner image':res.data.profileBanner,
                'Account creation date':res.data.createdAt,
                'Status count':res.data.statusesCount,
                'bio':res.data.description,
                'Is verified':res.data.isVerified,
                'follower Count':res.data.followersCount,
                'favourite count':res.data.favouritesCount,
                'following count':res.data.followingsCount


            }


        }

       
    })
}