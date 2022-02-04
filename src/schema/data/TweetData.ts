// This file contains various objects related to handling of Tweets made by a user

// CUSTOM LIBS
import { Deserializable } from "./Data";
import { UserID } from './UserAccountData';

// Object to hold filters for Tweets
export class TweetFilter {
    // MEMBER DATA
    words: string[];                                                            // To store the list of words to search
    hashtags: string[];                                                         // To store the list of hashtags to seach
    fromUsers: string[];                                                        // To store the list of users who made the tweet
    toUsers: string[];                                                          // To store the list of users to whom the tweet was meant for
    mentions: string[];                                                         // To store the list of mentioned users
    startDate: string;                                                          // To store the beginning date to search tweets
    endDate: string;                                                            // To store the ending date to search tweets
    count: number;                                                              // To store the number of tweets to fetch

    // MEMBER METHODS
    // The constructor
    constructor(filter: {
        words: string[],
        hashtags: string[],
        fromUsers: string[],
        toUsers: string[],
        mentions: string[],
        startDate: string,
        endDate: string,
        count: number
    }) {
        Object.assign(this, filter);
    }
}

// Object to hold additional tweet entites
class TweetEntities implements Deserializable {
    // MEMBER DATA
    hastags: string[];                                                          // To store a list of hastags used
    urls: string[];                                                             // To store a list of urls mentioned
    mentionedUsers: UserID[];                                                   // To store a list of users mentioned
    media: string[];                                                            // To store urls to various media files

    // MEMBER METHODS
    // The constructor
    constructor() {
        this.hastags = [];
        this.urls = [];
        this.mentionedUsers = [];
        this.media = [];
    }

    // Method to deserialize input data into this object
    deserialize(data: any): this {
        // Extracting user mentions
        for(const user of data['user_mentions']) {
            this.mentionedUsers.push(new UserID().deserialize({
                id: user['id_str'],
                userName: user['screen_name'],
                fullName: user['name']
            }));
        }

        // Extracting urls
        for(const url of data['urls']) {
            this.urls.push(url.expanded_url);
        }
        
        // Extracting hashtags
        for(const hashtag of data['hashtags']) {
            this.hastags.push(hashtag.text);
        }

        // Extracting media urls (if any)
        if(data['media']) {
            for(const media of data['media']) {
                this.media.push(media['media_url_https']);
            }
        }

        return this;
    }
}

// Object to hold the actual tweet
export class Tweet implements Deserializable {
    // MEMBER DATA
    id: string;                                                             // To store the conversation id
    tweetBy: string;                                                        // To store the rest id of the user who made the tweet
    createdAt: string;                                                      // To store the time when the tweet was created
    entities: TweetEntities;                                                // To store additional tweet entities
    fullText: string;                                                       // To store the full text in the tweet
    lang: string;                                                           // To store the language used in the tweet
    quoteCount: number;                                                     // To store the number of quotes of the tweet
    replyCount: number;                                                     // To store the number of replies to the tweet
    retweetCount: number;                                                   // To store the number of retweets

    // MEMBER METHODS
    // Method to deserialize input data into this object
    deserialize(data: any): this {
        this.id = data['rest_id'];
        this.createdAt = data['legacy']['created_at'];
        this.tweetBy = data['legacy']['user_id_str'];
        this.entities = new TweetEntities().deserialize(data['legacy']['entities']);
        this.fullText = data['legacy']['full_text'];
        this.lang = data['legacy']['lang'];
        this.quoteCount = data['legacy']['quote_count'];
        this.replyCount = data['legacy']['reply_count'];
        this.retweetCount = data['legacy']['retweet_count'];

        return this;
    }
}