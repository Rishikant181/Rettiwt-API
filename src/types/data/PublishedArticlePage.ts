import { ITweetArticle } from './TweetArticle';

/**
 * A cursor-based page of published X Articles.
 *
 * This type is intentionally separate from {@link ICursoredData} so the public
 * article timeline can coexist with the Article entity model introduced by
 * the article lifecycle API.
 *
 * @public
 */
export interface IPublishedArticlePage {
	/** The published articles in this page. */
	list: ITweetArticle[];

	/** The cursor to the next page, or an empty string when no page follows. */
	next: string;
}
