import {
	IUserDetailsResponse,
	IUserFollowedResponse,
	IUserFollowersResponse,
	IUserFollowingResponse,
	IUserFollowResponse,
	IUserHighlightsResponse,
	IUserLikesResponse,
	IUserMediaResponse,
	IUserRecommendedResponse,
	IUserSubscriptionsResponse,
	IUserTweetsAndRepliesResponse,
	IUserTweetsResponse,
	IUserUnfollowResponse,
} from 'rettiwt-core';

import { extractors } from '../../collections/Extractors';
import { EResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to user account
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
	 *
	 * @returns
	 * The details of the given user.
	 * If no user matches the given id, returns `undefined`.
	 *
	 * @example
	 * Fetching the details using username
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
	 * @example
	 * Fetching the details using id
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User with id '1234567890'
	 * rettiwt.user.details('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
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
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Follow a user.
	 *
	 * @param id - The id the user to be followed.
	 *
	 * @returns Whether following was successful or not.
	 *
	 * @throws Code 108 if given user id is invalid.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Following the User with id '1234567890'
	 * rettiwt.user.follow('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async follow(id: string): Promise<boolean> {
		const resource = EResourceType.USER_FOLLOW;

		// Following the user
		const response = await this.request<IUserFollowResponse>(EResourceType.USER_FOLLOW, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Get the followed feed of the logged in user.
	 *
	 * @param cursor - The cursor to the batch of feed items to fetch.
	 *
	 * @returns - The followed feed of the logged-in user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 35 followed feed items of the logged-in user
	 * rettiwt.user.followed()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks Always returns 35 feed items, with no way to customize the count.
	 */
	public async followed(cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_FEED_FOLLOWED;

		// Fetching raw list of tweets
		const response = await this.request<IUserFollowedResponse>(resource, {
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the list followers of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 *
	 * @returns The list of users following the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 followers of the User with id '1234567890'
	 * rettiwt.user.followers('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async followers(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_FOLLOWERS;

		// Fetching raw list of followers
		const response = await this.request<IUserFollowersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of users who are followed by a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of following to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of following to fetch.
	 *
	 * @returns The list of users followed by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 following of the User with id '1234567890'
	 * rettiwt.user.following('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async following(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_FOLLOWING;

		// Fetching raw list of following
		const response = await this.request<IUserFollowingResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the highlighted tweets of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 *
	 * @returns The list of highlighted tweets of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the top 100 highlights of the User with id '1234567890'
	 * rettiwt.user.highlights('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async highlights(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_HIGHLIGHTS;

		// Fetching raw list of highlights
		const response = await this.request<IUserHighlightsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of tweets liked by the logged in user.
	 *
	 * @param count - The number of likes to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of likes to fetch.
	 *
	 * @returns The list of tweets liked by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 liked Tweets of the logged in User
	 * rettiwt.user.likes()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async likes(count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_LIKES;

		// Fetching raw list of likes
		const response = await this.request<IUserLikesResponse>(resource, {
			id: this.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the media timeline of a user
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of media to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of media to fetch
	 *
	 * @returns The media timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 timeline media tweets of the User with id '1234567890'
	 * rettiwt.user.timeline('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async media(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_MEDIA;

		// Fetching raw list of media
		const response = await this.request<IUserMediaResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the recommended feed of the logged in user.
	 *
	 * @param cursor - The cursor to the batch of feed items to fetch.
	 *
	 * @returns - The recommended feed of the logged-in user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 35 recommended feed items of the logged-in user
	 * rettiwt.user.recommended()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks Always returns 35 feed items, with no way to customize the count.
	 */
	public async recommended(cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_FEED_RECOMMENDED;

		// Fetching raw list of tweets
		const response = await this.request<IUserRecommendedResponse>(resource, {
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the reply timeline of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of replies to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of replies to fetch.
	 *
	 * @returns The reply timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 timeline replies of the User with id '1234567890'
	 * rettiwt.user.replies('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks If the target user has a pinned tweet, the returned reply timeline has one item extra and this is always the pinned tweet.
	 */
	public async replies(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_TIMELINE_AND_REPLIES;

		// Fetching raw list of replies
		const response = await this.request<IUserTweetsAndRepliesResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of subscriptions of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of subscriptions to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of subscriptions to fetch.
	 *
	 * @returns The list of subscriptions by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 subscriptions of the User with id '1234567890'
	 * rettiwt.user.subscriptions('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async subscriptions(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_SUBSCRIPTIONS;

		// Fetching raw list of subscriptions
		const response = await this.request<IUserSubscriptionsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the tweet timeline of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of timeline items to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of timeline items to fetch.
	 *
	 * @returns The timeline of the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 20 timeline tweets of the User with id '1234567890'
	 * rettiwt.user.timeline('1234567890')
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
	 */
	public async timeline(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_TIMELINE;

		// Fetching raw list of tweets
		const response = await this.request<IUserTweetsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Unfollow a user.
	 *
	 * @param id - The id the user to be unfollowed.
	 *
	 * @returns Whether unfollowing was successful or not.
	 *
	 * @throws Code 34 if given user id is invalid.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Unfollowing the User with id '12345678'
	 * rettiwt.user.unfollow('12345678')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unfollow(id: string): Promise<boolean> {
		const resource = EResourceType.USER_UNFOLLOW;

		// Unfollowing the user
		const response = await this.request<IUserUnfollowResponse>(EResourceType.USER_UNFOLLOW, { id: id });

		// Deserializing the response
		const data = extractors[resource](response) ?? false;

		return data;
	}
}
