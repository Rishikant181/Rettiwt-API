import { Extractors } from '../../collections/Extractors';
import { ArticleLifecycle } from '../../enums/Article';
import { ResourceType } from '../../enums/Resource';
import { Article } from '../../models/data/Article';
import { CursoredData } from '../../models/data/CursoredData';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IArticleDraft } from '../../types/args/PostArgs';
import { IArticleDeleteResponse } from '../../types/raw/article/Delete';
import { IArticleDraftCreateResponse } from '../../types/raw/article/DraftCreate';
import { IArticleEntitiesResponse } from '../../types/raw/article/Entities';
import { IArticleUpdateTitleResponse } from '../../types/raw/article/UpdateTitle';
import { ITweetRepliesResponse } from '../../types/raw/tweet/Replies';

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
	 * Create an Article draft.
	 *
	 * @param options - The Article draft options.
	 *
	 * @returns The created Article draft.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Creating an empty Article draft
	 * rettiwt.article.createDraft()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async createDraft(options?: IArticleDraft): Promise<Article | undefined> {
		const resource = ResourceType.ARTICLE_DRAFT_CREATE;

		// Creating the Article draft
		const response = await this.request<IArticleDraftCreateResponse>(resource, {
			articleDraft: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Delete an Article.
	 *
	 * @param id - The ID of the Article to delete.
	 *
	 * @returns Whether the Article was deleted.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Deleting an Article
	 * rettiwt.article.delete('2060430005013008384')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async delete(id: string): Promise<boolean> {
		const resource = ResourceType.ARTICLE_DELETE;

		// Deleting the Article
		const response = await this.request<IArticleDeleteResponse>(resource, {
			id: id,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get a complete published Article by the ID of the tweet containing it.
	 *
	 * @param id - The ID of the tweet containing the Article.
	 *
	 * @returns The Article, or `undefined` when the tweet does not contain one.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 * const article = await rettiwt.article.details('2083935229757337948');
	 * console.log(article?.title, article?.text);
	 * ```
	 */
	public async details(id: string): Promise<Article | undefined> {
		const resource = ResourceType.ARTICLE_DETAILS;
		const response = await this.request<ITweetRepliesResponse>(resource, { id: id });

		return Extractors[resource](response.data, id);
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

	/**
	 * Update an Article title.
	 *
	 * @param id - The ID of the Article to update.
	 * @param title - The new title to set.
	 *
	 * @returns The updated Article.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Updating an Article title
	 * rettiwt.article.updateTitle('2060444932632977410', 'New title')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async updateTitle(id: string, title: string): Promise<Article | undefined> {
		const resource = ResourceType.ARTICLE_TITLE_UPDATE;

		// Updating the Article title
		const response = await this.request<IArticleUpdateTitleResponse>(resource, {
			id: id,
			title: title,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}
}
