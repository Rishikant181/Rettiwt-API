// TYPES
import { TweetInterface, TweetEntitiesInterface } from '../interfaces/Tweet';
import { Result as RawTweet, Entities2 as RawTweetEntities } from '../raw/tweet/Tweet';

// PARSERS
import * as Parsers from '../../services/helper/Parser';

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 * 
 * @public
 */
export class TweetEntities implements TweetEntitiesInterface {
    // MEMBER DATA
    /** The list of hashtags mentioned in the tweet. */
    hashtags: string[] = [];

    /** The list of urls mentioned in the tweet. */
    urls: string[] = [];

    /** The list of IDs of users mentioned in the tweet. */
    mentionedUsers: string[] = [];

    /** The list of urls to various media mentioned in the tweet. */
    media: string[] = [];

    // MEMBER METHODS
    constructor(entities: RawTweetEntities) {
        // Extracting user mentions
        if (entities.user_mentions) {
            for (let user of entities.user_mentions) {
                this.mentionedUsers.push(user.id_str);
            }
        }

        // Extracting urls
        if (entities.urls) {
            for (let url of entities.urls) {
                this.urls.push(url.expanded_url);
            }
        }

        // Extracting hashtags
        if (entities.hashtags) {
            for (let hashtag of entities.hashtags) {
                this.hashtags.push(hashtag.text);
            }
        }

        // Extracting media urls (if any)
        if (entities.media) {
            for (const media of entities.media) {
                this.media.push(media.media_url_https);
            }
        }
    }
}

/**
 * The details of a single Tweet.
 * 
 * @public
 */
export class Tweet implements TweetInterface {
    /** The rest id of the tweet. */
    id: string;

    /** The rest id of the user who made the tweet. */
    tweetBy: string;

    /** The date and time of creation of the tweet, in UTC string format. */
    createdAt: string;

    /** Additional tweet entities like urls, mentions, etc. */
    entities: TweetEntities;

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

    /**
     * @param tweet The raw tweet data.
     */
    constructor(tweet: RawTweet) {
        this.id = tweet.rest_id;
        this.createdAt = tweet.legacy.created_at;
        this.tweetBy = tweet.legacy.user_id_str;
        this.entities = new TweetEntities(tweet.legacy.entities);
        this.quoted = tweet.legacy.quoted_status_id_str;
        this.fullText = Parsers.normalizeText(tweet.legacy.full_text);
        this.replyTo = tweet.legacy.in_reply_to_status_id_str;
        this.lang = tweet.legacy.lang;
        this.quoteCount = tweet.legacy.quote_count;
        this.replyCount = tweet.legacy.reply_count;
        this.retweetCount = tweet.legacy.retweet_count;
        this.likeCount = tweet.legacy.favorite_count;
    }
}