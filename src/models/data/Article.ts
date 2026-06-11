import { ArticleLifecycle } from '../../enums/Article';
import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IArticle, IArticleContentState } from '../../types/data/Article';
import { IArticleDraftCreateResponse } from '../../types/raw/article/DraftCreate';
import { IArticleEntitiesResponse } from '../../types/raw/article/Entities';
import { IArticleUpdateTitleResponse } from '../../types/raw/article/UpdateTitle';
import { IArticle as IRawArticle } from '../../types/raw/base/Article';

import { User } from './User';

/**
 * The details of a single Article.
 *
 * @public
 */
export class Article implements IArticle {
	/** The raw Article details. */
	private readonly _raw: IRawArticle;

	public author?: User;
	public contentState: IArticleContentState;
	public createdAt?: string;
	public id: string;
	public lifecycle?: ArticleLifecycle | string;
	public media?: unknown[];
	public modifiedAt?: string;
	public previewText?: string;
	public title?: string;

	/**
	 * @param article - The raw Article details.
	 */
	public constructor(article: IRawArticle) {
		this._raw = { ...article };
		this.id = article.rest_id;
		this.title = article.title;
		this.previewText = article.preview_text?.length ? article.preview_text : undefined;
		this.lifecycle = article.lifecycle_state?.lifecycle;
		this.createdAt = Article._secondsToIso(article.metadata?.created_at_secs);
		this.modifiedAt = Article._secondsToIso(
			article.lifecycle_state?.modified_at_secs ?? article.metadata?.modified_at_secs,
		);
		this.contentState = article.content_state ?? { blocks: [], entityMap: [] };
		this.media = article.media_entities;

		const author = article.metadata?.author_results?.result;
		if (author?.rest_id && author.legacy) {
			this.author = new User(author);
		}
	}

	/** The raw Article details. */
	public get raw(): IRawArticle {
		return { ...this._raw };
	}

	/**
	 * Converts seconds since epoch to an ISO string.
	 *
	 * @param value - The seconds since epoch.
	 */
	private static _secondsToIso(value?: number): string | undefined {
		if (value == undefined) {
			return undefined;
		}

		const milliseconds = value * 1000;

		if (Number.isNaN(milliseconds)) {
			return undefined;
		}

		return new Date(milliseconds).toISOString();
	}

	/**
	 * Extracts and deserializes the created Article draft from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The created Article draft.
	 */
	public static fromDraftCreate(response: IArticleDraftCreateResponse): Article | undefined {
		const article = response.data?.articleentity_create_draft?.article_entity_results?.result;

		return Article.fromRawArticle(article);
	}

	/**
	 * Extracts and deserializes a single raw Article.
	 *
	 * @param article - The raw Article data.
	 *
	 * @returns The deserialized Article.
	 */
	public static fromRawArticle(article?: IRawArticle): Article | undefined {
		if (article?.rest_id) {
			// Logging
			LogService.log(LogActions.DESERIALIZE, { id: article.rest_id });

			return new Article(article);
		}

		// Logging
		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: `Article not found, skipping`,
		});

		return undefined;
	}

	/**
	 * Extracts and deserializes the updated Article from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The updated Article.
	 */
	public static fromTitleUpdate(response: IArticleUpdateTitleResponse): Article | undefined {
		const article = response.data?.articleentity_update_title;

		return Article.fromRawArticle(article);
	}

	/**
	 * Extracts and deserializes Article entities from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized Articles.
	 */
	public static multiple(response: NonNullable<unknown>): Article[] {
		const articles: Article[] = [];
		const items = (response as IArticleEntitiesResponse).data?.user?.result?.articles_article_mixer_slice?.items;

		if (!items || !Array.isArray(items)) {
			return articles;
		}

		for (const item of items) {
			const article = item.article_entity_results?.result;

			if (article?.rest_id) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: article.rest_id });

				articles.push(new Article(article));
			} else {
				// Logging
				LogService.log(LogActions.WARNING, {
					action: LogActions.DESERIALIZE,
					message: `Article not found, skipping`,
				});
			}
		}

		return articles;
	}

	/**
	 * Extracts and deserializes a single target Article from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param id - The id of the target Article.
	 *
	 * @returns The target deserialized Article.
	 */
	public static single(response: NonNullable<unknown>, id: string): Article | undefined {
		return Article.multiple(response).find((article) => article.id === id);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IArticle {
		return {
			author: this.author?.toJSON(),
			contentState: this.contentState,
			createdAt: this.createdAt,
			id: this.id,
			lifecycle: this.lifecycle,
			media: this.media,
			modifiedAt: this.modifiedAt,
			previewText: this.previewText,
			title: this.title,
		};
	}
}
