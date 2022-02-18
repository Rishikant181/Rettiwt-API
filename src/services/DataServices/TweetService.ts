// This file contains the serivce that handles fetching of various tweets and other similar content from official API

// CUSTOM LIBS

import { FetcherService } from "../FetcherService";

import {
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

import {
    tweetsUrl,
    tweetDetailsUrl,
    tweetRepliesUrl,
    tweetLikesUrl,
    tweetRetweetUrl
} from '../helper/Requests';

import { findJSONKey } from "../helper/Parser";

export class TweetService extends FetcherService {
    // MEMBER METHODS
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        super(authToken, csrfToken, cookie);
    }

    // Method to fetch tweets filtered by the supplied filter
    // TODO: Make this method also fetch the retweets made by the user
    getTweets(
        filter: TweetFilter,
        cursor: string
    ): Promise<Response<{ tweets: Tweet[], next: string }>> {
        return this.fetchData(tweetsUrl(filter, cursor))
            .then(res => {
                var tweets: Tweet[] = [];
                var next: '';

                // Extracting the cursor to next batch
                next = findJSONKey(res, 'operation', true)['cursor']['value'];

                // Getting the raw list of tweets from response
                res = findJSONKey(res, 'tweets');

                // Checking if empty tweet list returned
                // If empty, returning
                if (Object.keys(res).length == 0) {
                    return new Response<{ tweets: Tweet[], next: string }>(
                        false,
                        new Error(null),
                        { tweets: [], next: '' }
                    );
                }
                // If not empty, extracting tweets
                else {
                    // Iterating through the json array of tweets
                    for (var key of Object.keys(res)) {
                        // Adding the tweets to the Tweet[] list
                        tweets.push(new Tweet().deserialize({
                            'rest_id': res[key]['id_str'],
                            ...res[key]
                        }));
                    }

                    return new Response<{ tweets: Tweet[], next: string }>(
                        true,
                        new Error(null),
                        { tweets: tweets, next: next }
                    );
                }
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ tweets: Tweet[], next: string }>(
                    false,
                    new Error(err),
                    { tweets: [], next: '' }
                );
            });
    }

    // Method to fetch a tweet using it's id
    getTweetById(tweetId: string): Promise<Response<Tweet>> {
        return this.fetchData(tweetDetailsUrl(tweetId))
            .then(res => {
                var tweet: Tweet;

                // Extracting raw tweet data from response
                res = findJSONKey(res, 'entries');

                // If the tweet is a reply
                if (res[1]['entryId'].indexOf('tweet') != -1) {
                    res = findJSONKey(res[1], 'result');
                }
                // If the tweet is an original tweet
                else {
                    res = findJSONKey(res[0], 'result');
                }

                // Storing the tweet in a tweet object
                tweet = new Tweet().deserialize({
                    'rest_id': res['rest_id'],
                    ...res['legacy']
                });

                return new Response<Tweet>(
                    true,
                    new Error(null),
                    tweet
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<Tweet>(
                    false,
                    new Error(err),
                    {}
                );
            });
    }

    // Method to fetch tweet likes using tweet id
    getTweetLikers(
        tweetId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ likers: User[], next: string }>> {
        return this.fetchData(tweetLikesUrl(tweetId, count, cursor))
            .then(res => {
                var likers: User[] = [];
                var next: string = '';
                
                // Extracting raw likes list from response
                res = findJSONKey(res, 'entries');

                // Iterating over the raw list of likes
                for (var entry of res) {
                    // Checking if entry is of type user
                    if (entry['entryId'].indexOf('user') != -1) {
                        // Extracting user from the entry
                        var user = entry['content']['itemContent']['user_results']['result'];

                        // Inserting user into list of likes
                        likers.push(new User().deserialize(user));
                    }
                    // If entry is of type bottom cursor
                    else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                        next = entry['content']['value'];
                    }
                }

                return new Response<{ likers: User[], next: string }>(
                    true,
                    new Error(null),
                    { likers: likers, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ likers: User[], next: string }>(
                    false,
                    new Error(err),
                    { likers: [], next: '' }
                );
            });
    }

    // Method to fetch tweet retweeters using tweet id
    getTweetRetweeters(
        tweetId: string,
        count: number,
        cursor: string
    ): Promise<Response<{ retweeters: User[], next: string }>> {
        return this.fetchData(tweetRetweetUrl(tweetId, count, cursor))
            .then(res => {
                var retweeters: User[] = [];
                var next: string = '';

                // Extracting raw retweeters list from response
                res = findJSONKey(res, 'entries');

                // Iterating over the raw list of likes
                for (var entry of res) {
                    // Checking if entry is of type user
                    if (entry['entryId'].indexOf('user') != -1) {
                        // Extracting user from the entry
                        var user = findJSONKey(entry, 'result');

                        // Inserting user into list of likes
                        retweeters.push(new User().deserialize(user));
                    }
                    // If entry is of type bottom cursor
                    else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                        next = entry['content']['value'];
                    }
                }

                return new Response<{ retweeters: User[], next: string }>(
                    true,
                    new Error(null),
                    { retweeters: retweeters, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ retweeters: User[], next: string }>(
                    false,
                    new Error(err),
                    { retweeters: [], next: '' }
                );
            });
    }

    // Method to fetch tweet replies using tweet id
    getTweetReplies(
        tweetId: string,
        cursor: string
    ): Promise<Response<{ replies: Tweet[], next: string }>> {
        return this.fetchData(tweetRepliesUrl(tweetId, cursor))
            .then(res => {
                var replies: Tweet[] = [];
                var next = '';

                // Extracting raw tweet data from response
                res = findJSONKey(res, 'entries');

                for (var entry of res) {
                    // Checking if entry is of type reply
                    if (entry['entryId'].indexOf('conversationthread') != -1) {
                        var reply = findJSONKey(entry, 'result');

                        replies.push(new Tweet().deserialize({
                            rest_id: reply['rest_id'],
                            ...reply['legacy']
                        }));
                    }
                    // If entry is of type bottom cursor
                    else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                        next = entry['content']['itemContent']['value'];
                    }
                }

                return new Response<{ replies: Tweet[], next: string }>(
                    true,
                    new Error(null),
                    { replies: replies, next: next }
                );
            })
            // If error parsing json
            .catch(err => {
                return new Response<{ replies: Tweet[], next: string }>(
                    false,
                    new Error(err),
                    { replies: [], next: '' }
                );
            });
    }
}