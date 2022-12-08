// This file contains various methods for deserializing raw data to appropriate known types

// CUSTOM LIBS

// TYPES
import { User } from '../../types/UserAccount';
import { Tweet, TweetEntities } from '../../types/Tweet';
import { Result as RawUser } from '../../types/raw/user/User';
import { Result as RawTweet, Entities2 as RawTweetEntities } from '../../types/raw/tweet/Tweet';

/**
 * @returns A User object containing the user details
 * @param data The raw user data from Twitter API
 */
export function toUser(data: RawUser): User {
    return {
        id: data.rest_id,
        userName: data.legacy.screen_name,
        fullName: data.legacy.name,
        createdAt: data.legacy.created_at,
        description: data.legacy.description,
        isVerified: data.legacy.verified,
        favouritesCount: data.legacy.favourites_count,
        followersCount: data.legacy.followers_count,
        followingsCount: data.legacy.friends_count,
        statusesCount: data.legacy.statuses_count,
        location: data.legacy.location,
        pinnedTweet: data.legacy.pinned_tweet_ids_str[0],
        profileBanner: data.legacy.profile_banner_url,
        profileImage: data.legacy.profile_image_url_https
    };
}

/**
 * @returns A TweetEntities object containing the various tweet entities
 * @param data The raw tweet entities data from the response received from TwitterAPI
 */
export function toTweetEntities(data: RawTweetEntities): TweetEntities {
    var entities: TweetEntities = {
        mentionedUsers: [],
        urls: [],
        media: [],
        hashtags: []
    };
    
    // Extracting user mentions
    if(data.user_mentions) {
        for(var user of data.user_mentions) {
            entities.mentionedUsers.push(user.id_str);
        }
    }

    // Extracting urls
    if(data.urls) {
        for(var url of data.urls) {
            entities.urls.push(url.expanded_url);
        }
    }
    
    // Extracting hashtags
    if(data.hashtags) {
        for(var hashtag of data.hashtags) {
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
        fullText: data.legacy.full_text,
        replyTo: data.legacy.in_reply_to_status_id_str,
        lang: data.legacy.lang,
        quoteCount: data.legacy.quote_count,
        replyCount: data.legacy.reply_count,
        retweetCount: data.legacy.retweet_count,
        likeCount: data.legacy.favorite_count
    };
}