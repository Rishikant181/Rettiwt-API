// This file contains the service that handles getting and posting User account data to and from official TwitterAPI

// PACKAGE LIBS
import fetch from 'node-fetch';

// Custom libs

import { FetcherService } from '../FetcherService';

import {
    User
} from '../../schema/types/UserAccountData';

import {
    userAccountUrl,
    userFollowingUrl,
    userFollowersUrl
} from '../helper/Requests';

export class UserAccountService extends FetcherService {
    // MEMBER METHODS
    // The constructor
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        super(authToken, csrfToken, cookie);
    }

    // Method to fetch the user account details using screen name
    getUserAccountDetails(screenName: string): Promise<User> {
        return this.fetchData(userAccountUrl(screenName))
            .then(res => res.json())
            .then(res => new User().deserialize(res['data']['user']['result']), 
            // If error parsing to json
            (err) => {
                console.log("Failed to parse data");
                return new User();
            });
    }

    // Method to fetch the list of users followed by given user
    getUserFollowing(
        userId: string,
        count: number,
        cursor: string
    ): Promise<{ following: User[], next: string }> {
        return this.fetchData(userFollowingUrl(userId, count, cursor))
            .then(res => res.json())
            .then(res => {
                var following: User[] = [];
                var next: string = '';

                // Extracting the raw list of following
                //@ts-ignore
                res = res['data']['user']['result']['timeline']['timeline']['instructions'].filter(entry => entry['type'] === 'TimelineAddEntries')[0]['entries']

                // Iterating over the raw list of following
                for (var entry of res) {
                    // Checking if the entry is of type user
                    // If entry is of user type
                    if (entry['entryId'].indexOf('user') != -1) {
                        // Extracting user details
                        const user = entry['content']['itemContent']['user_results']['result'];

                        // Adding the followed user ID to list of IDs
                        following.push(new User().deserialize(user));
                    }
                    // If entry is of type bottom cursor
                    else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
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
            },
            // If error parsing to json
            (err) => {
                console.log("Failed to parse data");
                return { following: [], next: '' }
            });
    }

    // Method to fetch a list of followers of the given user
    getUserFollowers(
        userId: string,
        count: number,
        cursor: string
    ): Promise<{ followers: User[], next: string }> {
        return this.fetchData(userFollowersUrl(userId, count, cursor))
            .then(res => res.json())
            .then(res => {
                var followers: User[] = [];
                var next: string = '';

                // Extracting the raw list of followers
                //@ts-ignore
                res = res['data']['user']['result']['timeline']['timeline']['instructions'].filter(entry => entry['type'] === 'TimelineAddEntries')[0]['entries']

                // Itearating over the raw list of following
                for (var entry of res) {
                    // Checking if the entry is of type user
                    // If entry is of user type
                    if (entry['entryId'].indexOf('user') != -1) {
                        // Extracting user details
                        const user = entry['content']['itemContent']['user_results']['result'];

                        // Adding the follower ID to list of IDs
                        followers.push(new User().deserialize(user));
                    }
                    // If entry is of type bottom cursor
                    else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
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
            },
            // If error parsing to json
            (err) => {
                console.log("Failed to parse data");
                return { followers: [], next: '' }
            });
    }
};