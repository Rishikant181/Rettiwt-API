// This file contains various objects related to handling of Tweets made by a user

// CUSTOM LIBS
import { Deserializable } from "./Data";
import { UserID } from './UserAccountData';

/**
 * @summary Stores the filter to be used for fetching tweets from TwitterAPI
 */
export class TweetFilter {
    // MEMBER DATA
    words: string[];                                                            // To store the list of words to search
    hashtags: string[];                                                         // To store the list of hashtags to seach
    fromUsers: string[];                                                        // To store the list of users who made the tweet
    toUsers: string[];                                                          // To store the list of users to whom the tweet was meant for
    mentions: string[];
    startDate:string;                                                          // To store the beginning date to search tweets
    endDate: string;                                                            // To store the ending date to search tweets
    count: number;                                                              // To store the number of tweets to fetch

    // MEMBER METHODS
    // The constructor
    constructor(filter:{
        count?: number,
        words?: string[],
        hashtags?: string[],
        fromUsers?: string[],
        toUsers?: string[],
        mentions?: string[],
        startDate?:string,
        endDate?: string}
    ) {
        
        this.count=filter.count??1
        this.words=filter.words??[]
        this.hashtags=filter.hashtags??[]
        this.fromUsers=filter.fromUsers??[]
        this.toUsers=filter.toUsers??[]
        this.mentions=filter.mentions??[]
        this.startDate=filter.startDate??''
        this.endDate=filter.endDate??''
        
    }
    
}

/**
 * @summary Stores the different types of tweet elements like urls, media, mentions, hashtags, etc
 */
class TweetEntities implements Deserializable {
    // MEMBER DATA
    hastags: string[];                                                          // To store a list of hastags used
    urls: string[];                                                             // To store a list of urls mentioned
    mentionedUsers: UserID[];                                                   // To store a list of users mentioned
    media: string[];                                                            // To store urls to various media files

    // MEMBER METHODS
    constructor() {
        this.hastags = [];
        this.urls = [];
        this.mentionedUsers = [];
        this.media = [];
    }

    /**
     * @summary Stores the input data in this object
     * @returns A TweetEntities object containing the various tweet entities
     * @param data The raw tweet entities data from the response received from TwitterAPI
     */
    deserialize(data: any): this {
        // Extracting user mentions
        if(data['user_mentions']) {
            for(var user of data['user_mentions']) {
                this.mentionedUsers.push(new UserID().deserialize({
                    id: user['id_str'],
                    userName: user['screen_name'],
                    fullName: user['name']
                }));
            }
        }

        // Extracting urls
        if(data['urls']) {
            for(var url of data['urls']) {
                this.urls.push(url.expanded_url);
            }
        }
        
        // Extracting hashtags
        if(data['hashtags']) {
            for(var hashtag of data['hashtags']) {
                this.hastags.push(hashtag.text);
            }
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

/**
 * @summary Stores a single tweet
 */
export class Tweet implements Deserializable {
    // MEMBER DATA
    id: string;                                                             // To store the conversation id
    tweetBy: string;                                                        // To store the rest id of the user who made the tweet
    createdAt: string;                                                      // To store the time when the tweet was created
    entities: TweetEntities;                                                // To store additional tweet entities
    quoted: string;                                                         // To store the id of the tweet quote (if any)
    fullText: string;                                                       // To store the full text in the tweet
    replyTo: string;                                                        // To store the id of the tweet to which this was a reply
    lang: string;                                                           // To store the language used in the tweet
    quoteCount: number;                                                     // To store the number of quotes of the tweet
    replyCount: number;                                                     // To store the number of replies to the tweet
    retweetCount: number;                                                   // To store the number of retweets

    // MEMBER METHODS
    /**
     * @summary Stores the input data in this object
     * @returns A Tweet object containing the tweet data
     * @param data The raw tweet data from the response received from TwitterAPI
     */
    deserialize(data: any): this {
        this.id = data['rest_id'];
        this.createdAt = data['legacy']['created_at'];
        this.tweetBy = data['legacy']['user_id_str'];
        this.entities = new TweetEntities().deserialize(data['legacy']['entities']);
        this.quoted = data['legacy']['quoted_status_id_str'];
        this.fullText = data['legacy']['full_text'];
        this.replyTo = data['legacy']['in_reply_to_status_id_str'];
        this.lang = data['legacy']['lang'];
        this.quoteCount = data['legacy']['quote_count'];
        this.replyCount = data['legacy']['reply_count'];
        this.retweetCount = data['legacy']['retweet_count'];

        return this;
    }
}

