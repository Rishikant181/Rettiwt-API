// CUSTOM LIBS
import {
    HttpMethods,
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
    setLocationUrl,
    tweetsUrl,
    tweetDetailsUrl,
    tweetRepliesUrl,
    tweetLikesUrl,
    tweetRetweetUrl,
    trendingUrl
} from '../helper/Requests';

import {
    extractTrending,
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
     * @summary Sets the current location such that content relevant to that location is fetched
     * @param locationId The internal/rest id of the target location
     */
    private async setLocation(locationId: string): Promise<void> {
        this.fetchData(setLocationUrl(), HttpMethods.POST, `places=${locationId}`)
    }

    /**
     * @returns The top 30 trending in the given location
     * @param location The id of the location to fetch trending for
     */
    async getTrending(locationId: string): Promise<Response<string[]>> {
        // Setting the current region
        await this.setLocation(locationId);

        // Getting the list of trending
        return this.fetchData(trendingUrl())
            .then(res => {
                return new Response<string[]>(
                    true,
                    new Error(Errors.NoError),
                    extractTrending(res)
                );
            })
            // If other run-time error occured
            .catch(err => {
                console.log(err);
                return new Response<string[]>(
                    false,
                    new Error(Errors.FatalError),
                    []
                );
            });
    }

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
                var data = extractTweets(res);
                return new Response<{ tweets: Tweet[], next: string }>(
                    data.tweets.length ? true : false,                          // Setting true or false based on tweets found or not
                    new Error(Errors.NoError),
                    { tweets: data.tweets, next: data.next }
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
                var data = extractTweet(res, tweetId);
                return new Response<Tweet>(
                    true,
                    new Error(Errors.NoError),
                    data
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
                var data = extractTweetLikers(res);
                return new Response<{ likers: User[], next: string }>(
                    data.likers.length ? true : false,
                    new Error(Errors.NoError),
                    { likers: data.likers, next: data.next }
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
                var data = extractTweetRetweeters(res);
                return new Response<{ retweeters: User[], next: string }>(
                    data.retweeters.length ? true : false,
                    new Error(Errors.NoError),
                    { retweeters: data.retweeters, next: data.next }
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
                var data = extractTweetReplies(res, tweetId);
                return new Response<{ replies: Tweet[], next: string }>(
                    data.replies.length ? true : false,
                    new Error(Errors.NoError),
                    { replies: data.replies, next: data.next }
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