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
	public id: string;
	public userName: string;
	public fullName: string;
	public createdAt: string;
	public description: string;
	public isVerified: boolean;
	public favouritesCount: number;
	public followersCount: number;
	public followingsCount: number;
	public statusesCount: number;
	public location: string;
	public pinnedTweet: string;
	public profileBanner: string;
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
