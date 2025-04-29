/* eslint-disable */

export interface ITweetDetailsBulkResponse {
	data: Data;
}

export interface Data {
	tweetResult: TweetResult[];
}

export interface TweetResult {
	result: Result;
}

export interface Result {
	__typename: string;
	rest_id: string;
	core: Core;
	unmention_data: UnmentionData;
	edit_control: EditControl;
	is_translatable: boolean;
	views: Views;
	source: string;
	legacy: Legacy2;
}

export interface Core {
	user_results: UserResults;
}

export interface UserResults {
	result: Result2;
}

export interface Result2 {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: AffiliatesHighlightedLabel;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	profile_image_shape: string;
	legacy: Legacy;
	verified_phone_status: boolean;
}

export interface AffiliatesHighlightedLabel {}

export interface Legacy {
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
	pinned_tweet_ids_str: string[];
	possibly_sensitive: boolean;
	profile_banner_url: string;
	profile_image_url_https: string;
	profile_interstitial_type: string;
	screen_name: string;
	statuses_count: number;
	translator_type: string;
	verified: boolean;
	want_retweets: boolean;
	withheld_in_countries: any[];
}

export interface Entities {
	description: Description;
}

export interface Description {
	urls: any[];
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

export interface Legacy2 {
	bookmark_count: number;
	bookmarked: boolean;
	created_at: string;
	conversation_id_str: string;
	display_text_range: number[];
	entities: Entities2;
	extended_entities: ExtendedEntities;
	favorite_count: number;
	favorited: boolean;
	full_text: string;
	is_quote_status: boolean;
	lang: string;
	possibly_sensitive: boolean;
	possibly_sensitive_editable: boolean;
	quote_count: number;
	reply_count: number;
	retweet_count: number;
	retweeted: boolean;
	user_id_str: string;
	id_str: string;
}

export interface Entities2 {
	hashtags: any[];
	media: Medum[];
	symbols: any[];
	timestamps: any[];
	urls: any[];
	user_mentions: any[];
}

export interface Medum {
	display_url: string;
	expanded_url: string;
	id_str: string;
	indices: number[];
	media_key: string;
	media_url_https: string;
	type: string;
	url: string;
	ext_media_availability: ExtMediaAvailability;
	features: Features;
	sizes: Sizes;
	original_info: OriginalInfo;
	allow_download_status: AllowDownloadStatus;
	media_results: MediaResults;
}

export interface ExtMediaAvailability {
	status: string;
}

export interface Features {
	large: Large;
	medium: Medium;
	small: Small;
	orig: Orig;
}

export interface Large {
	faces: any[];
}

export interface Medium {
	faces: any[];
}

export interface Small {
	faces: any[];
}

export interface Orig {
	faces: any[];
}

export interface Sizes {
	large: Large2;
	medium: Medium2;
	small: Small2;
	thumb: Thumb;
}

export interface Large2 {
	h: number;
	w: number;
	resize: string;
}

export interface Medium2 {
	h: number;
	w: number;
	resize: string;
}

export interface Small2 {
	h: number;
	w: number;
	resize: string;
}

export interface Thumb {
	h: number;
	w: number;
	resize: string;
}

export interface OriginalInfo {
	height: number;
	width: number;
	focus_rects: FocusRect[];
}

export interface FocusRect {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface AllowDownloadStatus {
	allow_download: boolean;
}

export interface MediaResults {
	result: Result3;
}

export interface Result3 {
	media_key: string;
}

export interface ExtendedEntities {
	media: Medum2[];
}

export interface Medum2 {
	display_url: string;
	expanded_url: string;
	id_str: string;
	indices: number[];
	media_key: string;
	media_url_https: string;
	type: string;
	url: string;
	ext_media_availability: ExtMediaAvailability2;
	features: Features2;
	sizes: Sizes2;
	original_info: OriginalInfo2;
	allow_download_status: AllowDownloadStatus2;
	media_results: MediaResults2;
}

export interface ExtMediaAvailability2 {
	status: string;
}

export interface Features2 {
	large: Large3;
	medium: Medium3;
	small: Small3;
	orig: Orig2;
}

export interface Large3 {
	faces: any[];
}

export interface Medium3 {
	faces: any[];
}

export interface Small3 {
	faces: any[];
}

export interface Orig2 {
	faces: any[];
}

export interface Sizes2 {
	large: Large4;
	medium: Medium4;
	small: Small4;
	thumb: Thumb2;
}

export interface Large4 {
	h: number;
	w: number;
	resize: string;
}

export interface Medium4 {
	h: number;
	w: number;
	resize: string;
}

export interface Small4 {
	h: number;
	w: number;
	resize: string;
}

export interface Thumb2 {
	h: number;
	w: number;
	resize: string;
}

export interface OriginalInfo2 {
	height: number;
	width: number;
	focus_rects: FocusRect2[];
}

export interface FocusRect2 {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface AllowDownloadStatus2 {
	allow_download: boolean;
}

export interface MediaResults2 {
	result: Result4;
}

export interface Result4 {
	media_key: string;
}
