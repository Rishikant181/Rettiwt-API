// This file contains the service that handles getting and posting User account data to and from official TwitterAPI

// Custom libs

import { FetcherService } from '../FetcherService';

import {
    Error,
    Response
} from '../../schema/types/HTTP'

import {
    User
} from '../../schema/types/UserAccountData';

import {
    userAccountUrl,
    userFollowingUrl,
    userFollowersUrl,
    userLikesUrl
} from '../helper/Requests';

import { Tweet } from '../../schema/types/TweetData';

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
    getUserAccountDetails(screenName: string): Promise<Response<User>> {
        return this.fetchData(userAccountUrl(screenName))
            .then(res => {
                return new Response<User>(
                    true,
                    new Error(null),
                    new User().deserialize(res['data']['user']['result']),
                );
            })
            // If error parsing data
            .catch(err => {
                return new Response<User>(
                    false,
                    new Error(err),
                    new User(),
                );
            });
    }

    // Method to fetch the list of users followed by given user
    getUserFollowing(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ following: User[], next: string }>> {
        return this.fetchData(userFollowingUrl(userId, count, cursor))
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

                return new Response<{ following: User[], next: string }>(
                    true,
                    new Error(null),
                    { following: following, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ following: User[], next: string }>(
                    false,
                    new Error(err),
                    { following: [], next: '' }
                )
            });
    }

    // Method to fetch a list of followers of the given user
    getUserFollowers(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ followers: User[], next: string }>> {
        return this.fetchData(userFollowersUrl(userId, count, cursor))
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

                return new Response<{ followers: User[], next: string }>(
                    true,
                    new Error(null),
                    { followers: followers, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ followers: User[], next: string }>(
                    false,
                    new Error(err),
                    { followers: [], next: '' }
                );
            });
    }

    // Method to fetch the list of tweets liked by the user
    getUserLikes(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ tweets: Tweet[], next: string }>> {
        return this.fetchData(userLikesUrl(userId, count, cursor))
            .then(res => {
                var tweets: Tweet[] = [];
                var next: string = '';

                // Extracting the raw list of followers
                //@ts-ignore
                res = res['data']['user']['result']['timeline_v2']['timeline']['instructions'].filter(entry => entry['type'] === 'TimelineAddEntries')[0]['entries']

                // Itearating over the raw list of following
                for (var entry of res) {
                    // Checking if the entry is of type user
                    // If entry is of tweet type
                    if (entry['entryId'].indexOf('tweet') != -1) {
                        // Extracting tweet
                        const tweet = entry['content']['itemContent']['tweet_results']['result'];

                        // Adding the follower ID to list of IDs
                        tweets.push(new Tweet().deserialize({
                            rest_id: tweet['rest_id'],
                            ...tweet['legacy']
                        }));
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

                return new Response<{ tweets: Tweet[], next: string }>(
                    true,
                    new Error(null),
                    { tweets: tweets, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ tweets: Tweet[], next: string }>(
                    false,
                    new Error(err),
                    { tweets: [], next: '' }
                );
            });
    }
};