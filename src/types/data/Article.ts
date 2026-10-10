import { ArticleLifecycle } from '../../enums/Article';

import { IUser } from './User';

/** Fields shared by lifecycle and published Articles. */
export interface IBaseArticle {
	/** The identifier selected by the concrete Article model. */
	id: string;

	/** The preview text of the Article. */
	previewText?: string;

	/** The title of the Article. */
	title?: string;
}

/** A lifecycle Article entity used for drafts and Article management. */
export interface IArticle extends IBaseArticle {
	/** The user who authored the lifecycle Article. */
	author?: IUser;

	/** The lifecycle Article content state. */
	contentState: IArticleContentState;

	/** The creation date of the lifecycle Article. */
	createdAt?: string;

	/** The lifecycle state of the Article. */
	lifecycle?: ArticleLifecycle | string;

	/** Media entities returned by the lifecycle Article endpoint. */
	media?: unknown[];

	/** The last modification date of the lifecycle Article. */
	modifiedAt?: string;
}

/** An Article exposed through a published tweet. */
export interface IPublishedArticle extends IBaseArticle {
	/** The published Article content state, when returned by X. */
	contentState?: IPublishedArticleContentState;

	/** The cover media shown for the published Article. */
	coverMedia?: IPublishedArticleMedia;

	/** Normalized media attached to the published Article. */
	media?: IPublishedArticleMedia[];

	/** The first publication date of the Article. */
	publishedAt?: string;

	/** Plain text derived from the returned content blocks. */
	text?: string;
}

/** Normalized media attached to a published Article. */
export interface IPublishedArticleMedia {
	height: number;
	id: string;
	mediaId: string;
	mediaKey: string;
	url: string;
	width: number;
}

/** The Draft.js-like content state of a lifecycle Article. */
export interface IArticleContentState {
	blocks: IArticleContentBlock[];
	entityMap: Record<string, unknown> | unknown[];
}

/** The content state returned for a published Article. */
export interface IPublishedArticleContentState {
	blocks?: IPublishedArticleContentBlock[];
	entityMap?: Record<string, unknown> | unknown[];
}

/** A lifecycle Article content block. */
export interface IArticleContentBlock {
	data: Record<string, unknown>;
	entityRanges: IArticleEntityRange[];
	inlineStyleRanges: IArticleInlineStyleRange[];
	key: string;
	text: string;
	type: string;
}

/** A content block returned for a published Article. */
export interface IPublishedArticleContentBlock {
	data?: Record<string, unknown>;
	entityRanges?: IArticleEntityRange[];
	inlineStyleRanges?: IArticleInlineStyleRange[];
	key: string;
	text: string;
	type: string;
}

/** The details of an Article entity range. */
export interface IArticleEntityRange {
	key: number;
	length: number;
	offset: number;
}

/** The details of an Article inline style range. */
export interface IArticleInlineStyleRange {
	length: number;
	offset: number;
	style: string;
}
