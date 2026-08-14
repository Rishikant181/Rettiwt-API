/* eslint-disable */

/**
 * Represents the raw data of an X Article attached to a tweet.
 *
 * @public
 */
export interface IPublishedArticle {
	rest_id: string;
	title: string;
	preview_text?: string;
	cover_media?: IPublishedArticleMedia;
	media_entities?: IPublishedArticleMedia[] | Record<string, IPublishedArticleMedia>;
	content_state?: IPublishedArticleContentState;
	metadata?: IPublishedArticleMetadata;
	lifecycle_state?: IPublishedArticleLifecycleState;
}

export interface IPublishedArticleContentState {
	blocks?: Record<string, unknown>[];
	entityMap?: Record<string, unknown>;
	entity_map?: Record<string, unknown>;
}

export interface IPublishedArticleMetadata {
	first_published_at_secs?: string | number;
}

export interface IPublishedArticleLifecycleState {
	modified_at_secs?: string | number;
}

export interface IPublishedArticleMedia {
	rest_id?: string;
	id_str?: string;
	id?: string;
	media_id?: string;
	media_key?: string;
	type?: string;
	media_url_https?: string;
	url?: string;
	media_info?: {
		original_img_url?: string;
		original_img_width?: number;
		original_img_height?: number;
	};
	original_info?: {
		width?: number;
		height?: number;
	};
}
