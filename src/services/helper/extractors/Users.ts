// TYPES
import { DataExtract } from '../../../types/Resolvers'
import { DataErrors } from '../../../types/Errors';
import RawUser from '../../../types/raw/user/User';
import RawUserFollowers from '../../../types/raw/user/Followers';
import RawUserFollowing from '../../../types/raw/user/Following';
import RawUserLikes from '../../../types/raw/user/Likes';
import RawUserTweets from '../../../types/raw/user/Tweets';

// PARSERS
import * as Parsers from '../Parser';

/**
 * @returns The raw user account data formatted and sorted into required and additional data
 * @param res The raw response received from Twitter
 */
export function extractUserAccountDetails(res: RawUser): DataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If user not found or account suspended
    if (res.data?.user?.result?.__typename !== 'User') {
        throw new Error(DataErrors.UserNotFound);
    }

    // Destructuring user account data
    required.push(res.data.user.result);
    users.push(res.data.user.result);

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}

/**
 * @returns The raw user following/followers data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractUserFollow(res: RawUserFollowers | RawUserFollowing): DataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If user does not exist
    if (Parsers.isJSONEmpty(res.data.user)) {
        throw new Error(DataErrors.UserNotFound);
    }

    // Extracting the raw list
    res.data.user.result.timeline.timeline.instructions.forEach(item => {
        if (item.type === 'TimelineAddEntries') {
            // Destructuring data
            item.entries?.forEach(entry => {
                // If entry is of type user and user account exists
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
 * @returns The raw user likes data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractUserLikes(res: RawUserLikes): DataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If user does not exist
    if (Parsers.isJSONEmpty(res.data.user)) {
        throw new Error(DataErrors.UserNotFound);
    }

    // Extracting the raw list
    res.data.user.result.timeline_v2.timeline.instructions.forEach(item => {
        if (item.type === 'TimelineAddEntries') {
            // Destructuring data
            item.entries.forEach(entry => {
                // If entry is of type tweet and tweet exists
                if (entry.entryId.indexOf('tweet') != -1 && entry.content.itemContent?.tweet_results.result.__typename === 'Tweet') {
                    required.push(entry.content.itemContent.tweet_results.result);
                    users.push(entry.content.itemContent.tweet_results.result.core.user_results.result);
                    tweets.push(entry.content.itemContent.tweet_results.result);
                }
                // If entry is of type cursor
                else if (entry.entryId.indexOf('cursor-bottom') != -1) {
                    cursor = entry.content.value ?? '';
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
 * @returns The raw tweets data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractUserTweets(res: RawUserTweets): DataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // Getting the raw tweet list
    let dataTweets = res.data.user.result.timeline_v2.timeline.instructions.filter(item => item.type === 'TimelineAddEntries')[0].entries;

    // Destructuring tweets, if not empty
    if (!Parsers.isJSONEmpty(dataTweets)) {
        // Iterating through the json array of tweets
        for (let entry of dataTweets) {
            // If the entry is a tweet
            if (entry.entryId.indexOf('tweet') != -1) {
                required.push(entry.content.itemContent?.tweet_results.result);
                tweets.push(entry.content.itemContent?.tweet_results.result);
                users.push(entry.content.itemContent?.tweet_results.result.core.user_results.result);
            }
            // If the entry is a cursor
            else if (entry.entryId.indexOf('cursor-bottom') != -1) {
                cursor = entry.content.value as string;
            }
        }
    }

    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}