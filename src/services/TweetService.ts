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
    // MEMBER DATA
    private authToken: string;                                                   // To store the authentication token
    private csrfToken: string;                                                   // To store the csrfToken
    private cookie: string;                                                      // To store the cookie
    
    // MEMBER METHODS
    // The constructor
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        // Initialising authentication data
        this.authToken = authToken;
        this.csrfToken = csrfToken;
        this.cookie = cookie;
    }

    // Method to fetch all tweets and replies made by a user
    getTweets(
        userId: string,
        numTweets: number,
        cursor: string,        
    ): Promise<{ tweets: Tweet[]; next: string }> {
        return fetch(userTweetsUrl(userId, numTweets, cursor), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            ),
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
            for(var entry of data) {
                // If the entry is a tweet
                if(entry['entryId'].indexOf("tweet") != -1) {
                    // Extracting the tweet
                    const tweet = entry['content']['itemContent']['tweet_results']['result'];

                    // Adding the tweet to tweet list
                    tweets.push(new Tweet().deserialize({
                        'rest_id': tweet['rest_id'],
                        ...tweet['legacy']
                    }));
                }
                // If the entry is a retweet
                else if(entry['entryId'].indexOf("homeConversation") != -1) {
                    // Iterating through sub entries
                    for(var entry of entry['content']['items']) {
                        // Extracting the tweet
                        const tweet = entry['item']['itemContent']['tweet_results']['result'];

                        // Adding the tweet to tweet list
                        tweets.push(new Tweet().deserialize({
                            'rest_id': tweet['rest_id'],
                            ...tweet['legacy']
                        }));
                    }
                }
            }

            return { tweets: tweets, next: data[data.length - 1]['content']['value'] };
        });
    }

    // Method to fetch tweets filtered by the supplied filter
    getFilteredTweets(
        filter: TweetFilter        
    ): Promise<Tweet[]> {
        return fetch(filteredTweetsUrl(filter), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
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