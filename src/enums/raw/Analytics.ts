/**
 * Granularity types for analytics.
 *
 * @public
 */
export enum RawAnalyticsGranularity {
	DAILY = 'Daily',
	WEEKLY = 'Weekly',
	MONTHLY = 'Monthly',
}

/**
 * The different types of metric someone can request.
 *
 * @public
 */
export enum RawAnalyticsMetric {
	ENGAGEMENTS = 'Engagements',
	IMPRESSIONS = 'Impressions',
	PROFILE_VISITS = 'ProfileVisits',
	FOLLOWS = 'Follows',
	REPLIES = 'Replies',
	LIKES = 'Likes',
	RETWEETS = 'Retweets',
	BOOKMARK = 'Bookmark',
	SHARE = 'Share',
	URL_CLICKS = 'UrlClicks',
	CREATE_TWEET = 'CreateTweet',
	CREATE_QUOTE = 'CreateQuote',
	CREATE_REPLY = 'CreateReply',
	UNFOLLOWS = 'Unfollows',
}
