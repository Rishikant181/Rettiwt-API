/* eslint-disable */

/**
 * The raw data received when fetching the details of a tweet list.
 *
 * @public
 */
export interface IListDetailsResponse {
	data: Data;
}

interface Data {
	list: List;
}

interface List {
	created_at: number;
	default_banner_media: DefaultBannerMedia;
	default_banner_media_results: DefaultBannerMediaResults;
	description: string;
	facepile_urls: string[];
	followers_context: string;
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

interface DefaultBannerMedia {
	media_info: MediaInfo;
}

interface MediaInfo {
	original_img_url: string;
	original_img_width: number;
	original_img_height: number;
	salient_rect: SalientRect;
}

interface SalientRect {
	left: number;
	top: number;
	width: number;
	height: number;
}

interface DefaultBannerMediaResults {
	result: Result;
}

interface Result {
	id: string;
	media_key: string;
	media_id: string;
	media_info: MediaInfo2;
	__typename: string;
}

interface MediaInfo2 {
	__typename: string;
	original_img_height: number;
	original_img_width: number;
	original_img_url: string;
	salient_rect: SalientRect2;
}

interface SalientRect2 {
	height: number;
	left: number;
	top: number;
	width: number;
}

interface UserResults {
	result: Result2;
}

interface Result2 {
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

interface AffiliatesHighlightedLabel {}

interface Avatar {
	image_url: string;
}

interface Core {
	created_at: string;
	name: string;
	screen_name: string;
}

interface DmPermissions {
	can_dm: boolean;
}

interface Legacy {
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
	normal_followers_count: number;
	pinned_tweet_ids_str: string[];
	possibly_sensitive: boolean;
	profile_banner_url: string;
	profile_interstitial_type: string;
	statuses_count: number;
	translator_type: string;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

interface Entities {
	description: Description;
}

interface Description {
	urls: any[];
}

interface Location {
	location: string;
}

interface MediaPermissions {
	can_media_tag: boolean;
}

interface Privacy {
	protected: boolean;
}

interface RelationshipPerspectives {
	following: boolean;
}

interface TipjarSettings {}

interface Verification {
	verified: boolean;
}
