/**
 * The details of a single user.
 *
 * @public
 */
export interface IUser {
	/** The rest id of the user. */
	id: string;

	/** The username/screenname of the user. */
	userName: string;

	/** The full name of the user. */
	fullName: string;

	/** The creation date of user's account. */
	createdAt: string;

	/** The user's description. */
	description: string;

	/** Whether the account is verified or not. */
	isVerified: boolean;

	/** The number of tweets liked by the user. */
	favouritesCount: number;

	/** The number of followers of the user. */
	followersCount: number;

	/** The number of following of the user. */
	followingsCount: number;

	/** The number of tweets made by the user. */
	statusesCount: number;

	/** The location of user as provided by user. */
	location: string;

	/** The rest id of the tweet pinned in the user's profile. */
	pinnedTweet: string;

	/** The url of the profile banner image. */
	profileBanner: string;

	/** The url of the profile image. */
	profileImage: string;
}
