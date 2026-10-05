import { LogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';
import { LogService } from '../../services/internal/LogService';
import { IPublishedArticle, IPublishedArticleContentState, IPublishedArticleMedia } from '../../types/data/Article';
import { ILimitedVisibilityTweet } from '../../types/raw/base/LimitedVisibilityTweet';
import {
	IPublishedArticle as IRawPublishedArticle,
	IPublishedArticleMedia as IRawPublishedArticleMedia,
} from '../../types/raw/base/PublishedArticle';
import { ITweet as IRawTweet } from '../../types/raw/base/Tweet';
import { ITimelineTweet } from '../../types/raw/composite/TimelineTweet';

import { BaseArticle } from './BaseArticle';

/**
 * An Article exposed through a published tweet.
 *
 * @public
 */
export class PublishedArticle extends BaseArticle implements IPublishedArticle {
	public contentState?: IPublishedArticleContentState;
	public coverMedia?: PublishedArticleMedia;
	public media?: PublishedArticleMedia[];
	public publishedAt?: string;

	/** @param article - The raw published Article details. */
	public constructor(article: IRawPublishedArticle) {
		if (!article.rest_id) {
			throw new TypeError('Published Article ID is required');
		}

		super(article, article.rest_id);
		this.publishedAt = PublishedArticle._secondsToIso(article.metadata?.first_published_at_secs);
		this.contentState = article.content_state;
		this.media = article.media_entities?.map((item) => new PublishedArticleMedia(item));
		this.coverMedia = article.cover_media ? new PublishedArticleMedia(article.cover_media) : undefined;
	}

	/** The raw published Article details. */
	public override get raw(): IRawPublishedArticle {
		return { ...this._raw } as IRawPublishedArticle;
	}

	/** Plain text derived from the content blocks returned by X. */
	public get text(): string | undefined {
		return this.contentState?.blocks?.map((block) => block.text).join('\n\n');
	}

	/** Converts seconds since epoch to an ISO string. */
	private static _secondsToIso(value?: number | string): string | undefined {
		if (value == undefined) {
			return undefined;
		}

		const seconds = Number(value);
		if (!Number.isFinite(seconds)) {
			return undefined;
		}

		const date = new Date(seconds * 1000);
		return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
	}

	/** Extracts a published Article from its containing tweet. */
	public static fromTweet(tweet?: IRawTweet): PublishedArticle | undefined {
		const article = tweet?.article?.article_results?.result;
		if (!article) {
			return undefined;
		}

		if (article.rest_id) {
			LogService.log(LogActions.DESERIALIZE, { id: article.rest_id });
			return new PublishedArticle(article);
		}

		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: `Published Article is missing its Article ID, skipping`,
		});

		return undefined;
	}

	/** Extracts published Articles from a tweet timeline response. */
	public static multiple(response: NonNullable<unknown>): PublishedArticle[] {
		const articles: PublishedArticle[] = [];
		const timelineItems = findByFilter<ITimelineTweet>(response, '__typename', 'TimelineTweet');

		for (const item of timelineItems) {
			const result = item.tweet_results?.result;
			const tweet =
				result?.__typename === 'TweetWithVisibilityResults'
					? (result as ILimitedVisibilityTweet).tweet
					: (result as IRawTweet);
			const article = PublishedArticle.fromTweet(tweet);

			if (article) {
				articles.push(article);
			}
		}

		return articles;
	}

	/** Extracts one published Article by Article ID or containing tweet ID. */
	public static single(response: NonNullable<unknown>, id: string): PublishedArticle | undefined {
		const timelineItems = findByFilter<ITimelineTweet>(response, '__typename', 'TimelineTweet');

		for (const item of timelineItems) {
			const result = item.tweet_results?.result;
			const tweet =
				result?.__typename === 'TweetWithVisibilityResults'
					? (result as ILimitedVisibilityTweet).tweet
					: (result as IRawTweet);
			const article = tweet?.article?.article_results?.result;

			if (article?.rest_id === id || tweet?.rest_id === id) {
				return PublishedArticle.fromTweet(tweet);
			}
		}

		return undefined;
	}

	/** @returns A serializable JSON representation of this published Article. */
	public override toJSON(): IPublishedArticle {
		return {
			...this._toBaseJSON(),
			contentState: this.contentState,
			coverMedia: this.coverMedia?.toJSON(),
			media: this.media?.map((item) => item.toJSON()),
			publishedAt: this.publishedAt,
			text: this.text,
		};
	}
}

/** Normalized media attached to a published Article. */
export class PublishedArticleMedia implements IPublishedArticleMedia {
	public height: number;
	public id: string;
	public mediaId: string;
	public mediaKey: string;
	public url: string;
	public width: number;

	/** @param media - The raw published Article media details. */
	public constructor(media: IRawPublishedArticleMedia) {
		this.id = media.id;
		this.mediaId = media.media_id;
		this.mediaKey = media.media_key;
		this.url = media.media_info.original_img_url;
		this.width = media.media_info.original_img_width;
		this.height = media.media_info.original_img_height;
	}

	/** @returns A serializable representation of this media. */
	public toJSON(): IPublishedArticleMedia {
		return {
			height: this.height,
			id: this.id,
			mediaId: this.mediaId,
			mediaKey: this.mediaKey,
			url: this.url,
			width: this.width,
		};
	}
}
