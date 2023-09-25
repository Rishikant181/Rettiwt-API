// PACKAGES
import { EMediaType } from 'rettiwt-core';

// TYPES
import { IUser } from './User';

/**
 * The details of a single Tweet.
 *
 * @public
 */
export interface ITweet {
	/** The rest id of the tweet. */
	id: string;

	/** The details of the user who made the tweet. */
	tweetBy: IUser;

	/** The date and time of creation of the tweet, in UTC string format. */
	createdAt: string;

	/** Additional tweet entities like urls, mentions, etc. */
	entities: ITweetEntities;

	/** The urls of the media contents of the tweet (if any). */
	media: ITweetMedia[];

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
}

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 *
 * @public
 */
export interface ITweetEntities {
	/** The list of hashtags mentioned in the tweet. */
	hashtags: string[];

	/** The list of urls mentioned in the tweet. */
	urls: string[];

	/** The list of IDs of users mentioned in the tweet. */
	mentionedUsers: string[];
}

/**
 * A single media content.
 *
 * @public
 */
export interface ITweetMedia {
	/** The type of media. */
	type: EMediaType;

	/** The direct URL to the media. */
	url: string;
}
