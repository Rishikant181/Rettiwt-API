// PACKAGES
import {
    Url,
    EResourceType,
    IUserDetailsResponse,
    IUserFollowersResponse,
    IUserFollowingResponse,
    IUserLikesResponse,
    ITweet as IRawTweet,
    IUser as IRawUser
} from 'rettiwt-core';

// SERVICES
import { FetcherService } from '../util/FetcherService';
import { AuthService } from '../auth/AuthService';

// MODELS
import { User } from '../../models/data/User';
import { UserListArgs } from '../../models/args/UserListArgs';
import { Tweet } from '../../models/data/Tweet';

// TYPES
import { CursoredData } from '../../models/data/CursoredData';

// ENUMS
import { AuthenticationErrors } from '../../enums/Errors';

// EXTRACTORS
import * as UserExtractors from '../helper/extractors/Users';
import { TweetService } from './TweetService';

/**
 * Handles fetching of data related to user account
 */
export class UserService extends FetcherService {
    /**
     * @param auth The AuthService instance to use for authentication.
     */
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @param id The id/username of the target user.
     * 
     * @returns The details of the given user.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if no user with the given username was found.
     */
    async getUserDetails(id: string): Promise<User> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        let res: IUserDetailsResponse;

        // If id is not a numeric string => username is supplied
        if (isNaN(Number(id))) {
            // Preparing the URL
            const url: string = new Url(EResourceType.USER_DETAILS, { id: id }).toString();

            // Fetching the raw data
            res = await this.request<IUserDetailsResponse>(url).then(res => res.data);
        }
        // If id is a numeric string => id is supplied
        else {
            // Getting data from cache
            let cachedData = await this.readData(id);

            // If data exists in cache
            if (cachedData) {
                return cachedData;
            }

            // Preparing the URL
            const url: string = new Url(EResourceType.USER_DETAILS_BY_ID, { id: id }).toString();

            // Fetching the raw data
            res = await this.request<IUserDetailsResponse>(url).then(res => res.data);
        }

        // Extracting data
        let data = UserExtractors.extractUserDetails(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let user = new User(data.required[0]);

        return user;
    }

    /**
     * @param userId The rest id of the target user.
     * @param count The number of tweets to fetch, must be >= 40 (when no cursor is provided) and <=100.
     * @param cursor The cursor to next batch. If blank, first batch is fetched.
     * 
     * @returns The list of tweets nade by the target user.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count has been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if invalid count has been provided.
     * 
     * @deprecated Use [this](https://rishikant181.github.io/Rettiwt-API/classes/TweetService.html#getTweets) method instead. It's better in every possible way!
     */
    async getUserTweets(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // Getting the username of the target user
        const userName: string = (await this.getUserDetails(userId)).userName;

        // Getting the tweets of the target user
        return new TweetService(this.auth).getTweets({
            fromUsers: [userName]
        }, count, cursor);
    }

    /**
     * @param userId The rest id of the target user.
     * @param count The number of following to fetch, must be >= 40 (when no cursor is provided) and <=100.
     * @param cursor The cursor to next batch. If blank, first batch is fetched.
     * 
     * @returns The list of users followed by the target user.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count has been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if invalid count has been provided.
     */
    async getUserFollowing(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.USER_FOLLOWING, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetchin the raw data
        let res = await this.request<IUserFollowingResponse>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: IRawUser) => new User(item));

        return new CursoredData<User>(users, data.cursor);
    }

    /**
     * @param userId The rest id of the target user.
     * @param count The number of followers to fetch, must be >= 40 (when no cursor is provided) and <=100.
     * @param cursor The cursor to next batch. If blank, first batch is fetched.
     * 
     * @returns The list of users following the target user.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count has been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if invalid count has been provided.
     */
    async getUserFollowers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.USER_FOLLOWERS, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<IUserFollowersResponse>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: IRawUser) => new User(item));

        return new CursoredData<User>(users, data.cursor);
    }

    /**
     * @param userId The rest id of the target user.
     * @param count The number of likes to fetch.
     * @param cursor The cursor to next batch. If blank, first batch is fetched, must be >= 40 (when no cursor is provided) and <=100.
     * 
     * @returns The list of tweets liked by the target user.
     * 
     * @throws {@link AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     */
    async getUserLikes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.USER_LIKES, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<IUserLikesResponse>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserLikes(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: IRawTweet) => new Tweet(item));

        return new CursoredData<Tweet>(tweets, data.cursor);
    }
};