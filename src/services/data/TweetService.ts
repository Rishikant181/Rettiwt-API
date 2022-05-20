// CUSTOM LIBS
import { FetcherService } from "../FetcherService";

// TYPES
import { Response } from '../../types/HTTP';
import { TweetFilter, Tweet } from "../../types/Tweet";
import { User } from "../../types/UserAccount";
import { CursoredData } from '../../types/Service';

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
    async getTweets(filter: TweetFilter, cursor: string): Promise<Response<CursoredData<Tweet>>> {
        return this.fetchData(tweetsUrl(filter, cursor))
            .then(res => res.json())
            .then(res => {
                // Extracting data
                var data = extractTweets(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var tweets = data.required.map(item => toTweet(item));

                return {
                    success: tweets.length ? true : false,
                    data: { list: tweets, next: data.cursor }
                };
            })
            // If error
            .catch(err => {
                return {
                    success: false,
                    error: err,
                };
            });
    }

    /**
     * @returns The details of a single tweet with the given tweet id
     * @param tweetId The rest id of the target tweet
     */
    async getTweetById(tweetId: string): Promise<Response<Tweet>> {
        // Getting data from cache
        var cachedData = await this.readData(tweetId);

        // If data exists in cache
        if(cachedData) {
            return {
                success: true,
                data: cachedData
            };
        }
        
        return this.fetchData(tweetDetailsUrl(tweetId), undefined, undefined, false)
            .then(res => res.json())
            .then(res => {
                // Extracting data
                var data = extractTweet(res, tweetId);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var tweet = toTweet(data.required[0]);

                return {
                    success: true,
                    data: tweet
                };
            })
            // If error
            .catch(err => {
                return {
                    success: false,
                    error: err
                };
            });
    }

    /**
     * @returns The list of users who liked the given tweet
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetLikers(tweetId: string, count: number, cursor: string): Promise<Response<CursoredData<User>>> {
        return this.fetchData(tweetLikesUrl(tweetId, count, cursor))
            .then(res => res.json())
            .then(res => {
                // Extracting data
                var data = extractTweetLikers(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var users = data.required.map(item => toUser(item));

                return {
                    success: users.length ? true : false,
                    data: { list: users, next: data.cursor }
                };
            })
            // If other run-time error occured
            .catch(err => {
                return {
                    success: false,
                    error: err
                };
            });
    }

    /**
     * @returns The list of users who retweeted the given tweet     
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetRetweeters(tweetId: string, count: number, cursor: string): Promise<Response<CursoredData<User>>> {
        return this.fetchData(tweetRetweetUrl(tweetId, count, cursor))
            .then(res => res.json())
            .then(res => {
                // Extracting data
                var data = extractTweetRetweeters(res);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var users = data.required.map(item => toUser(item));

                return {
                    success: users.length ? true : false,
                    data: { list: users, next: data.cursor }
                };
            })
            // If other run-time error occured
            .catch(err => {
                return {
                    success: false,
                    error: err
                };
            });
    }

    /**
     * @returns The list of replies to the given tweet
     * @param tweetId The rest id of the target tweet
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched
     */
    async getTweetReplies(tweetId: string, cursor: string): Promise<Response<CursoredData<Tweet>>> {
        return this.fetchData(tweetRepliesUrl(tweetId, cursor))
            .then(res => res.json())
            .then(res => {
                // Extracting data
                var data = extractTweetReplies(res, tweetId);

                // Caching data
                this.cacheData(data);

                // Parsing data
                var tweets = data.required.map(item => toTweet(item));

                return {
                    success: tweets.length ? true : false,
                    data: { list: tweets, next: data.cursor }
                };
            })
            // If other run-time error occured
            .catch(err => {
                return {
                    success: false,
                    error: err
                };
            });
    }
}