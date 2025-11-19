import { statSync } from 'fs';

import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { TweetRepliesSortType } from '../../enums/Tweet';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';

import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ITweetFilter } from '../../types/args/FetchArgs';
import { INewTweet } from '../../types/args/PostArgs';
import { IMediaInitializeUploadResponse } from '../../types/raw/media/InitalizeUpload';

import { ITweetBookmarkResponse } from '../../types/raw/tweet/Bookmark';
import { ITweetDetailsResponse } from '../../types/raw/tweet/Details';
import { ITweetDetailsBulkResponse } from '../../types/raw/tweet/DetailsBulk';
import { ITweetLikeResponse } from '../../types/raw/tweet/Like';
import { ITweetLikersResponse } from '../../types/raw/tweet/Likers';
import { ITweetPostResponse } from '../../types/raw/tweet/Post';
import { ITweetRepliesResponse } from '../../types/raw/tweet/Replies';
import { ITweetRetweetResponse } from '../../types/raw/tweet/Retweet';
import { ITweetRetweetersResponse } from '../../types/raw/tweet/Retweeters';
import { ITweetScheduleResponse } from '../../types/raw/tweet/Schedule';
import { ITweetSearchResponse } from '../../types/raw/tweet/Search';
import { ITweetUnbookmarkResponse } from '../../types/raw/tweet/Unbookmark';
import { ITweetUnlikeResponse } from '../../types/raw/tweet/Unlike';
import { ITweetUnpostResponse } from '../../types/raw/tweet/Unpost';
import { ITweetUnretweetResponse } from '../../types/raw/tweet/Unretweet';
import { ITweetUnscheduleResponse } from '../../types/raw/tweet/Unschedule';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to tweets.
 *
 * @public
 */
