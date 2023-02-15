// RESOLVERS
import ResolverBase from './ResolverBase';

// TYPES
import { TweetFilter } from '../../types/Tweet';
import { Cursor, DataContext } from '../../types/Service';
import { ValidationErrors } from '../../types/Errors';

export default class TweetResolver extends ResolverBase {
    // MEMBER DATA
    private batchSize: number;                                              // To store the batch size while fetching data
    // MEMBER METHODS
    constructor(context: DataContext) {
        super(context);
        this.batchSize = 20;
    }
    
    /**
     * @returns The details of the tweet with the given id
     * @param id The id of the tweet which is to be fetched
     */
    async resolveTweet(id: string): Promise<any> {
        // Getting the data
        let res = await this.context.tweets.getTweetById(id);

        // Evaluating response
        return res;
    }

    /**
     * @returns The list of tweets matching the given filter
     * @param filter The filter to be used for fetching matching tweets
     * @param count The number of tweets to fetch, must be >= 1
     * @param cursor The cursor to the batch of tweets to fetch
     */
    async resolveTweets(filter: TweetFilter, count: number, cursor: string): Promise<any> {
        let tweets: any[] = [];                                                     // To store the list of tweets
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of tweets fetched

        // Checking if the given tweet filter is valid or not
        if (!(filter.fromUsers || filter.toUsers || filter.words || filter.hashtags || filter.mentions || filter.quoted)) {
            throw new Error(ValidationErrors.InvalidTweetFilter);
        }

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining tweets
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.tweets.getTweets(filter, this.batchSize, next.value);

            // If data is available
            if (res.list?.length) {
                // Adding fetched tweets to list of tweets
                tweets = tweets.concat(res.list);

                // Updating total tweets fetched
                total = tweets.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // Adding the cursor to the end of list of data
        tweets.push(next);

        return tweets;
    }

    /**
     * @returns The list of quotes of the given tweet
     * @param id The id of the tweet whose quotes are to be fetched
     * @param count The number of quotes to be fetched, must be >= 1 (when no cursor if provided)
     * @param all Whether to fetch all quotes or not
     * @param cursor The cursor to the batch of tweet quotes to fetch
     * @param quoteCount The total number of quotes of the given tweet
     */
    async resolveTweetQuotes(id: string, count: number, all: boolean, cursor: string, quoteCount: number): Promise<any[]> {
        let quotes: any[] = [];                                                     // To store the list of quotes

        // If all tweets are to be fetched
        count = all ? quoteCount : count;

        // Preparing the filter to use
        let filter = {
            words: [],
            hashtags: [],
            fromUsers: [],
            toUsers: [],
            mentions: [],
            startDate: '',
            endDate: '',
            quoted: id
        };

        // Fetching the quotes using resolveTweets method
        quotes = await this.resolveTweets(filter, count, cursor);

        return quotes;
    }

    /**
     * @returns The list of likers of the given tweet
     * @param id The id of the tweet whose likers are to be fetched
     * @param count The total number of likers to fetch, must be >= 10 (when no cursor if provided)
     * @param all Whether to fetch all the likers of the tweet
     * @param cursor The cursor to the batch of likers to fetch
     * @param likesCount The total number of like of the tweet
     */
    async resolveTweetLikers(id: string, count: number, all: boolean, cursor: string, likesCount: number): Promise<any> {
        let likers: any[] = [];                                                     // To store the list of likers
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of likers fetched

        // If all likers are to be fetched
        count = all ? likesCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining likers
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.tweets.getTweetLikers(id, this.batchSize, next.value);

            // If data is available
            if (res.list?.length) {
                // Adding fetched likers to list of likers
                likers = likers.concat(res.list);

                // Updating total likers fetched
                total = likers.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // Adding the cursor to the end of list of data
        likers.push(next);

        return likers;
    }

    /**
     * @returns The list of retweeters of the given tweet
     * @param id The id of the tweet whose retweeters are to be fetched
     * @param count The total number of retweeters to fetch, must be >= 10 (when no cursor if provided)
     * @param all Whether to fetch all retweeters
     * @param cursor The cursor to the batch of retweeters to fetch
     * @param retweetsCount The total number of retweets of the 
     */
    async resolveTweetRetweeters(id: string, count: number, all: boolean, cursor: string, retweetsCount: number): Promise<any> {
        let retweeters: any[] = [];                                                 // To store the list of retweeters
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of retweeters fetched

        // If all retweeters are to be fetched
        count = all ? retweetsCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining retweeters
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.tweets.getTweetRetweeters(id, this.batchSize, next.value);

            // If data is available
            if (res.list?.length) {
                // Adding fetched retweeters to list of retweeters
                retweeters = retweeters.concat(res.list);

                // Updating total retweeters fetched
                total = retweeters.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // Adding the cursor to the end of list of data
        retweeters.push(next);

        return retweeters;
    }

    /**
     * @returns The list of replies of the given tweet
     * @param id The id of the tweet whose replies are to be fetched
     * @param count The total number of replies to fetch
     * @param all Whether to fetch list of all replies
     * @param cursor The cursor to the batch of replies to fetch
     * @param repliesCount The total number of replies to the target tweet
     */
    async resolveTweetReplies(id: string, count: number, all: boolean, cursor: string, repliesCount: number): Promise<any[]> {
        let replies: any[] = [];                                                    // To store the list of replies
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of replies fetched

        // If all replies are to be fetched
        count = (all || count > repliesCount) ? repliesCount : count;

        // Repeatedly fetching data as long as total data fetched is less than requried
        while (total < count) {
            // Getting the data
            const res = await this.context.tweets.getTweetReplies(id, next.value);

            // If data is available
            if (res.list?.length) {
                // Adding fetched replies to list of replies
                replies = replies.concat(res.list);

                // Updating total replies fetched
                total = replies.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        }

        // Adding the cursor to the end of list of data
        replies.push(next);

        return replies;
    }
}