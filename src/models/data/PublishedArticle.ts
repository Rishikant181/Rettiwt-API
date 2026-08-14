import { IPublishedArticle, IPublishedArticleMedia } from '../../types/data/PublishedArticle';
import {
	IPublishedArticle as IRawPublishedArticle,
	IPublishedArticleMedia as IRawPublishedArticleMedia,
} from '../../types/raw/base/PublishedArticle';
import { ITweet as IRawTweet } from '../../types/raw/base/Tweet';

import { User } from './User';

/**
 * The details of an X Article attached to a tweet.
 *
 * @public
 */
export class PublishedArticle implements IPublishedArticle {
	/** The raw article details. */
	private readonly _raw: IRawPublishedArticle;

	public author: User;
	public blocks: Record<string, unknown>[];
	public coverMedia?: PublishedArticleMedia;
	public entityMap: Record<string, unknown>;
	public id: string;
	public media: PublishedArticleMedia[];
	public modifiedAt?: string;
	public previewText?: string;
	public publishedAt?: string;
	public text: string;
	public title: string;
	public tweetId: string;
	public url: string;

	/**
	 * @param tweet - The raw tweet containing the article.
	 */
	public constructor(tweet: IRawTweet) {
		const article = tweet.article?.article_results?.result;
		if (!article) {
			throw new Error(`Tweet ${tweet.rest_id} does not contain an article`);
		}

		this._raw = { ...article };
		this.id = article.rest_id;
		this.tweetId = tweet.rest_id;
		this.title = article.title;
		this.previewText = article.preview_text || undefined;
		this.blocks = article.content_state?.blocks ?? [];
		this.entityMap = article.content_state?.entityMap ?? article.content_state?.entity_map ?? {};
		this.text = this.blocks
			.map((block) => (typeof block.text === 'string' ? block.text : ''))
			.filter(Boolean)
			.join('\n\n');
		this.author = new User(tweet.core.user_results.result);
		this.publishedAt = PublishedArticle._toIsoDate(article.metadata?.first_published_at_secs);
		this.modifiedAt = PublishedArticle._toIsoDate(article.lifecycle_state?.modified_at_secs);
		this.coverMedia = article.cover_media ? new PublishedArticleMedia(article.cover_media) : undefined;
		const media = Array.isArray(article.media_entities)
			? article.media_entities
			: Object.values(article.media_entities ?? {});
		this.media = media.map((item) => new PublishedArticleMedia(item));
		this.url = `https://x.com/${this.author.userName}/status/${this.tweetId}`;
	}

	/** The raw article details. */
	public get raw(): IRawPublishedArticle {
		return { ...this._raw };
	}

	private static _toIsoDate(value?: string | number): string | undefined {
		if (value === undefined || value === '') return undefined;
		const seconds = Number(value);
		return Number.isFinite(seconds) ? new Date(seconds * 1000).toISOString() : undefined;
	}

	/**
	 * Creates an article from a raw tweet, if present.
	 *
	 * @param tweet - The raw tweet that may contain an article.
	 */
	public static fromTweet(tweet: IRawTweet): PublishedArticle | undefined {
		return tweet.article?.article_results?.result ? new PublishedArticle(tweet) : undefined;
	}

	/**
	 * @returns A serializable JSON representation of this article.
	 */
	public toJSON(): IPublishedArticle {
		return {
			author: this.author.toJSON(),
			blocks: this.blocks,
			coverMedia: this.coverMedia?.toJSON(),
			entityMap: this.entityMap,
			id: this.id,
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
 * Media attached to an X Article.
 *
 * @public
 */
export class PublishedArticleMedia implements IPublishedArticleMedia {
	public height?: number;
	public id?: string;
	public mediaId?: string;
	public mediaKey?: string;
	public type: string;
	public url: string;
	public width?: number;

	public constructor(media: IRawPublishedArticleMedia) {
		this.id = media.rest_id ?? media.id_str ?? media.id;
		this.mediaId = media.media_id;
		this.mediaKey = media.media_key;
		this.type = media.type === 'animated_gif' ? 'gif' : (media.type ?? 'photo');
		this.url = media.media_info?.original_img_url ?? media.media_url_https ?? media.url ?? '';
		this.width = media.media_info?.original_img_width ?? media.original_info?.width;
		this.height = media.media_info?.original_img_height ?? media.original_info?.height;
	}

	public toJSON(): IPublishedArticleMedia {
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
