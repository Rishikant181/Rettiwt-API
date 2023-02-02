// SERVICES
import { FetcherService } from "../FetcherService";
import { AuthService } from "../AuthService";

// TYPES
import { TweetFilter, Tweet } from "../../types/Tweet";
import { User } from "../../types/UserAccount";
import { CursoredData } from '../../types/Service';
import RawTweet from '../../types/raw/tweet/Tweet';
import RawTweets from '../../types/raw/tweet/Tweets';
import RawLikers from '../../types/raw/tweet/Favouriters';
import RawRetweeters from '../../types/raw/tweet/Retweeters';

// URLS
import * as Urls from '../helper/Urls';

// EXTRACTORS
import * as Extractors from "../helper/Extractors";

// DESERIALIZERS
import * as Deserializers from '../helper/Deserializers';

/**
 * A service that deals with fetching of data related to tweets
 */
export class TweetService extends FetcherService {
    // MEMBER METHODS
    constructor(auth: AuthService) {
        super(auth);
    }

    /**
     * @param filter The tweet filter to use for getting filtered tweets
     * @returns The same tweet filter, in a URL query format string
     */
    private toQueryString(filter: TweetFilter): string {
        // Concatenating the input filter arguments to a URL query formatted string
        return [
            filter.words ? filter.words.join(' ') : '',
            filter.hashtags ? `(${filter.hashtags.map(hashtag => '%23' + hashtag).join(' OR ')})` : '',
            filter.fromUsers ? `(${filter.fromUsers.map(user => `from:${user}`).join(' OR ')})` : '',
            filter.toUsers ? `(${filter.toUsers.map(user => `to:${user}`).join(' OR ')})` : '',
            filter.mentions ? `(${filter.mentions.map(mention => '%40' + mention).join(' OR ')})` : '',
            filter.startDate ? `since:${filter.startDate}` : '',
            filter.endDate ? `until:${filter.endDate}` : '',
            filter.quoted ? `quoted_tweet_id:${filter.quoted}` : ''
        ]
        .filter(item => item !== '()' && item !== '')
        .join(' ');
    }

    /**
     * @returns The list of tweets that match the given filter
     * @param filter The filter be used for searching the tweets
     * @param count The number of tweets to fetch
     * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched
     */
    async getTweets(filter: TweetFilter, count: number, cursor: string): Promise<CursoredData<Tweet>> {
        // Getting the raw data
        let res = await this.request<RawTweets>(Urls.tweetsUrl(this.toQueryString(filter), count, cursor)).then(res => res.data);

        // Extracting data
        let data = Extractors.extractTweets(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map(item => Deserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The details of a single tweet with the given tweet id
     * @param tweetId The rest id of the target tweet
     */
    async getTweetById(tweetId: string): Promise<Tweet> {
        // Getting data from cache
        let cachedData = await this.readData(tweetId);

        // If data exists in cache
        if (cachedData) {
            return cachedData;
        }
        // If data does not exist in cache
        else {
            // Fetching the raw data
            let res = await this.request<RawTweet>(Urls.tweetDetailsUrl(tweetId)).then(res => res.data);

            // Extracting data
            let data = Extractors.extractTweet(res, tweetId);

            // Caching data
            this.cacheData(data);

            // Parsing data
            let tweet = Deserializers.toTweet(data.required[0]);

            return tweet;
        }
    }

    /**
     * @returns The list of users who liked the given tweet
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetLikers(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // Fetching the raw data
        let res = await this.request<RawLikers>(Urls.tweetLikesUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        let data = Extractors.extractTweetLikers(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map(item => Deserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of users who retweeted the given tweet     
     * @param tweetId The rest id of the target tweet
     * @param count The batch size of the list
     * @param cursor The cursor to the next batch of users. If blank, first batch is fetched
     */
    async getTweetRetweeters(tweetId: string, count: number, cursor: string): Promise<CursoredData<User>> {
        // Fetching the raw data
        let res = await this.request<RawRetweeters>(Urls.tweetRetweetUrl(tweetId, count, cursor)).then(res => res.data);

        // Extracting data
        let data = Extractors.extractTweetRetweeters(res);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let users = data.required.map(item => Deserializers.toUser(item));

        return {
            list: users,
            next: { value: data.cursor }
        };
    }

    /**
     * @returns The list of replies to the given tweet
     * @param tweetId The rest id of the target tweet
     * @param cursor The cursor to the next batch of replies. If blank, first batch is fetched
     */
    async getTweetReplies(tweetId: string, cursor: string): Promise<CursoredData<Tweet>> {
        // Fetching the raw data
        let res = await this.request<RawTweet>(Urls.tweetRepliesUrl(tweetId, cursor)).then(res => res.data);

        // Extracting data
        let data = Extractors.extractTweetReplies(res, tweetId);

        // Caching data
        this.cacheData(data);

        // Parsing data
        let tweets = data.required.map(item => Deserializers.toTweet(item));

        return {
            list: tweets,
            next: { value: data.cursor }
        };
    }
}