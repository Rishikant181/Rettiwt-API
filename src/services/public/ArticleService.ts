import { Extractors } from '../../collections/Extractors';
import { ArticleLifecycle } from '../../enums/Article';
import { ResourceType } from '../../enums/Resource';
import { Article } from '../../models/data/Article';
import { CursoredData } from '../../models/data/CursoredData';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IArticleEntitiesResponse } from '../../types/raw/article/Entities';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to Articles.
 *
 * @public
 */
export class ArticleService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Get the draft Articles of the logged-in user.
	 *
	 * @param count - The number of Articles to fetch. Defaults to 20.
	 * @param cursor - The cursor to the batch of Articles to fetch.
	 * @param id - The ID of the target user. If no id is provided, the logged-in user's id is used.
	 *
	 * @returns The list of draft Articles.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 20 draft Articles of the logged-in user
	 * rettiwt.article.drafts()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async drafts(count?: number, cursor?: string, id?: string): Promise<CursoredData<Article>> {
		return this.list(id, ArticleLifecycle.DRAFT, count, cursor);
	}

	/**
	 * Get the list of Articles for a user by lifecycle state.
	 *
	 * @param id - The ID of the target user. If no id is provided, the logged-in user's id is used.
	 * @param lifecycle - The lifecycle state of the Articles to fetch. Defaults to Draft.
	 * @param count - The number of Articles to fetch. Defaults to 20.
	 * @param cursor - The cursor to the batch of Articles to fetch.
	 *
	 * @returns The list of Articles with the given lifecycle state.
	 *
	 * @example
	 *
	 * ```ts
	 * import { ArticleLifecycle, Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 20 draft Articles of the logged-in user
	 * rettiwt.article.list(undefined, ArticleLifecycle.DRAFT)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async list(
		id?: string,
		lifecycle: ArticleLifecycle = ArticleLifecycle.DRAFT,
		count?: number,
		cursor?: string,
	): Promise<CursoredData<Article>> {
		const resource = ResourceType.ARTICLE_ENTITIES;

		// Fetching raw list of Articles
		const response = await this.request<IArticleEntitiesResponse>(resource, {
			id: id ?? this.config.userId,
			lifecycle: lifecycle,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}
}
