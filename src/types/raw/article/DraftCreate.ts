/* eslint-disable */

import { IArticle } from '../base/Article';
import { IDataResult } from '../composite/DataResult';

/**
 * The raw response received when creating an Article draft.
 *
 * @public
 */
export interface IArticleDraftCreateResponse {
	data?: {
		articleentity_create_draft?: IArticleDraftCreate;
	};
}

/**
 * The raw Article draft creation result.
 *
 * @public
 */
export interface IArticleDraftCreate {
	article_entity_results?: IDataResult<IArticle>;
}