export class TweetService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Bookmark a tweet.
	 *
	 * @param id - The ID of the tweet to be bookmarked.
	 *
	 * @returns Whether bookmarking was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Bookmarking the Tweet with id '1234567890'
	 * rettiwt.tweet.bookmark('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async bookmark(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_BOOKMARK;

		// Favoriting the tweet
		const response = await this.request<ITweetBookmarkResponse>(resource, {
			id: id,
		});

		// Deserializing response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the details of one or more tweets.
	 *
	 * @param id - The ID/IDs of the target tweet/tweets.
	 *
	 * @returns
	 * The details of the tweet with the given ID.
	 *
	 * If more than one ID is provided, returns a list.
	 *
	 * If no tweet/tweets matches the given ID/IDs, returns `undefined`/`[]`.
	 *
	 * @example
	 *
	 * #### Fetching the details of a single tweet
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the tweet with the id '1234567890'
	 * rettiwt.tweet.details('1234567890')
	 * .then(res => {
	 * 	console.log(res);	# 'res' is a single tweet
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example
	 *
	 * #### Fetching the details of multiple tweets
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the tweets with IDs '123', '456', '789'
	 * rettiwt.tweet.details(['123', '456', '789'])
	 * .then(res => {
	 * 	console.log(res);	# 'res' is an array of tweets
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details<T extends string | string[]>(id: T): Promise<T extends string ? Tweet | undefined : Tweet[]> {
		let resource: ResourceType;

		// If user is authenticated and details of single tweet required
		if (this.config.userId != undefined && typeof id == 'string') {
			resource = ResourceType.TWEET_DETAILS_ALT;

			// Fetching raw tweet details
			const response = await this.request<ITweetRepliesResponse>(resource, { id: id });

			// Deserializing response
			const data = Extractors[resource](response, id);

			return data as T extends string ? Tweet | undefined : Tweet[];
		}
		// If user is authenticated and details of multiple tweets required
		else if (this.config.userId != undefined && Array.isArray(id)) {
			resource = ResourceType.TWEET_DETAILS_BULK;

			// Fetching raw tweet details
			const response = await this.request<ITweetDetailsBulkResponse>(resource, { ids: id });

			// Deserializing response
			const data = Extractors[resource](response, id);

			return data as T extends string ? Tweet | undefined : Tweet[];
		}
		// If user is not authenticated
		else {
			resource = ResourceType.TWEET_DETAILS;

			// Fetching raw tweet details
			const response = await this.request<ITweetDetailsResponse>(resource, { id: String(id) });

			// Deserializing response
			const data = Extractors[resource](response, String(id));

			return data as T extends string ? Tweet | undefined : Tweet[];
		}
	}

	/**
	 * Like a tweet.
	 *
	 * @param id - The ID of the tweet to be liked.
	 *
	 * @returns Whether liking was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Liking the Tweet with id '1234567890'
	 * rettiwt.tweet.like('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async like(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_LIKE;

		// Favoriting the tweet
		const response = await this.request<ITweetLikeResponse>(resource, {
			id: id,
		});

		// Deserializing response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the list of users who liked a tweet. Only works for your own tweets.
	 *
	 * @param id - The ID of the target tweet.
	 * @param count - The number of likers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of likers to fetch.
	 *
	 * @returns The list of users who liked the given tweet.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 likers of the Tweet with id '1234567890'
	 * rettiwt.tweet.likers('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async likers(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.TWEET_LIKERS;

		// Fetching raw likers
		const response = await this.request<ITweetLikersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Post a tweet.
	 *
	 * @param options - The options describing the tweet to be posted. Check {@link TweetArgs} for available options.
	 *
	 * @returns The ID of the posted tweet.
	 *
	 * @example
	 *
	 * #### Posting a simple text
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a tweet to twitter
	 * rettiwt.tweet.post({ text: 'Hello World!' })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example
	 *
	 * #### Posting a tweet with an image that has been already uploaded
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a tweet, containing an image with ID '1234567890', to twitter
	 * rettiwt.tweet.post({ text: 'What a nice view!', media: [{ id: '1234567890' }] })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example
	 *
	 * #### Posting a reply to a tweet
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a simple text reply, to a tweet with id "1234567890"
	 * rettiwt.tweet.post({ text: 'Hello!', replyTo: "1234567890" })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example
	 *
	 * #### Posting a tweet that quotes another tweet
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a simple text tweet, quoting a tweet with id "1234567890"
	 * rettiwt.tweet.post({ text: 'Hello!', quote: "1234567890" })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async post(options: INewTweet): Promise<string | undefined> {
		const resource = ResourceType.TWEET_POST;

		// Posting the tweet
		const response = await this.request<ITweetPostResponse>(resource, { tweet: options });

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of replies to a tweet.
	 *
	 * If the target tweet is a thread,
	 * the first batch always contains all the tweets in the thread,
	 * if `sortBy` is set to {@link TweetRepliesSortType.RELEVANCE}.
	 *
	 * @param id - The ID of the target tweet.
	 * @param cursor - The cursor to the batch of replies to fetch.
	 * @param sortBy - The sorting order of the replies to fetch. Default is {@link TweetRepliesSortType.RECENT}.
	 *
	 * @returns The list of replies to the given tweet.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 replies to the Tweet with id '1234567890'
	 * rettiwt.tweet.replies('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 *
	 * If the given tweet is the start of/part of a thread, the first batch always contains all the tweets in the thread.
	 */
	public async replies(
		id: string,
		cursor?: string,
		sortBy: TweetRepliesSortType = TweetRepliesSortType.LATEST,
	): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.TWEET_REPLIES;

		// Fetching raw list of replies
		const response = await this.request<ITweetDetailsResponse>(resource, {
			id: id,
			cursor: cursor,
			sortBy: sortBy,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Retweet a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 *
	 * @returns Whether retweeting was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Retweeting the Tweet with id '1234567890'
	 * rettiwt.tweet.retweet('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async retweet(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_RETWEET;

		// Retweeting the tweet
		const response = await this.request<ITweetRetweetResponse>(resource, { id: id });

		// Deserializing response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the list of users who retweeted a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 * @param count - The number of retweeters to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of retweeters to fetch.
	 *
	 * @returns The list of users who retweeted the given tweet.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 retweeters of the Tweet with id '1234567890'
	 * rettiwt.tweet.retweeters('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async retweeters(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.TWEET_RETWEETERS;

		// Fetching raw list of retweeters
		const response = await this.request<ITweetRetweetersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Schedule a tweet.
	 *
	 * @param options - The options describing the tweet to be posted. Check {@link TweetArgs} for available options.
	 *
	 * @returns The ID of the schedule.
	 *
	 * @example
	 *
	 * #### Scheduling a simple text
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Scheduling a tweet to posted at 19th of August, 2024, at 11:59:00 AM, in local time
	 * rettiwt.tweet.schedule({ text: 'Hello World!', scheduleFor: new Date('2024-08-19 23:59:00') })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 *
	 * Scheduling a tweet is similar to {@link post}ing, except that an extra parameter called `scheduleFor` is used.
	 */
	public async schedule(options: INewTweet): Promise<string | undefined> {
		const resource = ResourceType.TWEET_SCHEDULE;

		// Scheduling the tweet
		const response = await this.request<ITweetScheduleResponse>(resource, { tweet: options });

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Search for tweets using a filter.
	 *
	 * @param filter - The filter to be used for searching the tweets.
	 * @param count - The number of tweets to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 * @param results - The type of search results to fetch. Default is {@link ESearchResultType.LATEST}.
	 *
	 * @returns The list of tweets that match the given filter.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 5 tweets from user 'user1'
	 * rettiwt.tweet.search({ fromUsers: ['user1'] }, 5)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 *
	 * For details about available filters, refer to {@link TweetFilter}
	 */
	public async search(filter: ITweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.TWEET_SEARCH;

		// Fetching raw list of filtered tweets
		const response = await this.request<ITweetSearchResponse>(resource, {
			filter: filter,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		// Sorting the tweets by date, from recent to oldest
		data.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data;
	}

	/**
	 * Stream tweets in pseudo real-time using a filter.
	 *
	 * @param filter - The filter to be used for searching the tweets.
	 * @param pollingInterval - The interval in milliseconds to poll for new tweets. Default interval is 60000 ms.
	 *
	 * @returns An async generator that yields matching tweets as they are found.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Creating a function that streams all new tweets from the user 'user1'
	 * async function streamTweets() {
	 * 	try {
	 * 		// Awaiting for the tweets returned by the AsyncGenerator returned by the method
	 * 		for await (const tweet of rettiwt.tweet.stream({ fromUsers: ['user1'] }, 5000)) {
	 * 			console.log(tweet.fullText);
	 * 		}
	 * 	}
	 * 	catch (err) {
	 * 		console.log(err);
	 * 	}
	 * }
	 *
	 * // Calling the function
	 * streamTweets();
	 * ```
	 */
	public async *stream(filter: ITweetFilter, pollingInterval = 60000): AsyncGenerator<Tweet> {
		const startDate = new Date();

		let cursor: string | undefined = undefined;
		let sinceId: string | undefined = undefined;
		let nextSinceId: string | undefined = undefined;

		while (true) {
			// Pause execution for the specified polling interval before proceeding to the next iteration
			await new Promise((resolve) => setTimeout(resolve, pollingInterval));

			// Search for tweets
			const tweets = await this.search({ ...filter, startDate: startDate, sinceId: sinceId }, undefined, cursor);

			// Yield the matching tweets
			for (const tweet of tweets.list) {
				yield tweet;
			}

			// Store the most recent tweet ID from this batch
			if (tweets.list.length > 0 && cursor === undefined) {
				nextSinceId = tweets.list[0].id;
			}

			// If there are more tweets to fetch, adjust the cursor value
			if (tweets.list.length > 0 && tweets.next) {
				cursor = tweets.next;
			}
			// Else, start the next iteration from this batch's most recent tweet
			else {
				sinceId = nextSinceId;
				cursor = undefined;
			}
		}
	}

	/**
	 * Unbookmark a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 *
	 * @returns Whether unbookmarking was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unbookmarking the tweet with id '1234567890'
	 * rettiwt.tweet.unbookmark('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unbookmark(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_UNBOOKMARK;

		// Unliking the tweet
		const response = await this.request<ITweetUnbookmarkResponse>(resource, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unlike a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 *
	 * @returns Whether unliking was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unliking the Tweet with id '1234567890'
	 * rettiwt.tweet.unlike('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unlike(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_UNLIKE;

		// Unliking the tweet
		const response = await this.request<ITweetUnlikeResponse>(resource, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unpost a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 *
	 * @returns Whether unposting was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unposting the Tweet with id '1234567890'
	 * rettiwt.tweet.unpost('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unpost(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_UNPOST;

		// Unposting the tweet
		const response = await this.request<ITweetUnpostResponse>(resource, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unretweet a tweet.
	 *
	 * @param id - The ID of the target tweet.
	 *
	 * @returns Whether unretweeting was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unretweeting the Tweet with id '1234567890'
	 * rettiwt.tweet.unretweet('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unretweet(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_UNRETWEET;

		// Unretweeting the tweet
		const response = await this.request<ITweetUnretweetResponse>(resource, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unschedule a tweet.
	 *
	 * @param id - The ID of the scheduled tweet.
	 *
	 * @returns Whether unscheduling was successful or not.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unscheduling the Tweet with id '1234567890'
	 * rettiwt.tweet.unschedule('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unschedule(id: string): Promise<boolean> {
		const resource = ResourceType.TWEET_UNSCHEDULE;

		// Unscheduling the tweet
		const response = await this.request<ITweetUnscheduleResponse>(resource, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Upload a media file to Twitter.
	 *
	 * @param media - The path or ArrayBuffer to the media file to upload.
	 *
	 * @returns The ID of the uploaded media.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Uploading a file called mountains.jpg
	 * rettiwt.tweet.upload('mountains.jpg')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 *
	 * - The uploaded media exists for 24 hrs within which it can be included in a tweet to be posted.
	 * If not posted in a tweet within this period, the uploaded media is removed.
	 * - Instead of a path to the media, an ArrayBuffer containing the media can also be uploaded.
	 */
	public async upload(media: string | ArrayBuffer): Promise<string> {
		// INITIALIZE
		const size = typeof media == 'string' ? statSync(media).size : media.byteLength;
		const id: string = (
			await this.request<IMediaInitializeUploadResponse>(ResourceType.MEDIA_UPLOAD_INITIALIZE, {
				upload: { size: size },
			})
		).media_id_string;

		// APPEND
		await this.request<unknown>(ResourceType.MEDIA_UPLOAD_APPEND, { upload: { id: id, media: media } });

		// FINALIZE
		await this.request<unknown>(ResourceType.MEDIA_UPLOAD_FINALIZE, { upload: { id: id } });

		return id;
	}
}
