// SERVICES
import { FetcherService } from '../FetcherService';
import { AuthService } from '../AuthService';

// TYPES
import { User } from '../../types/UserAccount';
import { Tweet } from '../../types/Tweet';
import { CursoredData } from '../../types/Service';
import RawUser from '../../types/raw/user/User';
import RawUserFollowers from '../../types/raw/user/Followers';
import RawUserFollowing from '../../types/raw/user/Following';
import RawUserLikes from '../../types/raw/user/Likes';

// URLS
import * as Urls from '../helper/Urls';

// EXTRACTORS
import * as Extractors from '../helper/Extractors';

// DESERIALIZERS
import * as Deserializers from '../helper/Deserializers';

/**
 * A service that deals with fetching of data related to user account
 */
export class UserAccountService extends FetcherService {
    // MEMBER METHODS
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @returns The user account details of the given user
     * @param screenName The screen name of the target user.
     */
    async getUserAccountDetails(screenName: string): Promise<User> {
        // Fetching the raw data
        let res: RawUser = await this.request<RawUser>(Urls.userAccountUrl(screenName), false).then(res => res.data);
        
        // Extracting data
        let data = Extractors.extractUserAccountDetails(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let user = Deserializers.toUser(data.required[0]);
            
        return user;
    }

    /**
     * @returns The user account details of the user with given rest id
     * @param restId The screen name of the target user.
     */
    async getUserAccountDetailsById(restId: string): Promise<User> {
        // Getting data from cache
        let cachedData = await this.readData(restId);

        // If data exists in cache
        if(cachedData) {
            return cachedData;
        }
        // If data does not exist in cache
        else {
            // Fetchin the raw data
            let res = await this.request<RawUser>(Urls.userAccountByIdUrl(restId), false).then(res => res.data);

            // Extracting data
            let data = Extractors.extractUserAccountDetails(res);

            // Caching data
            this.cacheData(data);

            // Parsing data
            let user = Deserializers.toUser(data.required[0]);
                
            return user;
        }
    }

    /**
     * @returns The list of users followed by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserFollowing(userId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            return { error: new Error('Cannot fetch user following without authentication!') };
        }

        // Fetchin the raw data
        let res = await this.request<RawUserFollowing>(Urls.userFollowingUrl(userId, count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = Extractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map(item => Deserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of users following the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserFollowers(userId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            return { error: new Error('Cannot fetch user followers without authentication!') };
        }

        /**
         * When fetching list of followers, the official Twitter API seems to be fetching n + 20 followers,
         * where n is the actual required number of followers.
         * So changing count to count - 20, fixes fetching more than required number of follower
         */
        // Fetching the raw data
        let res = await this.request<RawUserFollowers>(Urls.userFollowersUrl(userId, (count > 20) ? (count - 20) : count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = Extractors.extractUserFollow(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map(item => Deserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of tweets liked by the target user
     * @param userId The rest id of the target user
     * @param count The batch size of the list
     * @param cursor The cursor to next batch. If blank, first batch is fetched
     */
    async getUserLikes(userId: string, count: number, cursor: string): Promise<CursoredData<Tweet>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            return { error: new Error('Cannot fetch user likes without authentication!') };
        }

        // Fetching the raw data
        let res = await this.request<RawUserLikes>(Urls.userLikesUrl(userId, count, cursor)).then(res => res.data);
        
        // Extracting data
        let data = Extractors.extractUserLikes(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map(item => Deserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
};