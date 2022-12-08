// This file contains various objects for handling data related to User Account

/**
 * @summary Stores the UID of a user
 */
export interface UserID {
    id: string;                                                             // To store the internal rest id of user account
    userName: string;                                                       // To store the screen name of the user
    fullName: string;                                                       // To store the actual name of the user
}

/**
 * @summary Stores the complete details of the given user's account
 */
export interface User {
    user: UserID;                                                           // To store the internal rest id of user account
    createdAt: string;                                                      // To store the time when the account was created
    description: string;                                                    // To store the account description
    isVerified: boolean ;                                                   // To store whether this is a verified account or not
    favouritesCount: number;                                                // To store the number of favourites
    followersCount: number;                                                 // To store the number of followers
    followingsCount: number;                                                // To store the number of people followed by this user
    statusesCount: number;                                                  // To store the number of status posted by user
    location: string;                                                       // To store the user's location
    pinnedTweet: string;                                                    // To store the id of tweet that is pinned in the account
    profileBanner: string;                                                  // To store the url to the profile's banner
    profileImage: string;                                                   // To store the url to the profile's image
}