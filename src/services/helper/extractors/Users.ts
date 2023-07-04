// PACKAGE
import {
    IUserDetailsResponse,
    IUserFollowersResponse,
    IUserFollowingResponse,
    IUserLikesResponse
} from 'rettiwt-core';

// TYPES
import { IDataExtract } from '../../../types/Resolvers'
import { DataErrors } from '../../../enums/Errors';

// PARSERS
import * as Parsers from '../Parser';

/**
 * @returns The raw user account data formatted and sorted into required and additional data
 * @param res The raw response received from Twitter
 */
export function extractUserDetails(res: IUserDetailsResponse): IDataExtract {
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
export function extractUserFollow(res: IUserFollowersResponse | IUserFollowingResponse): IDataExtract {
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
            // If no follow found
            if (item.entries?.length == 2) {
                // Returning the data
                return {
                    required: required,
                    cursor: cursor,
                    users: users,
                    tweets: tweets
                };
            }

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
export function extractUserLikes(res: IUserLikesResponse): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If user does not exist
    if (Parsers.isJSONEmpty(res.data.user)) {
        throw new Error(DataErrors.UserNotFound);
    }

    // If user likes found
    if (res.data.user.result.timeline_v2.timeline.instructions.length) {
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
    }

    // Returning the data
    return {
        required: required,
        cursor: cursor,
        users: users,
        tweets: tweets
    };
}