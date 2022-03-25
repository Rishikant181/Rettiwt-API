// CUSTOM LIBS
import {
    FetcherService
} from "../FetcherService";

/* TYPES */
import {
    Errors,
    Response
} from '../../schema/types/HTTP'

import {
    TweetFilter,
    Tweet
} from "../../schema/types/TweetData";

import {
    User
} from "../../schema/types/UserAccountData";

/* HELPERS */
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
    async getTweets(
        filter: TweetFilter,
        cursor: string
    ): Promise<Response<{ tweets: Tweet[], next: string }>> {
        return this.fetchData(tweetsUrl(filter, cursor))
            .then(res => {
                // Extracting data
                var data = extractTweets(res);

                // Parsing data
                var tweets = data.required.map(item => new Tweet().deserialize(item));

                return new Response<{ tweets: Tweet[], next: string }>(
                    tweets.length ? true : false,                          // Setting true or false based on tweets found or not
                    new Error(Errors.NoError),
                    { tweets: tweets, next: data.cursor }
                );
            })
            // If error
            .catch(err => {
                return new Response<{ tweets: Tweet[], next: string }>(
                    false,
                    err,
                    { tweets: [], next: '' }
                );
            });
    }

    /**
     * @returns The details of a single tweet with the given tweet id
     * @param tweetId The rest id of the target tweet
     */
    async getTweetById(tweetId: string): Promise<Response<Tweet>> {
        return this.fetchData(tweetDetailsUrl(tweetId))
            .then(res => {
                // Extracting data
                var data = extractTweet(res, tweetId);

                // Parsing data
                var tweet = new Tweet().deserialize(data.required[0]);

                return new Response<Tweet>(
                    true,
                    new Error(Errors.NoError),
                    tweet
                );
            })
            // If error
            .catch(err => {
                return new Response<Tweet>(
                    false,
                    err,
                    {}
                );
            });
    }

    /**
     * @returns The list of users who liked the given tweet
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetLikers(
        tweetId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ likers: User[], next: string }>> {
        return this.fetchData(tweetLikesUrl(tweetId, count, cursor))
            .then(res => {
                // Extracting data
                var data = extractTweetLikers(res);

                // Parsing data
                var users = data.required.map(item => new User().deserialize(item));

                return new Response<{ likers: User[], next: string }>(
                    users.length ? true : false,
                    new Error(Errors.NoError),
                    { likers: users, next: data.cursor }
                );
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<{ likers: User[], next: string }>(
                    false,
                    err,
                    { likers: [], next: '' }
                );
            });
    }

    /**
     * @returns The list of users who retweeted the given tweet     
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetRetweeters(
        tweetId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ retweeters: User[], next: string }>> {
        return this.fetchData(tweetRetweetUrl(tweetId, count, cursor))
            .then(res => {
                // Extracting data
                var data = extractTweetRetweeters(res);

                // Parsing data
                var users = data.required.map(item => new User().deserialize(item));

                return new Response<{ retweeters: User[], next: string }>(
                    users.length ? true : false,
                    new Error(Errors.NoError),
                    { retweeters: users, next: data.cursor }
                );
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<{ retweeters: User[], next: string }>(
                    false,
                    err,
                    { retweeters: [], next: '' }
                );
            });
    }

    /**
     * @returns The list of replies to the given tweet
     * @param tweetId The rest id of the target tweet
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched
     */
    async getTweetReplies(
        tweetId: string,
        cursor: string
    ): Promise<Response<{ replies: Tweet[], next: string }>> {
        return this.fetchData(tweetRepliesUrl(tweetId, cursor))
            .then(res => {
                // Extracting data
                var data = extractTweetReplies(res, tweetId);

                // Parsing data
                var tweets = data.required.map(item => new Tweet().deserialize(item));

                return new Response<{ replies: Tweet[], next: string }>(
                    tweets.length ? true : false,
                    new Error(Errors.NoError),
                    { replies: tweets, next: data.cursor }
                );
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<{ replies: Tweet[], next: string }>(
                    false,
                    err,
                    { replies: [], next: '' }
                );
            });
    }
}