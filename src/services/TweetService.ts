// This file contains the serivce that handles fetching of various tweets and other similar content from official API

// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS
import {
    TweetFilter,
    Tweet
} from "../schema/data/TweetData";

import {
    userTweetsUrl,
    filteredTweetsUrl,
    authorizedHeader
} from './helper/Requests';

export class TweetService {
    // MEMBER METHODS
    // Method to fetch recent tweets made by a user using user id (rest_id)
    getRecentTweets(
        userId: string,
        numTweets: number,
        authToken: string,
        csrfToken: string,
        cookie: string
    ): Promise<Tweet[]> {
        return fetch(userTweetsUrl(userId, numTweets, ''), {
            headers: authorizedHeader(authToken, csrfToken, cookie),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => res['data']['user']['result']['timeline']['timeline']['instructions'][0]['entries'])
        // Extracting required data from the tweets
        .then(data => {
            var tweets: Tweet[] = [];

            //@ts-ignore
            for(var i = 0; i < data.length - 2; i++) {
                // Checking if actual tweet content is available
                if(data[i]['content']['itemContent']) {
                    const tweet = data[i]['content']['itemContent']['tweet_results']['result'];

                    tweets.push(new Tweet().deserialize({
                        'rest_id': tweet['rest_id'],
                        ...tweet['legacy']
                    }));
                }
            }

            return tweets;
        });
    }

    // Method to fetch all tweets and replies made by a user
    getTweets(
        userId: string,
        numTweets: number,
        cursor: string,
        authToken: string,
        csrfToken: string,
        cookie: string
    ): Promise <{ tweets: Tweet[]; next: string }> {
        return fetch(userTweetsUrl(userId, numTweets, cursor), {
            headers: authorizedHeader(authToken, csrfToken, cookie),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => res['data']['user']['result']['timeline']['timeline']['instructions'][0]['entries'])
        // Extracting required data from the tweets
        .then(data => {
            var tweets: Tweet[] = [];

            //@ts-ignore
            for(var i = 0; i < data.length - 2; i++) {
                // Checking if actual tweet content is available
                if(data[i]['content']['itemContent']) {
                    const tweet = data[i]['content']['itemContent']['tweet_results']['result'];

                    tweets.push(new Tweet().deserialize({
                        'rest_id': tweet['rest_id'],
                        ...tweet['legacy']
                    }));
                }
            }

            return { tweets: tweets, next: data[data.length - 1]['content']['value'] };
        });
    }

    // Method to fetch tweets filtered by the supplied filter
    getFilteredTweets(
        filter: TweetFilter,
        authToken: string,
        csrfToken: string,
        cookie: string
    ): Promise<Tweet[]> {
        return fetch(filteredTweetsUrl(filter), {
            headers: authorizedHeader(
                authToken,
                csrfToken,
                cookie
            )
        })
        .then(res => res.json())
        //@ts-ignore
        .then(res => res['globalObjects']['tweets'])
        .then(data => {
            var tweets: Tweet[] = [];

            for(var key of Object.keys(data)) {
                tweets.push(new Tweet().deserialize({
                    'rest_id': data[key]['id_str'],
                    ...data[key]
                }));
            }

            return tweets;
        });
    }
}