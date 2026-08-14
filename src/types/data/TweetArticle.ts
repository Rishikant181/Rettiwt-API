import { IArticle, IArticleContentBlock } from './Article';
import { IUser } from './User';

/**
 * A published Article enriched with the tweet that exposes it publicly.
 *
 * @public
 */
export interface ITweetArticle extends IArticle {
	/** The public article author from the containing tweet. */
	author: IUser;

	/** Alias for `contentState.blocks`. */
	blocks: IArticleContentBlock[];

	/** The cover media shown for the published Article. */
	coverMedia?: ITweetArticleMedia;

	/** Alias for `contentState.entityMap`. */
	entityMap: Record<string, unknown> | unknown[];

	/** Normalized media referenced by the Article. */
	media: ITweetArticleMedia[];

	/** The first publication time in ISO 8601 format. */
	publishedAt?: string;

	/** Plain text derived from the rich-content blocks. */
	text: string;

	/** The published Article title. */
	title: string;

	/** The ID of the tweet containing this Article. */
	tweetId: string;

	/** The canonical tweet URL that opens this Article. */
	url: string;
}

/** Media attached to a published Article. */
export interface ITweetArticleMedia {
	height?: number;
	id?: string;
	mediaId?: string;
	mediaKey?: string;
	type: string;
	url: string;
	width?: number;
}
