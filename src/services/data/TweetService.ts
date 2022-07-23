// CUSTOM LIBS
import { FetcherService } from "../FetcherService";

// TYPES
import { TweetFilter, Tweet } from "../../types/Tweet";
import { User } from "../../types/UserAccount";
import { CursoredData } from '../../types/Service';
import RawTweet from '../../types/raw/tweet/Tweet';
import RawTweets from '../../types/raw/tweet/Tweets';
import RawLikers from '../../types/raw/tweet/Favouriters';
import RawRetweeters from '../../types/raw/tweet/Retweeters';

// HELPERS
import {
    tweetsUrl,
    tweetDetailsUrl,
    tweetRepliesUrl,
    tweetLikesUrl,
    tweetRetweetUrl
} from '../helper/Requests';
import {
    extractTweet,
    extractTweetLikers,
    extractTweetReplies,
    extractTweetRetweeters,
    extractTweets
} from "../helper/Extractors";
import { toUser, toTweet } from '../helper/Deserializers';

/**
 * A service that deals with fetching of data related to tweets
 */
export class TweetService extends FetcherService {
    // MEMBER METHODS
    /**
     * @returns The list of tweets that match the given filter
     * @param filter The filter be used for searching the tweets
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched
     */
    async getTweets(filter: TweetFilter, cursor: string): Promise<CursoredData<Tweet>> {
        // Getting the raw data
        var res = await this.fetchData<RawTweets>(tweetsUrl(filter, cursor)).then(res => res.data);

        // Extracting data
        var data = extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        var tweets = data.required.map(item => toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The details of a single tweet with the given tweet id
     * @param tweetId The rest id of the target tweet
     */
    async getTweetById(tweetId: string): Promise<Tweet> {
        // Getting data from cache
        var cachedData = await this.readData(tweetId);

        // If data exists in cache
        if(cachedData) {
            return cachedData;
        }
        // If data does not exist in cache
        else {
            // Fetching the raw data
            var res = await this.fetchData<RawTweet>(
                tweetDetailsUrl(tweetId),
                undefined,
                undefined,
                false
            ).then(res => res.data);

            // Extracting data
            var data = extractTweet(res, tweetId);

            // Caching data
            this.cacheData(data);

            // Parsing data
            var tweet = toTweet(data.required[0]);

            return tweet;
        }
    }

    /**
     * @returns The list of users who liked the given tweet
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetLikers(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // Fetching the raw data
        var res = await this.fetchData<RawLikers>(tweetLikesUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        var data = extractTweetLikers(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        var users = data.required.map(item => toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of users who retweeted the given tweet     
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetRetweeters(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // Fetching the raw data
        var res = await this.fetchData<RawRetweeters>(tweetRetweetUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        var data = extractTweetRetweeters(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        var users = data.required.map(item => toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of replies to the given tweet
     * @param tweetId The rest id of the target tweet
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched
     */
    async getTweetReplies(tweetId: string, cursor: string): Promise<CursoredData<Tweet>> {
        // Fetching the raw data
        var res = await this.fetchData<RawTweet>(tweetRepliesUrl(tweetId, cursor)).then(res => res.data);
        
        // Extracting data
        var data = extractTweetReplies(res, tweetId);

        // Caching data
        this.cacheData(data);

        // Parsing data
        var tweets = data.required.map(item => toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
}