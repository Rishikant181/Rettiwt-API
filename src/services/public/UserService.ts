import {
	IUserDetailsResponse,
	IUserFollowersResponse,
	IUserFollowingResponse,
	IUserHighlightsResponse,
	IUserLikesResponse,
	IUserMediaResponse,
	IUserSubscriptionsResponse,
	IUserTweetsAndRepliesResponse,
	IUserTweetsResponse,
} from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IRettiwtConfig } from '../../types/RettiwtConfig';
import { FetcherService } from '../internal/FetcherService';

/**
 * Handles fetching of data related to user account
 *
 * @public
 */
export class UserService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config?: IRettiwtConfig) {
		super(config);
	}

	/**
	 * Get the details of a user.
	 *
	 * @param id - The username/id of the target user.
	 * @returns The details of the given user.
	 *
	 * @example Fetching the details of the Twitter user with username 'user1'
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User with username 'user1'
	 * rettiwt.user.details('user1')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @example Fetching the details of the Twitter user with id '12345678'
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User with id '12345678'
	 * rettiwt.user.details('12345678')
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
	public async details(id: string): Promise<User | undefined> {
		let resource: EResourceType;

		// If username is given
		if (isNaN(Number(id))) {
			resource = EResourceType.USER_DETAILS_BY_USERNAME;
		}
		// If id is given
		else {
			resource = EResourceType.USER_DETAILS_BY_ID;
		}

		// Fetching raw details
		const response = await this.request<IUserDetailsResponse>(resource, { id: id });

		// Deserializing response
		const data = this.extract<User>(response, resource);

		return data;
	}

	/**
	 * Get the list followers of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 * @returns The list of users following the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 followers of the User with id '12345678'
	 * rettiwt.user.followers('12345678')
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
	public async followers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_FOLLOWERS;

		// Fetching raw list of followers
		const response = await this.request<IUserFollowersResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<User>>(response, resource)!;

		return data;
	}

	/**
	 * Get the list of users who are followed by the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of following to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of following to fetch.
	 * @returns The list of users followed by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 following of the User with id '12345678'
	 * rettiwt.user.following('12345678')
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
	public async following(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_FOLLOWING;

		// Fetching raw list of following
		const response = await this.request<IUserFollowingResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<User>>(response, resource)!;

		return data;
	}

	/**
	 * Get the highlighted tweets of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 * @returns The list of highlighted tweets of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the top 100 highlights of the User with id '12345678'
	 * rettiwt.user.highlights('12345678')
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
	public async highlights(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_HIGHLIGHTS;

		// Fetching raw list of highlights
		const response = await this.request<IUserHighlightsResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<Tweet>>(response, resource)!;

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
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 liked Tweets of the User with id '12345678'
	 * rettiwt.user.likes('12345678')
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
	public async likes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_LIKES;

		// Fetching raw list of likes
		const response = await this.request<IUserLikesResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<Tweet>>(response, resource)!;

		return data;
	}

	/**
	 * Get the media timeline of the given user
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of media to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of media to fetch
	 * @returns The media timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 timeline media tweets of the User with id '12345678'
	 * rettiwt.user.timeline('12345678')
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
	public async media(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_MEDIA;

		// Fetching raw list of media
		const response = await this.request<IUserMediaResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<Tweet>>(response, resource)!;

		return data;
	}

	/**
	 * Get the reply timeline of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of replies to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of replies to fetch.
	 * @returns The reply timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 timeline replies of the User with id '12345678'
	 * rettiwt.user.replies('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks If the target user has a pinned tweet, the returned reply timeline has one item extra and this is always the pinned tweet.
	 *
	 * @public
	 */
	public async replies(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_TIMELINE_AND_REPLIES;

		// Fetching raw list of replies
		const response = await this.request<IUserTweetsAndRepliesResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<Tweet>>(response, resource)!;

		return data;
	}

	/**
	 * Get the list of subscriptions of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of subscriptions to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of subscriptions to fetch.
	 * @returns The list of subscriptions by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 subscriptions of the User with id '12345678'
	 * rettiwt.user.subscriptions('12345678')
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
	public async subscriptions(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_SUBSCRIPTIONS;

		// Fetching raw list of subscriptions
		const response = await this.request<IUserSubscriptionsResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<User>>(response, resource)!;

		return data;
	}

	/**
	 * Get the tweet timeline of the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of timeline items to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of timeline items to fetch.
	 * @returns The timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 20 timeline tweets of the User with id '12345678'
	 * rettiwt.user.timeline('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 * - If the target user has a pinned tweet, the returned timeline has one item extra and this is always the pinned tweet.
	 * - If timeline is fetched without authenticating, then the most popular tweets of the target user are returned instead.
	 *
	 * @public
	 */
	public async timeline(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_TIMELINE;

		// Fetching raw list of tweets
		const response = await this.request<IUserTweetsResponse>(resource, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = this.extract<CursoredData<Tweet>>(response, resource)!;

		return data;
	}
}
