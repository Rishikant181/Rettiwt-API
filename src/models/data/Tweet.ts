import {
	EMediaType,
	IExtendedMedia as IRawExtendedMedia,
	ITweet as IRawTweet,
	IEntities as IRawTweetEntities,
	ITimelineTweet,
	ITweet,
} from 'rettiwt-core';

import { ELogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';

import { LogService } from '../../services/internal/LogService';

import { User } from './User';

/**
 * The details of a single tweet.
 *
 * @public
 */
export class Tweet {
	/** The number of bookmarks of a tweet. */
	public bookmarkCount: number;

	/** The date and time of creation of the tweet, in UTC string format. */
	public createdAt: string;

	/** Additional tweet entities like urls, mentions, etc. */
	public entities: TweetEntities;

	/** The full text content of the tweet. */
	public fullText: string;

	/** The rest id of the tweet. */
	public id: string;

	/** The language in which the tweet is written. */
	public lang: string;

	/** The number of likes of the tweet. */
	public likeCount: number;

	/** The urls of the media contents of the tweet (if any). */
	public media?: TweetMedia[];

	/** The number of quotes of the tweet. */
	public quoteCount: number;

	/** The tweet which is quoted in the tweet. */
	public quoted?: Tweet;

	/** The number of replies to the tweet. */
	public replyCount: number;

	/** The rest id of the tweet to which the tweet is a reply. */
	public replyTo?: string;

	/** The number of retweets of the tweet. */
	public retweetCount: number;

	/** The tweet which is retweeted in this tweet (if any). */
	public retweetedTweet?: Tweet;

	/** The details of the user who made the tweet. */
	public tweetBy: User;

	/** The number of views of a tweet. */
	public viewCount: number;

	/**
	 * @param tweet - The raw tweet details.
	 */
	public constructor(tweet: IRawTweet) {
		this.id = tweet.rest_id;
		this.createdAt = tweet.legacy.created_at;
		this.tweetBy = new User(tweet.core.user_results.result);
		this.entities = new TweetEntities(tweet.legacy.entities);
		this.media = tweet.legacy.extended_entities?.media?.map((media) => new TweetMedia(media));
		this.quoted = tweet.quoted_status_result ? new Tweet(tweet.quoted_status_result.result) : undefined;
		this.fullText = tweet.note_tweet ? tweet.note_tweet.note_tweet_results.result.text : tweet.legacy.full_text;
		this.replyTo = tweet.legacy.in_reply_to_status_id_str;
		this.lang = tweet.legacy.lang;
		this.quoteCount = tweet.legacy.quote_count;
		this.replyCount = tweet.legacy.reply_count;
		this.retweetCount = tweet.legacy.retweet_count;
		this.likeCount = tweet.legacy.favorite_count;
		this.viewCount = tweet.views.count ? parseInt(tweet.views.count) : 0;
		this.bookmarkCount = tweet.legacy.bookmark_count;
		this.retweetedTweet = tweet.legacy.retweeted_status_result?.result?.rest_id
			? new Tweet(tweet.legacy.retweeted_status_result.result)
			: undefined;
	}

	/**
	 * Extracts and deserializes the list of tweets from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of tweets.
	 *
	 * @internal
	 */
	public static list(response: NonNullable<unknown>): Tweet[] {
		const tweets: Tweet[] = [];

		// Extracting the matching data
		const extract = findByFilter<ITimelineTweet>(response, '__typename', 'TimelineTweet');

		// Deserializing valid data
		for (const item of extract) {
			if (item.tweet_results?.result?.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.tweet_results.result.rest_id });

				tweets.push(new Tweet(item.tweet_results.result));
			} else {
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
	 * Extracts and deserializes a single target tweet from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param id - The id of the target tweet.
	 *
	 * @returns The target deserialized tweet.
	 *
	 * @internal
	 */
	public static single(response: NonNullable<unknown>, id: string): Tweet | undefined {
		const tweets: Tweet[] = [];

		// Extracting the matching data
		const extract = findByFilter<ITweet>(response, 'rest_id', id);

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
}

/**
 * The details of a single media content included in a tweet.
 *
 * @public
 */
export class TweetMedia {
	/** The type of media. */
	public type: EMediaType;

	/** The direct URL to the media. */
	public url: string = '';

	/**
	 * @param media - The raw media details.
	 */
	public constructor(media: IRawExtendedMedia) {
		this.type = media.type;

		// If the media is a photo
		if (media.type == EMediaType.PHOTO) {
			this.url = media.media_url_https;
		}
		// If the media is a gif
		else if (media.type == EMediaType.GIF) {
			this.url = media.video_info?.variants[0].url as string;
		}
		// If the media is a video
		else {
			/** The highest bitrate of all variants. */
			let highestRate: number = 0;

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
}
