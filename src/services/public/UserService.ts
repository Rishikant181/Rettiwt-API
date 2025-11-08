import { Extractors } from '../../collections/Extractors';
import { RawAnalyticsGranularity, RawAnalyticsMetric } from '../../enums/raw/Analytics';
import { ResourceType } from '../../enums/Resource';
import { Analytics } from '../../models/data/Analytics';
import { CursoredData } from '../../models/data/CursoredData';
import { List } from '../../models/data/List';
import { Notification } from '../../models/data/Notification';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IUserAffiliatesResponse } from '../../types/raw/user/Affiliates';
import { IUserAnalyticsResponse } from '../../types/raw/user/Analytics';
import { IUserBookmarksResponse } from '../../types/raw/user/Bookmarks';
import { IUserDetailsResponse } from '../../types/raw/user/Details';
import { IUserDetailsBulkResponse } from '../../types/raw/user/DetailsBulk';
import { IUserFollowResponse } from '../../types/raw/user/Follow';
import { IUserFollowedResponse } from '../../types/raw/user/Followed';
import { IUserFollowersResponse } from '../../types/raw/user/Followers';
import { IUserFollowingResponse } from '../../types/raw/user/Following';
import { IUserHighlightsResponse } from '../../types/raw/user/Highlights';
import { IUserLikesResponse } from '../../types/raw/user/Likes';
import { IUserListsResponse } from '../../types/raw/user/Lists';
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
	 * @param id - The ID of the target user. If no id is provided, the logged-in user's id is used.
	 * @param count - The number of affiliates to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of affiliates to fetch.
	 *
	 * @returns The list of users affiliated to the target user.
	 *
	 * @example
	 *
	 * ```ts
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
		const resource = ResourceType.USER_AFFILIATES;

		// Fetching raw list of affiliates
		const response = await this.request<IUserAffiliatesResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the analytics overview of the logged in user.
	 *
	 * @param fromTime - The start time of the analytics period. Defaults to 7 days ago.
	 * @param toTime - The end time of the analytics period. Defaults to now.
	 * @param granularity - The granularity of the analytics data. Defaults to daily.
	 * @param metrics - The metrics to include in the analytics data. Defaults to all available metrics available.
	 * @param showVerifiedFollowers - Whether to include verified follower count and relationship counts in the response. Defaults to true.
	 *
	 * @returns The raw analytics data of the user.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the analytics overview of the logged in user
	 * rettiwt.user.analytics().then(res => {
	 *  console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async analytics(
		fromTime?: Date,
		toTime?: Date,
		granularity?: RawAnalyticsGranularity,
		metrics?: RawAnalyticsMetric[],
		showVerifiedFollowers?: boolean,
	): Promise<Analytics> {
		const resource = ResourceType.USER_ANALYTICS;

		// Define default values if not provided
		fromTime = fromTime ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
		toTime = toTime ?? new Date();
		granularity = granularity ?? RawAnalyticsGranularity.DAILY;
		metrics = metrics ?? Object.values(RawAnalyticsMetric);
		showVerifiedFollowers = showVerifiedFollowers ?? true;

		// Fetching raw analytics
		const response = await this.request<IUserAnalyticsResponse>(resource, {
			fromTime,
			toTime,
			granularity,
			metrics,
			showVerifiedFollowers,
		});

		const data = Extractors[resource](response);

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
	 *
	 * ```ts
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
		const resource = ResourceType.USER_BOOKMARKS;

		// Fetching raw list of likes
		const response = await this.request<IUserBookmarksResponse>(resource, {
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the details of the logged in user.
	 *
	 * @returns The details of the user.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User
	 * rettiwt.user.details()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(): Promise<User | undefined>;

	/**
	 * Get the details of a user.
	 *
	 * @param id - The ID/username of the target user.
	 *
	 * @returns The details of the user.
	 *
	 * @example
	 *
	 * #### Fetching the details of a single user using username
	 * ```ts
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
	 *
	 * #### Fetching the details of a single user using ID
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User with id '1234567890'
	 * rettiwt.user.details('1234567890')
	 * .then(res => {
	 * 	console.log(res);	# 'res' is a single tweet
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(id: string): Promise<User | undefined>;

	/**
	 * Get the details of multiple users in bulk.
	 *
	 * @param id - The list of IDs of the target users.
	 *
	 * @returns The details of the users.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the users with IDs '123', '456', '789'
	 * rettiwt.user.details(['123', '456', '789'])
	 * .then(res => {
	 * 	console.log(res);	# 'res' is an array of users
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(id: string[]): Promise<User[]>;

	public async details(id?: string | string[]): Promise<User | User[] | undefined> {
		let resource: ResourceType;

		// If details of multiple users required
		if (Array.isArray(id)) {
			resource = ResourceType.USER_DETAILS_BY_IDS_BULK;

			// Fetching raw details
			const response = await this.request<IUserDetailsBulkResponse>(resource, { ids: id });

			// Deserializing response
			const data = Extractors[resource](response, id);

			return data;
		}
		// If details of single user required
		else {
			// If username is given
			if (id && isNaN(Number(id))) {
				resource = ResourceType.USER_DETAILS_BY_USERNAME;
				if (id?.startsWith("@")) {
					id = id.slice(1);
				}
			}
			// If id is given (or not, for self details)
			else {
				resource = ResourceType.USER_DETAILS_BY_ID;
			}

			// If no ID is given, and not authenticated, skip
			if (!id && !this.config.userId) {
				return undefined;
			}

			// Fetching raw details
			const response = await this.request<IUserDetailsResponse>(resource, { id: id ?? this.config.userId });

			// Deserializing response
			const data = Extractors[resource](response);

			return data;
		}
	}

	/**
	 * Follow a user.
	 *
	 * @param id - The ID the user to be followed.
	 *
	 * @returns Whether following was successful or not.
	 *
	 * @throws Code 108 if given user id is invalid.
	 *
	 * @example
	 *
	 * ```ts
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
		const resource = ResourceType.USER_FOLLOW;

		// Following the user
		const response = await this.request<IUserFollowResponse>(ResourceType.USER_FOLLOW, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

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
	 *
	 * ```ts
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
		const resource = ResourceType.USER_FEED_FOLLOWED;

		// Fetching raw list of tweets
		const response = await this.request<IUserFollowedResponse>(resource, {
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list followers of a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 *
	 * @returns The list of users following the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	public async followers(id?: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.USER_FOLLOWERS;

		// Fetching raw list of followers
		const response = await this.request<IUserFollowersResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of users who are followed by a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of following to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of following to fetch.
	 *
	 * @returns The list of users followed by the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	public async following(id?: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.USER_FOLLOWING;

		// Fetching raw list of following
		const response = await this.request<IUserFollowingResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the highlighted tweets of a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of followers to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 *
	 * @returns The list of highlighted tweets of the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	public async highlights(id?: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.USER_HIGHLIGHTS;

		// Fetching raw list of highlights
		const response = await this.request<IUserHighlightsResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

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
	 *
	 * ```ts
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
		const resource = ResourceType.USER_LIKES;

		// Fetching raw list of likes
		const response = await this.request<IUserLikesResponse>(resource, {
			id: this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of of the the logged in user. Includes both followed and owned.
	 *
	 * @param count - The number of lists to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of likes to fetch.
	 *
	 * @returns The list of tweets liked by the target user.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 Lists of the logged in User
	 * rettiwt.user.likes()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async lists(count?: number, cursor?: string): Promise<CursoredData<List>> {
		const resource = ResourceType.USER_LISTS;

		// Fetching raw list of lists
		const response = await this.request<IUserListsResponse>(resource, {
			id: this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the media timeline of a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of media to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of media to fetch
	 *
	 * @returns The media timeline of the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	public async media(id?: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.USER_MEDIA;

		// Fetching raw list of media
		const response = await this.request<IUserMediaResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

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
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Creating a function that streams all new notifications
	 * async function streamNotifications() {
	 * 	try {
	 * 		// Awaiting for the notifications returned by the AsyncGenerator returned by the method
	 * 		for await (const notification of rettiwt.user.notifications(5000)) {
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
		const resource = ResourceType.USER_NOTIFICATIONS;

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
			const notifications = Extractors[resource](response);

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
	 *
	 * ```ts
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
		const resource = ResourceType.USER_FEED_RECOMMENDED;

		// Fetching raw list of tweets
		const response = await this.request<IUserRecommendedResponse>(resource, {
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the reply timeline of a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of replies to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of replies to fetch.
	 *
	 * @returns The reply timeline of the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	 * @remarks
	 *
	 * If the target user has a pinned tweet, the returned reply timeline has one item extra and this is always the pinned tweet.
	 */
	public async replies(id?: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.USER_TIMELINE_AND_REPLIES;

		// Fetching raw list of replies
		const response = await this.request<IUserTweetsAndRepliesResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of subscriptions of a user.
	 *
	 * @deprecated Currently not working.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of subscriptions to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of subscriptions to fetch.
	 *
	 * @returns The list of subscriptions by the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	public async subscriptions(id?: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.USER_SUBSCRIPTIONS;

		// Fetching raw list of subscriptions
		const response = await this.request<IUserSubscriptionsResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the tweet timeline of a user.
	 *
	 * @param id - The ID of the target user. If no ID is provided, the logged-in user's ID is used.
	 * @param count - The number of timeline items to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of timeline items to fetch.
	 *
	 * @returns The timeline of the target user.
	 *
	 * @example
	 *
	 * ```ts
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
	 *
	 * - If the target user has a pinned tweet, the returned timeline has one item extra and this is always the pinned tweet.
	 * - If timeline is fetched without authenticating, then the most popular tweets of the target user are returned instead.
	 */
	public async timeline(id?: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.USER_TIMELINE;

		// Fetching raw list of tweets
		const response = await this.request<IUserTweetsResponse>(resource, {
			id: id ?? this.config.userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Unfollow a user.
	 *
	 * @param id - The ID the user to be unfollowed.
	 *
	 * @returns Whether unfollowing was successful or not.
	 *
	 * @example
	 *
	 * ```ts
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
		const resource = ResourceType.USER_UNFOLLOW;

		// Unfollowing the user
		const response = await this.request<IUserUnfollowResponse>(ResourceType.USER_UNFOLLOW, { id: id });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}
}
