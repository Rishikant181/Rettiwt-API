/* eslint-disable */

/**
 * The raw data received when fetching the notifications of the given user.
 *
 * @public
 */
export interface IUserNotificationsResponse {
	data: Data;
}

interface Data {
	viewer_v2: ViewerV2;
}

interface ViewerV2 {
	user_results: UserResults;
}

interface UserResults {
	result: Result;
}

interface Result {
	__typename: string;
	rest_id: string;
	notification_timeline: NotificationTimeline;
}

interface NotificationTimeline {
	id: string;
	timeline: Timeline;
}

interface Timeline {
	instructions: Instruction[];
}

interface Instruction {
	type: string;
	entries?: Entry[];
	sort_index?: string;
}

interface Entry {
	entryId: string;
	sortIndex: string;
	content: Content;
}

interface Content {
	entryType: string;
	__typename: string;
	value?: string;
	cursorType?: string;
	itemContent?: ItemContent;
	clientEventInfo?: ClientEventInfo;
}

interface ItemContent {
	itemType: string;
	__typename: string;
	id: string;
	notification_icon: string;
	rich_message: RichMessage;
	notification_url: NotificationUrl;
	template: Template;
	timestamp_ms: string;
}

interface RichMessage {
	rtl: boolean;
	text: string;
	entities: Entity[];
}

interface Entity {
	fromIndex: number;
	toIndex: number;
	ref: Ref;
}

interface Ref {
	type: string;
	user_results: UserResults2;
}

interface UserResults2 {
	result: Result2;
}

interface Result2 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	tipjar_settings: TipjarSettings;
	verified_phone_status: boolean;
}

interface AffiliatesHighlightedLabel {}

interface Legacy {
	notifications: boolean;
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
	profile_image_url_https: string;
	profile_interstitial_type: string;
	screen_name: string;
	statuses_count: number;
	translator_type: string;
	verified: boolean;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

interface Entities {
	description: Description;
}

interface Description {
	urls: any[];
}

interface TipjarSettings {}

interface NotificationUrl {
	url: string;
	urlType: string;
	urtEndpointOptions?: UrtEndpointOptions;
}

interface UrtEndpointOptions {
	cacheId: string;
	title: string;
}

interface Template {
	__typename: string;
	target_objects: any[];
	from_users: FromUser[];
}

interface FromUser {
	__typename: string;
	user_results: UserResults3;
}

interface UserResults3 {
	result: Result3;
}

interface Result3 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel2;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy2;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	tipjar_settings: TipjarSettings2;
	verified_phone_status: boolean;
}

interface AffiliatesHighlightedLabel2 {}

interface Legacy2 {
	notifications: boolean;
	following: boolean;
	can_dm: boolean;
	can_media_tag: boolean;
	created_at: string;
	default_profile: boolean;
	default_profile_image: boolean;
	description: string;
	entities: Entities2;
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
	profile_image_url_https: string;
	profile_interstitial_type: string;
	screen_name: string;
	statuses_count: number;
	translator_type: string;
	verified: boolean;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

interface Entities2 {
	description: Description2;
}

interface Description2 {
	urls: any[];
}

interface TipjarSettings2 {}

interface ClientEventInfo {
	component: string;
	element: string;
	details: Details;
}

interface Details {
	notificationDetails: NotificationDetails;
}

interface NotificationDetails {
	impressionId: string;
	metadata: string;
}
