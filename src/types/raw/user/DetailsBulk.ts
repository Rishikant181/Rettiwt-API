/* eslint-disable */

export interface IUserDetailsBulkResponse {
	data: Data;
}

export interface Data {
	users: User[];
}

export interface User {
	result: Result;
}

export interface Result {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	profile_image_shape: string;
	legacy: Legacy;
	professional?: Professional;
	super_follow_eligible: boolean;
	super_followed_by: boolean;
	super_following: boolean;
}

export interface AffiliatesHighlightedLabel {
	label?: Label;
}

export interface Label {
	url: Url;
	badge: Badge;
	description: string;
	userLabelType: string;
	userLabelDisplayType: string;
}

export interface Url {
	url: string;
	urlType: string;
}

export interface Badge {
	url: string;
}

export interface Legacy {
	blocked_by: boolean;
	blocking: boolean;
	follow_request_sent: boolean;
	followed_by: boolean;
	muting: boolean;
	notifications: boolean;
	protected: boolean;
	following: boolean;
	can_dm: boolean;
	can_media_tag: boolean;
	created_at: string;
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
	location: string;
	media_count: number;
	name: string;
	normal_followers_count: number;
	pinned_tweet_ids_str: any[];
	possibly_sensitive: boolean;
	profile_banner_url?: string;
	profile_image_url_https: string;
	profile_interstitial_type: string;
	screen_name: string;
	statuses_count: number;
	translator_type: string;
	verified: boolean;
	want_retweets: boolean;
	withheld_in_countries: any[];
	needs_phone_verification?: boolean;
}

export interface Entities {
	description: Description;
}

export interface Description {
	urls: any[];
}

export interface Professional {
	rest_id: string;
	professional_type: string;
	category: any[];
}
