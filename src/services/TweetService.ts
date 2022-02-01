// This file contains the serivce that handles fetching of various tweets and other similar content from official API

// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS
import { Tweet, TweetEntities } from "../schema/data/TweetData";

import {
    userTweetsUrl,
    authorizedGuestHeader
} from './helper/Requests';

export class TweetService {
    // MEMBER METHODS
    // Method to fetch tweets made by a user using user id (rest_id)
    getUserRecentTweets(
        userId: string,
        numTweets: number,
        authToken: string,
        guestToken: string
    ): Promise<any> {
        return fetch(userTweetsUrl(userId, numTweets), {
            headers: authorizedGuestHeader(authToken, guestToken),
            body: null,
            method: "GET"
        })
        .then(res => res.json())
        // Ignoring the next line because we still don't know the structure of response, so indexing it throws error
        //@ts-ignore
        .then(res => res.data.user.result.timeline.timeline.instructions[0].entries)
        // Extracting required data from the tweets
        .then(data => {
            const tweets: Tweet[] = [];

            for(var i = 0; i < data.length - 2; i++) {
                //@ts-ignore
                const tweet = data[i].content.itemContent.tweet_results.result;

                tweets.push(new Tweet().deserialize(tweet));
            }

            return tweets;
        });
    }
}