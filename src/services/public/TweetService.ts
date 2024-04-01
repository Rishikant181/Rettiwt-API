import { TweetFilter } from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';
import { TweetMediaArgs } from '../../models/args/internal/PostArgs';
import { TweetArgs } from '../../models/args/public/TweetArgs';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IRettiwtConfig } from '../../types/RettiwtConfig';
import { FetcherService } from '../internal/FetcherService';

/**
 * Handles fetching of data related to tweets.
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
	 * @returns The details of a single tweet with the given tweet id.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the tweet with the id '12345678'
	 * rettiwt.tweet.details('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @public
	 */
	public async details(id: string): Promise<Tweet | undefined> {
		// Fetching the requested data
		const data = await this.fetchResource<Tweet>(EResourceType.TWEET_DETAILS, { id: id });

		return data;
	}

	/**
	 * Like the tweet with the given id.
	 *
	 * @param tweetId - The id of the tweet to be liked.
	 * @returns Whether liking was successful or not.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Liking the Tweet with id '12345678'
	 * rettiwt.tweet.favorite('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @public
	 */
	public async like(tweetId: string): Promise<boolean> {
		// Favoriting the tweet
		const data = await this.postResource(EResourceType.TWEET_FAVORITE, { id: tweetId });

		return data;
	}

	/**
	 * Get the list of users who liked a tweet.
	 *
	 * @param tweetId - The rest id of the target tweet.
	 * @param count - The number of favoriters to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of favoriters to fetch.
	 * @returns The list of users who liked the given tweet.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 likers of the Tweet with id '12345678'
	 * rettiwt.tweet.favoriters('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @public
	 */
	public async likers(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetchResource<CursoredData<User>>(EResourceType.TWEET_FAVORITERS, {
			id: tweetId,
			count: count,
			cursor: cursor,
		});

		return data!;
	}

	/**
	 * Get the tweets from the tweet list with the given id.
	 *
	 * @param listId - The id of list from where the tweets are to be fetched.
	 * @param count - The number of tweets to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 * @returns The list tweets present in the given list.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 tweets of the Twitter list with id '12345678'
	 * rettiwt.tweet.list('12345678')
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
	public async list(listId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Fetching the requested data
		const data = await this.fetchResource<CursoredData<Tweet>>(EResourceType.LIST_TWEETS, {
			id: listId,
			count: count,
			cursor: cursor,
		});

		// Sorting the tweets by date, from recent to oldest
		data!.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data!;
	}

	/**
	 * Post a tweet.
	 *
	 * @param options - The options describing the tweet to be posted.
	 * @returns Whether posting was successful or not.
	 *
	 * @example Posting a simple text
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
	 * @example Posting a tweet with an image stored locally
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Posting a tweet, containing an image called 'mountains.jpg', to twitter
	 * rettiwt.tweet.post({ text: 'What a nice view!', media: [{ path: 'mountains.jpg' }] })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example Posting a tweet with an image from the web
	 * ```
	 * import axios from 'axios';
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the image from the web
	 * axios.get('<url_to_cool_image>', {
	 * 	responseType: 'arraybuffer'
	 * })
	 * .then(image => {
	 * 	// Posting a tweet, containing the image as an ArrayBuffer, to twitter
	 * 	rettiwt.tweet.post({ text: 'What a nice view!', media: [{ path: image.data }] })
	 * 	.then(res => {
	 * 		console.log(res);
	 * 	})
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example Posting a reply to a tweet
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
	 * * @example Posting a reply to a tweet with a quoted tweet
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
	 *
	 * @public
	 */
	public async post(options: TweetArgs): Promise<boolean> {
		// Converting  JSON args to object
		const tweet: TweetArgs = new TweetArgs(options);

		/** Stores the list of media that has been uploaded */
		const uploadedMedia: TweetMediaArgs[] = [];

		// If tweet includes media, upload the media items
		if (tweet.media) {
			for (const item of tweet.media) {
				// Uploading the media item and getting it's allocated id
				const id: string = await this.upload(item.path);

				// Storing the uploaded media item
				uploadedMedia.push(new TweetMediaArgs({ id: id, tags: item.tags }));
			}
		}

		// Posting the tweet
		const data = await this.postResource(EResourceType.TWEET_CREATE, {
			tweet: {
				text: options.text,
				media: uploadedMedia,
				quote: options.quote,
				replyTo: options.replyTo,
			},
		});

		return data;
	}

	/**
	 * Retweet the tweet with the given id.
	 *
	 * @param tweetId - The id of the tweet with the given id.
	 * @returns Whether retweeting was successful or not.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Retweeting the Tweet with id '12345678'
	 * rettiwt.tweet.retweet('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @public
	 */
	public async retweet(tweetId: string): Promise<boolean> {
		// Retweeting the tweet
		const data = await this.postResource(EResourceType.TWEET_RETWEET, { id: tweetId });

		return data;
	}

	/**
	 * Get the list of users who retweeted a tweet.
	 *
	 * @param tweetId - The rest id of the target tweet.
	 * @param count - The number of retweeters to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of retweeters to fetch.
	 * @returns The list of users who retweeted the given tweet.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 retweeters of the Tweet with id '12345678'
	 * rettiwt.tweet.retweeters('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @public
	 */
	public async retweeters(tweetId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetchResource<CursoredData<User>>(EResourceType.TWEET_RETWEETERS, {
			id: tweetId,
			count: count,
			cursor: cursor,
		});

		return data!;
	}

	/**
	 * Search for tweets using a query.
	 *
	 * @param query - The query be used for searching the tweets.
	 * @param count - The number of tweets to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of tweets to fetch.
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
	 *
	 * @public
	 */
	public async search(query: TweetFilter, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Fetching the requested data
		const data = await this.fetchResource<CursoredData<Tweet>>(EResourceType.TWEET_SEARCH, {
			filter: query,
			count: count,
			cursor: cursor,
		});

		// Sorting the tweets by date, from recent to oldest
		data!.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data!;
	}

	/**
	 * Stream tweets in pseudo real-time using a filter.
	 *
	 * @param filter - The filter to be used for searching the tweets.
	 * @param pollingInterval - The interval in milliseconds to poll for new tweets. Default interval is 60000 ms.
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
	 *
	 * @public
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
}
