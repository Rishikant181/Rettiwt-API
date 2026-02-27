/* eslint-disable */

/**
 * The raw data received when updating user profile.
 *
 * @public
 */
export interface IUserProfileUpdateResponse {
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
	location: string;
	description: string;
	url: string | null;
	entities: Entities;
	protected: boolean;
	followers_count: number;
	fast_followers_count: number;
	normal_followers_count: number;
	friends_count: number;
	listed_count: number;
	created_at: string;
	favourites_count: number;
	utc_offset: any;
	time_zone: any;
	geo_enabled: boolean;
	verified: boolean;
	statuses_count: number;
	media_count: number;
	lang: any;
	contributors_enabled: boolean;
	is_translator: boolean;
	is_translation_enabled: boolean;
	profile_background_color: string;
	profile_background_image_url: string;
	profile_background_image_url_https: string;
	profile_background_tile: boolean;
	profile_image_url: string;
	profile_image_url_https: string;
	profile_banner_url: string;
	profile_banner_url_https?: string;
	profile_link_color: string;
	profile_sidebar_border_color: string;
	profile_sidebar_fill_color: string;
	profile_text_color: string;
	profile_use_background_image: boolean;
	has_extended_profile: boolean;
	default_profile: boolean;
	default_profile_image: boolean;
	pinned_tweet_ids: number[];
	pinned_tweet_ids_str: string[];
	has_custom_timelines: boolean;
	can_media_tag: boolean;
	advertiser_account_type: string;
	advertiser_account_service_levels: any[];
	business_profile_state: string;
	translator_type: string;
	withheld_in_countries: any[];
	require_some_consent: boolean;
}

interface Entities {
	description: Description;
	url?: Url;
}

interface Description {
	urls: any[];
}

interface Url {
	urls: UrlDetail[];
}

interface UrlDetail {
	url: string;
	expanded_url: string;
	display_url: string;
	indices: number[];
}
