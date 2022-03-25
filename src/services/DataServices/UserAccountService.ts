// CUSTOM LIBS
import { FetcherService } from '../FetcherService';

/* TYPES */
import {
    Errors,
    Response
} from '../../schema/types/HTTP'

import { User } from '../../schema/types/UserAccountData';
import { Tweet } from '../../schema/types/TweetData';

/* HELPERS */
import {
    userAccountUrl,
    userAccountByIdUrl,
    userFollowingUrl,
    userFollowersUrl,
    userLikesUrl
} from '../helper/Requests';

import {
    extractUserAccountDetails,
    extractUserFollow,
    extractUserLikes
} from '../helper/Extractors';

/**
 * A service that deals with fetching of data related to user account
 */
export class UserAccountService extends FetcherService {
    // MEMBER METHODS
    /**
     * @returns The user account details of the given user
     * @param screenName The screen name of the target user.
     */
    async getUserAccountDetails(screenName: string): Promise<Response<User>> {
        return this.fetchData(userAccountUrl(screenName))
            .then(res => {
                // Extracting data
                var data = extractUserAccountDetails(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var user = new User().deserialize(data.required[0]);
                
                return new Response<User>(
                    true,
                    new Error(Errors.NoError),
                    user
                );
            })
            // If error
            .catch(err => {
                return new Response<User>(
                    false,
                    err,
                    {},
                );
            });
    }

    /**
     * @returns The user account details of the user with given rest id
     * @param restId The screen name of the target user.
     */
    async getUserAccountDetailsById(restId: string): Promise<Response<User>> {
        // Getting data from cache
        var cachedData = await this.readData(restId);

        // If data exists in cache
        if(cachedData) {
            return new Response<User>(
                true,
                new Error(Errors.NoError),
                cachedData
            );
        }

        return this.fetchData(userAccountByIdUrl(restId))
            .then(res => {
                // Extracting data
                var data = extractUserAccountDetails(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var user = new User().deserialize(data.required[0]);
                
                return new Response<User>(
                    true,
                    new Error(Errors.NoError),
                    user
                );
            })
            // If error
            .catch(err => {
                return new Response<User>(
                    false,
                    err,
                    {},
                );
            });
    }

    /**
     * @returns The list of users followed by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserFollowing(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ following: User[], next: string }>> {
        return this.fetchData(userFollowingUrl(userId, count, cursor))
            .then(res => {
                // Extracting data
                var data = extractUserFollow(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var users = data.required.map(item => new User().deserialize(item));

                return new Response<{ following: User[], next: string }>(
                    users.length ? true : false,
                    new Error(Errors.NoError),
                    { following: users, next: data.cursor }
                );
            })
            // If error
            .catch(err => {
                return new Response<{ following: User[], next: string }>(
                    false,
                    err,
                    { following: [], next: '' }
                )
            });
    }

    /**
     * @returns The list of users following the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserFollowers(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ followers: User[], next: string }>> {
        /**
         * When fetching list of followers, the official Twitter API seems to be fetching n + 20 followers,
         * where n is the actual required number of followers.
         * So changing count to count - 20, fixes fetching more than required number of follower
         */
        return this.fetchData(userFollowersUrl(userId, (count > 20) ? (count - 20) : count, cursor))
            .then(res => {
                // Extracting data
                var data = extractUserFollow(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var users = data.required.map(item => new User().deserialize(item));

                return new Response<{ followers: User[], next: string }>(
                    users.length ? true : false,
                    new Error(Errors.NoError),
                    { followers: users, next: data.cursor }
                );
            })
            // If other run-time error
            .catch(err => {
                return new Response<{ followers: User[], next: string }>(
                    false,
                    err,
                    { followers: [], next: '' }
                );
            });
    }

    /**
     * @returns The list of tweets liked by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserLikes(
        userId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ tweets: Tweet[], next: string }>> {
        return this.fetchData(userLikesUrl(userId, count, cursor))
            .then(res => {
                // Extracting data
                var data = extractUserLikes(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var tweets = data.required.map(item => new Tweet().deserialize(item));

                return new Response<{ tweets: Tweet[], next: string }>(
                    tweets.length ? true : false,
                    new Error(Errors.NoError),
                    { tweets: tweets, next: data.cursor }
                );
            })
            // If error
            .catch(err => {
                return new Response<{ tweets: Tweet[], next: string }>(
                    false,
                    err,
                    { tweets: [], next: '' }
                );
            });
    }
};