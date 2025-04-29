import { extractors } from '../../collections/Extractors';
import { EResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { Notification } from '../../models/data/Notification';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IUserAffiliatesResponse } from '../../types/raw/user/Affiliates';
import { IUserBookmarksResponse } from '../../types/raw/user/Bookmarks';
import { IUserDetailsResponse } from '../../types/raw/user/Details';
import { IUserDetailsBulkResponse } from '../../types/raw/user/DetailsBulk';
import { IUserFollowResponse } from '../../types/raw/user/Follow';
import { IUserFollowedResponse } from '../../types/raw/user/Followed';
import { IUserFollowersResponse } from '../../types/raw/user/Followers';
import { IUserFollowingResponse } from '../../types/raw/user/Following';
import { IUserHighlightsResponse } from '../../types/raw/user/Highlights';
import { IUserLikesResponse } from '../../types/raw/user/Likes';
import { IUserMediaResponse } from '../../types/raw/user/Media';
import { IUserNotificationsResponse } from '../../types/raw/user/Notifications';
import { IUserRecommendedResponse } from '../../types/raw/user/Recommended';
import { IUserSubscriptionsResponse } from '../../types/raw/user/Subscriptions';
import { IUserTweetsResponse } from '../../types/raw/user/Tweets';
import { IUserTweetsAndRepliesResponse } from '../../types/raw/user/TweetsAndReplies';
import { IUserUnfollowResponse } from '../../types/raw/user/Unfollow';

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
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Get the list affiliates of a user.
	 *
	 * @param id - The id of the target user.
	 * @param count - The number of affiliates to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of affiliates to fetch.
	 *
	 * @returns The list of users affiliated to the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 affiliates of the User with id '1234567890'
	 * rettiwt.user.affiliates('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async affiliates(id?: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = EResourceType.USER_AFFILIATES;

		// Fetching raw list of affiliates
		const response = await this.request<IUserAffiliatesResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of bookmarks of the logged in user.
	 *
	 * @param count - The number of bookmakrs to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of bookmarks to fetch.
	 *
	 * @returns The list of tweets bookmarked by the target user.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 liked Tweets of the logged in User
	 * rettiwt.user.bookmarks()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async bookmarks(count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = EResourceType.USER_BOOKMARKS;

		// Fetching raw list of likes
		const response = await this.request<IUserBookmarksResponse>(resource, {
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the details of a user.
	 *
	 * @param id - The username/id(s) of the target user/users. If no ID is provided, uses ID of authenticated user.
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
	public async details<T extends string | string[] | undefined>(
		id: T,
	): Promise<T extends string | undefined ? User | undefined : User[]> {
		let resource: EResourceType;

		// If details of multiple users required
		if (Array.isArray(id)) {
			resource = EResourceType.USER_DETAILS_BY_IDS_BULK;

			// Fetching raw details
			const response = await this.request<IUserDetailsBulkResponse>(resource, { ids: id });

			// Deserializing response
			const data = extractors[resource](response, id);

			return data as T extends string | undefined ? User | undefined : User[];
		}
		// If details of single user required
		else {
			// If username is given
			if (id && isNaN(Number(id))) {
				resource = EResourceType.USER_DETAILS_BY_USERNAME;
			}
			// If id is given (or not, for self details)
			else {
				resource = EResourceType.USER_DETAILS_BY_ID;
			}

			// If no ID is given, and not authenticated, skip
			if (!id && !this.config.userId) {
				return undefined as T extends string | undefined ? User | undefined : User[];
			}

			// Fetching raw details
			const response = await this.request<IUserDetailsResponse>(resource, { id: id ?? this.config.userId });

			// Deserializing response
			const data = extractors[resource](response);

			return data as T extends string | undefined ? User | undefined : User[];
		}
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
			id: this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		return data;
	}

	/**
	 * Get the media timeline of a user.
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
	 * Stream notifications of the logged in user in pseudo real-time.
	 *
	 * @param pollingInterval - The interval in milliseconds to poll for new tweets. Default interval is 60000 ms.
	 *
	 * @returns An async generator that yields new notifications as they are received.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Creating a function that streams all new notifications
	 * async function streamNotifications() {
	 * 	try {
	 * 		// Awaiting for the notifications returned by the AsyncGenerator returned by the method
	 * 		for await (const notification of rettiwt.user.notifications(1000)) {
	 * 			console.log(notification.message);
	 * 		}
	 * 	}
	 * 	catch (err) {
	 * 		console.log(err);
	 * 	}
	 * }
	 *
	 * // Calling the function
	 * streamNotifications();
	 * ```
	 */
	public async *notifications(pollingInterval = 60000): AsyncGenerator<Notification> {
		const resource = EResourceType.USER_NOTIFICATIONS;

		/** Whether it's the first batch of notifications or not. */
		let first = true;

		/** The cursor to the last notification received. */
		let cursor: string | undefined = undefined;

		while (true) {
			// Pause execution for the specified polling interval before proceeding to the next iteration
			await new Promise((resolve) => setTimeout(resolve, pollingInterval));

			// Get the batch of notifications after the given cursor
			const response = await this.request<IUserNotificationsResponse>(resource, {
				count: 40,
				cursor: cursor,
			});

			// Deserializing response
			const notifications = extractors[resource](response);

			// Sorting the notifications by time, from oldest to recent
			notifications.list.sort((a, b) => new Date(a.receivedAt).valueOf() - new Date(b.receivedAt).valueOf());

			// If not first batch, return new notifications
			if (!first) {
				// Yield the notifications
				for (const notification of notifications.list) {
					yield notification;
				}
			}
			// Else do nothing, do nothing since first batch is notifications that have already been received
			else {
				first = false;
			}

			cursor = notifications.next;
		}
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
