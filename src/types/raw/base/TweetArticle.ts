/* eslint-disable */

import { ArticleLifecycle } from '../../../enums/Article';

import { IArticle, IArticleContentState, IArticleMetadata } from './Article';

/**
 * The Article payload embedded in a tweet response.
 *
 * This extends the lifecycle Article entity with tweet-only publication and
 * media fields returned by `UserArticlesTweets` and `TweetDetail`.
 *
 * @public
 */
export interface ITweetArticle
	extends Omit<IArticle, 'content_state' | 'id' | 'lifecycle_state' | 'media_entities' | 'metadata' | 'title'> {
	content_state?: ITweetArticleContentState;
	cover_media?: ITweetArticleMedia;
	id?: string;
	lifecycle_state?: ITweetArticleLifecycleState;
	media_entities?: ITweetArticleMedia[] | Record<string, ITweetArticleMedia>;
	metadata?: ITweetArticleMetadata;
	title: string;
}

export interface ITweetArticleContentState extends Omit<IArticleContentState, 'entityMap'> {
	entityMap?: Record<string, unknown> | unknown[];
	entity_map?: Record<string, unknown> | unknown[];
}

export interface ITweetArticleMetadata extends Omit<IArticleMetadata, 'created_at_secs' | 'modified_at_secs'> {
	created_at_secs?: string | number;
	first_published_at_secs?: string | number;
	modified_at_secs?: string | number;
}

export interface ITweetArticleLifecycleState {
	lifecycle?: ArticleLifecycle | string;
	modified_at_secs?: string | number;
}

export interface ITweetArticleMedia {
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
