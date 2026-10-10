/* eslint-disable */

import { ArticleLifecycle } from '../../../enums/Article';

import { IArticleEntityRange, IArticleInlineStyleRange } from './Article';

/** Raw data for an Article attached to a published tweet. */
export interface IPublishedArticle {
	content_state?: IPublishedArticleContentState;
	cover_media?: IPublishedArticleMedia;
	id: string;
	lifecycle_state?: IPublishedArticleLifecycleState;
	media_entities?: IPublishedArticleMedia[];
	metadata?: IPublishedArticleMetadata;
	plain_text?: string;
	preview_text?: string;
	rest_id: string;
	title?: string;
}

/** Raw content state included with a published Article. */
export interface IPublishedArticleContentState {
	blocks?: IPublishedArticleContentBlock[];
	entityMap?: Record<string, unknown> | unknown[];
}

/** Raw content block included with a published Article. */
export interface IPublishedArticleContentBlock {
	data?: Record<string, unknown>;
	entityRanges?: IArticleEntityRange[];
	inlineStyleRanges?: IArticleInlineStyleRange[];
	key: string;
	text: string;
	type: string;
}

/** Raw lifecycle details included with a published Article. */
export interface IPublishedArticleLifecycleState {
	lifecycle?: ArticleLifecycle | string;
	modified_at_secs?: number | string;
}

/** Raw media attached to a published Article. */
export interface IPublishedArticleMedia {
	id: string;
	media_id: string;
	media_info: {
		__typename?: string;
		original_img_height: number;
		original_img_url: string;
		original_img_width: number;
	};
	media_key: string;
}

/** Raw metadata included with a published Article. */
export interface IPublishedArticleMetadata {
	created_at_secs?: number | string;
	first_published_at_secs?: number | string;
	modified_at_secs?: number | string;
}
