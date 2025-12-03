/* eslint-disable */

/**
 * The raw data received when fetching the notifications of the given user.
 *
 * @public
 */
export interface IUserNotificationsResponse {
	data: Data;
}

export interface Data {
	viewer_v2: ViewerV2;
}

export interface ViewerV2 {
	user_results: UserResults;
}

export interface UserResults {
	result: Result;
}

export interface Result {
	__typename: string;
	rest_id: string;
	notification_timeline: NotificationTimeline;
}

export interface NotificationTimeline {
	id: string;
	timeline: Timeline;
}

export interface Timeline {
	instructions: Instruction[];
}

export interface Instruction {
	type: string;
	entries?: Entry[];
	sort_index?: string;
}

export interface Entry {
	entryId: string;
	sortIndex: string;
	content: Content;
}

export interface Content {
	entryType: string;
	__typename: string;
	value?: string;
	cursorType?: string;
	itemContent?: ItemContent;
	clientEventInfo?: ClientEventInfo;
}

export interface ItemContent {
	itemType: string;
	__typename: string;
	id: string;
	notification_icon: string;
	rich_message: RichMessage;
	notification_url: NotificationUrl;
	template: Template;
	timestamp_ms: string;
}

export interface RichMessage {
	rtl: boolean;
	text: string;
	entities: Entity[];
}

export interface Entity {
	fromIndex: number;
	toIndex: number;
	ref: Ref;
}

export interface Ref {
	type: string;
	user_results: UserResults2;
}

export interface UserResults2 {
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
	follow_request_sent: boolean;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy;
	location: Location;
	media_permissions: MediaPermissions;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	profile_bio: ProfileBio;
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
	normal_followers_count: number;
	notifications: boolean;
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

export interface ProfileBio {
	description: string;
}

export interface Privacy {
	protected: boolean;
}

export interface RelationshipPerspectives {
	followed_by: boolean;
	following: boolean;
}

export interface TipjarSettings {}

export interface Verification {
	verified: boolean;
}

export interface NotificationUrl {
	url: string;
	urlType: string;
	urtEndpointOptions?: UrtEndpointOptions;
}

export interface UrtEndpointOptions {
	cacheId: string;
	title: string;
}

export interface Template {
	__typename: string;
	target_objects: TargetObject[];
	from_users: FromUser[];
}

export interface TargetObject {
	__typename: string;
	tweet_results: TweetResults;
}

export interface TweetResults {
	result: Result3;
}

export interface Result3 {
	__typename: string;
	rest_id: string;
	core: Core2;
	unmention_data: UnmentionData;
	edit_control: EditControl;
	is_translatable: boolean;
	views: Views;
	source: string;
	grok_analysis_button: boolean;
	legacy: Legacy3;
}

export interface Core2 {
	user_results: UserResults3;
}

export interface UserResults3 {
	result: Result4;
}

export interface Result4 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel2;
	avatar: Avatar2;
	core: Core3;
	dm_permissions: DmPermissions2;
	follow_request_sent: boolean;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy2;
	location: Location2;
	media_permissions: MediaPermissions2;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	profile_bio: ProfileBio2;
	privacy: Privacy2;
	relationship_perspectives: RelationshipPerspectives2;
	tipjar_settings: TipjarSettings2;
	verification: Verification2;
	verified_phone_status: boolean;
}

export interface AffiliatesHighlightedLabel2 {}

export interface Avatar2 {
	image_url: string;
}

export interface Core3 {
	created_at: string;
	name: string;
	screen_name: string;
}

export interface DmPermissions2 {
	can_dm: boolean;
}

export interface Legacy2 {
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

export interface Entities2 {
	description: Description2;
}

export interface Description2 {
	urls: any[];
}

export interface Location2 {
	location: string;
}

export interface MediaPermissions2 {
	can_media_tag: boolean;
}

export interface ProfileBio2 {
	description: string;
}

export interface Privacy2 {
	protected: boolean;
}

export interface RelationshipPerspectives2 {
	following: boolean;
}

export interface TipjarSettings2 {}

export interface Verification2 {
	verified: boolean;
}

export interface UnmentionData {}

export interface EditControl {
	edit_tweet_ids: string[];
	editable_until_msecs: string;
	is_edit_eligible: boolean;
	edits_remaining: string;
}

export interface Views {
	count: string;
	state: string;
}

export interface Legacy3 {
	bookmark_count: number;
	bookmarked: boolean;
	created_at: string;
	conversation_id_str: string;
	display_text_range: number[];
	entities: Entities3;
	favorite_count: number;
	favorited: boolean;
	full_text: string;
	is_quote_status: boolean;
	lang: string;
	quote_count: number;
	reply_count: number;
	retweet_count: number;
	retweeted: boolean;
	user_id_str: string;
	id_str: string;
}

export interface Entities3 {
	hashtags: any[];
	symbols: any[];
	timestamps: any[];
	urls: any[];
	user_mentions: any[];
}

export interface FromUser {
	__typename: string;
	user_results: UserResults4;
}

export interface UserResults4 {
	result: Result5;
}

export interface Result5 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel3;
	avatar: Avatar3;
	core: Core4;
	dm_permissions: DmPermissions3;
	follow_request_sent: boolean;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	legacy: Legacy4;
	location: Location3;
	media_permissions: MediaPermissions3;
	parody_commentary_fan_label: string;
	profile_image_shape: string;
	profile_bio: ProfileBio3;
	privacy: Privacy3;
	relationship_perspectives: RelationshipPerspectives3;
	tipjar_settings: TipjarSettings3;
	verification: Verification3;
	verified_phone_status: boolean;
}

export interface AffiliatesHighlightedLabel3 {}

export interface Avatar3 {
	image_url: string;
}

export interface Core4 {
	created_at: string;
	name: string;
	screen_name: string;
}

export interface DmPermissions3 {
	can_dm: boolean;
}

export interface Legacy4 {
	default_profile: boolean;
	default_profile_image: boolean;
	description: string;
	entities: Entities4;
	fast_followers_count: number;
	favourites_count: number;
	followers_count: number;
	friends_count: number;
	has_custom_timelines: boolean;
	is_translator: boolean;
	listed_count: number;
	media_count: number;
	normal_followers_count: number;
	notifications: boolean;
	pinned_tweet_ids_str: any[];
	possibly_sensitive: boolean;
	profile_interstitial_type: string;
	statuses_count: number;
	translator_type: string;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

export interface Entities4 {
	description: Description3;
}

export interface Description3 {
	urls: any[];
}

export interface Location3 {
	location: string;
}

export interface MediaPermissions3 {
	can_media_tag: boolean;
}

export interface ProfileBio3 {
	description: string;
}

export interface Privacy3 {
	protected: boolean;
}

export interface RelationshipPerspectives3 {
	followed_by: boolean;
	following: boolean;
}

export interface TipjarSettings3 {}

export interface Verification3 {
	verified: boolean;
}

export interface ClientEventInfo {
	component: string;
	element: string;
	details: Details;
}

export interface Details {
	notificationDetails: NotificationDetails;
}

export interface NotificationDetails {
	impressionId: string;
	metadata: string;
}
