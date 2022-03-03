//ANCHOR:
export class TweetFilter {
    // MEMBER DATA
    words: string[];                                                            // To store the list of words to search
    hashtags: string[];                                                         // To store the list of hashtags to seach
    fromUsers: string[];                                                        // To store the list of users who made the tweet
    toUsers: string[];                                                          // To store the list of users to whom the tweet was meant for
    mentions: string[];                                                          // To store the beginning date to search tweets
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
        endDate?: string}
    ) {
        
        this.count=filter.count??1
        this.words=filter.words??[]
        this.hashtags=filter.hashtags??[]
        this.fromUsers=filter.fromUsers??[]
        this.toUsers=filter.toUsers??[]
        this.mentions=filter.mentions??[]
        this.endDate=filter.endDate??''
        
    }
    
}