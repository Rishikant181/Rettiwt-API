// SERVICES
import { FetcherService } from '../FetcherService';
import { AuthService } from '../AuthService';

// TYPES
import { User } from '../../types/data/User';
import { Tweet } from '../../types/data/Tweet';
import { CursoredData } from '../../types/data/Service';
import { Result as TweetData } from '../../types/raw/tweet/Tweet';
import RawUser, { Result as UserData } from '../../types/raw/user/User';
import RawUserFollowers from '../../types/raw/user/Followers';
import RawUserFollowing from '../../types/raw/user/Following';
import RawUserLikes from '../../types/raw/user/Likes';
import * as Errors from '../../types/data/Errors';

// URLS
import * as UserUrls from '../helper/urls/Users';

// EXTRACTORS
import * as UserExtractors from '../helper/extractors/Users';

// DESERIALIZERS
import * as UserDeserializers from '../helper/deserializers/Users';
import * as TweetDeserializers from '../helper/deserializers/Tweets';

/**
 * Handles fetching of data related to user account
 */
export class UserService extends FetcherService {
    // MEMBER METHODS
    /**
     * @param auth The AuthService instance to use for authentication.
     */
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @param screenName The screen name of the target user.
     * 
     * @returns The details of the given user.
     * 
     * @throws {@link Errors.DataErrors.UserNotFound} error, if no user with the given username was found.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
     */
    async getUserDetails(screenName: string): Promise<User> {
        // Fetching the raw data
        let res: RawUser = await this.request<RawUser>(UserUrls.userDetailsUrl(screenName), false).then(res => res.data);
        
        // Extracting data
        let data = UserExtractors.extractUserDetails(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let user = UserDeserializers.toUser(data.required[0]);
            
        return user;
    }

    /**
     * @param restId The screen name of the target user.
     * 
     * @returns The details of the user with given rest id.
     * 
     * @throws {@link Errors.DataErrors.UserNotFound} error, if no user with the given id was found.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
     */
    async getUserDetailsById(restId: string): Promise<User> {
        // Getting data from cache
        let cachedData = await this.readData(restId);

        // If data exists in cache
        if(cachedData) {
            return cachedData;
        }
        
        // Fetchin the raw data
        let res = await this.request<RawUser>(UserUrls.userDetailsByIdUrl(restId), false).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserDetails(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let user = UserDeserializers.toUser(data.required[0]);
            
        return user;
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
    async getUserFollowing(userId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // If invalid count provided
        if (count < 40 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }

        // Fetchin the raw data
        let res = await this.request<RawUserFollowing>(UserUrls.userFollowingUrl(userId, count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => UserDeserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
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
    async getUserFollowers(userId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // If invalid count provided
        if (count < 40 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }

        // Fetching the raw data
        let res = await this.request<RawUserFollowers>(UserUrls.userFollowersUrl(userId, count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => UserDeserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @param userId The rest id of the target user.
     * @param count The number of likes to fetch.
     * @param cursor The cursor to next batch. If blank, first batch is fetched, must be >= 40 (when no cursor is provided) and <=100.
     * 
     * @returns The list of tweets liked by the target user.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count has been provided.
     * @throws {@link Errors.DataErrors.UserNotFound} error, if invalid count has been provided.
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getUserLikes(userId: string, count: number, cursor: string): Promise<CursoredData<Tweet>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // If invalid count provided
        if (count < 40 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }

        // Fetching the raw data
        let res = await this.request<RawUserLikes>(UserUrls.userLikesUrl(userId, count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = UserExtractors.extractUserLikes(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => TweetDeserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
};