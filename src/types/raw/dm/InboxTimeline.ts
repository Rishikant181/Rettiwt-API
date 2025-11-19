/* eslint-disable */

import { Users, Conversations } from './InboxInitial';

/**
 * The raw data received when fetching the inbox timeline.
 *
 * @public
 */
export interface IInboxTimelineResponse {
	inbox_timeline: InboxTimeline;
}

interface InboxTimeline {
	status: 'HAS_MORE' | 'AT_END';
	min_entry_id: string;
	entries: TimelineEntry[];
	users: Users;
	conversations: Conversations;
}

type TimelineEntry =
	| { trust_conversation: TrustConversation }
	| { message: TimelineMessage }
	| { participants_leave: ParticipantsLeave };

interface TrustConversation {
	id: string;
	time: string;
	affects_sort: boolean;
	request_id: string;
	conversation_id: string;
	reason: string; // e.g., "accept"
}

export interface TimelineMessage {
	id: string;
	time: string;
	affects_sort: boolean;
	request_id: string;
	conversation_id: string;
	message_data: TimelineMessageData;
}

interface TimelineMessageData {
	id: string;
	time: string;
	recipient_id?: string;
	sender_id: string;
	conversation_id?: string;
	text: string;
	edit_count: number;
	entities?: MessageEntities;
	reply_data?: ReplyData;
	attachment?: MessageAttachment;
}

interface MessageEntities {
	hashtags: any[];
	symbols: any[];
	user_mentions: UserMention[];
	urls: UrlEntity[];
}

interface UserMention {
	screen_name: string;
	name: string;
	id: number;
	id_str: string;
	indices: [number, number];
}

interface UrlEntity {
	url: string;
	expanded_url: string;
	display_url: string;
	indices: [number, number];
}

interface ReplyData {
	id: string;
	time: string;
	recipient_id: string;
	sender_id: string;
	text: string;
	edit_count: number;
	entities?: MessageEntities;
}

interface MessageAttachment {
	card?: CardAttachment;
	tweet?: TweetAttachment;
}

interface CardAttachment {
	name: string;
	url: string;
	card_type_url: string;
	binding_values: CardBindingValues;
}

interface CardBindingValues {
	vanity_url?: StringValue;
	domain?: StringValue;
	title?: StringValue;
	description?: StringValue;
	thumbnail_image_small?: ImageValue;
	thumbnail_image?: ImageValue;
	thumbnail_image_large?: ImageValue;
	thumbnail_image_x_large?: ImageValue;
	thumbnail_image_color?: ImageColorValue;
	thumbnail_image_original?: ImageValue;
	summary_photo_image_small?: ImageValue;
	summary_photo_image?: ImageValue;
	summary_photo_image_large?: ImageValue;
	summary_photo_image_x_large?: ImageValue;
	summary_photo_image_color?: ImageColorValue;
	summary_photo_image_original?: ImageValue;
	photo_image_full_size_small?: ImageValue;
	photo_image_full_size?: ImageValue;
	photo_image_full_size_large?: ImageValue;
	photo_image_full_size_x_large?: ImageValue;
	photo_image_full_size_color?: ImageColorValue;
	photo_image_full_size_original?: ImageValue;
	card_url?: StringValue;
}

interface StringValue {
	type: 'STRING';
	string_value: string;
	scribe_key?: string;
}

interface ImageValue {
	type: 'IMAGE';
	image_value: {
		url: string;
		width: number;
		height: number;
		alt: string | null;
	};
}

interface ImageColorValue {
	type: 'IMAGE_COLOR';
	image_color_value: {
		palette: ColorPalette[];
	};
}

interface ColorPalette {
	percentage: number;
	rgb: {
		red: number;
		green: number;
		blue: number;
	};
}

interface TweetAttachment {
	id: string;
	url: string;
	display_url: string;
	expanded_url: string;
	indices: [number, number];
	status: TwitterStatus;
}

interface TwitterStatus {
	created_at: string;
	id: number;
	id_str: string;
	full_text: string;
	truncated: boolean;
	display_text_range: [number, number];
	entities: MessageEntities;
	source: string;
	in_reply_to_status_id: number | null;
	in_reply_to_status_id_str: string | null;
	in_reply_to_user_id: number | null;
	in_reply_to_user_id_str: string | null;
	in_reply_to_screen_name: string | null;
	user: TwitterUser;
	geo: any;
	coordinates: any;
	place: any;
	contributors: any;
	is_quote_status: boolean;
	retweet_count: number;
	favorite_count: number;
	reply_count: number;
	quote_count: number;
	favorited: boolean;
	retweeted: boolean;
	lang: string;
	supplemental_language: string | null;
	ext: TwitterExtensions;
}

interface TwitterUser {
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
	location: string;
	description: string;
	url: string;
	entities: UserEntityInfo;
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
	profile_background_image_url: string | null;
	profile_background_image_url_https: string | null;
	profile_background_tile: boolean;
	profile_image_url: string;
	profile_image_url_https: string;
	profile_banner_url: string;
	profile_link_color: string;
	profile_sidebar_border_color: string;
	profile_sidebar_fill_color: string;
	profile_text_color: string;
	profile_use_background_image: boolean;
	default_profile: boolean;
	default_profile_image: boolean;
	pinned_tweet_ids: number[];
	pinned_tweet_ids_str: string[];
	has_custom_timelines: boolean;
	can_dm: any;
	can_media_tag: boolean;
	following: boolean;
	follow_request_sent: boolean;
	notifications: boolean;
	muting: any;
	blocking: boolean;
	blocked_by: boolean;
	want_retweets: boolean;
	advertiser_account_type: string;
	advertiser_account_service_levels: any[];
	business_profile_state: string;
	translator_type: string;
	withheld_in_countries: any[];
	followed_by: boolean;
	ext: TwitterExtensions;
	require_some_consent: boolean;
}

interface UserEntityInfo {
	url: {
		urls: UrlEntity[];
	};
	description: {
		urls: UrlEntity[];
	};
}

interface TwitterExtensions {
	businessAffiliationsLabel?: {
		r: { ok: any };
		ttl: number;
	};
	superFollowMetadata?: {
		r: { ok: any };
		ttl: number;
	};
	parodyCommentaryFanLabel?: {
		r: { ok: string };
		ttl: number;
	};
	highlightedLabel?: {
		r: { ok: any };
		ttl: number;
	};
}

interface ParticipantsLeave {
	id: string;
	time: string;
	affects_sort: boolean;
	conversation_id: string;
	participants: ParticipantInfo[];
}

interface ParticipantInfo {
	user_id: string;
}
