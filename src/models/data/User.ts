import { IUser as IRawUser, ITimelineUser, IUser } from 'rettiwt-core';

import { ELogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';
import { LogService } from '../../services/internal/LogService';

/**
 * The details of a single user.
 *
 * @public
 */
export class User {
	/** The creation date of user's account. */
	public createdAt: string;

	/** The user's description. */
	public description?: string;

	/** The number of followers of the user. */
	public followersCount: number;

	/** The number of following of the user. */
	public followingsCount: number;

	/** The full name of the user. */
	public fullName: string;

	/** The rest id of the user. */
	public id: string;

	/** Whether the account is verified or not. */
	public isVerified: boolean;

	/** The number of tweets liked by the user. */
	public likeCount: number;

	/** The location of user as provided by user. */
	public location?: string;

	/** The rest id of the tweet pinned in the user's profile. */
	public pinnedTweet?: string;

	/** The url of the profile banner image. */
	public profileBanner?: string;

	/** The url of the profile image. */
	public profileImage: string;

	/** The number of tweets made by the user. */
	public statusesCount: number;

	/** The username/screenname of the user. */
	public userName: string;

	/**
	 * @param user - The raw user details.
	 */
	public constructor(user: IRawUser) {
		this.id = user.rest_id;
		this.userName = user.legacy.screen_name;
		this.fullName = user.legacy.name;
		this.createdAt = user.legacy.created_at;
		this.description = user.legacy.description.length ? user.legacy.description : undefined;
		this.isVerified = user.is_blue_verified;
		this.likeCount = user.legacy.favourites_count;
		this.followersCount = user.legacy.followers_count;
		this.followingsCount = user.legacy.friends_count;
		this.statusesCount = user.legacy.statuses_count;
		this.location = user.legacy.location.length ? user.legacy.location : undefined;
		this.pinnedTweet = user.legacy.pinned_tweet_ids_str[0];
		this.profileBanner = user.legacy.profile_banner_url;
		this.profileImage = user.legacy.profile_image_url_https;
	}

	/**
	 * Extracts and deserializes the list of users from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of users.
	 *
	 * @internal
	 */
	public static list(response: NonNullable<unknown>): User[] {
		const users: User[] = [];

		// Extracting the matching data
		const extract = findByFilter<ITimelineUser>(response, '__typename', 'TimelineUser');

		// Deserializing valid data
		for (const item of extract) {
			if (item.user_results?.result?.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.user_results.result.rest_id });

				users.push(new User(item.user_results.result));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `User not found, skipping`,
				});
			}
		}

		return users;
	}

	/**
	 * Extracts and deserializes a single target user from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The target deserialized user.
	 *
	 * @internal
	 */
	public static single(response: NonNullable<unknown>): User | undefined {
		const users: User[] = [];

		// Extracting the matching data
		const extract = findByFilter<IUser>(response, '__typename', 'User');

		// Deserializing valid data
		for (const item of extract) {
			if (item.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.rest_id });

				users.push(new User(item));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `User not found, skipping`,
				});
			}
		}

		return users.length ? users[0] : undefined;
	}
}
