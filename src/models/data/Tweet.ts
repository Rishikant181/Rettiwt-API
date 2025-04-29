import { ELogActions } from '../../enums/Logging';
import { EMediaType } from '../../enums/Media';
import { ERawMediaType } from '../../enums/raw/Media';
import { findByFilter } from '../../helper/JsonUtils';

import { LogService } from '../../services/internal/LogService';

import { ITweet, ITweetEntities, ITweetMedia } from '../../types/data/Tweet';
import { ILimitedVisibilityTweet } from '../../types/raw/base/LimitedVisibilityTweet';
import { IExtendedMedia as IRawExtendedMedia } from '../../types/raw/base/Media';
import { ITweet as IRawTweet, IEntities as IRawTweetEntities } from '../../types/raw/base/Tweet';
import { ITimelineTweet } from '../../types/raw/composite/TimelineTweet';

import { User } from './User';

/**
 * The details of a single tweet.
 *
 * @public
 */
export class Tweet implements ITweet {
	/** The raw tweet details. */
	private readonly _raw: IRawTweet;

	public bookmarkCount: number;
	public conversationId: string;
	public createdAt: string;
	public entities: TweetEntities;
	public fullText: string;
	public id: string;
	public lang: string;
	public likeCount: number;
	public media?: TweetMedia[];
	public quoteCount: number;
	public quoted?: Tweet;
	public replyCount: number;
	public replyTo?: string;
	public retweetCount: number;
	public retweetedTweet?: Tweet;
	public tweetBy: User;
	public url: string;
	public viewCount: number;

	/**
	 * @param tweet - The raw tweet details.
	 */
	public constructor(tweet: IRawTweet) {
		this._raw = { ...tweet };
		this.id = tweet.rest_id;
		this.conversationId = tweet.legacy.conversation_id_str;
		this.createdAt = new Date(tweet.legacy.created_at).toISOString();
		this.tweetBy = new User(tweet.core.user_results.result);
		this.entities = new TweetEntities(tweet.legacy.entities);
		this.media = tweet.legacy.extended_entities?.media?.map((media) => new TweetMedia(media));
		this.quoted = this.getQuotedTweet(tweet);
		this.fullText = tweet.note_tweet ? tweet.note_tweet.note_tweet_results.result.text : tweet.legacy.full_text;
		this.replyTo = tweet.legacy.in_reply_to_status_id_str;
		this.lang = tweet.legacy.lang;
		this.quoteCount = tweet.legacy.quote_count;
		this.replyCount = tweet.legacy.reply_count;
		this.retweetCount = tweet.legacy.retweet_count;
		this.likeCount = tweet.legacy.favorite_count;
		this.viewCount = tweet.views.count ? parseInt(tweet.views.count) : 0;
		this.bookmarkCount = tweet.legacy.bookmark_count;
		this.retweetedTweet = this.getRetweetedTweet(tweet);
		this.url = `https://x.com/${this.tweetBy.userName}/status/${this.id}`;
	}

	/** Get the raw tweet details. */
	public get raw(): IRawTweet {
		return { ...this._raw };
	}

	/**
	 * Extract and deserialize the original quoted tweet from the given raw tweet.
	 *
	 * @param tweet - The raw tweet.
	 *
	 * @returns - The deserialized original quoted tweet.
	 */
	private getQuotedTweet(tweet: IRawTweet): Tweet | undefined {
		// If tweet with limited visibility
		if (
			tweet.quoted_status_result &&
			tweet.quoted_status_result?.result?.__typename == 'TweetWithVisibilityResults' &&
			(tweet.quoted_status_result.result as ILimitedVisibilityTweet)?.tweet?.legacy
		) {
			return new Tweet((tweet.quoted_status_result.result as ILimitedVisibilityTweet).tweet);
		}
		// If normal tweet
		else if ((tweet.quoted_status_result?.result as IRawTweet)?.rest_id) {
			return new Tweet(tweet.quoted_status_result.result as IRawTweet);
		}
		// Else, skip
		else {
			return undefined;
		}
	}

	/**
	 * Extract and deserialize the original retweeted tweet from the given raw tweet.
	 *
	 * @param tweet - The raw tweet.
	 *
	 * @returns - The deserialized original retweeted tweet.
	 */
	private getRetweetedTweet(tweet: IRawTweet): Tweet | undefined {
		// If retweet with limited visibility
		if (
			tweet.legacy?.retweeted_status_result &&
			tweet.legacy?.retweeted_status_result?.result?.__typename == 'TweetWithVisibilityResults' &&
			(tweet.legacy?.retweeted_status_result?.result as ILimitedVisibilityTweet)?.tweet?.legacy
		) {
			return new Tweet((tweet.legacy.retweeted_status_result.result as ILimitedVisibilityTweet).tweet);
		}
		// If normal tweet
		else if ((tweet.legacy?.retweeted_status_result?.result as IRawTweet)?.rest_id) {
			return new Tweet(tweet.legacy.retweeted_status_result.result as IRawTweet);
		}
		// Else, skip
		else {
			return undefined;
		}
	}

