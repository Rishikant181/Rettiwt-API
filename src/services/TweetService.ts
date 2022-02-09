// This file contains the serivce that handles fetching of various tweets and other similar content from official API

// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS
import {
    TweetFilter,
    Tweet
} from "../schema/types/TweetData";

import {
    userTweetsUrl,
    filteredTweetsUrl,
    tweetDetailsUrl,
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
    /*
    This feature is experimental and it's accuracy fails when after fetching around 30-40 tweets.
    This feature needs to be refined more by using some other method to search tweets
    */
    getFilteredTweets(
        filter: TweetFilter,
        cursor: string        
    ): Promise<{ tweets: Tweet[], next: string }> {
        return fetch(filteredTweetsUrl(filter, cursor), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
        .then(res => res.json())
        // Extracting tweets list and cursor to next batch from the response
        .then(res => {
            var next: '';                                                           // To store cursor the next batch

            // If not a first batch
            //@ts-ignore
            if(res['timeline']['instructions'][2]) {
                //@ts-ignore
                next = res['timeline']['instructions'][2]['replaceEntry']['entry']['content']['operation']['cursor']['value'];
            }
            // If first batch
            else {
                //@ts-ignore
                next = res['timeline']['instructions'][0]['addEntries']['entries'].at(-1)['content']['operation']['cursor']['value'];
            }

            //@ts-ignore
            return { tweets: res['globalObjects']['tweets'], next: next }
        })
        .then(data => {
            var tweets: Tweet[] = [];

            // Iterating through the json array of tweets
            for(var key of Object.keys(data.tweets)) {
                // Adding the tweets to the Tweet[] list
                tweets.push(new Tweet().deserialize({
                    'rest_id': data.tweets[key]['id_str'],
                    ...data.tweets[key]
                }));
            }

            return { tweets: tweets, next: data.next };
        });
    }

    // Method to fetch tweet replies using tweet id
    getTweetReplies(
        tweetId: string,
        cursor: string
    ): Promise<{ replies: Tweet[], next: string }> {
        return fetch(tweetDetailsUrl(tweetId, cursor), {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
        .then(res => res.json())
        // Extracting raw tweet data from response
        //@ts-ignore
        .then(res => res['data']['threaded_conversation_with_injections']['instructions'][0]['entries'])
        .then(data => {
            var replies: Tweet[] = [];
            var next = '';
            
            for(var entry of data) {
                // Checking if entry is of type reply
                if(entry['entryId'].indexOf('conversationthread') != -1) {
                    var reply = entry['content']['items'][0]['item']['itemContent']['tweet_results']['result'];

                    replies.push(new Tweet().deserialize({
                        rest_id: reply['rest_id'],
                        ...reply['legacy']
                    }));
                }
                // If entry is of type bottom cursor
                else if(entry['entryId'].indexOf('cursor-bottom') != -1) {
                    next = entry['content']['itemContent']['value'];
                }
            }

            return { replies: replies, next: next };
        })
    }
}