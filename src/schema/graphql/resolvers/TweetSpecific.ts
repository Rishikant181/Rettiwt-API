// This files contains resolvers for tweet specific operations

// CUSTOM LIBS
import { TweetService } from '../../../services/DataServices/TweetService';
import { config } from '../../../config/env'
import { TweetFilter } from '../../types/TweetData';

// Initialsing the service to fetch user details
var tweetService = new TweetService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie']
);

/**
 * @returns The details of the tweet with the given id
 * @param id The id of the tweet which is to be fetched
 */
export async function resolveTweet(id: string): Promise<any> {
    // Getting the data
    var res = (await tweetService.getTweetById(id));

    // Evaluating response
    // If tweet found
    if(res.success) {
        return res.data;
    }
    // If tweet not found or any error
    else {
        throw res.error;
    }
}

/**
 * @returns The list of tweets matchin the given filter
 * @param filter The filter to be used for fetching matching tweets
 */
export async function resolveTweets(filter: any): Promise<any[]> {
    var tweets: any[] = [];                                                     // To store the list of tweets
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of tweets fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // Preparing the filter to use
    const tweetFilter = new TweetFilter(filter);

    // If required count less than batch size, setting batch size to required count
    batchSize = (tweetFilter.count < batchSize) ? tweetFilter.count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < tweetFilter.count) {
        // If this is the last batch, change batch size to number of remaining tweets
        batchSize = ((tweetFilter.count - total) < batchSize) ? (tweetFilter.count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweets(tweetFilter, next);

        // If data is available
        if (res.success) {
            // Adding fetched tweets to list of tweets
            tweets = tweets.concat(res.data.tweets);

            // Updating total tweets fetched
            total += res.data.tweets.length;

            // Getting cursor to next batch
            next = res.data.next
        }
        // If no more data is available
        else {
            break;
        }
    }

    return tweets;
}

/**
 * @returns The list of likers of the given tweet
 * @param id The id of the tweet whose likers are to be fetched
 * @param count The total number of likers to fetch
 */
export async function resolveTweetLikers(id: string, count: number): Promise<any[]> {
    var likers: any[] = [];                                                     // To store the list of likers
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of likers fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining likers
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweetLikers(id, count, next);

        // If data is available
        if (res.success) {
            // Adding fetched likers to list of likers
            likers = likers.concat(res.data.likers);

            // Updating total likers fetched
            total += res.data.likers.length;

            // Getting cursor to next batch
            next = res.data.next
        }
        // If no more data is available
        else {
            break;
        }
    }

    return likers;
}

/**
 * @returns The list of retweeters of the given tweet
 * @param id The id of the tweet whose retweeters are to be fetched
 * @param count The total number of retweeters to fetch
 */
export async function resolveTweetRetweeters(id: string, count: number): Promise<any[]> {
    var retweeters: any[] = [];                                                 // To store the list of retweeters
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of retweeters fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining retweeters
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweetRetweeters(id, count, next);

        // If data is available
        if (res.success) {
            // Adding fetched retweeters to list of retweeters
            retweeters = retweeters.concat(res.data.retweeters);

            // Updating total retweeters fetched
            total += res.data.retweeters.length;

            // Getting cursor to next batch
            next = res.data.next
        }
        // If no more data is available
        else {
            break;
        }
    }

    return retweeters;
}

/**
 * @returns The list of replies of the given tweet
 * @param id The id of the tweet whose replies are to be fetched
 * @param count The total number of replies to fetch
 */
export async function resolveTweetReplies(id: string, count: number): Promise<any[]> {
    var replies: any[] = [];                                                    // To store the list of replies
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of replies fetched

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // Getting the data
        const res = await tweetService.getTweetReplies(id, next);

        // If data is available
        if (res.success) {
            // Adding fetched replies to list of replies
            replies = replies.concat(res.data.replies);

            // Updating total replies fetched
            total += res.data.replies.length;

            // Getting cursor to next batch
            next = res.data.next
        }
        // If no more data is available
        else {
            break;
        }
    }

    return replies;
}