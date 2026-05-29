/* eslint-disable */

import { IArticle } from '../base/Article';

/**
 * The raw response received when updating an Article title.
 *
 * @public
 */
export interface IArticleUpdateTitleResponse {
	data?: {
		articleentity_update_title?: IArticle;
	};
}
