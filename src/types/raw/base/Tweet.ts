/* eslint-disable */

import { IDataResult } from '../composite/DataResult';
import { IArticle } from './Article';
import { IUser } from './User';
import { IMedia, IExtendedMedia } from './Media';
import { ILimitedVisibilityTweet } from './LimitedVisibilityTweet';

/**
 * Represents the raw data of a single Tweet.
 *
 * @public
 */
export interface ITweet {
	__typename: string;
	rest_id: string;
	core: ITweetCore;
	edit_control: ITweetEditControl;
	edit_perspective: ITweetEditPerspective;
	is_translatable: boolean;
	views?: ITweetViews;
	source: string;
	quoted_status_result: IDataResult<ITweet | ILimitedVisibilityTweet>;
	note_tweet: ITweetNote;
	legacy: ITweetLegacy;
	quick_promote_eligibility: ITweetQuickPromoteEligibilityInfo;
	article?: {
		article_results: IDataResult<IArticle>;
	};
}

export interface ITweetCore {
	user_results: IDataResult<IUser>;
}

export interface ITweetEditControl {
	edit_tweet_ids: string[];
	editable_until_msecs: string;
	is_edit_eligible: boolean;
	edits_remaining: string;
}

export interface ITweetEditPerspective {
	favorited: boolean;
	retweeted: boolean;
}

export interface ITweetViews {
	count: string;
	state: string;
}

export interface ITweetNote {
	is_expandable: boolean;
	note_tweet_results: ITweetNoteResults;
}

export interface ITweetNoteResults {
	result: ITweetNoteResult;
}

export interface ITweetNoteResult {
	id: string;
	text: string;
	entity_set: IEntities;
	richtext: IRichtext;
	media: ITweetNoteMedia;
}

export interface IRichtext {
	richtext_tags: IRichtextTag[];
}

export interface IRichtextTag {
	from_index: number;
	to_index: number;
	richtext_types: string[];
}

export interface ITweetNoteMedia {
	inline_media: any[];
}

export interface ITweetLegacy {
	bookmark_count?: number;
	bookmarked: boolean;
	created_at: string;
	conversation_id_str: string;
	display_text_range: number[];
	entities: IEntities;
	extended_entities: IExtendedEntities;
	favorite_count?: number;
	favorited: boolean;
	full_text: string;
	in_reply_to_status_id_str: string;
	is_quote_status: boolean;
	lang: string;
	possibly_sensitive: boolean;
	possibly_sensitive_editable: boolean;
	quote_count?: number;
	quoted_status_id_str: string;
	reply_count?: number;
	retweet_count?: number;
	retweeted: boolean;
	user_id_str: string;
	id_str: string;
	retweeted_status_result: IDataResult<ITweet | ILimitedVisibilityTweet>;
}

export interface IEntities {
	media: IMedia[];
	user_mentions: IUserMention[];
	urls: IUrl[];
	hashtags: IHashtag[];
	symbols: any[];
}

export interface IUserMention {
	id_str: string;
	name: string;
	screen_name: string;
	indices: number[];
}

export interface IUrl {
	display_url: string;
	expanded_url: string;
	url: string;
	indices: number[];
}

export interface IHashtag {
	indices: number[];
	text: string;
}

export interface IExtendedEntities {
	media: IExtendedMedia[];
}

export interface ITweetQuickPromoteEligibilityInfo {
	eligibility: string;
}
