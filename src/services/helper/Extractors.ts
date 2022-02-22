// This file contains various methods for extracting raw data and parsing it into pre-defined types

// CUSTOM LIBS

// TYPES
import { Tweet } from '../../schema/types/TweetData';
import { User } from '../../schema/types/UserAccountData';

// HELPERS
import {
    filterJSON,
    findJSONKey
} from '../helper/Parser';

// Method to extract the user account details from response
export function extractUserAccountDetails(res: any): User {
    return findJSONKey(res, 'result');
}

// Method to extract the following list of the user from response
export function extractUserFollowing(res: any): { following: User[], next: string } {
    var following: User[] = [];
    var next: string = '';

    // Extracting the raw list of following
    res = findJSONKey(res, 'entries');

    // Extracting cursor to next batch
    next = filterJSON(res, { "cursorType": "Bottom" })['value'].replace('|', '%7C');

    // Iterating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the followed users to list of users
            following.push(new User().deserialize(findJSONKey(entry, 'result')));
        }
    }

    return {
        following: following,
        next: next
    };
}

// Method to extract the followers list of the user from response
export function extractUserFollowers(res: any): { followers: User[], next: string } {
    var followers: User[] = [];
    var next: string = '';

    // Extracting the raw list of followers
    res = findJSONKey(res, 'entries');

    // Extracting cursor to next batch
    next = filterJSON(res, { "cursorType": "Bottom" })['value'].replace('|', '%7C');

    // Itearating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the follower to list of followers
            followers.push(new User().deserialize(findJSONKey(entry, 'result')));
        }
    }

    return {
        followers: followers,
        next: next
    };
}

// Method to extract the list of tweets liked by the user from response
export function extractUserLikes(res: any): { tweets: Tweet[], next: string } {
    var tweets: Tweet[] = [];
    var next: string = '';

    // Extracting the raw list of followers
    res = findJSONKey(res, 'entries');

    // Extracting cursor to next batch
    next = filterJSON(res, { "cursorType": "Bottom" })['value'].replace('|', '%7C');

    // Itearating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('tweet') != -1) {
            // Adding the tweet to list of liked tweets
            tweets.push(new Tweet().deserialize(findJSONKey(entry, 'result')));
        }
    }

    return {
        tweets: tweets,
        next: next
    };
}