// PACKAGES
import {
	ITweet as IRawTweet,
	IEntities as IRawTweetEntities,
	IExtendedMedia as IRawExtendedMedia,
	EMediaType,
} from 'rettiwt-core';

// TYPES
import { ITweet, ITweetEntities } from '../types/Tweet';

// MODELS
import { User } from './User';

// PARSERS
import { normalizeText } from '../helper/JsonUtils';

/**
 * The details of a single Tweet.
 *
 * @public
 */
export class Tweet implements ITweet {
	/** The rest id of the tweet. */
	id: string;

	/** The details of the user who made the tweet. */
	tweetBy: User;

	/** The date and time of creation of the tweet, in UTC string format. */
	createdAt: string;

	/** Additional tweet entities like urls, mentions, etc. */
	entities: TweetEntities;

	/** The urls of the media contents of the tweet (if any). */
	media: TweetMedia[];

	/** The rest id of the tweet which is quoted in the tweet. */
	quoted: string;

	/** The full text content of the tweet. */
	fullText: string;

	/** The rest id of the user to which the tweet is a reply. */
	replyTo: string;

	/** The language in which the tweet is written. */
	lang: string;

	/** The number of quotes of the tweet. */
	quoteCount: number;

	/** The number of replies to the tweet. */
	replyCount: number;

	/** The number of retweets of the tweet. */
	retweetCount: number;

	/** The number of likes of the tweet. */
	likeCount: number;

	/** The number of views of a tweet. */
	viewCount: number;

	/** The number of bookmarks of a tweet. */
	bookmarkCount: number;

	/**
	 * Initializes a new Tweet from the given raw tweet data.
	 *
	 * @param tweet - The raw tweet data.
	 */
	constructor(tweet: IRawTweet) {
		this.id = tweet.rest_id;
		this.createdAt = tweet.legacy.created_at;
		this.tweetBy = new User(tweet.core.user_results.result);
		this.entities = new TweetEntities(tweet.legacy.entities);
		this.media = tweet.legacy.extended_entities?.media?.map((media) => new TweetMedia(media));
		this.quoted = tweet.legacy.quoted_status_id_str;
		this.fullText = normalizeText(tweet.legacy.full_text);
		this.replyTo = tweet.legacy.in_reply_to_status_id_str;
		this.lang = tweet.legacy.lang;
		this.quoteCount = tweet.legacy.quote_count;
		this.replyCount = tweet.legacy.reply_count;
		this.retweetCount = tweet.legacy.retweet_count;
		this.likeCount = tweet.legacy.favorite_count;
		this.viewCount = parseInt(tweet.views.count);
		this.bookmarkCount = tweet.legacy.bookmark_count;
	}
}

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 *
 * @public
 */
export class TweetEntities implements ITweetEntities {
	/** The list of hashtags mentioned in the tweet. */
	hashtags: string[] = [];

	/** The list of urls mentioned in the tweet. */
	urls: string[] = [];

	/** The list of IDs of users mentioned in the tweet. */
	mentionedUsers: string[] = [];

	/**
	 * Initializes the TweetEntities from the raw tweet entities.
	 *
	 * @param entities - The raw tweet entities.
	 */
	constructor(entities: IRawTweetEntities) {
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
 * A single media content.
 *
 * @public
 */
export class TweetMedia {
	/** The type of media. */
	type: EMediaType;

	/** The direct URL to the media. */
	url: string = '';

	/**
	 * Initializes the TweetMedia from the raw tweet media.
	 *
	 * @param media - The raw tweet media.
	 */
	constructor(media: IRawExtendedMedia) {
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
