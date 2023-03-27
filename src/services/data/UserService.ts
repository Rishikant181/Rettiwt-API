// SERVICES
import { FetcherService } from '../FetcherService';
import { AuthService } from '../AuthService';

// MODELS
import { User } from '../../models/data/User';
import { UserListArgs } from '../../models/args/UserListArgs';
import { Tweet } from '../../models/data/Tweet';

// TYPES
import { CursoredData as ICursoredData } from '../../types/Service';
import { Result as TweetData } from '../../types/raw/tweet/Tweet';
import RawUser, { Result as UserData } from '../../types/raw/user/User';
import RawUserFollowers from '../../types/raw/user/Followers';
import RawUserFollowing from '../../types/raw/user/Following';
import RawUserLikes from '../../types/raw/user/Likes';

// ENUMS
import { AuthenticationErrors } from '../../enums/Errors';

// URLS
import * as UserUrls from '../helper/urls/Users';

// EXTRACTORS
import * as UserExtractors from '../helper/extractors/Users';

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
            // Fetching the raw data
            res = await this.request<RawUser>(UserUrls.userDetailsUrl(id), false).then(res => res.data);
        }
        // If id is a numeric string => id is supplied
        else {
            // Getting data from cache
            let cachedData = await this.readData(id);

            // If data exists in cache
            if (cachedData) {
                return cachedData;
            }

            // Fetching the raw data
            res = await this.request<RawUser>(UserUrls.userDetailsByIdUrl(id), false).then(res => res.data);
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
    async getUserFollowing(userId: string, count?: number, cursor?: string): Promise<ICursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Fetchin the raw data
        let res = await this.request<RawUserFollowing>(UserUrls.userFollowingUrl(userId, args.count, args.cursor)).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

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
    async getUserFollowers(userId: string, count?: number, cursor?: string): Promise<ICursoredData<User>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Fetching the raw data
        let res = await this.request<RawUserFollowers>(UserUrls.userFollowersUrl(userId, args.count, args.cursor)).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

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
    async getUserLikes(userId: string, count?: number, cursor?: string): Promise<ICursoredData<Tweet>> {
        // If user is not authenticated, abort
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: UserListArgs = new UserListArgs(count, cursor);

        // Fetching the raw data
        let res = await this.request<RawUserLikes>(UserUrls.userLikesUrl(userId, args.count, args.cursor)).then(res => res.data);

        // Extracting data
        let data = UserExtractors.extractUserLikes(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => new Tweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
};