import { statSync } from 'fs';

import {
	IInitializeMediaUploadResponse,
	IListTweetsResponse,
	ITweetDetailsResponse,
	ITweetLikeResponse,
	ITweetPostResponse,
	ITweetRepliesResponse,
	ITweetRetweetersResponse,
	ITweetRetweetResponse,
	ITweetScheduleResponse,
	ITweetSearchResponse,
	ITweetUnlikeResponse,
	ITweetUnpostResponse,
	ITweetUnretweetResponse,
	ITweetUnscheduleResponse,
	TweetFilter,
} from 'rettiwt-core';

import { extractors } from '../../collections/Extractors';
import { EResourceType } from '../../enums/Resource';
import { TweetArgs } from '../../models/args/PostArgs';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

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
	public constructor(config?: IRettiwtConfig) {
		super(config);
	}

	/**
	 * Get the details of a tweet.
	 *
	 * @param id - The id of the target tweet.
	 *
	 * @returns
	 * The details of the tweet with the given id.
	 * If no tweet matches the given id, returns `undefined`.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the tweet with the id '1234567890'
	 * rettiwt.tweet.details('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(id: string): Promise<Tweet | undefined> {
		let resource: EResourceType;

		// If user is authenticated
		if (this.userId != undefined) {
			resource = EResourceType.TWEET_DETAILS_ALT;

			// Fetching raw tweet details
			const response = await this.request<ITweetRepliesResponse>(resource, { id: id });

			// Deserializing response
			const data = extractors[resource](response, id);

			return data;
		}
		// If user is not authenticated
		else {
			resource = EResourceType.TWEET_DETAILS;

			// Fetching raw tweet details
			const response = await this.request<ITweetDetailsResponse>(resource, { id: id });

			// Deserializing response
			const data = extractors[resource](response, id);

			return data;
		}
	}

	/**
	 * Like a tweet.
	 *
	 * @param id - The id of the tweet to be liked.
	 *
	 * @returns Whether liking was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_LIKE;

		// Favoriting the tweet
		const response = await this.request<ITweetLikeResponse>(resource, {
			id: id,
		});

		// Deserializing response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the list of tweets from a tweet list.
	 *
	 * @param id - The id of target list.
	 * @param count - The number of tweets to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 *
	 * @returns The list tweets in the given list.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 tweets of the Twitter list with id '1234567890'
	 * rettiwt.tweet.list('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks Due a bug in Twitter API, the count is ignored when no cursor is provided and defaults to 100.
	 */
	public async list(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.LIST_TWEETS;

		// Fetching raw list tweets
		const response = await this.request<IListTweetsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		// Sorting the tweets by date, from recent to oldest
		data.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data;
	}

	/**
	 * Post a tweet.
	 *
	 * @param options - The options describing the tweet to be posted. Check {@link TweetArgs} for available options.
	 *
	 * @returns The id of the posted tweet.
	 *
	 * @example
	 * Posting a simple text
	 * ```
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
	 * Posting a tweet with an image that has been already uploaded
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a tweet, containing an image called 'mountains.jpg', to twitter
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
	 * Posting a reply to a tweet
	 * ```
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
	 * * @example
	 * Posting a tweet that quotes another tweet
	 * ```
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
	public async post(options: TweetArgs): Promise<string | undefined> {
		const resource = EResourceType.TWEET_POST;

		// Posting the tweet
		const response = await this.request<ITweetPostResponse>(resource, { tweet: options });

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Retweet a tweet.
	 *
	 * @param id - The id of the target tweet.
	 *
	 * @returns Whether retweeting was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_RETWEET;

		// Retweeting the tweet
		const response = await this.request<ITweetRetweetResponse>(resource, { id: id });

		// Deserializing response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the list of users who retweeted a tweet.
	 *
	 * @param id - The id of the target tweet.
	 * @param count - The number of retweeters to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of retweeters to fetch.
	 *
	 * @returns The list of users who retweeted the given tweet.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_RETWEETERS;

		// Fetching raw list of retweeters
		const response = await this.request<ITweetRetweetersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Schedule a tweet.
	 *
	 * @param options - The options describing the tweet to be posted. Check {@link TweetArgs} for available options.
	 *
	 * @returns The id of the schedule.
	 *
	 * @example
	 * Scheduling a simple text
	 * ```
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
	 * Scheduling a tweet is similar to {@link post}ing, except that an extra parameter called `scheduleFor` is used.
	 */
	public async schedule(options: TweetArgs): Promise<string | undefined> {
		const resource = EResourceType.TWEET_SCHEDULE;

		// Scheduling the tweet
		const response = await this.request<ITweetScheduleResponse>(resource, { tweet: options });

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Search for tweets using a filter.
	 *
	 * @param filter - The filter to be used for searching the tweets.
	 * @param count - The number of tweets to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 *
	 * @returns The list of tweets that match the given filter.
	 *
	 * @example
	 * ```
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
	 * @remarks For details about available filters, refer to {@link TweetFilter}
	 */
	public async search(filter: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.TWEET_SEARCH;

		// Fetching raw list of filtered tweets
		const response = await this.request<ITweetSearchResponse>(resource, {
			filter: filter,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

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
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Streaming all upcoming tweets from user 'user1'
	 * (async () => {
	 * 	try {
	 * 		for await (const tweet of rettiwt.tweet.stream({ fromUsers: ['user1'] }, 1000)) {
	 * 			console.log(tweet.fullText);
	 * 		}
	 * 	}
	 * 	catch (err) {
	 * 		console.log(err);
	 * 	}
	 * })();
	 * ```
	 */
	public async *stream(filter: TweetFilter, pollingInterval: number = 60000): AsyncGenerator<Tweet> {
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
				cursor = tweets.next.value;
			}
			// Else, start the next iteration from this batch's most recent tweet
			else {
				sinceId = nextSinceId;
				cursor = undefined;
			}
		}
	}

	/**
	 * Unlike a tweet.
	 *
	 * @param id - The id of the target tweet.
	 *
	 * @returns Whether unliking was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_UNLIKE;

		// Unliking the tweet
		const response = await this.request<ITweetUnlikeResponse>(resource, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unpost a tweet.
	 *
	 * @param id - The id of the target tweet.
	 *
	 * @returns Whether unposting was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_UNPOST;

		// Unposting the tweet
		const response = await this.request<ITweetUnpostResponse>(resource, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unretweet a tweet.
	 *
	 * @param id - The id of the target tweet.
	 *
	 * @returns Whether unretweeting was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_UNRETWEET;

		// Unretweeting the tweet
		const response = await this.request<ITweetUnretweetResponse>(resource, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Unschedule a tweet.
	 *
	 * @param id - The id of the scheduled tweet.
	 *
	 * @returns Whether unscheduling was successful or not.
	 *
	 * @example
	 * ```
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
		const resource = EResourceType.TWEET_UNSCHEDULE;

		// Unscheduling the tweet
		const response = await this.request<ITweetUnscheduleResponse>(resource, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Upload a media file to Twitter.
	 *
	 * @param media - The path or ArrayBuffer to the media file to upload.
	 *
	 * @returns The id of the uploaded media.
	 *
	 * @example
	 * ```
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
	 * - The uploaded media exists for 24 hrs within which it can be included in a tweet to be posted.
	 * If not posted in a tweet within this period, the uploaded media is removed.
	 * - Instead of a path to the media, an ArrayBuffer containing the media can also be uploaded.
	 */
	public async upload(media: string | ArrayBuffer): Promise<string> {
		// INITIALIZE
		const size = typeof media == 'string' ? statSync(media).size : media.byteLength;
		const id: string = (
			await this.request<IInitializeMediaUploadResponse>(EResourceType.MEDIA_UPLOAD_INITIALIZE, {
				upload: { size: size },
			})
		).media_id_string;

		// APPEND
		await this.request<unknown>(EResourceType.MEDIA_UPLOAD_APPEND, { upload: { id: id, media: media } });

		// FINALIZE
		await this.request<unknown>(EResourceType.MEDIA_UPLOAD_FINALIZE, { upload: { id: id } });

		return id;
	}
}
