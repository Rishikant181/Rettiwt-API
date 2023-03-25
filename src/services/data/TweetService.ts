// SERVICES
import { FetcherService } from "../FetcherService";
import { AuthService } from "../AuthService";

// TYPES
import { Tweet } from "../../types/data/Tweet";
import { User } from "../../types/data/User";
import { TweetListArgs } from "../../types/args/TweetListArgs";
import { TweetFilter } from "../../types/args/TweetFilter";
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
     * @param count The number of tweets to fetch, must be >= 10 and <= 100
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched.
     * 
     * @returns The list of tweets that match the given filter.
     * 
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if an invalid count has been provided.
     * 
     * @remarks
     * 
     * If cookies have been provided, then authenticated requests are made. Else, guest requests are made.
     */
    async getTweets(query: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // Objectifying parameters
        let filter: TweetFilter = new TweetFilter(query);
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Getting the raw data
        let res = await this.request<RawTweets>(TweetUrls.tweetsUrl(toQueryString(filter), args.count, args.cursor), this.isAuthenticated).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => new Tweet(item));

        return new CursoredData<Tweet>(tweets, data.cursor);
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * 
     * @returns The details of a single tweet with the given tweet id.
     * 
     * @throws {@link Errors.DataErrors.TweetNotFound} error, if no tweet with the given id was found.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
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
        let tweet = new Tweet(data.required[0]);

        return tweet;
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 100.
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
     * 
     * @returns The list of users who liked the given tweet.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count is provided.
     * @throws {@link Errors.DataErrors.TweetNotFound} error, if no tweet with the given id was found.
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getTweetLikers(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);
        
        // Fetching the raw data
        let res = await this.request<RawLikers>(TweetUrls.tweetLikesUrl(tweetId, args.count, args.cursor)).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetLikers(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

        return new CursoredData<User>(users, data.cursor);
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 100.
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
     * 
     * @returns The list of users who retweeted the given tweet.
     * 
     * @throws {@link Errors.AuthenticationErrors.NotAuthenticated} error, if no cookies have been provided.
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if invalid count is provided.
     * @throws {@link Errors.DataErrors.TweetNotFound} error, if no tweet with the given id was found.
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getTweetRetweeters(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // If user is not authenticated, abort
        if(!this.isAuthenticated) {
            throw new Error(Errors.AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Fetching the raw data
        let res = await this.request<RawRetweeters>(TweetUrls.tweetRetweetUrl(tweetId, args.count, args.cursor)).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetRetweeters(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: UserData) => new User(item));

        return new CursoredData<User>(users, data.cursor);
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