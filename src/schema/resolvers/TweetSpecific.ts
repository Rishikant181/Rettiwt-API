// This files contains resolvers for tweet specific operations

// CUSTOM LIBS

// SERVICES
import { TweetService } from '../../services/data/TweetService';

// TYPES
import { TweetFilter } from '../../types/Tweet';

// HELPERS
import { ValidationErrors } from './helper/Validation';

// Initialsing the service to fetch user details
var tweetService = new TweetService();

/**
 * @returns The details of the tweet with the given id
 * @param id The id of the tweet which is to be fetched
 */
export async function resolveTweet(id: string): Promise<any> {
    // Getting the data
    var res = await tweetService.getTweetById(id);

    // Evaluating response
    return res;
}

/**
 * @returns The list of tweets matching the given filter
 * @param filter The filter to be used for fetching matching tweets
 */
export async function resolveTweets(filter: any): Promise<any[]> {
    var tweets: any[] = [];                                                     // To store the list of tweets
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of tweets fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // Preparing the filter to use
    const tweetFilter: TweetFilter = filter;

    // Checking if the given tweet filter is valid or not
    if(!(filter.fromUsers || filter.toUsers || filter.words || filter.hashtags || filter.mentions || filter.quoted)) {
        throw new Error(ValidationErrors.InvalidTweetFilter);
    }

    // If required count less than batch size, setting batch size to required count
    batchSize = (tweetFilter.count < batchSize) ? tweetFilter.count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < tweetFilter.count) {
        // If this is the last batch, change batch size to number of remaining tweets
        batchSize = ((tweetFilter.count - total) < batchSize) ? (tweetFilter.count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweets(tweetFilter, next);

        // If data is available
        if (res) {
            // Adding fetched tweets to list of tweets
            tweets = tweets.concat(res.list);

            // Updating total tweets fetched
            total = tweets.length;

            // Getting cursor to next batch
            next = res.next;
        }
        // If no more data is available
        else {
            break;
        }
    }

    return tweets;
}

/**
 * @returns The list of quotes of the given tweet
 * @param id The id of the tweet whose quotes are to be fetched
 * @param count The number of quotes to be fetched
 * @param all Whether to fetch all quotes or not
 * @param quoteCount The total number of quotes of the given tweet
 */
export async function resolveTweetQuotes(
    id: string,
    count: number,
    all: boolean,
    quoteCount: number
): Promise<any[]> {
    var quotes: any[] = [];                                                     // To store the list of quotes
    
    // If all tweets are to be fetched
    count = (all || count > quoteCount) ? quoteCount : count;

    // Preparing the filter to use
    var filter = {
        words: [],
        hashtags: [],
        fromUsers: [],
        toUsers: [],
        mentions: [],
        startDate: '',
        endDate: '',
        quoted: id,
        count: count
    };

    // Fetching the quotes using resolveTweets method
    quotes = await resolveTweets(filter);

    return quotes;
}

/**
 * @returns The list of likers of the given tweet
 * @param id The id of the tweet whose likers are to be fetched
 * @param count The total number of likers to fetch
 * @param all Whether to fetch all the likers of the tweet
 * @param likesCount The total number of like of the tweet
 */
export async function resolveTweetLikers(
    id: string,
    count: number,
    all: boolean,
    likesCount: number
): Promise<any[]> {
    var likers: any[] = [];                                                     // To store the list of likers
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of likers fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If all likers are to be fetched
    count = (all || count > likesCount) ? likesCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining likers
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweetLikers(id, count, next);

        // If data is available
        if (res) {
            // Adding fetched likers to list of likers
            likers = likers.concat(res.list);

            // Updating total likers fetched
            total = likers.length;

            // Getting cursor to next batch
            next = res.next;
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
 * @param all Whether to fetch all retweeters
 * @param retweetsCount The total number of retweets of the 
 */
export async function resolveTweetRetweeters(
    id: string,
    count: number,
    all: boolean,
    retweetsCount: number
): Promise<any[]> {
    var retweeters: any[] = [];                                                 // To store the list of retweeters
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of retweeters fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If all retweeters are to be fetched
    count = (all || count > retweetsCount) ? retweetsCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining retweeters
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await tweetService.getTweetRetweeters(id, count, next);

        // If data is available
        if (res) {
            // Adding fetched retweeters to list of retweeters
            retweeters = retweeters.concat(res.list);

            // Updating total retweeters fetched
            total = retweeters.length;

            // Getting cursor to next batch
            next = res.next;
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
 * @param all Whether to fetch list of all replies
 * @param repliesCount The total number of replies to the target tweet
 */
export async function resolveTweetReplies(
    id: string,
    count: number,
    all: boolean,
    repliesCount: number
): Promise<any[]> {
    var replies: any[] = [];                                                    // To store the list of replies
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of replies fetched

    // If all replies are to be fetched
    count = (all || count > repliesCount) ? repliesCount : count;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // Getting the data
        const res = await tweetService.getTweetReplies(id, next);

        // If data is available
        if (res) {
            // Adding fetched replies to list of replies
            replies = replies.concat(res.list);

            // Updating total replies fetched
            total = replies.length;

            // Getting cursor to next batch
            next = res.next;
        }
        // If no more data is available
        else {
            break;
        }
    }

    return replies;
}