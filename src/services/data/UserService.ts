// SERVICES
import { FetcherService } from '../util/FetcherService';
import { AuthService } from '../auth/AuthService';

// MODELS
import { Url } from '../../twitter/Url';
import { User } from '../../models/data/User';
import { UserListArgs } from '../../models/args/UserListArgs';
import { Tweet } from '../../models/data/Tweet';

// TYPES
import { CursoredData } from '../../models/data/CursoredData';
import { Result as TweetData } from '../../twitter/types/tweet/Tweet';
import RawUser, { Result as UserData } from '../../twitter/types/user/User';
import RawUserTweets from '../../twitter/types/user/Tweets';
import RawUserFollowers from '../../twitter/types/user/Followers';
import RawUserFollowing from '../../twitter/types/user/Following';
import RawUserLikes from '../../twitter/types/user/Likes';

// ENUMS
import { ResourceType } from '../../twitter/enums/Resources';
import { AuthenticationErrors } from '../../enums/Errors';

// EXTRACTORS
import * as UserExtractors from '../helper/extractors/Users';

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
     * @throws {@link Errors.DataErrors.UserNotFound} error, if no user with the given username was found.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
     */
    async getUserDetails(id: string): Promise<User> {
        let res: RawUser;

        // If id is not a numeric string => username is supplied
        if (isNaN(Number(id))) {
            // Preparing the URL
            const url: string = new Url(ResourceType.USER_DETAILS, { id: id }).toString();

            // Fetching the raw data
            res = await this.request<RawUser>(url, false).then(res => res.data);
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
            const url: string = new Url(ResourceType.USER_DETAILS_BY_ID, { id: id }).toString();

            // Fetching the raw data
            res = await this.request<RawUser>(url, false).then(res => res.data);
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
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count has been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if invalid count has been provided.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
     */
    async getUserTweets(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.USER_TWEETS, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<RawUserTweets>(url, false).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => new Tweet(item));

        return new CursoredData<Tweet>(tweets, data.cursor);
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
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getUserFollowing(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.USER_FOLLOWING, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetchin the raw data
        let res = await this.request<RawUserFollowing>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

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
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getUserFollowers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.USER_FOLLOWERS, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<RawUserFollowers>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

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
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getUserLikes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.USER_LIKES, { id: userId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<RawUserLikes>(url).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserLikes(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => new Tweet(item));

        return new CursoredData<Tweet>(tweets, data.cursor);
    }
};