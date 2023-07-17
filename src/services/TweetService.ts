// PACKAGES
import {
	Url,
	EResourceType,
	ITweetSearchResponse,
	ITweetDetailsResponse,
	ITweetFavoritersResponse,
	ITweetRetweetersResponse,
	ITweet as IRawTweet,
	IUser as IRawUser,
	TweetFilter,
} from 'rettiwt-core';
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { FetcherService } from './FetcherService';

// MODELS
import { Tweet } from '../models/Tweet';
import { User } from '../models/User';
import { CursoredData } from '../models/CursoredData';

/**
 * Handles fetching of data related to tweets.
 *
 * @public
 */
export class TweetService extends FetcherService {
	/**
	 * @param cred The credentials to use for authenticating against Twitter API.
	 *
	 * @internal
	 */
	constructor(cred: AuthCredential) {
		super(cred);
	}

	/**
	 * Search for tweets using a filter.
	 *
	 * @param filter The filter be used for searching the tweets.
	 * @param count The number of tweets to fetch, must be >= 10 (when no cursor is provided) and <= 20
	 * @param cursor The cursor to the next batch of tweets. If blank, first batch is fetched.
	 * @returns The list of tweets that match the given filter.
	 *
	 * @public
	 */
	async search(query: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Preparing the URL
		const url: string = new Url(EResourceType.TWEET_SEARCH, {
			filter: query,
			count: count,
			cursor: cursor,
		}).toString();

		// Getting the raw data
		const res = await this.request<ITweetSearchResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawTweet>(res, EResourceType.TWEET_SEARCH);

		// Parsing data
		const tweets = data.list.map((item: IRawTweet) => new Tweet(item));

		// Sorting the tweets by date, from recent to oldest
		tweets.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return new CursoredData<Tweet>(tweets, data.next.value);
	}

	/**
	 * Get the details of a tweet.
	 *
	 * @param id The id of the target tweet.
	 * @returns The details of a single tweet with the given tweet id.
	 *
	 * @public
	 */
	async details(id: string): Promise<Tweet> {
		// Preparing the URL
		const url: string = new Url(EResourceType.TWEET_DETAILS, { id: id }).toString();

		// Fetching the raw data
		const res = await this.request<ITweetDetailsResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawTweet>(res, EResourceType.TWEET_DETAILS);

		// Parsing data
		const tweet = new Tweet(data.list[0]);

		return tweet;
	}

	/**
	 * Get the list of users who liked a tweet.
	 *
	 * @param tweetId The rest id of the target tweet.
	 * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 20.
	 * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
	 * @returns The list of users who liked the given tweet.
	 *
	 * @public
	 */
	async favoriters(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Preparing the URL
		const url: string = new Url(EResourceType.TWEET_FAVORITERS, {
			id: tweetId,
			count: count,
			cursor: cursor,
		}).toString();

		// Fetching the raw data
		const res = await this.request<ITweetFavoritersResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawUser>(res, EResourceType.TWEET_FAVORITERS);

		// Parsing data
		const users = data.list.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}

	/**
	 * Get the list of users who retweeted a tweet.
	 *
	 * @param tweetId The rest id of the target tweet.
	 * @param count The batch size of the list, must be >= 10 (when no cursor is provided) and <= 100.
	 * @param cursor The cursor to the next batch of users. If blank, first batch is fetched.
	 * @returns The list of users who retweeted the given tweet.
	 *
	 * @public
	 */
	async retweeters(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Preparing the URL
		const url: string = new Url(EResourceType.TWEET_RETWEETERS, {
			id: tweetId,
			count: count,
			cursor: cursor,
		}).toString();

		// Fetching the raw data
		const res = await this.request<ITweetRetweetersResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawUser>(res, EResourceType.TWEET_RETWEETERS);

		// Parsing data
		const users = data.list.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}
}