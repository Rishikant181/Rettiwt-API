// SERVICES
import { FetcherService } from "../util/FetcherService";
import { AuthService } from "../auth/AuthService";

// MODELS
import { Url } from '../../twitter/Url';
import { Tweet } from "../../models/data/Tweet";
import { User } from "../../models/data/User";
import { TweetListArgs } from "../../models/args/TweetListArgs";
import { TweetFilter } from "../../models/args/TweetFilter";
import { CursoredData } from '../../models/data/CursoredData';

// TYPES
import RawTweet, { Result as TweetData } from '../../twitter/types/tweet/Tweet';
import { Result as UserData } from "../../twitter/types/user/User";
import RawTweets from '../../twitter/types/tweet/Tweets';
import RawLikers from '../../twitter/types/tweet/Favouriters';
import RawRetweeters from '../../twitter/types/tweet/Retweeters';

// ENUMS
import { ResourceType } from '../../twitter/enums/Resources';
import { AuthenticationErrors } from '../../enums/Errors';

// EXTRACTORS
import * as TweetExtractors from "../helper/extractors/Tweets";

// PARSERS
import { toQueryString } from '../helper/Parser';

/**
 * Handles fetching of data related to tweets.
 * @public
 */
export class TweetService extends FetcherService {
    /**
     * @param auth The AuthService instance to use for authentication.
     */
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @param filter The filter be used for searching the tweets.
     * @param count The number of tweets to fetch, must be >= 10 and <= 20
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched.
     * 
     * @returns The list of tweets that match the given filter.
     * 
     * @throws {@link Errors.ValidationErrors.InvalidCount} error, if an invalid count has been provided.
     * 
     * @remarks
     * 
     * Cookies are required to use this method!
     */
    async getTweets(query: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // Objectifying parameters
        let filter: TweetFilter = new TweetFilter(query);
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.TWEETS, { query: toQueryString(filter), count: args.count, cursor: args.cursor }).toString();

        // Getting the raw data
        let res = await this.request<RawTweets>(url, this.isAuthenticated).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: TweetData) => new Tweet(item));

        // Sorting the tweets by date, from recent to oldest
        tweets.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

        return new CursoredData<Tweet>(tweets, data.cursor);
    }

    /**
     * @param id The id of the target tweet.
     * 
     * @returns The details of a single tweet with the given tweet id.
     * 
     * @throws {@link Errors.DataErrors.TweetNotFound} error, if no tweet with the given id was found.
     * 
     * @remarks
     * 
     * No cookies are required to use this method.
     */
    async getTweetDetails(id: string): Promise<Tweet> {
        // Getting data from cache
        let cachedData = await this.readData(id);

        // If data exists in cache
        if (cachedData) {
            return cachedData;
        }

        // Preparing the URL
        const url: string = new Url(ResourceType.TWEET_DETAILS, { id: id }).toString();

        // Fetching the raw data
        let res = await this.request<RawTweet>(url, false).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweet(res, id);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweet = new Tweet(data.required[0]);

        return tweet;
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 20.
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
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.TWEET_LIKES, { id: tweetId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<RawLikers>(url).then(res => res.data);

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
        if (!this.isAuthenticated) {
            throw new Error(AuthenticationErrors.NotAuthenticated);
        }

        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(ResourceType.TWEET_RETWEETS, { id: tweetId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<RawRetweeters>(url).then(res => res.data);

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