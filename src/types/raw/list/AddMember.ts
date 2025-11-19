/* eslint-disable */

/**
 * The raw data received after adding a member to a tweet list.
 *
 * @public
 */
export interface IListMemberAddResponse {
	data: Data;
}

export interface Data {
	list: List;
}

export interface List {
	created_at: number;
	default_banner_media: DefaultBannerMedia;
	default_banner_media_results: DefaultBannerMediaResults;
	description: string;
	facepile_urls: any[];
	following: boolean;
	id: string;
	id_str: string;
	is_member: boolean;
	member_count: number;
	members_context: string;
	mode: string;
	muting: boolean;
	name: string;
	pinning: boolean;
	subscriber_count: number;
	user_results: UserResults;
}

export interface DefaultBannerMedia {
	media_info: MediaInfo;
}

export interface MediaInfo {
	original_img_url: string;
	original_img_width: number;
	original_img_height: number;
	salient_rect: SalientRect;
}

export interface SalientRect {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface DefaultBannerMediaResults {
	result: Result;
}

export interface Result {
	id: string;
	media_key: string;
	media_id: string;
	media_info: MediaInfo2;
	__typename: string;
}

export interface MediaInfo2 {
	__typename: string;
	original_img_height: number;
	original_img_width: number;
	original_img_url: string;
	salient_rect: SalientRect2;
}

export interface SalientRect2 {
	height: number;
	left: number;
	top: number;
	width: number;
}

export interface UserResults {
	result: Result2;
}

export interface Result2 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel;
	avatar: Avatar;
	core: Core;
	dm_permissions: DmPermissions;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy;
	location: Location;
	media_permissions: MediaPermissions;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	privacy: Privacy;
	relationship_perspectives: RelationshipPerspectives;
	tipjar_settings: TipjarSettings;
	verification: Verification;
	verified_phone_status: boolean;
}

export interface AffiliatesHighlightedLabel {}

export interface Avatar {
	image_url: string;
}

export interface Core {
	created_at: string;
	name: string;
	screen_name: string;
}

export interface DmPermissions {
	can_dm: boolean;
}

export interface Legacy {
	default_profile: boolean;
	default_profile_image: boolean;
	description: string;
	entities: Entities;
	fast_followers_count: number;
	favourites_count: number;
	followers_count: number;
	friends_count: number;
	has_custom_timelines: boolean;
	is_translator: boolean;
	listed_count: number;
	media_count: number;
	needs_phone_verification: boolean;
	normal_followers_count: number;
	pinned_tweet_ids_str: any[];
	possibly_sensitive: boolean;
	profile_interstitial_type: string;
	statuses_count: number;
	translator_type: string;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

export interface Entities {
	description: Description;
}

export interface Description {
	urls: any[];
}

export interface Location {
	location: string;
}

export interface MediaPermissions {
	can_media_tag: boolean;
}

export interface Privacy {
	protected: boolean;
}

export interface RelationshipPerspectives {
	following: boolean;
}

export interface TipjarSettings {}

export interface Verification {
	verified: boolean;
}
