/* eslint-disable */

/**
 * The raw data received when fetching the lists of the given user.
 *
 * @public
 */
export interface IUserListsResponse {
	data: Data;
}

export interface Data {
	viewer: Viewer;
}

export interface Viewer {
	list_management_timeline: ListManagementTimeline;
}

export interface ListManagementTimeline {
	timeline: Timeline;
}

export interface Timeline {
	instructions: Instruction[];
	metadata: Metadata;
}

export interface Instruction {
	type: string;
	direction?: string;
	entries?: Entry[];
}

export interface Entry {
	entryId: string;
	sortIndex: string;
	content: Content;
}

export interface Content {
	entryType: string;
	__typename: string;
	items?: Item[];
	displayType?: string;
	header?: Header;
	footer?: Footer;
	clientEventInfo?: ClientEventInfo2;
	value?: string;
	cursorType?: string;
}

export interface Item {
	entryId: string;
	item: Item2;
}

export interface Item2 {
	itemContent: ItemContent;
	clientEventInfo: ClientEventInfo;
}

export interface ItemContent {
	itemType: string;
	__typename: string;
	displayType: string;
	list: List;
}

export interface List {
	created_at: number;
	default_banner_media: DefaultBannerMedia;
	default_banner_media_results: DefaultBannerMediaResults;
	description: string;
	facepile_urls: string[];
	followers_context?: string;
	following: boolean;
	id: string;
	id_str: string;
	is_member: boolean;
	member_count: number;
	members_context?: string;
	mode: string;
	muting: boolean;
	name: string;
	pinning: boolean;
	subscriber_count: number;
	user_results: UserResults;
	custom_banner_media?: CustomBannerMedia;
	custom_banner_media_results?: CustomBannerMediaResults;
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
	professional?: Professional;
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
	pinned_tweet_ids_str: string[];
	possibly_sensitive: boolean;
	profile_banner_url?: string;
	profile_interstitial_type: string;
	statuses_count: number;
	translator_type: string;
	url?: string;
	want_retweets: boolean;
	withheld_in_countries: any[];
	needs_phone_verification?: boolean;
}

export interface Entities {
	description: Description;
	url?: Url;
}

export interface Description {
	urls: any[];
}

export interface Url {
	urls: Url2[];
}

export interface Url2 {
	display_url: string;
	expanded_url: string;
	url: string;
	indices: number[];
}

export interface Location {
	location: string;
}

export interface MediaPermissions {
	can_media_tag: boolean;
}

export interface Professional {
	rest_id: string;
	professional_type: string;
	category: Category[];
}

export interface Category {
	id: number;
	name: string;
	icon_name: string;
}

export interface Privacy {
	protected: boolean;
}

export interface RelationshipPerspectives {
	following: boolean;
}

export interface TipjarSettings {
	is_enabled?: boolean;
	bitcoin_handle?: string;
	ethereum_handle?: string;
}

export interface Verification {
	verified: boolean;
}

export interface CustomBannerMedia {
	media_info: MediaInfo3;
}

export interface MediaInfo3 {
	original_img_url: string;
	original_img_width: number;
	original_img_height: number;
	salient_rect: SalientRect3;
}

export interface SalientRect3 {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface CustomBannerMediaResults {
	result: Result3;
}

export interface Result3 {
	id: string;
	media_key: string;
	media_id: string;
	media_info: MediaInfo4;
	__typename: string;
}

export interface MediaInfo4 {
	__typename: string;
	original_img_height: number;
	original_img_width: number;
	original_img_url: string;
	salient_rect: SalientRect4;
	color_info: ColorInfo;
}

export interface SalientRect4 {
	height: number;
	left: number;
	top: number;
	width: number;
}

export interface ColorInfo {
	palette: Palette[];
}

export interface Palette {
	percentage: number;
	rgb: Rgb;
}

export interface Rgb {
	blue: number;
	green: number;
	red: number;
}

export interface ClientEventInfo {
	component: string;
	element: string;
	details: Details;
}

export interface Details {
	timelinesDetails: TimelinesDetails;
}

export interface TimelinesDetails {
	injectionType: string;
	controllerData?: string;
}

export interface Header {
	displayType: string;
	text: string;
	sticky: boolean;
}

export interface Footer {
	displayType: string;
	text: string;
	landingUrl: LandingUrl;
}

export interface LandingUrl {
	url: string;
	urlType: string;
}

export interface ClientEventInfo2 {
	component: string;
	details: Details2;
}

export interface Details2 {
	timelinesDetails: TimelinesDetails2;
}

export interface TimelinesDetails2 {
	injectionType: string;
	controllerData?: string;
}

export interface Metadata {
	scribeConfig: ScribeConfig;
}

export interface ScribeConfig {
	page: string;
}
