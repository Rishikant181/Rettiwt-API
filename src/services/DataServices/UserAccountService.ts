// CUSTOM LIBS
import { FetcherService } from '../FetcherService';

/* TYPES */
import {
    Errors,
    Error,
    Response
} from '../../schema/types/HTTP'

import { User } from '../../schema/types/UserAccountData';
import { Tweet } from '../../schema/types/TweetData';

/* HELPERS */
import {
    userAccountUrl,
    userFollowingUrl,
    userFollowersUrl,
    userLikesUrl
} from '../helper/Requests';

import {
    extractUserAccountDetails,
    extractUserFollowing,
    extractUserFollowers,
    extractUserLikes
} from '../helper/Extractors';

<<<<<<< HEAD
export class UserAccountService extends FetcherService 
{   
=======
/**
 * A service that deals with fetching of data related to user account
 */
export class UserAccountService extends FetcherService {
>>>>>>> dev
    // MEMBER METHODS
    /**
     * @param authToken The authetication token received from TwitterAPI
     * @param csrfToken The csrf token received from TwitterAPI
     * @param cookie The cookie for the logged in user account received from TwitterAPI
     */
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        super(authToken, csrfToken, cookie);
    }

    /**
     * Fetches account details of the user with the given screen name
     * @param screenName The screen name of the target user. Example: "1canw1n"
     */
    getUserAccountDetails(screenName: string): Promise<Response<User>> {
        return this.fetchData(userAccountUrl(screenName))
            .then(res => {
                // If user does not exist
                if (!Object.keys(res['data']).length) {
                    return new Response<User>(
                        false,
                        new Error(Errors.UserNotFound),
                        {},
                    );
                }
                // If user exists
                else {
                    var data = extractUserAccountDetails(res);
                    return new Response<User>(
                        true,
                        new Error(Errors.NoError),
                        new User().deserialize(data),
                    );
                }
            })
            // If other run-time errors
            .catch(err => {
                return new Response<User>(
                    false,
                    new Error(Errors.FatalError),
                    {},
                );
            });
    }

    /**
     * Fetches the list of users followed by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    getUserFollowing(
        userId: string,
        count: number,
        cursor: string 
        //TODO: Add default value to cursor
    ): Promise<Response<{ following: User[], next: string }>> {
        return this.fetchData(userFollowingUrl(userId, count, cursor))
            .then(res => {
                // If user does not exists
                if (!Object.keys(res['data']['user']).length) {
                    return new Response<{ following: User[], next: string }>(
                        false,
                        new Error(Errors.UserNotFound),
                        { following: [], next: '' }
                    );
                }
                // If user exists
                else {
                    var data = extractUserFollowing(res);
                    return new Response<{ following: User[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { following: data.following, next: data.next }
                    );
                }
            })
            // If other run-time error
            .catch(err => {
                return new Response<{ following: User[], next: string }>(
                    false,
                    new Error(Errors.FatalError),
                    { following: [], next: '' }
                )
            });
    }

    /**
     * Fetches the list of users following the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    getUserFollowers(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ followers: User[], next: string }>> {
        return this.fetchData(userFollowersUrl(userId, count, cursor))
            .then(res => {
                // If user does not exist
                if (!Object.keys(res['data']['user']).length) {
                    return new Response<{ followers: User[], next: string }>(
                        false,
                        new Error(Errors.UserNotFound),
                        { followers: [], next: [] }
                    );
                }
                // If user exists
                else {
                    var data = extractUserFollowers(res);
                    return new Response<{ followers: User[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { followers: data.followers, next: data.next }
                    );
                }
            })
            // If other run-time error
            .catch(err => {
                return new Response<{ followers: User[], next: string }>(
                    false,
                    new Error(err),
                    { followers: [], next: '' }
                );
            });
    }

    /**
     * Fetches the list of tweets liked by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    getUserLikes(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ tweets: Tweet[], next: string }>> {
        return this.fetchData(userLikesUrl(userId, count, cursor))
            .then(res => {
                // If user not found
                if (!Object.keys(res['data']['user']).length) {
                    return new Response<{ tweets: Tweet[], next: string }>(
                        false,
                        new Error(Errors.UserNotFound),
                        { tweets: [], next: '' }
                    );
                }
                // If user found
                else {
                    var data = extractUserLikes(res);
                    return new Response<{ tweets: Tweet[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { tweets: data.tweets, next: data.next }
                    );
                }
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