// This file contains the service that handles getting and posting User account data to and from official TwitterAPI

// PACKAGE LIBS
import fetch from 'node-fetch';

// Custom libs
import {
    UserID,
    User
} from '../schema/types/UserAccountData';

import {
    userAccountUrl,
    userFollowingUrl,
    userFollowersUrl,
    authorizedHeader
} from './helper/Requests';

export class UserAccountService {
    // MEMBER DATA
    private authToken: string;                                                  // To store the authenctication token
    private csrfToken: string;                                                  // To store the csrfToken
    private cookie: string;                                                     // To store the cookies
    
    // MEMBER METHODS
    // The constructor
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        this.authToken = authToken;
        this.csrfToken = csrfToken;
        this.cookie = cookie;
    }

    // Method to fetch the user account details using screen name
    getUserAccountDetails(screenName: string): Promise<User> {
        return fetch(userAccountUrl(screenName), {
            headers: authorizedHeader(this.authToken, this.csrfToken, this.cookie),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => new User().deserialize(res.data.user.result));
    }

    // Method to fetch the list of users followed by given user
    getUserFollowing(
        userId: string,
        count: number,
        cursor: string
    ): Promise<{ following: UserID[], next: string }> {
        return fetch(userFollowingUrl(userId, count, cursor), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
        .then(res => res.json())
        // Extracting the raw list of following
        //@ts-ignore
        .then(res => res['data']['user']['result']['timeline']['timeline']['instructions'].filter(entry => entry['type'] === 'TimelineAddEntries')[0]['entries'])
        .then(data => {
            var following: UserID[] = [];                                           // To store the UIDS for following
            var next: string = '';                                                  // To store the cursor to next batch

            // Itearating over the raw list of following
            for(var entry of data) {
                // Checking if the entry is of type user
                // If entry is of user type
                if(entry['entryId'].indexOf('user') != -1) {
                    // Extracting user details
                    const user = entry['content']['itemContent']['user_results']['result'];
                    
                    // Adding the followed user ID to list of IDs
                    following.push(new UserID().deserialize({
                        id: user['rest_id'],
                        userName: user['legacy']['screen_name'],
                        fullName: user['legacy']['name']
                    }));
                }
                // If entry is of type bottom cursor
                else if(entry['entryId'].indexOf('cursor-bottom') != -1) {
                    // Storing the cursor to next batch
                    /**
                     * Replacing '|' with '%7C'
                     * Template string does not(apparently) implicitly replace characters with their url encodings.
                     * Therefore not explicitly replacing casuses bad request
                     */
                    next = entry['content']['value'].replace('|', '%7C');
                }
            }
            
            return { following: following, next: next };
        })
    }

    // Method to fetch a list of followers of the given user
    getUserFollowers(
        userId: string,
        count: number,
        cursor: string
    ): Promise<{ followers: UserID[], next: string }> {
        return fetch(userFollowersUrl(userId, count, cursor), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
        .then(res => res.json())
        // Extracting the raw list of followers
        //@ts-ignore
        .then(res => res['data']['user']['result']['timeline']['timeline']['instructions'].filter(entry => entry['type'] === 'TimelineAddEntries')[0]['entries'])
        .then(data => {
            var followers: UserID[] = [];                                           // To store the UIDS for following
            var next: string = '';                                                  // To store the cursor to next batch

            // Itearating over the raw list of following
            for(var entry of data) {
                // Checking if the entry is of type user
                // If entry is of user type
                if(entry['entryId'].indexOf('user') != -1) {
                    // Extracting user details
                    const user = entry['content']['itemContent']['user_results']['result'];
                    
                    // Adding the follower ID to list of IDs
                    followers.push(new UserID().deserialize({
                        id: user['rest_id'],
                        userName: user['legacy']['screen_name'],
                        fullName: user['legacy']['name']
                    }));
                }
                // If entry is of type bottom cursor
                else if(entry['entryId'].indexOf('cursor-bottom') != -1) {
                    // Storing the cursor to next batch
                    /**
                     * Replacing '|' with '%7C'
                     * Template string does not(apparently) implicitly replace characters with their url encodings.
                     * Therefore not explicitly replacing casuses bad request
                     */
                    next = entry['content']['value'].replace('|', '%7C');
                }
            }
            
            return { followers: followers, next: next };
        })
    }
};