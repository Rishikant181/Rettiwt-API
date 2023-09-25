// PACKAGES
import { EResourceType } from 'rettiwt-core';

// SERVICES
import { FetcherService } from './FetcherService';

// MODELS
import { User } from '../models/User';
import { Tweet } from '../models/Tweet';

// TYPES
import { CursoredData } from '../models/CursoredData';

/**
 * Handles fetching of data related to user account
 *
 * @public
 */
export class UserService extends FetcherService {
	/**
	 * @param apiKey - The apiKey (cookie) to use for authenticating Rettiwt against Twitter API.
	 * @param proxyUrl - Optional URL with proxy configuration to use for requests to Twitter API.
	 *
	 * @internal
	 */
	constructor(apiKey: string, proxyUrl?: URL) {
		super(apiKey, proxyUrl);
	}

	/**
	 * Get the details of a user.
	 *
	 * @param id - The username/id of the target user.
	 * @returns The details of the given user.
	 *
	 * @public
	 */
	async details(id: string): Promise<User> {
		let data: CursoredData<User>;

		// If username is given
		if (isNaN(Number(id))) {
			// Fetching the requested data
			data = await this.fetch<User>(EResourceType.USER_DETAILS, { id: id });
		}
		// If id is given
		else {
			// Fetching the requested data
			data = await this.fetch<User>(EResourceType.USER_DETAILS_BY_ID, { id: id });
		}

		return data.list[0];
	}

	/**
	 * Get the list of users who are followed by the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of following to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of following to fetch.
	 * @returns The list of users followed by the target user.
	 *
	 * @public
	 */
	async following(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetch<User>(EResourceType.USER_FOLLOWING, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		return data;
	}

	/**
	 * Get the list followers of a given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 * @returns The list of users following the target user.
	 *
	 * @public
	 */
	async followers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetch<User>(EResourceType.USER_FOLLOWERS, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		return data;
	}

	/**
	 * Get the list of tweets liked by the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of likes to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of likes to fetch.
	 * @returns The list of tweets liked by the target user.
	 *
	 * @public
	 */
	async likes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Fetching the requested data
		const data = await this.fetch<Tweet>(EResourceType.USER_LIKES, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		return data;
	}

	/**
	 * Get the timeline of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of timeline items to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of timeline items to fetch.
	 * @returns The timeline of the target user.
	 *
	 * @remarks If the target user has a pinned tweet, the returned timeline has one item extra and this is always the pinned tweet.
	 *
	 * @public
	 */
	async timeline(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Fetching the requested data
		const data = await this.fetch<Tweet>(EResourceType.USER_TWEETS, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		return data;
	}
}
