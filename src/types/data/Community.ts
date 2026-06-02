/**
 * The details of a single Community.
 *
 * @public
 */
export interface ICommunity {
	/** The rest id of the community. */
	id: string;

	/** The display name of the community. */
	name?: string;

	/** The description of the community. */
	description?: string;

	/** The creation time of the community in ISO string format. */
	createdAt?: string;

	/** The id of the community creator. */
	creatorId?: string;

	/** The screen name of the community creator. */
	creatorScreenName?: string;

	/** Whether the creator is verified. */
	isCreatorVerified?: boolean;

	/** Whether the authenticated user is a member. */
	isMember?: boolean;

	/** Whether the community is marked as NSFW. */
	isNsfw?: boolean;

	/** The join policy of the community. */
	joinPolicy?: string;

	/** The member count of the community. */
	memberCount?: number;

	/** The current role of the authenticated user in the community. */
	role?: string;

	/** The custom banner details of the community. */
	customBanner?: ICommunityBanner;

	/** The default banner details of the community. */
	defaultBanner?: ICommunityBanner;

	/** The highlighted member avatars shown in the facepile. */
	membersFacepile: ICommunityMemberPreview[];

	/** The community rules. */
	rules: ICommunityRule[];

	/** Trending hashtags returned for the community. */
	trendingHashtags: string[];
}

/**
 * The details of a community banner image.
 *
 * @public
 */
export interface ICommunityBanner {
	/** The original banner URL. */
	url?: string;

	/** The original banner width. */
	width?: number;

	/** The original banner height. */
	height?: number;
}

/**
 * The details of a community rule.
 *
 * @public
 */
export interface ICommunityRule {
	/** The rest id of the rule. */
	id?: string;

	/** The rule text. */
	name?: string;
}

/**
 * The minimal details of a member shown in the community facepile.
 *
 * @public
 */
export interface ICommunityMemberPreview {
	/** The rest id of the user. */
	id?: string;

	/** The avatar URL of the user. */
	avatarUrl?: string;
}
