// CUSTOM LIBS
import {
    HttpMethods,
    FetcherService
} from "../FetcherService";

/* TYPES */
import {
    Errors,
    Error,
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
    setCountryUrl,
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
     * @param authToken The authetication token received from TwitterAPI
     * @param csrfToken The csrf token received from TwitterAPI
     * @param cookie The cookie for the logged in user account received from TwitterAPI
     */
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        super(authToken, csrfToken, cookie);
    }

    /**
     * Sets the current country such that content relevant to that country is fetched
     * @param countryId The internal/rest id of the target country
     */
    private async setLocation(countryId: string): Promise<void> {
        this.fetchData(setCountryUrl(), HttpMethods.POST, `places=${countryId}`)
    }

    /**
     * Fetches the top 30 trending in a region
     * @param country The name of of country to fetch trending for
     */
    async getTrending(countryId: string): Promise<Response<string[]>> {
        // Setting the current region
        await this.setLocation(countryId);

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

    // TODO: Make this method also fetch the retweets made by the user
    /**
     * Fetches a list of tweets that match the given filter
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
            // If other run-time error occured
            .catch(err => {
                console.log(err);
                return new Response<{ tweets: Tweet[], next: string }>(
                    false,
                    new Error(Errors.FatalError),
                    { tweets: [], next: '' }
                );
            });
    }

    /**
     * Fetches the details of a single tweet wiht the given tweet id
     * @param tweetId The rest id of the target tweet
     */
    async getTweetById(tweetId: string): Promise<Response<Tweet>> {
        return this.fetchData(tweetDetailsUrl(tweetId))
            .then(res => {
                // If tweet does not exist
                if (!Object.keys(res['data']).length) {
                    return new Response<Tweet>(
                        false,
                        new Error(Errors.TweetNotFound),
                        {}
                    );
                }
                // If tweet exists
                else {
                    var data = extractTweet(res ,tweetId);
                    return new Response<Tweet>(
                        true,
                        new Error(Errors.NoError),
                        data
                    );
                }
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<Tweet>(
                    false,
                    new Error(Errors.FatalError),
                    {}
                );
            });
    }

    /**
     * Fetches the list of users who liked the given tweet
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
                // If tweet exists
                if (!Object.keys(res['data']['favoriters_timeline']).length) {
                    return new Response<{ likers: User[], next: string }>(
                        false,
                        new Error(Errors.TweetNotFound),
                        { likers: [], next: '' }
                    );
                }
                // If likers found
                else {
                    var data = extractTweetLikers(res);
                    return new Response<{ likers: User[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { likers: data.likers, next: data.next }
                    );
                }
            })
            // If other run-time error occured
            .catch(err => {
                console.log(err);
                return new Response<{ likers: User[], next: string }>(
                    false,
                    new Error(Errors.FatalError),
                    { likers: [], next: '' }
                );
            });
    }

    /**
     * Fetches the list of users who retweeted the given tweet
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
                // If tweet does not exist
                if (!Object.keys(res['data']['retweeters_timeline']).length) {
                    return new Response<{ retweeters: User[], next: string }>(
                        false,
                        new Error(Errors.TweetNotFound),
                        { retweeters: [], next: '' }
                    );
                }
                // If retweeters found
                else {
                    var data = extractTweetRetweeters(res);
                    return new Response<{ retweeters: User[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { retweeters: data.retweeters, next: data.next }
                    );
                }
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<{ retweeters: User[], next: string }>(
                    false,
                    new Error(Errors.FatalError),
                    { retweeters: [], next: '' }
                );
            });
    }

    /**
     * Fetches the list of replies to the given tweet
     * @param tweetId The rest id of the target tweet
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched
     */
    async getTweetReplies(
        tweetId: string,
        cursor: string
    ): Promise<Response<{ replies: Tweet[], next: string }>> {
        return this.fetchData(tweetRepliesUrl(tweetId, cursor))
            .then(res => {
                // If tweet does not exist
                if (!Object.keys(res['data']).length) {
                    return new Response<{ replies: Tweet[], next: string }>(
                        false,
                        new Error(Errors.TweetNotFound),
                        { replies: [], next: '' }
                    );
                }
                // If tweet exists
                else {
                    var data = extractTweetReplies(res);
                    return new Response<{ replies: Tweet[], next: string }>(
                        true,
                        new Error(Errors.NoError),
                        { replies: data.replies, next: data.next }
                    );
                }
            })
            // If other run-time error occured
            .catch(err => {
                return new Response<{ replies: Tweet[], next: string }>(
                    false,
                    new Error(Errors.FatalError),
                    { replies: [], next: '' }
                );
            });
    }
}