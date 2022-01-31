// This file contains the serivce that handles fetching of various tweets and other similar content from official API

// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS
import { Tweet } from "../schema/data/TweetData";

import {
    userTweetsUrl,
    authorizedGuestHeader
} from './helper/Requests';

export class TweetService {
    // MEMBER METHODS
    // Method to fetch tweets made by a user using user id (rest_id)
    getUserTweets(
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
    }
}