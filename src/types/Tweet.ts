// This file contains various objects related to handling of Tweets made by a user

// CUSTOM LIBS
import { User } from './UserAccount';

/**
 * @summary Stores the filter to be used for fetching tweets from TwitterAPI
 */
export interface TweetFilter {
    words: string[];                                                    // To store the list of words to search
    hashtags: string[];                                                 // To store the list of hashtags to seach
    fromUsers: string[];                                                // To store the list of users who made the tweet
    toUsers: string[];                                                  // To store the list of users to whom the tweet was meant for
    mentions: string[];                                                 // To store the list of mentioned users
    startDate: string;                                                  // To store the beginning date to search tweets
    endDate: string;                                                    // To store the ending date to search tweets
    quoted: string;                                                     // To store the id of the tweet which is quoted
    count: number;                                                      // To store the number of tweets to fetch
};

/**
 * @summary Stores the different types of tweet elements like urls, media, mentions, hashtags, etc
 */
export interface TweetEntities {
    hashtags: string[];                                                 // To store a list of hashtags used
    urls: string[];                                                     // To store a list of urls mentioned
    mentionedUsers: string[];                                           // To store a list of users mentioned
    media: string[];                                                    // To store urls to various media files
}

/**
 * @summary Stores a single tweet
 */
export interface Tweet {
    id: string;                                                         // To store the conversation id
    tweetBy: string;                                                    // To store the rest id of the user who made the tweet
    createdAt: string;                                                  // To store the time when the tweet was created
    entities: TweetEntities;                                            // To store additional tweet entities
    quoted: string;                                                     // To store the id of the tweet quote (if any)
    fullText: string;                                                   // To store the full text in the tweet
    replyTo: string;                                                    // To store the id of the tweet to which this was a reply
    lang: string;                                                       // To store the language used in the tweet
    quoteCount: number;                                                 // To store the number of quotes of the tweet
    replyCount: number;                                                 // To store the number of replies to the tweet
    retweetCount: number;                                               // To store the number of retweets
    likeCount: number;                                                  // To store the number of likes
}