import { ArticleLifecycle } from '../../enums/Article';
import { LogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';
import { LogService } from '../../services/internal/LogService';
import { IArticle, IArticleContentState, IArticleMedia } from '../../types/data/Article';
import { IArticleDraftCreateResponse } from '../../types/raw/article/DraftCreate';
import { IArticleEntitiesResponse } from '../../types/raw/article/Entities';
import { IArticleUpdateTitleResponse } from '../../types/raw/article/UpdateTitle';
import { IArticle as IRawArticle, IArticleMedia as IRawArticleMedia } from '../../types/raw/base/Article';
import { ILimitedVisibilityTweet } from '../../types/raw/base/LimitedVisibilityTweet';
import { ITweet as IRawTweet } from '../../types/raw/base/Tweet';
import { ITimelineTweet } from '../../types/raw/composite/TimelineTweet';

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
	public coverMedia?: ArticleMedia;
	public createdAt?: string;
	public id: string;
	public lifecycle?: ArticleLifecycle | string;
	public media: ArticleMedia[];
	public modifiedAt?: string;
	public previewText?: string;
	public publishedAt?: string;
	public text: string;
	public title?: string;
	public tweetId?: string;
	public url?: string;

	/**
	 * @param article - The raw Article details.
	 */
	public constructor(article: IRawArticle, sourceTweet?: IRawTweet) {
		this._raw = { ...article };
		this.id = article.rest_id ?? article.id ?? '';
		this.title = article.title;
		this.previewText = article.preview_text?.length ? article.preview_text : undefined;
		this.lifecycle = article.lifecycle_state?.lifecycle;
		this.publishedAt = Article._secondsToIso(article.metadata?.first_published_at_secs);
		this.createdAt = Article._secondsToIso(article.metadata?.created_at_secs) ?? this.publishedAt;
		this.modifiedAt = Article._secondsToIso(
			article.lifecycle_state?.modified_at_secs ?? article.metadata?.modified_at_secs,
		);
		this.contentState = {
			blocks: (article.content_state?.blocks ?? []).map((block) => ({
				data: block.data ?? {},
				entityRanges: block.entityRanges ?? [],
				inlineStyleRanges: block.inlineStyleRanges ?? [],
				key: block.key,
				text: block.text,
				type: block.type,
			})),
			entityMap: article.content_state?.entityMap ?? article.content_state?.entity_map ?? {},
		};
		const media = Array.isArray(article.media_entities)
			? article.media_entities
			: Object.values(article.media_entities ?? {});
		this.media = media.map((item) => new ArticleMedia(item));
		this.coverMedia = article.cover_media ? new ArticleMedia(article.cover_media) : undefined;
		this.text = this.contentState.blocks
			.map((block) => block.text)
			.filter(Boolean)
			.join('\n\n');
		this.tweetId = sourceTweet?.rest_id;

		const author = article.metadata?.author_results?.result ?? sourceTweet?.core?.user_results?.result;
		if (author?.rest_id && author.legacy) {
			this.author = new User(author);
		}

		if (this.tweetId && this.author?.userName) {
			this.url = `https://x.com/${this.author.userName}/status/${this.tweetId}`;
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
	private static _secondsToIso(value?: number | string): string | undefined {
		if (value == undefined) {
			return undefined;
		}

		const milliseconds = Number(value) * 1000;

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
	public static fromRawArticle(article?: IRawArticle, sourceTweet?: IRawTweet): Article | undefined {
		const id = article?.rest_id ?? article?.id;
		if (article && id) {
			// Logging
			LogService.log(LogActions.DESERIALIZE, { id: id });

			return new Article(article, sourceTweet);
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

		if (items && Array.isArray(items)) {
			for (const item of items) {
				const article = Article.fromRawArticle(item.article_entity_results?.result);
				if (article) {
					articles.push(article);
				}
			}

			return articles;
		}

		const timelineItems = findByFilter<ITimelineTweet>(response, '__typename', 'TimelineTweet');
		for (const item of timelineItems) {
			const result = item.tweet_results?.result;
			const tweet =
				result?.__typename === 'TweetWithVisibilityResults'
					? (result as ILimitedVisibilityTweet).tweet
					: (result as IRawTweet);
			const article = Article.fromRawArticle(tweet?.article?.article_results?.result, tweet);
			if (article) {
				articles.push(article);
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
		return Article.multiple(response).find((article) => article.id === id || article.tweetId === id);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IArticle {
		return {
			author: this.author?.toJSON(),
			coverMedia: this.coverMedia?.toJSON(),
			contentState: this.contentState,
			createdAt: this.createdAt,
			id: this.id,
			lifecycle: this.lifecycle,
			media: this.media.map((item) => item.toJSON()),
			modifiedAt: this.modifiedAt,
			previewText: this.previewText,
			publishedAt: this.publishedAt,
			text: this.text,
			title: this.title,
			tweetId: this.tweetId,
			url: this.url,
		};
	}
}

/**
 * Normalized media attached to an Article.
 *
 * @public
 */
export class ArticleMedia implements IArticleMedia {
	public height?: number;
	public id?: string;
	public mediaId?: string;
	public mediaKey?: string;
	public type: string;
	public url: string;
	public width?: number;

	/**
	 * @param media - The raw Article media details.
	 */
	public constructor(media: IRawArticleMedia) {
		this.id = media.rest_id ?? media.id_str ?? media.id;
		this.mediaId = media.media_id;
		this.mediaKey = media.media_key;
		this.type = media.type === 'animated_gif' ? 'gif' : (media.type ?? 'photo');
		this.url = media.media_info?.original_img_url ?? media.media_url_https ?? media.url ?? '';
		this.width = media.media_info?.original_img_width ?? media.original_info?.width;
		this.height = media.media_info?.original_img_height ?? media.original_info?.height;
	}

	/** @returns A serializable representation of this media. */
	public toJSON(): IArticleMedia {
		return {
			height: this.height,
			id: this.id,
			mediaId: this.mediaId,
			mediaKey: this.mediaKey,
			type: this.type,
			url: this.url,
			width: this.width,
		};
	}
}
