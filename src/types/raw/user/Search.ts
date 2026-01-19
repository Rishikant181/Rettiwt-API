/* eslint-disable */

/**
 * The raw data received when search for users.
 *
 * @public
 */
export interface IUserSearchResponse {
	data: Data;
}

interface Data {
	search_by_raw_query: SearchByRawQuery;
}

interface SearchByRawQuery {
	search_timeline: SearchTimeline;
}

interface SearchTimeline {
	timeline: Timeline;
}

interface Timeline {
	instructions: Instruction[];
}

interface Instruction {
	type: string;
	entries?: Entry[];
}

interface Entry {
	entryId: string;
	sortIndex: string;
	content: Content;
}

interface Content {
	entryType: string;
	__typename: string;
	itemContent?: ItemContent;
	clientEventInfo?: ClientEventInfo;
	value?: string;
	cursorType?: string;
}

interface ItemContent {
	itemType: string;
	__typename: string;
	user_results: UserResults;
	userDisplayType: string;
}

interface UserResults {
	result: Result;
}

interface Result {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel;
	avatar: Avatar;
	core: Core;
	dm_permissions: DmPermissions;
	follow_request_sent: boolean;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy;
	location: Location;
	media_permissions: MediaPermissions;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	professional?: Professional;
	profile_bio: ProfileBio;
	privacy: Privacy;
	relationship_perspectives: RelationshipPerspectives;
	tipjar_settings: TipjarSettings;
	super_follow_eligible?: boolean;
	verification: Verification;
	verified_phone_status: boolean;
	profile_description_language?: string;
}

interface AffiliatesHighlightedLabel {
	label?: Label;
}

interface Label {
	url: Url;
	badge: Badge;
	description: string;
	userLabelType: string;
	userLabelDisplayType: string;
}

interface Url {
	url: string;
	urlType: string;
}

interface Badge {
	url: string;
}

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
	profile_banner_url?: string;
	profile_interstitial_type: string;
	statuses_count: number;
	translator_type: string;
	want_retweets: boolean;
	withheld_in_countries: any[];
	url?: string;
}

interface Entities {
	description: Description;
	url?: Url3;
}

interface Description {
	urls: Url2[];
}

interface Url2 {
	display_url: string;
	expanded_url: string;
	url: string;
	indices: number[];
}

interface Url3 {
	urls: Url4[];
}

interface Url4 {
	display_url: string;
	expanded_url: string;
	url: string;
	indices: number[];
}

interface Location {
	location: string;
}

interface MediaPermissions {
	can_media_tag: boolean;
}

interface Professional {
	rest_id: string;
	professional_type: string;
	category: Category[];
}

interface Category {
	id: number;
	name: string;
	icon_name: string;
}

interface ProfileBio {
	description: string;
}

interface Privacy {
	protected: boolean;
}

interface RelationshipPerspectives {
	following: boolean;
}

interface TipjarSettings {
	is_enabled?: boolean;
	bitcoin_handle?: string;
	ethereum_handle?: string;
	cash_app_handle?: string;
	venmo_handle?: string;
}

interface Verification {
	verified: boolean;
	verified_type?: string;
}

interface ClientEventInfo {
	component: string;
	element: string;
	details: Details;
}

interface Details {
	timelinesDetails: TimelinesDetails;
}

interface TimelinesDetails {
	controllerData: string;
}
