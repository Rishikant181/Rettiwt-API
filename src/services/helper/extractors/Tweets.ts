// TYPES
import { IDataExtract } from '../../../types/Resolvers';
import { DataErrors } from '../../../enums/Errors';
import RawTweet from '../../../twitter/types/tweet/Tweet';
import RawTweets from '../../../twitter/types/tweet/Tweets';
import RawRetweeters from '../../../twitter/types/tweet/Retweeters';
import RawLikers from '../../../twitter/types/tweet/Favouriters';

// PARSERS
import * as Parsers from '../Parser';

/**
 * @returns The raw tweets data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 */
export function extractTweets(res: RawTweets): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // Getting raw tweet list
    let dataTweets = res.globalObjects.tweets;

    // Getting raw users list
    let dataUsers = res.globalObjects.users;

    // If tweets found
    if (!Parsers.isJSONEmpty(dataTweets)) {
        // Destructuring the list of tweets
        for (let key of Object.keys(dataTweets)) {
            required.push({ rest_id: dataTweets[key].id_str, legacy: dataTweets[key] });
            tweets.push({ rest_id: dataTweets[key].id_str, legacy: dataTweets[key] });
        }

        // Destructuring the list of users
        for (let key of Object.keys(dataUsers)) {
            users.push({ rest_id: dataUsers[key].id_str, legacy: dataUsers[key] });
        }

        // Getting the cursor to next batch
        // If not first batch
        if (res.timeline.instructions.length > 2) {
            cursor = res.timeline.instructions[2]?.replaceEntry.entry.content.operation?.cursor.value ?? '';
        }
        // If first batch
        else {
            cursor = res.timeline.instructions[0].addEntries?.entries.filter(item => item.entryId.indexOf('cursor-bottom') != -1)[0].content.operation?.cursor.value ?? '';
        }
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
export function extractTweet(res: RawTweet, tweetId: string): IDataExtract {
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
export function extractTweetLikers(res: RawLikers): IDataExtract {
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
export function extractTweetRetweeters(res: RawRetweeters): IDataExtract {
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

/**
 * @returns The raw tweet replies data formatted and sorted into required and additional data
 * @param res The raw response received from TwitterAPI
 * @param tweetId The id of the tweet whose replies must be extracted
 */
export function extractTweetReplies(res: RawTweet, tweetId: string): IDataExtract {
    let required: any[] = [];                                               // To store the reqruied raw data
    let cursor: string = '';                                                // To store the cursor to next batch
    let users: any[] = [];                                                  // To store additional user data
    let tweets: any[] = [];                                                 // To store additional tweet data

    // If tweet does not exist
    if (Parsers.isJSONEmpty(res.data)) {
        throw new Error(DataErrors.TweetNotFound);
    }

    // Destructuring the received raw data
    res.data.threaded_conversation_with_injections_v2.instructions.filter(item => item.type === 'TimelineAddEntries')[0].entries?.map(entry => {
        // If entry is of type tweet
        if (entry.entryId.indexOf('tweet') != -1) {
            // If tweet exists
            if (entry.content.itemContent?.tweet_results?.result.__typename === 'Tweet') {
                tweets.push(entry.content.itemContent.tweet_results.result);
                users.push(entry.content.itemContent.tweet_results.result.core.user_results.result);
            }
        }
        // If entry if of type conversation/reply
        else if (entry.entryId.indexOf('conversationthread') != -1) {
            // If tweet exists
            if (entry.content.items?.at(0)?.item.itemContent.tweet_results?.result.__typename === 'Tweet') {
                // Adding the 1st entry, which is a reply, to required list
                required.push(entry.content.items[0].item.itemContent.tweet_results?.result);
                tweets.push(entry.content.items[0].item.itemContent.tweet_results?.result);
                users.push(entry.content.items[0].item.itemContent.tweet_results?.result.core.user_results.result);
            }

            // Iterating over the rest of the conversation
            entry.content.items?.forEach(item => {
                // If item is of type tweet
                if (item.entryId.indexOf('tweet') != -1) {
                    // If tweet exists
                    if (item.item.itemContent.tweet_results?.result.__typename === 'Tweet') {
                        tweets.push(item.item.itemContent.tweet_results.result);
                        users.push(item.item.itemContent.tweet_results.result.core.user_results.result);
                    }
                }
            });
        }
        // If entry is of type bottom cursor
        else if (entry.entryId.indexOf('cursor-bottom') != -1) {
            cursor = entry.content.itemContent?.value ?? '';
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