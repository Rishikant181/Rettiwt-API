/**
 * The details of a single community member or moderator from a slice response.
 *
 * @public
 */
export interface ICommunityMember {
	/** The rest id of the user. */
	id: string;

	/** The display name of the user. */
	name?: string;

	/** The screen name of the user. */
	screenName?: string;

	/** The avatar URL of the user. */
	avatarUrl?: string;

	/** The role of the user in the community. */
	communityRole?: string;

	/** Whether the user is verified. */
	isVerified?: boolean;

	/** Whether the user is protected. */
	isProtected?: boolean;

	/** Whether the authenticated user follows them. */
	isFollowed?: boolean;

	/** Whether they follow the authenticated user. */
	isFollowing?: boolean;

	/** Whether the authenticated user blocks them. */
	isBlocked?: boolean;
}
