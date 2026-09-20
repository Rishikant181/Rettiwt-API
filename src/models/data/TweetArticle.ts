import { ITweetArticle, ITweetArticleMedia } from '../../types/data/TweetArticle';
import { IArticle as IRawArticle } from '../../types/raw/base/Article';
import { ITweet as IRawTweet } from '../../types/raw/base/Tweet';
import {
	ITweetArticle as IRawTweetArticle,
	ITweetArticleMedia as IRawTweetArticleMedia,
} from '../../types/raw/base/TweetArticle';

import { Article } from './Article';
import { User } from './User';

/**
 * The shared Article model enriched with public tweet context.
 *
 * @public
 */
export class TweetArticle extends Article implements ITweetArticle {
	public author: User;
	public blocks;
	public coverMedia?: TweetArticleMedia;
	public entityMap;
	public media: TweetArticleMedia[];
	public publishedAt?: string;
	public text: string;
	public title: string;
	public tweetId: string;
	public url: string;

	/**
	 * @param tweet - The raw tweet containing the Article.
	 */
	public constructor(tweet: IRawTweet) {
		const article = tweet.article?.article_results?.result;
		if (!article) {
			throw new Error(`Tweet ${tweet.rest_id} does not contain an article`);
		}

		const media = Array.isArray(article.media_entities)
			? article.media_entities
			: Object.values(article.media_entities ?? {});
		const entityMap = article.content_state?.entityMap ?? article.content_state?.entity_map ?? {};
		const normalized = TweetArticle._normalizeForSharedModel(article, media, entityMap);

		super(normalized);

		this.author = new User(tweet.core.user_results.result);
		this.blocks = normalized.content_state?.blocks ?? [];
		this.coverMedia = article.cover_media ? new TweetArticleMedia(article.cover_media) : undefined;
		this.entityMap = entityMap;
		this.media = media.map((item) => new TweetArticleMedia(item));
		this.publishedAt = TweetArticle._toIsoDate(article.metadata?.first_published_at_secs);
		this.text = this.blocks
			.map((block) => block.text)
			.filter(Boolean)
			.join('\n\n');
		this.title = article.title;
		this.tweetId = tweet.rest_id;
		this.url = `https://x.com/${this.author.userName}/status/${this.tweetId}`;
	}

	private static _normalizeForSharedModel(
		article: IRawTweetArticle,
		media: IRawTweetArticleMedia[],
		entityMap: Record<string, unknown> | unknown[],
	): IRawArticle {
		const modifiedAt = TweetArticle._toSeconds(article.lifecycle_state?.modified_at_secs);
		const firstPublishedAt = TweetArticle._toSeconds(article.metadata?.first_published_at_secs);
		const lifecycle = article.lifecycle_state?.lifecycle;

		return {
			/* eslint-disable @typescript-eslint/naming-convention */
			...article,
			content_state: {
				blocks: article.content_state?.blocks ?? [],
				entityMap: entityMap,
			},
			id: article.id ?? article.rest_id,
			lifecycle_state: lifecycle
				? {
						lifecycle: lifecycle,
						modified_at_secs: modifiedAt,
					}
				: undefined,
			media_entities: media,
			metadata: {
				...article.metadata,
				created_at_secs: TweetArticle._toSeconds(article.metadata?.created_at_secs) ?? firstPublishedAt,
				modified_at_secs: TweetArticle._toSeconds(article.metadata?.modified_at_secs) ?? modifiedAt,
			},
			/* eslint-enable @typescript-eslint/naming-convention */
		};
	}

	private static _toIsoDate(value?: string | number): string | undefined {
		const seconds = TweetArticle._toSeconds(value);
		return seconds === undefined ? undefined : new Date(seconds * 1000).toISOString();
	}

	private static _toSeconds(value?: string | number): number | undefined {
		if (value === undefined || value === '') return undefined;
		const seconds = Number(value);
		return Number.isFinite(seconds) ? seconds : undefined;
	}

	/** Creates a published Article from a raw tweet, if one is attached. */
	public static fromTweet(tweet: IRawTweet): TweetArticle | undefined {
		return tweet.article?.article_results?.result ? new TweetArticle(tweet) : undefined;
	}

	/** @returns A serializable representation of this published Article. */
	public override toJSON(): ITweetArticle {
		return {
			...super.toJSON(),
			author: this.author.toJSON(),
			blocks: this.blocks,
			coverMedia: this.coverMedia?.toJSON(),
			entityMap: this.entityMap,
			media: this.media.map((item) => item.toJSON()),
			publishedAt: this.publishedAt,
			text: this.text,
			title: this.title,
			tweetId: this.tweetId,
			url: this.url,
		};
	}
}

/** Normalized media attached to a published Article. */
export class TweetArticleMedia implements ITweetArticleMedia {
	public height?: number;
	public id?: string;
	public mediaId?: string;
	public mediaKey?: string;
	public type: string;
	public url: string;
	public width?: number;

	public constructor(media: IRawTweetArticleMedia) {
		this.id = media.rest_id ?? media.id_str ?? media.id;
		this.mediaId = media.media_id;
		this.mediaKey = media.media_key;
		this.type = media.type === 'animated_gif' ? 'gif' : (media.type ?? 'photo');
		this.url = media.media_info?.original_img_url ?? media.media_url_https ?? media.url ?? '';
		this.width = media.media_info?.original_img_width ?? media.original_info?.width;
		this.height = media.media_info?.original_img_height ?? media.original_info?.height;
	}

	public toJSON(): ITweetArticleMedia {
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
