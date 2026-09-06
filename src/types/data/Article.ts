import { ArticleLifecycle } from '../../enums/Article';

import { IUser } from './User';

/**
 * The details of a single Article.
 *
 * @public
 */
export interface IArticle {
	/** The details of the user who authored the Article. */
	author?: IUser;

	/** The cover media shown for the published Article. */
	coverMedia?: IArticleMedia;

	/** The raw content state of the Article. */
	contentState: IArticleContentState;

	/** The creation date of the Article. */
	createdAt?: string;

	/** The rest id of the Article. */
	id: string;

	/** The lifecycle state of the Article. */
	lifecycle?: ArticleLifecycle | string;

	/** The media entities attached to the Article. */
	media?: IArticleMedia[];

	/** The last modification date of the Article. */
	modifiedAt?: string;

	/** The preview text of the Article. */
	previewText?: string;

	/** The first publication date of the Article. */
	publishedAt?: string;

	/** Plain text derived from the Article content blocks. */
	text: string;

	/** The title of the Article. */
	title?: string;

	/** The ID of the tweet that exposes a published Article. */
	tweetId?: string;

	/** The public URL of the tweet that exposes a published Article. */
	url?: string;
}

/**
 * Normalized media attached to an Article.
 *
 * @public
 */
export interface IArticleMedia {
	height?: number;
	id?: string;
	mediaId?: string;
	mediaKey?: string;
	type: string;
	url: string;
	width?: number;
}

/**
 * The Draft.js-like content state of an Article.
 *
 * @public
 */
export interface IArticleContentState {
	/** The list of content blocks of the Article. */
	blocks: IArticleContentBlock[];

	/** The entity map of the Article. */
	entityMap: Record<string, unknown> | unknown[];
}

/**
 * The details of a single Article content block.
 *
 * @public
 */
export interface IArticleContentBlock {
	/** Additional data for this content block. */
	data: Record<string, unknown>;

	/** The entity ranges in this content block. */
	entityRanges: IArticleEntityRange[];

	/** The inline style ranges in this content block. */
	inlineStyleRanges: IArticleInlineStyleRange[];

	/** The key of this content block. */
	key: string;

	/** The text in this content block. */
	text: string;

	/** The type of this content block. */
	type: string;
}

/**
 * The details of an Article entity range.
 *
 * @public
 */
export interface IArticleEntityRange {
	/** The entity key. */
	key: number;

	/** The range length. */
	length: number;

	/** The range offset. */
	offset: number;
}

/**
 * The details of an Article inline style range.
 *
 * @public
 */
export interface IArticleInlineStyleRange {
	/** The range length. */
	length: number;

	/** The range offset. */
	offset: number;

	/** The inline style name. */
	style: string;
}
