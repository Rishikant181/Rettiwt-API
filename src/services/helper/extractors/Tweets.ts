// PACKAGE
import {
    ITweetSearchResponse,
    ITweetDetailsResponse,
    ITweetFavoritersResponse,
    ITweetRetweetersResponse,
    EErrors
} from 'rettiwt-core';


// TYPES
import { IDataExtract } from '../../../types/Resolvers';
import { DataErrors } from '../../../enums/Errors';

// PARSERS
import * as Parsers from '../Parser';

/**
 * @returns The raw tweets data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractTweets(res: ITweetSearchResponse): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If tweet does not exist
    if (Parsers.isJSONEmpty(res.data.search_by_raw_query)) {
        throw new Error(DataErrors.NoMatchingTweetsFound);
    }

    // If tweets
    if (res.data.search_by_raw_query.search_timeline.timeline.instructions.length) {
        // Destructuring raw list of tweets
        res.data.search_by_raw_query.search_timeline.timeline.instructions.filter(item => item.type === 'TimelineAddEntries')[0].entries?.forEach(entry => {
            // If entry is of type tweet and tweet exists
            if (entry.entryId.indexOf('tweet') != -1 && entry.content.itemContent?.tweet_results.result.__typename === 'Tweet') {
                required.push(entry.content.itemContent.tweet_results.result);
                users.push(entry.content.itemContent.tweet_results.result.core?.user_results.result);
                tweets.push(entry.content.itemContent.tweet_results.result);
            }
            // If entry is of type cursor
            else if (entry.entryId.indexOf('cursor-bottom')) {
                cursor = entry.content.value + '';
            }
        });
    }

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}

/**
 * @returns The raw tweet data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 * @param tweetId The rest id of the tweet to fetch
 */
export function extractTweet(res: ITweetDetailsResponse, tweetId: string): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If tweet does not exist
    if (Parsers.isJSONEmpty(res.data)) {
        throw new Error(DataErrors.TweetNotFound);
    }

    // Destructuring the received raw data
    res.data.threaded_conversation_with_injections_v2.instructions.filter(item => item['type'] === 'TimelineAddEntries')[0].entries?.forEach(entry => {
        // If entry is of type tweet and tweet exists
        if (entry.entryId.indexOf('tweet') != -1 && entry.content.itemContent?.tweet_results?.result.__typename === 'Tweet') {
            // If this is the required tweet
            if (entry.entryId.indexOf(tweetId) != -1) {
                required.push(entry.content.itemContent.tweet_results.result);
            }
            tweets.push(entry.content.itemContent.tweet_results.result);
            users.push(entry.content.itemContent.tweet_results.result.core.user_results.result);
        }
        // If entry if of type conversation
        else if (entry.entryId.indexOf('conversationthread') != -1) {
            // Iterating over the conversation
            entry.content.items?.forEach(item => {
                // If item is of type tweet and tweet exists
                if (item.entryId.indexOf('tweet') != -1 && item.item.itemContent.tweet_results?.result.__typename === 'Tweet') {
                    required.push(item.item.itemContent.tweet_results.result);
                    tweets.push(item.item.itemContent.tweet_results.result);
                    users.push(item.item.itemContent.tweet_results.result.core.user_results.result);
                }
            });
        }
    });

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}

/**
 * @returns The raw tweet likers data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetLikers(res: ITweetFavoritersResponse): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If tweet does not exist
    if (Parsers.isJSONEmpty(res.data.favoriters_timeline)) {
        throw new Error(DataErrors.TweetNotFound);
    }

    // If likes found
    if (res.data.favoriters_timeline.timeline.instructions.length) {
        // Destructuring raw list of likers
        res.data.favoriters_timeline.timeline.instructions.filter(item => item.type === 'TimelineAddEntries')[0].entries.forEach(entry => {
            // If entry is of type user and user exists
            if (entry.entryId.indexOf('user') != -1 && entry.content.itemContent?.user_results.result.__typename === 'User') {
                required.push(entry.content.itemContent.user_results.result);
                users.push(entry.content.itemContent.user_results.result);
            }
            // If entry is of type cursor
            else if (entry.entryId.indexOf('cursor-bottom') != -1) {
                cursor = entry.content.value ?? '';
            }
        });
    }

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}

/**
 * @returns The raw tweet retweeters data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetRetweeters(res: ITweetRetweetersResponse): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If tweet does not exist
    if (Parsers.isJSONEmpty(res.data.retweeters_timeline)) {
        throw new Error(DataErrors.TweetNotFound);
    }

    // If retweeters found
    if (res.data.retweeters_timeline.timeline.instructions.length) {
        // Destructuring raw list of retweeters
        res.data.retweeters_timeline.timeline.instructions.filter(item => item.type === 'TimelineAddEntries')[0].entries.forEach(entry => {
            // If entry is of type user and user exists
            if (entry.entryId.indexOf('user') != -1 && entry.content.itemContent?.user_results.result.__typename === 'User') {
                required.push(entry.content.itemContent.user_results.result);
                users.push(entry.content.itemContent.user_results.result);
            }
            // If entry is of type cursor
            else if (entry.entryId.indexOf('cursor-bottom') != -1) {
                cursor = entry.content.value ?? '';
            }
        });
    }

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}