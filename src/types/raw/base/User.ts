/* eslint-disable */

import { IUrl } from './Tweet';

/**
 * Represents the raw data of a single User.
 *
 * @public
 */
export interface IUser {
	__typename: string;
	id: string;
	rest_id: string;
	affiliates_highlighted_label: IAffiliatesHighlightedLabel;
	has_graduated_access: boolean;
	is_blue_verified: boolean;
	profile_image_shape: string;
	legacy: IUserLegacy;
	super_follow_eligible: boolean;
	smart_blocked_by: boolean;
	smart_blocking: boolean;
	verified_phone_status: boolean;
	legacy_extended_profile: ILegacyExtendedProfile;
	is_profile_translatable: boolean;
	verification_info: IVerificationInfo;
	highlights_info: IHighlightsInfo;
	business_account: IBusinessAccountInfo;
	creator_subscriptions_count: number;
}

export interface IAffiliatesHighlightedLabel {
	label: IAffiliateLabel;
}

export interface IAffiliateLabel {
	url: IAffiliateUrl;
	badge: IAffiliateBadge;
	description: string;
	longDescription: IAffiliateDescription;
	userLabelType: string;
	userLabelDisplayType: string;
}

export interface IAffiliateUrl {
	url: string;
	urlType: string;
}

export interface IAffiliateBadge {
	url: string;
}

export interface IAffiliateDescription {
	text: string;
	entities: IAffiliateDescriptionEntity[];
}

export interface IAffiliateDescriptionEntity {
	fromIndex: number;
	toIndex: number;
	ref: IAffiliateHighlightedMention;
}

export interface IAffiliateHighlightedMention {
	type: string;
	screen_name: string;
	mention_results: IAffiliateHighlightedMentionResults;
}

export interface IAffiliateHighlightedMentionResults {
	result: IAffiliateHighlightedMentionResult;
}

export interface IAffiliateHighlightedMentionResult {
	__typename: string;
	legacy: IAffiliateHighlightedMentionResultLegacy;
	rest_id: string;
}

export interface IAffiliateHighlightedMentionResultLegacy {
	screen_name: string;
}

export interface IUserLegacy {
	followed_by?: boolean;
	following?: boolean;
	can_dm: boolean;
	can_media_tag: boolean;
	created_at: string;
	default_profile: boolean;
	default_profile_image: boolean;
	description: string;
	entities: IProfileEntities;
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
	withheld_in_countries: string[];
}

export interface IProfileEntities {
	description: IProfileDescription;
	url: IProfileUrl;
}

export interface IProfileDescription {
	urls: IUrl[];
}

export interface IProfileUrl {
	urls: IUrl[];
}

export interface ILegacyExtendedProfile {}

export interface IVerificationInfo {
	reason: IVerificationReason;
}

export interface IVerificationReason {
	description: IVerificationReasonDescription;
	verified_since_msec: string;
}

export interface IVerificationReasonDescription {
	text: string;
	entities: IVerificationEntity[];
}

export interface IVerificationEntity {
	from_index: number;
	to_index: number;
	ref: IVerificationRef;
}

export interface IVerificationRef {
	url: string;
	url_type: string;
}

export interface IHighlightsInfo {
	can_highlight_tweets: boolean;
	highlighted_tweets: string;
}

export interface IBusinessAccountInfo {
	affiliates_count: number;
}
