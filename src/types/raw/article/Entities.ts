/* eslint-disable */

import { IArticle } from '../base/Article';
import { IDataResult } from '../composite/DataResult';

/**
 * The raw response received when fetching Article entities.
 *
 * @public
 */
export interface IArticleEntitiesResponse {
	data?: {
		user?: IDataResult<IArticleEntitiesUserResult>;
	};
}

/**
 * The raw user result containing Article entities.
 *
 * @public
 */
export interface IArticleEntitiesUserResult {
	__typename?: string;
	articles_article_mixer_slice?: IArticleEntitiesSlice;
}

/**
 * The raw Article entities slice.
 *
 * @public
 */
export interface IArticleEntitiesSlice {
	items?: IArticleEntitiesItem[];
	slice_info?: IArticleEntitiesSliceInfo;
}

/**
 * A raw Article entities slice item.
 *
 * @public
 */
export interface IArticleEntitiesItem {
	article_entity_results?: IDataResult<IArticle>;
}

/**
 * The raw Article entities slice cursor information.
 *
 * @public
 */
export interface IArticleEntitiesSliceInfo {
	next_cursor?: string;
}
