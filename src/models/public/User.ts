// PACKAGES
import { IUser as IRawUser } from 'rettiwt-core';

// TYPES
import { IUser } from '../../types/public/User';

/**
 * The details of a single user.
 *
 * @public
 */
export class User implements IUser {
	/** The rest id of the user. */
	public id: string;

	/** The username/screenname of the user. */
	public userName: string;

	/** The full name of the user. */
	public fullName: string;

	/** The creation date of user's account. */
	public createdAt: string;

	/** The user's description. */
	public description: string;

	/** Whether the account is verified or not. */
	public isVerified: boolean;

	/** The number of tweets liked by the user. */
	public favouritesCount: number;

	/** The number of followers of the user. */
	public followersCount: number;

	/** The number of following of the user. */
	public followingsCount: number;

	/** The number of tweets made by the user. */
	public statusesCount: number;

	/** The location of user as provided by user. */
	public location: string;

	/** The rest id of the tweet pinned in the user's profile. */
	public pinnedTweet: string;

	/** The url of the profile banner image. */
	public profileBanner: string;

	/** The url of the profile image. */
	public profileImage: string;

	/**
	 * Initializes a new User from the given raw user data.
	 *
	 * @param user - The raw user data.
	 */
	public constructor(user: IRawUser) {
		this.id = user.rest_id;
		this.userName = user.legacy.screen_name;
		this.fullName = user.legacy.name;
		this.createdAt = user.legacy.created_at;
		this.description = user.legacy.description;
		this.isVerified = user.legacy.verified;
		this.favouritesCount = user.legacy.favourites_count;
		this.followersCount = user.legacy.followers_count;
		this.followingsCount = user.legacy.friends_count;
		this.statusesCount = user.legacy.statuses_count;
		this.location = user.legacy.location;
		this.pinnedTweet = user.legacy.pinned_tweet_ids_str[0];
		this.profileBanner = user.legacy.profile_banner_url;
		this.profileImage = user.legacy.profile_image_url_https;
	}
}
