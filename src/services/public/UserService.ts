import axios from 'axios';

import { Cookie } from 'cookiejar';

import { Extractors } from '../../collections/Extractors';
import { RawAnalyticsGranularity, RawAnalyticsMetric } from '../../enums/raw/Analytics';
import { ResourceType } from '../../enums/Resource';
import { ProfileUpdateOptions } from '../../models/args/ProfileArgs';
import { AuthCredential } from '../../models/auth/AuthCredential';
import { Analytics } from '../../models/data/Analytics';
import { BookmarkFolder } from '../../models/data/BookmarkFolder';
import { CursoredData } from '../../models/data/CursoredData';
import { List } from '../../models/data/List';
import { Notification } from '../../models/data/Notification';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { UserAbout } from '../../models/data/UserAbout';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IProfileUpdateOptions } from '../../types/args/ProfileArgs';
import { IUserAboutResponse } from '../../types/raw/user/About';
import { IUserAffiliatesResponse } from '../../types/raw/user/Affiliates';
import { IUserAnalyticsResponse } from '../../types/raw/user/Analytics';
import { IUserBookmarkFoldersResponse } from '../../types/raw/user/BookmarkFolders';
import { IUserBookmarkFolderTweetsResponse } from '../../types/raw/user/BookmarkFolderTweets';
import { IUserBookmarksResponse } from '../../types/raw/user/Bookmarks';
import { IUserChangePasswordResponse } from '../../types/raw/user/ChangePassword';
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
import { IUserProfileUpdateResponse } from '../../types/raw/user/ProfileUpdate';
import { IUserRecommendedResponse } from '../../types/raw/user/Recommended';
import { IUserSearchResponse } from '../../types/raw/user/Search';
import { IUserSettingsResponse } from '../../types/raw/user/Settings';
import { IUserSubscriptionsResponse } from '../../types/raw/user/Subscriptions';
import { IUserTweetsResponse } from '../../types/raw/user/Tweets';
import { IUserTweetsAndRepliesResponse } from '../../types/raw/user/TweetsAndReplies';
import { IUserUnfollowResponse } from '../../types/raw/user/Unfollow';

