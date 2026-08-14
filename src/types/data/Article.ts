import { IUser } from './User';

/**
 * A serializable representation of an X Article.
 *
 * @public
 */
export interface IArticle {
	/** The article ID. */
	id: string;

	/** The ID of the tweet that contains the article. */
	tweetId: string;

	/** The article title. */
	title: string;

	/** The short preview shown in article timelines. */
	previewText?: string;

	/** The article body as plain text, derived from its rich-content blocks. */
	text: string;

	/** The original rich-content blocks returned by X. */
	blocks: Record<string, unknown>[];

	/** Entities referenced by the rich-content blocks. */
	entityMap: Record<string, unknown>;

	/** The article author. */
	author: IUser;

	/** The first publication time in ISO 8601 format. */
	publishedAt?: string;

	/** The latest modification time in ISO 8601 format. */
	modifiedAt?: string;

	/** The article cover media. */
	coverMedia?: IArticleMedia;

	/** Media referenced by the article body. */
	media: IArticleMedia[];

	/** The canonical tweet URL that opens the article. */
	url: string;
}

/**
 * Media attached to an X Article.
 *
 * @public
 */
export interface IArticleMedia {
	id?: string;
	mediaId?: string;
	mediaKey?: string;
	type: string;
	url: string;
	width?: number;
	height?: number;
}