	/**
	 * Extracts and deserializes multiple target tweets from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param ids - The ids of the target tweets.
	 *
	 * @returns The target deserialized tweets.
	 */
	public static multiple(response: NonNullable<unknown>, ids: string[]): Tweet[] {
		let tweets: Tweet[] = [];

		// Extracting the matching data
		const extract = findByFilter<IRawTweet>(response, '__typename', 'Tweet');

		// Deserializing valid data
		for (const item of extract) {
			if (item.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.rest_id });

				tweets.push(new Tweet(item));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `Tweet not found, skipping`,
				});
			}
		}

		// Filtering only required tweets, if required
		if (ids && ids.length) {
			tweets = tweets.filter((tweet) => ids.includes(tweet.id));
		}

		return tweets;
	}

	/**
	 * Extracts and deserializes a single target tweet from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param id - The id of the target tweet.
	 *
	 * @returns The target deserialized tweet.
	 */
	public static single(response: NonNullable<unknown>, id: string): Tweet | undefined {
		const tweets: Tweet[] = [];

		// Extracting the matching data
		const extract = findByFilter<IRawTweet>(response, 'rest_id', id);

		// Deserializing valid data
		for (const item of extract) {
			if (item.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.rest_id });

				tweets.push(new Tweet(item));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `Tweet not found, skipping`,
				});
			}
		}

		return tweets.length ? tweets[0] : undefined;
	}

	/**
	 * Extracts and deserializes the timeline of tweets from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param ids - The IDs of specific tweets that need to be extracted.
	 *
	 * @returns The deserialized timeline of tweets.
	 */
	public static timeline(response: NonNullable<unknown>): Tweet[] {
		const tweets: Tweet[] = [];

		// Extracting the matching data
		const extract = findByFilter<ITimelineTweet>(response, '__typename', 'TimelineTweet');

		// Deserializing valid data
		for (const item of extract) {
			// If tweet with limited visibility
			if (
				item.tweet_results?.result &&
				item.tweet_results?.result?.__typename == 'TweetWithVisibilityResults' &&
				(item.tweet_results?.result as ILimitedVisibilityTweet)?.tweet?.legacy
			) {
				tweets.push(new Tweet((item.tweet_results.result as ILimitedVisibilityTweet).tweet));
			}
			// If normal tweet
			else if ((item.tweet_results?.result as IRawTweet)?.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: (item.tweet_results.result as IRawTweet).rest_id });

				tweets.push(new Tweet(item.tweet_results.result as IRawTweet));
			}
			// If invalid/unrecognized tweet
			else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `Tweet not found, skipping`,
				});
			}
		}

		return tweets;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ITweet {
		return {
			bookmarkCount: this.bookmarkCount,
			conversationId: this.conversationId,
			createdAt: this.createdAt,
			entities: this.entities.toJSON(),
			fullText: this.fullText,
			id: this.id,
			lang: this.lang,
			likeCount: this.likeCount,
			media: this.media?.map((item) => item.toJSON()),
			quoteCount: this.quoteCount,
			quoted: this.quoted?.toJSON(),
			replyCount: this.replyCount,
			replyTo: this.replyTo,
			retweetCount: this.retweetCount,
			retweetedTweet: this.retweetedTweet?.toJSON(),
			tweetBy: this.tweetBy.toJSON(),
			url: this.url,
			viewCount: this.viewCount,
		};
	}
}

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 *
 * @public
 */
export class TweetEntities {
	/** The list of hashtags mentioned in the tweet. */
	public hashtags: string[] = [];

	/** The list of IDs of users mentioned in the tweet. */
	public mentionedUsers: string[] = [];

	/** The list of urls mentioned in the tweet. */
	public urls: string[] = [];

	/**
	 * @param entities - The raw tweet entities.
	 */
	public constructor(entities: IRawTweetEntities) {
		// Extracting user mentions
		if (entities.user_mentions) {
			for (const user of entities.user_mentions) {
				this.mentionedUsers.push(user.screen_name);
			}
		}

		// Extracting urls
		if (entities.urls) {
			for (const url of entities.urls) {
				this.urls.push(url.expanded_url);
			}
		}

		// Extracting hashtags
		if (entities.hashtags) {
			for (const hashtag of entities.hashtags) {
				this.hashtags.push(hashtag.text);
			}
		}
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ITweetEntities {
		return {
			hashtags: this.hashtags,
			mentionedUsers: this.mentionedUsers,
			urls: this.urls,
		};
	}
}

/**
 * The details of a single media content included in a tweet.
 *
 * @public
 */
export class TweetMedia {
	/** The thumbnail URL for the video content of the tweet. */
	public thumbnailUrl?: string;

	/** The type of media. */
	public type: EMediaType;

	/** The direct URL to the media. */
	public url = '';

	/**
	 * @param media - The raw media details.
	 */
	public constructor(media: IRawExtendedMedia) {
		// If the media is a photo
		if (media.type == ERawMediaType.PHOTO) {
			this.type = EMediaType.PHOTO;
			this.url = media.media_url_https;
		}
		// If the media is a gif
		else if (media.type == ERawMediaType.GIF) {
			this.type = EMediaType.GIF;
			this.url = media.video_info?.variants[0].url as string;
		}
		// If the media is a video
		else {
			this.type = EMediaType.VIDEO;
			this.thumbnailUrl = media.media_url_https;

			/** The highest bitrate of all variants. */
			let highestRate = 0;

			/**
			 * Selecting the URL of the video variant with the highest bitrate.
			 */
			media.video_info?.variants.forEach((variant) => {
				if (variant.bitrate > highestRate) {
					highestRate = variant.bitrate;
					this.url = variant.url;
				}
			});
		}
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ITweetMedia {
		return {
			thumbnailUrl: this.thumbnailUrl,
			type: this.type,
			url: this.url,
		};
	}
}
