// This file contains various methods for extracting raw data and parsing it into pre-defined types

// CUSTOM LIBS

// TYPES
import { Tweet } from '../../schema/types/TweetData';
import { User } from '../../schema/types/UserAccountData';

/* USERS */

// Method to extract the user account details from response
export function extractUserAccountDetails(res: any): User {
    return res['data']['user']['result']['legacy'];
}

/**
 * Extracts the raw list of following of the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserFollowing(res: any): { following: User[], next: string } {
    var following: User[] = [];
    var next: string = '';

    // Extracting the raw list of following
    //@ts-ignore
    res = data['user']['result']['timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['value'].replace('|', '%7C');

    // Iterating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the followed users to list of users
            following.push(new User().deserialize(entry['content']['itemContent']['user_results']['result']));
        }
    }

    return {
        following: following,
        next: next
    };
}

/**
 * Extracts the raw list of followers of the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserFollowers(res: any): { followers: User[], next: string } {
    var followers: User[] = [];
    var next: string = '';

    // Extracting the raw list of followers
    //@ts-ignore
    res = data['user']['result']['timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['value'].replace('|', '%7C');

    // Itearating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the follower to list of followers
            followers.push(new User().deserialize(entry['content']['itemContent']['user_results']['result']));
        }
    }

    return {
        followers: followers,
        next: next
    };
}

/**
 * Extracts the raw list of tweets liked by the target user from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractUserLikes(res: any): { tweets: Tweet[], next: string } {
    var tweets: Tweet[] = [];
    var next: string = '';

    // Extracting the raw list of followers
    //@ts-ignore
    res = data['user']['result']['timeline_v2']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['value'];

    // Itearating over the raw list of following
    for (var entry of res) {
        // Checking if the entry is of type user
        if (entry['entryId'].indexOf('tweet') != -1) {
            // Adding the tweet to list of liked tweets
            tweets.push(new Tweet().deserialize(entry['content']['itemContent']['tweet_results']['result']));
        }
    }

    return {
        tweets: tweets,
        next: next
    };
}

/* TWEETS */

/**
 * Extracts the raw list of tweets matching the given filter from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweets(res: any) {
    var tweets: Tweet[] = [];
    var next: '';

    // Extracting the cursor to next batch
    // If not first batch
    if(res['timeline']['instructions'].length > 1) {
        next = res['timeline']['instructions'][2]['replaceEntry']['entry']['content']['operation']['cursor']['value'];
    }
    // If first batch
    else {
        //@ts-ignore
        next = res['timeline']['instructions'][0]['addEntries']['entries'].filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['operation']['cursor']['value'];
    }

    // Getting the raw list of tweets from response
    res = res['globalObjects']['tweets'];

    // If not empty, extracting tweets
    if (Object.keys(res).length != 0) {
        // Iterating through the json array of tweets
        for (var key of Object.keys(res)) {
            // Adding the tweets to the tweets list
            tweets.push(new Tweet().deserialize({ rest_id: res[key]['id_str'], legacy: res[key] }));
        }
    }

    return {
        tweets: tweets,
        next: next
    };
}

/**
 * Extracts the required tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 * @param tweetId The rest id of the tweet to fetch
 */
export function extractTweet(res: any, tweetId: string): Tweet {
    var tweet: Tweet;

    // Extracting required raw tweet from response
    //@ts-ignore
    res = res['data']['threaded_conversation_with_injections']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].filter(item => item['entryId'].indexOf(tweetId) != -1)[0]['content']['itemContent']['tweet_results']['result'];
    
    // Storing the tweet in a tweet object
    tweet = new Tweet().deserialize(res);

    return tweet;
}

/**
 * Extracts the raw list of likers of the target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetLikers(res: any): { likers: User[], next: string } {
    var likers: User[] = [];
    var next: string = '';

    // Extracting raw likes list from response
    //@ts-ignore
    res = res['data']['favoriters_timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['value'];

    // Iterating over the raw list of likers
    for (var entry of res) {
        // Checking if entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the user to list of likers
            likers.push(new User().deserialize(entry['content']['itemContent']['user_results']['result']));
        }
    }

    return {
        likers: likers,
        next: next
    };
}

/**
 * Extracts the raw list of retweeters of the target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetRetweeters(res: any): { retweeters: User[], next: string } {
    var retweeters: User[] = [];
    var next: string = '';

    // Extracting raw retweeters list from response
    //@ts-ignore
    res = res['data']['retweeters_timeline']['timeline']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'];

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['value'];

    // Iterating over the raw list of likes
    for (var entry of res) {
        // Checking if entry is of type user
        if (entry['entryId'].indexOf('user') != -1) {
            // Adding the user to list of retweeters
            retweeters.push(new User().deserialize(entry['content']['itemContent']['user_results']['result']));
        }
    }

    return {
        retweeters: retweeters,
        next: next
    };
}

/**
 * Extracts the raw list of replies to a target tweet from raw response data.
 * @param res The raw response received from TwitterAPI
 */
export function extractTweetReplies(res: any): { replies: Tweet[], next: string } {
    var replies: Tweet[] = [];
    var next: string = '';

    // Extracting raw reply list
    //@ts-ignore
    res = res['data']['threaded_conversation_with_injections']['instructions'].filter(item => item['type'] === 'TimelineAddEntries')[0]['entries'].filter(item => item['entryId'].indexOf(tweetId) == -1);

    // Extracting cursor to next batch
    //@ts-ignore
    next = res.filter(item => item['entryId'].indexOf('cursor-bottom') != -1)[0]['content']['itemContent']['value'];

    // Iterating over raw list of replies
    for (var entry of res) {
        // Checking if entry is of type conversation
        if (entry['entryId'].indexOf('conversationthread') != -1) {
            // Adding the reply to list of replies
            replies.push(new Tweet().deserialize(entry['content']['items'][0]['item']['itemContent']['tweet_results']['result']));
        }
        // Checking if entry is of type tweet
        else if (entry['entryId'].indexOf('tweet') != -1) {
            // Adding the reply to list of replies
            replies.push(new Tweet().deserialize(entry['content']['itemContent']['tweet_results']['result']));
        }
    }

    return {
        replies: replies,
        next: next
    };
}