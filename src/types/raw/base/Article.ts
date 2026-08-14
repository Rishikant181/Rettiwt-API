/* eslint-disable */

/**
 * Represents the raw data of an X Article attached to a tweet.
 *
 * @public
 */
export interface IArticle {
	rest_id: string;
	title: string;
	preview_text?: string;
	cover_media?: IArticleMedia;
	media_entities?: IArticleMedia[] | Record<string, IArticleMedia>;
	content_state?: IArticleContentState;
	metadata?: IArticleMetadata;
	lifecycle_state?: IArticleLifecycleState;
}

export interface IArticleContentState {
	blocks?: Record<string, unknown>[];
	entityMap?: Record<string, unknown>;
	entity_map?: Record<string, unknown>;
}

export interface IArticleMetadata {
	first_published_at_secs?: string | number;
}

export interface IArticleLifecycleState {
	modified_at_secs?: string | number;
}

export interface IArticleMedia {
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
