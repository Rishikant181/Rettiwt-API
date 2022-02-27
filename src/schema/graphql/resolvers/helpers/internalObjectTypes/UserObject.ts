import { UID, UIDTYPE } from "./UID";



export type JSONUserObject={
    UID:UID,
    followers:UID[],
    followings:UID[],
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