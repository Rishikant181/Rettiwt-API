/**
 * The filter to be used for fetching tweets from Twitter.
 * 
 * @public
 */
export interface TweetFilter {
    /** The list of words to search. */
    words?: string[];

    /** The list of hashtags to search.
     * 
     * @remarks
     * '#' must be excluded from the hashtag!
     */
    hashtags?: string[];

    /** The list of usernames whose tweets are to be searched.
     * 
     * @remarks
     * '@' must be excluded from the username!
     */
    fromUsers?: string[];
    
    /** The list of username to whom the tweets to be searched, are adressed.
     * 
     * @remarks
     * '@' must be excluded from the username!
     */
    toUsers?: string[];

    /** The list of username mentioned in the tweets to search.
     * 
     * @remarks
     * '@' must be excluded from the username!
     */
    mentions?: string[];

    /** The date starting from which tweets are to be searched.
     * 
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    startDate?: string;

    /** The date upto which tweets are to be searched.
     * 
     * @remarks
     * Must be in the format YYYY-MM-DD.
     */
    endDate?: string;

    /** The id of the tweet, after which the tweets are to be searched. */
    sinceId?: string;

    /** The id of the tweet which is quoted in the tweets to search. */
    quoted?: string;

    /** Whether to fetch tweets that are links or not.
     * 
     * @defaultValue false
     */
    links?: boolean;
};

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 * 
 * @public
 */
export interface TweetEntities {
    /** The list of hashtags mentioned in the tweet. */
    hashtags: string[];

    /** The list of urls mentioned in the tweet. */
    urls: string[];

    /** The list of IDs of users mentioned in the tweet. */
    mentionedUsers: string[];

    /** The list of urls to various media mentioned in the tweet. */
    media: string[];
}

/**
 * The details of a single Tweet.
 */
export interface Tweet {
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
}