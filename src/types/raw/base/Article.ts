/* eslint-disable */

import { ArticleLifecycle } from '../../../enums/Article';

import { IDataResult } from '../composite/DataResult';

import { IUser } from './User';

/**
 * Represents the raw data of a single Article.
 *
 * @public
 */
export interface IArticle {
	content_state?: IArticleContentState;
	cover_media?: IArticleMedia;
	id?: string;
	lifecycle_state?: IArticleLifecycleState;
	media_entities?: IArticleMedia[] | Record<string, IArticleMedia>;
	metadata?: IArticleMetadata;
	preview_text?: string;
	rest_id?: string;
	title?: string;
}

/**
 * Represents the raw Draft.js-like content state of an Article.
 *
 * @public
 */
export interface IArticleContentState {
	blocks?: IArticleContentBlock[];
	entityMap?: Record<string, unknown> | unknown[];
	entity_map?: Record<string, unknown> | unknown[];
}

/**
 * Represents a raw content block of an Article.
 *
 * @public
 */
export interface IArticleContentBlock {
	data?: Record<string, unknown>;
	entityRanges?: IArticleEntityRange[];
	inlineStyleRanges?: IArticleInlineStyleRange[];
	key: string;
	text: string;
	type: string;
}

/**
 * Represents a raw entity range in an Article content block.
 *
 * @public
 */
export interface IArticleEntityRange {
	key: number;
	length: number;
	offset: number;
}

/**
 * Represents a raw inline style range in an Article content block.
 *
 * @public
 */
export interface IArticleInlineStyleRange {
	length: number;
	offset: number;
	style: string;
}

/**
 * Represents the raw lifecycle details of an Article.
 *
 * @public
 */
export interface IArticleLifecycleState {
	lifecycle?: ArticleLifecycle | string;
	modified_at_secs?: number | string;
}

/**
 * Represents raw media attached to an Article.
 *
 * @public
 */
export interface IArticleMedia {
	id?: string;
	id_str?: string;
	media_id?: string;
	media_info?: {
		original_img_height?: number;
		original_img_url?: string;
		original_img_width?: number;
	};
	media_key?: string;
	media_url_https?: string;
	original_info?: {
		height?: number;
		width?: number;
	};
	rest_id?: string;
	type?: string;
	url?: string;
}

/**
 * Represents the raw metadata of an Article.
 *
 * @public
 */
export interface IArticleMetadata {
	author_results?: IDataResult<IUser>;
	created_at_secs?: number | string;
	first_published_at_secs?: number | string;
	modified_at_secs?: number | string;
}
