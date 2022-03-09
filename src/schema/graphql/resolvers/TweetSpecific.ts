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
    // Getting the data
    var res = (await tweetService.getTweets(new TweetFilter(filter), '')).data.tweets;

    return res;
}