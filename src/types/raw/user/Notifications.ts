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
	notifications: boolean;
	pinned_tweet_ids_str: any[];
	possibly_sensitive: boolean;
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

interface ProfileBio {
	description: string;
}

interface Privacy {
	protected: boolean;
}

interface RelationshipPerspectives {
	followed_by: boolean;
	following: boolean;
}

interface TipjarSettings {}

interface Verification {
	verified: boolean;
}

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
	target_objects: TargetObject[];
	from_users: FromUser[];
}

interface TargetObject {
	__typename: string;
	tweet_results: TweetResults;
}

interface TweetResults {
	result: Result3;
}

interface Result3 {
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

interface Core2 {
	user_results: UserResults3;
}

interface UserResults3 {
	result: Result4;
}

interface Result4 {
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

interface AffiliatesHighlightedLabel2 {}

interface Avatar2 {
	image_url: string;
}

interface Core3 {
	created_at: string;
	name: string;
	screen_name: string;
}

interface DmPermissions2 {
	can_dm: boolean;
}

interface Legacy2 {
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

interface Entities2 {
	description: Description2;
}

interface Description2 {
	urls: any[];
}

interface Location2 {
	location: string;
}

interface MediaPermissions2 {
	can_media_tag: boolean;
}

interface ProfileBio2 {
	description: string;
}

interface Privacy2 {
	protected: boolean;
}

interface RelationshipPerspectives2 {
	following: boolean;
}

interface TipjarSettings2 {}

interface Verification2 {
	verified: boolean;
}

interface UnmentionData {}

interface EditControl {
	edit_tweet_ids: string[];
	editable_until_msecs: string;
	is_edit_eligible: boolean;
	edits_remaining: string;
}

interface Views {
	count: string;
	state: string;
}

interface Legacy3 {
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

interface Entities3 {
	hashtags: any[];
	symbols: any[];
	timestamps: any[];
	urls: any[];
	user_mentions: any[];
}

interface FromUser {
	__typename: string;
	user_results: UserResults4;
}

interface UserResults4 {
	result: Result5;
}

interface Result5 {
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

interface AffiliatesHighlightedLabel3 {}

interface Avatar3 {
	image_url: string;
}

interface Core4 {
	created_at: string;
	name: string;
	screen_name: string;
}

interface DmPermissions3 {
	can_dm: boolean;
}

interface Legacy4 {
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

interface Entities4 {
	description: Description3;
}

interface Description3 {
	urls: any[];
}

interface Location3 {
	location: string;
}

interface MediaPermissions3 {
	can_media_tag: boolean;
}

interface ProfileBio3 {
	description: string;
}

interface Privacy3 {
	protected: boolean;
}

interface RelationshipPerspectives3 {
	followed_by: boolean;
	following: boolean;
}

interface TipjarSettings3 {}

interface Verification3 {
	verified: boolean;
}

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
