// This file contains various methods for extracting raw data and parsing it into pre-defined types

// CUSTOM LIBS

// TYPES
import { Tweet } from '../../schema/types/TweetData';
import { User } from '../../schema/types/UserAccountData';

// HELPERS
import {
    Data,
    destructureRawData
} from './Destructurers';

/* USERS */

/**
 * @returns The raw user account details
 * @param res The raw response received from Twitter
 */
export function extractUserAccountDetails(res: any): User {
    // Destructuring raw response
    var data = destructureRawData(res, Data.UserAccount);

    // Getting user account details data
    var user = data.required[0];
    
    return new User().deserialize(user);
}

/**
 * @returns The raw list of following of the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserFollowing(res: any): { following: User[], next: string } {
    var following: User[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.UserFollow);

    // Getting list of following
    following = data.required.map(item => new User().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        following: following,
        next: next
    };
}

/**
 * @returns The raw list of followers of the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserFollowers(res: any): { followers: User[], next: string } {
    var followers: User[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.UserFollow);

    // Getting list of followers
    followers = data.required.map(item => new User().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        followers: followers,
        next: next
    };
}

/**
 * @returns The raw list of tweets liked by the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserLikes(res: any): { tweets: Tweet[], next: string } {
    var tweets: Tweet[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.UserLikes);

    // Getting list of likes
    tweets = data.required.map(item => new Tweet().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        tweets: tweets,
        next: next
    };
}

/* TWEETS */

/**
 * @returns The list of trending
 * @param res The raw response received from TwitterAPI
 */
export function extractTrending(res: any) {
    var trending: string[] = [];

    // Extracting raw list of trending from response
    //@ts-ignore
    res = res['timeline']['instructions'][1]['addEntries']['entries'].filter(item => item['entryId'] === 'trends')[0]['content']['timelineModule']['items'];

    // Parsing the raw list to string list
    for (var item of res) {
        trending.push(decodeURIComponent(item['entryId'].substring(item['entryId'].indexOf('trends-') + 'trends-'.length)).replace(/\+/g, ' ',));
    }

    return trending;
}

/**
 * @returns The raw list of tweets matching the given filter from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweets(res: any) {
    var tweets: Tweet[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.Tweets);

    // Getting list of tweets
    tweets = data.required.map(item => new Tweet().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        tweets: tweets,
        next: next
    };
}

/**
 * @returns The required tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 * @param tweetId The rest id of the tweet to fetch
 */
export function extractTweet(res: any, tweetId: string): Tweet {
    var tweet: Tweet;

    // Destructuring raw response
    var data = destructureRawData(res, Data.Tweet);

    // Getting the tweet
    tweet = new Tweet().deserialize(data.required.filter(item => item['rest_id'] === tweetId)[0]);

    return tweet;
}

/**
 * @returns The raw list of likers of the target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetLikers(res: any): { likers: User[], next: string } {
    var likers: User[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.TweetLikers);

    // Getting list of likers
    likers = data.required.map(item => new User().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        likers: likers,
        next: next
    };
}

/**
 * @returns The raw list of retweeters of the target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetRetweeters(res: any): { retweeters: User[], next: string } {
    var retweeters: User[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.TweetRetweeters);

    // Getting list of retweeters
    retweeters = data.required.map(item => new User().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        retweeters: retweeters,
        next: next
    };
}

/**
 * @returns The raw list of replies to a target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 * @param tweetId The id of the tweet whose replies must be extracted
 */
export function extractTweetReplies(res: any, tweetId: string): { replies: Tweet[], next: string } {
    var replies: Tweet[] = [];
    var next: string = '';

    // Destructuring raw response
    var data = destructureRawData(res, Data.TweetReplies);

    // Getting list of replies
    replies = data.required.map(item => new Tweet().deserialize(item));

    // Getting the cursor to next batch
    next = data.cursor;

    return {
        replies: replies,
        next: next
    };
}