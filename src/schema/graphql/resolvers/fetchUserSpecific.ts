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
    
    //SECTION: Initialisation
    let FollowersList: Array<string>=[];
    let cursor='';
    let res:any
    let PromiseValidity:string
    let Promisres:any;
	//!SECTION: Initialisation
    async ()=>{

        Promisres=await getUser.getUserFollowers(screenName,20,cursor);//getRes from the user
        res={"data":Promisres.data,
            "succcss":Promisres.success,
            "error":Promisres.error
        }
        
    }
    

    while(count>=0){
        //Iterating withing the current batch of User List to filter out UserID only and add it to our client side FollowerList
       
        //Adding Data to the set
        for(let Follower of res.data.followers)   
        {
            FollowersList.push(Follower.user.userName)
        }
        
        
        if(count%20<20){//Resolving Promises
            cursor=res.data.next;
            count=count%20;
            async ()=>{

                Promisres=await getUser.getUserFollowers(screenName,20,cursor);//getRes from the user
                res={"data":Promisres.data,
                    "succcss":Promisres.success,
                    "error":Promisres.error}
                    
                }
                
    }
        else{
            cursor=res.data.next;
            count-=20;
            async ()=>{

                Promisres=await getUser.getUserFollowers(screenName,20,cursor);//getRes from the user
                res={"data":Promisres.data,
                    "succcss":Promisres.success,
                    "error":Promisres.error
            }
            
        }}
    }
    return FollowersList;

}
function getFollowingsUIDList(screenName:string,count:number):Array<string>{
    
    //SECTION: Initialisation
    let FollowingsList: Array<string>=[];
    let cursor='';
    let res:any
    let PromiseValidity:string
    let Promisres:any;
	//!SECTION: Initialisation
    async ()=>{
		
        Promisres=await getUser.getUserFollowing(screenName,20,cursor);//getRes from the user
        res={"data":Promisres.data,
            "succcss":Promisres.success,
            "error":Promisres.error}
        
    }
    

    while(count>=0){
        //Iterating withing the current batch of User List to filter out UserID only and add it to our client side FollowerList
       
        //Adding Data to the set
        for(let Follower of res.data.followers)   
        {
            FollowingsList.push(Follower.user.userName)
        }
        
        
        if(count%20<20){//Resolving Promises
            cursor=res.data.next;
            count=count%20;
            async ()=>{

                Promisres=await getUser.getUserFollowing(screenName,20,cursor);//getRes from the user
                res={"data":Promisres.data,
                    "succcss":Promisres.success,
                    "error":Promisres.error}
                    
                }
                
    }
        else{
            cursor=res.data.next;
            count-=20;
            async ()=>{

                Promisres=await getUser.getUserFollowing(screenName,20,cursor);//getRes from the user
                res={"data":Promisres.data,
                    "succcss":Promisres.success,
                    "error":Promisres.error
            }
            
        }}
    }
    return FollowingsList;

}




//ANCHOR: main entry Point 
export const parseUserDetails:any=(screenName:string)=>{

    
    getUser.getUserAccountDetails(screenName).then(res =>{
        var followerUIDList:Array<String>=getFollowersUIDList(screenName,res.data.followersCount)
        var JSONUserObject={
            'UID':{
                'screen_name':screenName,
                'type':"UserID",
                // 'restID':res.data.private.restID // TODO: RISHIKANT add rest id    
            },
            'followers':getFollowersUIDList(screenName,res.data.followersCount),
            'following':getFollowingsUIDList(screenName,res.data.followersCount),
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