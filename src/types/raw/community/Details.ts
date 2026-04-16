/* eslint-disable */

/**
 * The raw data received when fetching the details of a given Community.
 *
 * @public
 */
export interface ICommunityDetailsResponse {
	data?: {
		communityResults?: ICommunityResults;
	};
}

export interface ICommunityResults {
	id?: string;
	result?: IRawCommunity;
}

export interface IRawCommunity {
	__typename?: string;
	id?: string;
	rest_id?: string;
	name?: string;
	description?: string;
	created_at?: number;
	is_member?: boolean;
	is_nsfw?: boolean;
	join_policy?: string;
	member_count?: number;
	role?: string;
	creator_results?: ICommunityUserResults;
	custom_banner_media?: ICommunityBannerMedia;
	default_banner_media?: ICommunityBannerMedia;
	rules?: ICommunityRule[];
	members_facepile_results?: ICommunityUserAvatarResults[];
	trending_hashtags_slice?: ICommunityHashtagSlice;
}

export interface ICommunityUserResults {
	id?: string;
	result?: ICommunityUser;
}

export interface ICommunityUser {
	__typename?: string;
	id?: string;
	rest_id?: string;
	core?: {
		screen_name?: string;
	};
	avatar?: {
		image_url?: string;
	};
	is_blue_verified?: boolean;
	verification?: {
		verified?: boolean;
	};
}

export interface ICommunityBannerMedia {
	id?: string;
	media_info?: ICommunityImage;
}

export interface ICommunityImage {
	__typename?: string;
	original_img_height?: number;
	original_img_url?: string;
	original_img_width?: number;
}

export interface ICommunityRule {
	id?: string;
	name?: string;
	rest_id?: string;
}

export interface ICommunityUserAvatarResults {
	id?: string;
	result?: ICommunityUser;
}

export interface ICommunityHashtagSlice {
	__typename?: string;
	items?: ICommunityHashtag[];
}

export interface ICommunityHashtag {
	hashtag?: string;
}
