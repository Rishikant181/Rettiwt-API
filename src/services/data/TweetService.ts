// SERVICES
import { FetcherService } from "../FetcherService";
import { AuthService } from "../AuthService";

// TYPES
import { TweetFilter, Tweet } from "../../types/data/Tweet";
import { User } from "../../types/data/User";
import { CursoredData } from '../../types/data/Service';
import RawTweet, { Result as TweetData } from '../../types/raw/tweet/Tweet';
import { Result as UserData } from "../../types/raw/user/User";
import RawTweets from '../../types/raw/tweet/Tweets';
import RawLikers from '../../types/raw/tweet/Favouriters';
import RawRetweeters from '../../types/raw/tweet/Retweeters';
import * as Errors from '../../types/data/Errors';

// URLS
import * as TweetUrls from '../helper/urls/Tweets';

// EXTRACTORS
import * as TweetExtractors from "../helper/extractors/Tweets";

// DESERIALIZERS
import * as UserDeserializers from '../helper/deserializers/Users';
import * as TweetDeserializers from '../helper/deserializers/Tweets';

// PARSERS
import { toQueryString } from '../helper/Parser';

/**
 * Handles fetching of data related to tweets.
 * @public
 */
export class TweetService extends FetcherService {
    // MEMBER METHODS
    /**
     * @param auth The AuthService instance to use for authentication.
     */
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @param filter The filter be used for searching the tweets.
     * @param count The number of tweets to fetch.
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched.
     * @returns The list of tweets that match the given filter.
     * @remarks count must be >= 1 and <= 100.
     */
    async getTweets(filter: TweetFilter, count: number, cursor: string): Promise<CursoredData<Tweet>> {
        // If invalid count provided
        if (count < 1 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }

        // Getting the raw data
        let res = await this.request<RawTweets>(TweetUrls.tweetsUrl(toQueryString(filter), count, cursor), this.isAuthenticated).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => TweetDeserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @returns The details of a single tweet with the given tweet id.
     */
    async getTweetById(tweetId: string): Promise<Tweet> {
        // Getting data from cache
        let cachedData = await this.readData(tweetId);

        // If data exists in cache
        if (cachedData) {
            return cachedData;
        }
        
        // Fetching the raw data
        let res = await this.request<RawTweet>(TweetUrls.tweetDetailsUrl(tweetId), false).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweet(res, tweetId);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweet = TweetDeserializers.toTweet(data.required[0]);

        return tweet;
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list.
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
     * @returns The list of users who liked the given tweet.
     * @remarks count must be >= 10 (when no cursor is provided) and <= 100.
     */
    async getTweetLikers(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // If invalid count provided
        if (count < 10 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }
        
        // Fetching the raw data
        let res = await this.request<RawLikers>(TweetUrls.tweetLikesUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetLikers(res);

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
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list.
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
     * @returns The list of users who retweeted the given tweet.
     * @remarks count must be >= 10 (when no cursor is provided) and <= 100.
     */
    async getTweetRetweeters(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // If invalid count provided
        if (count < 10 && !cursor) {
            throw new Error(Errors.ValidationErrors.InvalidCount);
        }

        // Fetching the raw data
        let res = await this.request<RawRetweeters>(TweetUrls.tweetRetweetUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetRetweeters(res);

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
     * THIS IS DISABLED FOR USE FOR NOW BECAUSE TWITTER DOESN'T HAVE ANY ENDPOINT FOR FETCHING REPLIES.
     * THE DATA THIS RETURNS IS INCONSISTENT!
     * 
     * @param tweetId The rest id of the target tweet.
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched.
     * @returns The list of replies to the given tweet.
     */
    /*
    async getTweetReplies(tweetId: string, cursor: string): Promise<CursoredData<Tweet>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // Fetching the raw data
        let res = await this.request<RawTweet>(TweetUrls.tweetRepliesUrl(tweetId, cursor)).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetReplies(res, tweetId);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => TweetDeserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
    */
}