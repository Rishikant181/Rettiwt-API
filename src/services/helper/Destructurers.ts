// This file contains various methods for destructuring the input raw data into a simpler format

// CUSTOM LIBS

// TYPES
import { Errors } from '../../types/HTTP';

// HELPERS
import { isJSONEmpty } from './Parser';

/**
 * Stores the different options while destructuring the input raw data
 */
export enum Data {
    UserAccount,
    UserFollow,
    UserLikes,
    Tweets,
    Tweet,
    TweetLikers,
    TweetRetweeters,
    TweetReplies
};

/**
 * @param res The input raw response data to be destructured
 * @param type The type of data to be destructured
 * @returns The required data as well as additional tweets and user data
 */
export function destructureRawData(res: any, type: Data): {
    required: any[],
    cursor: string,
    users: any[],
    tweets: any[]
} {
    var required: any[] = [];                                               // To store the reqruied raw data
    var cursor: string = '';                                                // To store the cursor to next batch
    var users: any[] = [];                                                  // To store additional user data
    var tweets: any[] = [];                                                 // To store additional tweet data

    // If user account data is to be destructured
    if (type == Data.UserAccount) {
        // If user not found or account suspended
        if (isJSONEmpty(res['data']) || isJSONEmpty(res['data']['user']) || res['data']['user']['result']['__typename'] === 'UserUnavailable') {
            throw new Error(Errors.UserNotFound);
        }

        // Destructuring user account data
        required.push(res['data']['user']['result']);
        users.push(res['data']['user']['result']);
    }
    // If user following/followers data is to be destructured
    else if (type == Data.UserFollow) {
        // If user does not exist
        if (isJSONEmpty(res['data']['user'])) {
            throw new Error(Errors.UserNotFound);
        }

        // Extracting the raw list
        //@ts-ignore
        res = res['data']['user']['result']['timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

        // Destructuring data
        //@ts-ignore
        for (var entry of res) {
            // If entry is of type user
            if (entry['entryId'].indexOf('user') != -1) {
                required.push(entry['content']['itemContent']['user_results']['result']);
                users.push(entry['content']['itemContent']['user_results']['result']);
            }
            // If entry is of type cursor
            else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                cursor = entry['content']['value'];
            }
        }
    }
    // If user likes data is to be destructured
    else if (type == Data.UserLikes) {
        // If user does not exist
        if (isJSONEmpty(res['data']['user'])) {
            throw new Error(Errors.UserNotFound);
        }

        // Extracting the raw list
        //@ts-ignore
        res = res['data']['user']['result']['timeline_v2']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

        // Destructuring data
        //@ts-ignore
        for (var entry of res) {
            // If entry is of type tweet
            if (entry['entryId'].indexOf('tweet') != -1) {
                required.push(entry['content']['itemContent']['tweet_results']['result']);
                users.push(entry['content']['itemContent']['tweet_results']['result']['core']['user_results']['result']);
                tweets.push(entry['content']['itemContent']['tweet_results']['result']);
            }
            // If entry is of type cursor
            else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                cursor = entry['content']['value'];
            }
        }
    }
    // If tweets are to be destructured
    else if (type == Data.Tweets) {
        // Getting raw tweet list
        var dataTweets = res['globalObjects']['tweets'];

        // Getting raw users list
        var dataUsers = res['globalObjects']['users'];

        // Destructuring tweets, if not empty
        if (!isJSONEmpty(dataTweets)) {
            // Iterating through the json array of tweets
            for (var key of Object.keys(dataTweets)) {
                required.push({ rest_id: dataTweets[key]['id_str'], legacy: dataTweets[key] });
                tweets.push({ rest_id: dataTweets[key]['id_str'], legacy: dataTweets[key] });
            }
        }

        // Destructuring users, if not empty
        if (!isJSONEmpty(dataUsers)) {
            // Iterating through the json array of users
            for (var key of Object.keys(dataUsers)) {
                users.push({ rest_id: dataUsers[key]['id_str'], legacy: dataUsers[key] });
            }
        }

        // Getting the cursor to next batch
        // If not first batch
        if (res['timeline']['instructions'].length > 2) {
            cursor = res['timeline']['instructions'][2]['replaceEntry']['entry']['content']['operation']['cursor']['value'];
        }
        // If first batch
        else {
            //@ts-ignore
            cursor = res['timeline']['instructions'][0]['addEntries']['entries'].filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['operation']['cursor']['value'];
        }
    }
    // If a single tweet is to be destructured
    else if (type == Data.Tweet) {
        // If tweet does not exist
        if (isJSONEmpty(res['data'])) {
            throw new Error(Errors.TweetNotFound);
        }

        // Destructuring the received raw data
        //@ts-ignore
        res['data']['threaded_conversation_with_injections']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].map(entry => {
            // If entry is of type tweet
            if (entry['entryId'].indexOf('tweet') != -1) {
                required.push(entry['content']['itemContent']['tweet_results']['result']);
                tweets.push(entry['content']['itemContent']['tweet_results']['result']);
                users.push(entry['content']['itemContent']['tweet_results']['result']['core']['user_results']['result']);
            }
            // If entry if of type conversation
            else if (entry['entryId'].indexOf('conversationthread') != -1) {
                required.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']);
                tweets.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']);
                users.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']['core']['user_results']['result']);
            }
        });
    }
    // If tweet likers are to be destructured
    else if (type == Data.TweetLikers) {
        // If tweet does not exist
        if (isJSONEmpty(res['data']['favoriters_timeline'])) {
            throw new Error(Errors.TweetNotFound);
        }

        // Destructuring raw list of likers
        //@ts-ignore
        res['data']['favoriters_timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].map(entry => {
            // If entry is of type user
            if (entry['entryId'].indexOf('user') != -1) {
                required.push(entry['content']['itemContent']['user_results']['result']);
                users.push(entry['content']['itemContent']['user_results']['result']);
            }
            // If entry is of type cursor
            else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                cursor = entry['content']['value'];
            }
        });
    }
    // If tweet retweeters are to be destructured
    else if (type == Data.TweetRetweeters) {
        // If tweet does not exist
        if (isJSONEmpty(res['data']['retweeters_timeline'])) {
            throw new Error(Errors.TweetNotFound);
        }

        // Destructuring raw list of retweeters
        //@ts-ignore
        res['data']['retweeters_timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].map(entry => {
            // If entry is of type user
            if (entry['entryId'].indexOf('user') != -1) {
                required.push(entry['content']['itemContent']['user_results']['result']);
                users.push(entry['content']['itemContent']['user_results']['result']);
            }
            // If entry is of type cursor
            else if (entry['entryId'].indexOf('cursor-bottom') != -1) {
                cursor = entry['content']['value'];
            }
        });
    }
    // If tweet replies are to be fetched
    else if (type == Data.TweetReplies) {
        // If tweet does not exist
        if (isJSONEmpty(res['data'])) {
            throw new Error(Errors.TweetNotFound);
        }

        // Destructuring the received raw data
        //@ts-ignore
        res['data']['threaded_conversation_with_injections']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].map(entry => {
            // If entry is of type tweet
            if (entry['entryId'].indexOf('tweet') != -1) {
                tweets.push(entry['content']['itemContent']['tweet_results']['result']);
                users.push(entry['content']['itemContent']['tweet_results']['result']['core']['user_results']['result']);
            }
            // If entry if of type conversation/reply
            else if (entry['entryId'].indexOf('conversationthread') != -1) {
                required.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']);
                tweets.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']);
                users.push(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']['core']['user_results']['result']);
            }
            // If entry is of type bottom cursor
            else if(entry['entryId'].indexOf('cursor-bottom') != -1) {
                cursor = entry['content']['itemContent']['value'];
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