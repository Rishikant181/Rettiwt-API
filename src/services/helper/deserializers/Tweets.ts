// TYPES
import { Tweet, TweetEntities } from '../../../types/data/Tweet';
import { Result as RawTweet, Entities2 as RawTweetEntities } from '../../../types/raw/tweet/Tweet';

// PARSERS
import * as Parsers from '../Parser';

/**
 * @returns A TweetEntities object containing the various tweet entities
 * @param data The raw tweet entities data from the response received from TwitterAPI
 */
export function toTweetEntities(data: RawTweetEntities): TweetEntities {
    let entities: TweetEntities = {
        mentionedUsers: [],
        urls: [],
        media: [],
        hashtags: []
    };
    
    // Extracting user mentions
    if(data.user_mentions) {
        for(let user of data.user_mentions) {
            entities.mentionedUsers.push(user.id_str);
        }
    }

    // Extracting urls
    if(data.urls) {
        for(let url of data.urls) {
            entities.urls.push(url.expanded_url);
        }
    }
    
    // Extracting hashtags
    if(data.hashtags) {
        for(let hashtag of data.hashtags) {
            entities.hashtags.push(hashtag.text);
        }
    }

    // Extracting media urls (if any)
    if(data.media) {
        for(const media of data.media) {
            entities.media.push(media.media_url_https);
        }
    }

    return entities;
}

/**
 * @returns A Tweet object containing the tweet data
 * @param data The raw tweet data from the response received from TwitterAPI
 */
export function toTweet(data: RawTweet): Tweet {
    return {
        id: data.rest_id,
        createdAt: data.legacy.created_at,
        tweetBy: data.legacy.user_id_str,
        entities: toTweetEntities(data.legacy.entities),
        quoted: data.legacy.quoted_status_id_str,
        fullText: Parsers.normalizeText(data.legacy.full_text),
        replyTo: data.legacy.in_reply_to_status_id_str,
        lang: data.legacy.lang,
        quoteCount: data.legacy.quote_count,
        replyCount: data.legacy.reply_count,
        retweetCount: data.legacy.retweet_count,
        likeCount: data.legacy.favorite_count
    };
}