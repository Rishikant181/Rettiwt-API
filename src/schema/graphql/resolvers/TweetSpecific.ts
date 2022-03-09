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
 * @param filter The filter to be used for fetching matching tweets
 * @returns The list of tweets matchin the given filter
 */
export async function resolveTweets(filter: any): Promise<any> {
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
        const res = (await tweetService.getTweets(tweetFilter, next)).data;

        // If data is available
        if (res.tweets.length) {
            // Adding fetched tweets to list of tweets
            tweets = tweets.concat(res.tweets);

            // Updating total tweets fetched
            total += res.tweets.length;

            // Getting cursor to next batch
            next = res.next
        }
        // If no more data is available
        else {
            break;
        }
    }

    return tweets;
}