import { AuthService } from '../internal/AuthService';

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

	private _base64ByteSize(base64Data: string): number {
		const paddingMatch = base64Data.match(/=+$/);
		const paddingLength = paddingMatch ? paddingMatch[0].length : 0;

		return (base64Data.length * 3) / 4 - paddingLength;
	}

	private _normalizeBase64(payload: string): string {
		const trimmedPayload = payload.trim();
		const lowerCasePayload = trimmedPayload.toLowerCase();
		const base64Marker = ';base64,';

		if (lowerCasePayload.startsWith('data:')) {
			const markerIndex = lowerCasePayload.indexOf(base64Marker);
			if (markerIndex !== -1) {
				return trimmedPayload.slice(markerIndex + base64Marker.length).trim();
			}
		}

		return trimmedPayload;
	}

	private _refreshApiKeyFromResponseCookies(setCookieHeader: string | string[] | undefined): void {
		if (!this.config.apiKey || !setCookieHeader) {
			return;
		}

		const requiredCookieNames = new Set(['auth_token', 'ct0', 'kdt', 'twid']);
		const currentCookieString = AuthService.decodeCookie(this.config.apiKey);
		const cookiePairs = this._splitSetCookieHeader(setCookieHeader);
		const cookiesMap = new Map<string, string>();

		for (const cookieEntry of currentCookieString.split(';')) {
			const trimmedEntry = cookieEntry.trim();
			const separatorIndex = trimmedEntry.indexOf('=');

			if (!trimmedEntry || separatorIndex < 1) {
				continue;
			}

			const key = trimmedEntry.slice(0, separatorIndex).trim();
			const value = trimmedEntry.slice(separatorIndex + 1).trim();
			if (!key || !value || !requiredCookieNames.has(key)) {
				continue;
			}

			cookiesMap.set(key, value);
		}

		let hasUpdate = false;
		for (const cookiePair of cookiePairs) {
			const cookieValuePair = cookiePair.split(';', 1)[0]?.trim();
			const separatorIndex = cookieValuePair?.indexOf('=') ?? -1;

			if (!cookieValuePair || separatorIndex < 1) {
				continue;
			}

			const key = cookieValuePair.slice(0, separatorIndex).trim();
			const value = cookieValuePair.slice(separatorIndex + 1).trim();
			if (!key || !value || !requiredCookieNames.has(key)) {
				continue;
			}

			cookiesMap.set(key, value);
			hasUpdate = true;
		}

		if (!hasUpdate || !cookiesMap.has('twid')) {
			return;
		}

		let mergedCookieString = '';
		for (const [key, value] of cookiesMap.entries()) {
			mergedCookieString += `${key}=${value};`;
		}

		if (!mergedCookieString) {
			return;
		}

		try {
			this.config.apiKey = AuthService.encodeCookie(mergedCookieString);
		} catch {
			// Ignore cookie rotation errors and leave existing apiKey unchanged.
		}
	}

	/**
	 * Fetches a fresh ct0 (CSRF token) from Twitter by making a lightweight
	 * authenticated request, then rotates the apiKey with the updated cookie.
	 */
	private async _refreshCsrfToken(): Promise<void> {
		if (!this.config.apiKey) {
			return;
		}

		try {
			const cred = new AuthCredential(
				AuthService.decodeCookie(this.config.apiKey)
					.split(';')
					.map((item) => new Cookie(item)),
			);

			const refreshResponse = await axios.get('https://x.com/i/api/1.1/account/verify_credentials.json', {
				headers: {
					...cred.toHeader(),
					authorization:
						'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
				},
				httpAgent: this.config.httpsAgent,
				httpsAgent: this.config.httpsAgent,
				validateStatus: () => true,
			});

			this._refreshApiKeyFromResponseCookies(refreshResponse.headers['set-cookie']);
		} catch {
			// Best-effort: if ct0 refresh fails, leave apiKey as-is
		}
	}

	private _splitSetCookieHeader(setCookieHeader: string | string[]): string[] {
		if (Array.isArray(setCookieHeader)) {
			return setCookieHeader;
		}

		return setCookieHeader.split(/,(?=\s*[^;,]+=)/g);
	}

	private _validateBase64Payload(payload: string, fieldName: string): string {
		const normalizedPayload = this._normalizeBase64(payload).replace(/\s+/g, '');

		if (normalizedPayload.length === 0) {
			throw new Error(`${fieldName} cannot be empty`);
		}

		if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalizedPayload)) {
			throw new Error(`${fieldName} must be valid base64`);
		}

		return normalizedPayload;
	}

	/**
	 * Get the about profile of a user.
	 *
	 * @param userName - The username/screenname of the target user.
	 *
	 * @returns The about profile of the user.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the about profile of the User with username 'user1' or '@user1'
	 * rettiwt.user.about('user1') // or @user1
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async about(userName: string): Promise<UserAbout | undefined> {
		const resource = ResourceType.USER_ABOUT_BY_USERNAME;

		if (userName.startsWith('@')) {
			userName = userName.slice(1);
		}

		// Fetching raw about profile
		const response = await this.request<IUserAboutResponse>(resource, { id: userName });

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
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
	 * Get the list of tweets in a specific bookmark folder of the logged in user.
	 *
	 * @param folderId - The ID of the bookmark folder.
	 * @param count - The number of tweets to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 *
	 * @returns The list of tweets in the bookmark folder.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 tweets from bookmark folder with ID '2001752149647049173'
	 * rettiwt.user.bookmarkFolderTweets('2001752149647049173')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async bookmarkFolderTweets(folderId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.USER_BOOKMARK_FOLDER_TWEETS;

		// Fetching raw list of tweets from folder
		const response = await this.request<IUserBookmarkFolderTweetsResponse>(resource, {
			id: folderId,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of bookmark folders of the logged in user.
	 *
	 * @param cursor - The cursor to the batch of bookmark folders to fetch.
	 *
	 * @returns The list of bookmark folders.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching all bookmark folders of the logged in user
	 * rettiwt.user.bookmarkFolders()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async bookmarkFolders(cursor?: string): Promise<CursoredData<BookmarkFolder>> {
		const resource = ResourceType.USER_BOOKMARK_FOLDERS;

		// Fetching raw list of bookmark folders
		const response = await this.request<IUserBookmarkFoldersResponse>(resource, {
			cursor: cursor,
		});

		// Deserializing response
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
	 * Changes the password of the authenticated user.
	 *
	 * @param currentPassword - The current account password.
	 * @param newPassword - The new password to set.
	 * @returns Whether the password was changed successfully.
	 *
	 * @remarks
	 * After a successful password change, this method attempts to rotate the current
	 * `apiKey` using cookies returned by Twitter. If rotation is not possible, you
	 * must re-authenticate and obtain a new `apiKey` to continue making authenticated
	 * requests.
	 */
	public async changePassword(currentPassword: string, newPassword: string): Promise<boolean> {
		const resource = ResourceType.USER_PASSWORD_CHANGE;

		const response = await this.requestWithResponse<IUserChangePasswordResponse>(resource, {
			changePassword: { currentPassword, newPassword },
		});

		const data = Extractors[resource](response.data) ?? false;
		if (data) {
			this._refreshApiKeyFromResponseCookies(response.headers['set-cookie']);
			await this._refreshCsrfToken();
		}

		return data;
	}

	/**
	 * Changes the username (screen_name) of the authenticated user.
	 *
	 * @param newUsername - The new username (with or without `@`).
	 * @returns Whether the username was changed successfully.
	 */
	public async changeUsername(newUsername: string): Promise<boolean> {
		const resource = ResourceType.USER_USERNAME_CHANGE;

		// Strip @ prefix if present
		const username = newUsername.startsWith('@') ? newUsername.slice(1) : newUsername;

		// Username validation
		if (username.length < 4) {
			throw new Error('Username must be at least 4 characters long');
		}
		if (username.length > 15) {
			throw new Error('Username cannot exceed 15 characters');
		}
		if (!/^[A-Za-z0-9_]+$/.test(username)) {
			throw new Error('Username can only contain letters, numbers, and underscores');
		}

		const response = await this.request<IUserSettingsResponse>(resource, {
			username,
		});

		const updatedUsername = Extractors[resource](response);

		return updatedUsername?.toLowerCase() === username.toLowerCase();
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
	 * // Fetching the details of the User with username 'user1' or '@user1'
	 * rettiwt.user.details('user1') // or @user1
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
				if (id?.startsWith('@')) {
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
	 * rettiwt.user.lists()
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
	 * Search for a username.
	 *
	 * @param userName - The username to search for.
	 * @param count - The number of results to fetch, must be \<= 20.
	 * @param cursor - The cursor to the batch of results to fetch.
	 *
	 * @returns The list of users that match the given username.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the top 5 matching users for the username 'user1'
	 * rettiwt.user.search('user1')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async search(userName: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource = ResourceType.USER_SEARCH;

		// Fetching raw list of filtered tweets
		const response = await this.request<IUserSearchResponse>(resource, {
			id: userName,
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

	/**
	 * Update the logged in user's profile.
	 *
	 * @param options - The profile update options.
	 *
	 * @returns Whether the profile update was successful or not.
	 *
	 * @example
	 *
	 * #### Updating only the display name
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Updating the display name of the logged in user
	 * rettiwt.user.updateProfile({ name: 'New Display Name' })
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
	 * #### Updating multiple profile fields
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Updating multiple profile fields
	 * rettiwt.user.updateProfile({
	 * 	name: 'New Display Name',
	 * 	location: 'Istanbul',
	 * 	description: 'Hello world!',
	 * 	url: 'https://example.com'
	 * })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async updateProfile(options: IProfileUpdateOptions): Promise<boolean> {
		const resource = ResourceType.USER_PROFILE_UPDATE;

		// Validating the options
		const validatedOptions = new ProfileUpdateOptions(options);

		// Updating the profile
		const response = await this.request<IUserProfileUpdateResponse>(resource, { profileOptions: validatedOptions });

		// Deserializing the response
		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Updates the profile banner of the authenticated user.
	 *
	 * @param bannerBase64 - The base64-encoded banner image data.
	 * @returns Whether the profile banner was updated successfully.
	 */
	public async updateProfileBanner(bannerBase64: string): Promise<boolean> {
		const resource = ResourceType.USER_PROFILE_BANNER_UPDATE;

		const validatedBanner = this._validateBase64Payload(bannerBase64, 'Profile banner');

		// Banner size validation (max 5 MB)
		const bannerSizeBytes = this._base64ByteSize(validatedBanner);
		if (bannerSizeBytes > 5 * 1024 * 1024) {
			throw new Error('Profile banner cannot exceed 5 MB');
		}

		const response = await this.request<IUserProfileUpdateResponse>(resource, {
			profileBanner: validatedBanner,
		});

		const data = Extractors[resource](response) ?? false;

		return data;
	}

	/**
	 * Updates the profile image of the authenticated user.
	 *
	 * @param imageBase64 - The base64-encoded image data.
	 * @returns Whether the profile image was updated successfully.
	 */
	public async updateProfileImage(imageBase64: string): Promise<boolean> {
		const resource = ResourceType.USER_PROFILE_IMAGE_UPDATE;

		const validatedImage = this._validateBase64Payload(imageBase64, 'Profile image');

		// Image size validation (max 2 MB)
		const imageSizeBytes = this._base64ByteSize(validatedImage);
		if (imageSizeBytes > 2 * 1024 * 1024) {
			throw new Error('Profile image cannot exceed 2 MB');
		}

		const response = await this.request<IUserProfileUpdateResponse>(resource, {
			profileImage: validatedImage,
		});

		const data = Extractors[resource](response) ?? false;

		return data;
	}
}
