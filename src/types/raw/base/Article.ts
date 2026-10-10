/* eslint-disable */

import { ArticleLifecycle } from '../../../enums/Article';

import { IDataResult } from '../composite/DataResult';

import { IUser } from './User';

/**
 * Represents the raw data of a lifecycle Article entity.
 *
 * @public
 */
export interface IArticle {
	content_state?: IArticleContentState;
	id: string;
	lifecycle_state?: IArticleLifecycleState;
	media_entities?: unknown[];
	metadata?: IArticleMetadata;
	preview_text?: string;
	rest_id: string;
	title?: string;
}

/** Represents the raw Draft.js-like content state of an Article. */
export interface IArticleContentState {
	blocks: IArticleContentBlock[];
	entityMap: Record<string, unknown> | unknown[];
}

/** Represents a raw Article content block. */
export interface IArticleContentBlock {
	data: Record<string, unknown>;
	entityRanges: IArticleEntityRange[];
	inlineStyleRanges: IArticleInlineStyleRange[];
	key: string;
	text: string;
	type: string;
}

/** Represents a raw entity range in an Article content block. */
export interface IArticleEntityRange {
	key: number;
	length: number;
	offset: number;
}

/** Represents a raw inline style range in an Article content block. */
export interface IArticleInlineStyleRange {
	length: number;
	offset: number;
	style: string;
}

/** Represents the raw lifecycle details of an Article. */
export interface IArticleLifecycleState {
	lifecycle: ArticleLifecycle | string;
	modified_at_secs?: number;
}

/** Represents the raw metadata of an Article. */
export interface IArticleMetadata {
	author_results?: IDataResult<IUser>;
	created_at_secs?: number;
	modified_at_secs?: number;
}
