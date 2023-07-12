// PACKAGES
import {
    Url,
    EResourceType,
    ITweetSearchResponse,
    ITweetDetailsResponse,
    ITweetFavoritersResponse,
    ITweetRetweetersResponse,
    ITweet as IRawTweet,
    IUser as IRawUser,
    TweetFilter
} from 'rettiwt-core';
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { FetcherService } from "../util/FetcherService";

// MODELS
import { Tweet } from "../../models/data/Tweet";
import { User } from "../../models/data/User";
import { TweetListArgs } from "../../models/args/TweetListArgs";
import { CursoredData } from '../../models/data/CursoredData';

// EXTRACTORS
import * as TweetExtractors from "../helper/extractors/Tweets";

/**
 * Handles fetching of data related to tweets.
 * 
 * @public
 */
export class TweetService extends FetcherService {
    /**
     * @param cred The credentials to use for authenticating against Twitter API.
     */
    constructor(cred: AuthCredential) {
        super(cred);
    }

    /**
     * @param filter The filter be used for searching the tweets.
     * @param count The number of tweets to fetch, must be >= 10 (when no cursor is provided) and <= 20
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched.
     * @returns The list of tweets that match the given filter.
     */
    async getTweets(query: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.TWEET_SEARCH, { filter: query, count: args.count, cursor: args.cursor }).toString();

        // Getting the raw data
        let res = await this.request<ITweetSearchResponse>(url).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map((item: IRawTweet) => new Tweet(item));

        // Sorting the tweets by date, from recent to oldest
        tweets.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

        return new CursoredData<Tweet>(tweets, data.cursor);
    }

    /**
     * @param id The id of the target tweet.
     * @returns The details of a single tweet with the given tweet id.
     */
    async getTweetDetails(id: string): Promise<Tweet> {
        // Getting data from cache
        let cachedData = await this.readData(id);

        // If data exists in cache
        if (cachedData) {
            return cachedData;
        }

        // Preparing the URL
        const url: string = new Url(EResourceType.TWEET_DETAILS, { id: id }).toString();

        // Fetching the raw data
        let res = await this.request<ITweetDetailsResponse>(url).then(res => res.data);

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
     * @returns The list of users who liked the given tweet.
     */
    async getTweetLikers(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.TWEET_FAVORITERS, { id: tweetId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<ITweetFavoritersResponse>(url).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetLikers(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: IRawUser) => new User(item));

        return new CursoredData<User>(users, data.cursor);
    }

    /**
     * @param tweetId The rest id of the target tweet.
     * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 100.
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
     * @returns The list of users who retweeted the given tweet.
     */
    async getTweetRetweeters(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
        // Objectifying parameters
        let args: TweetListArgs = new TweetListArgs(count, cursor);

        // Preparing the URL
        const url: string = new Url(EResourceType.TWEET_RETWEETERS, { id: tweetId, count: args.count, cursor: args.cursor }).toString();

        // Fetching the raw data
        let res = await this.request<ITweetRetweetersResponse>(url).then(res => res.data);

        // Extracting data
        let data = TweetExtractors.extractTweetRetweeters(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map((item: IRawUser) => new User(item));

        return new CursoredData<User>(users, data.cursor);
    }
}