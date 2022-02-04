// This file contains various objects for handling data related to User Account

// CUSTOM LIBS
import { Deserializable } from "./Data";

// Object to store a user's identification
export class UserID implements Deserializable {
    // MEMBER DATA
    id: string;                                                             // To store the internal rest id of user account
    userName: string;                                                       // To store the screen name of the user
    fullName: string;                                                       // To store the actual name of the user

    // MEMEBER METHODS
    // Method to deserialize input data into this object
    deserialize(data: {
        id: string,
        userName: string,
        fullName: string
    }): this {
            this.id = data.id;
            this.userName = data.userName;
            this.fullName = data.fullName;
        
            return this;
    }
}

// Object to hold the details about a user
export class User implements Deserializable {
    // MEMBER DATA
    user: UserID;                                                             // To store the internal rest id of user account
    createdAt: string;                                                      // To store the time when the account was created
    description: string;                                                    // To store the account description
    isVerified: boolean ;                                                   // To store whether this is a verified account or not
    favouritesCount: number;                                                // To store the number of favourites
    followersCount: number;                                                 // To store the number of followers
    friendsCount: number;                                                   // To store the number of friends
    statusesCount: number;                                                  // To store the number of status posted by user
    location: string;                                                       // To store the user's location
    pinnedTweets: string[];                                                 // To store the ids of tweets that are pinned in the account
    profileBanner: string;                                                  // To store the url to the profile's banner
    profileImage: string;                                                   // To store the url to the profile's image

    // MEMBER METHODS
    // Method to deserialize input data into current object
    /*
    For now, this take in input data of 'any' format, then removes unnecessary, non-required fields,
    then copies required fields from input data
    NOTE: There might be a more elegant and faster method to do this
    */
    deserialize(data: any): this {
        this.user = new UserID().deserialize({
            id: data['rest_id'],
            userName: data['legacy']['screen_name'],
            fullName: data['legacy']['name']
        })
        this.createdAt = data['legacy']['created_at'];
        this.description = data['legacy']['description'];
        this.isVerified = data['legacy']['verified'];
        this.favouritesCount = data['legacy']['favourites_count'];
        this.followersCount = data['legacy']['followers_count'];
        this.friendsCount = data['legacy']['friends_count'];
        this.statusesCount = data['legacy']['statuses_count'];
        this.location = data['legacy']['location'];
        this.pinnedTweets = data['legacy']['pinned_tweet_ids_str'];
        this.profileBanner = data['legacy']['profile_banner_url'];
        this.profileImage = data['legacy']['profile_image_url_https'];
        
        return this;
    }
}