import type { IAnalyticsMetric } from '../../types/raw/base/Analytic';
/**
 * The details of the analytic result of the connected User.
 *
 * @public
 */
export interface IAnalytics {
	/** The creation date of user's account. */
	createdAt: string;

	/** Total followers number */
	followers: number;

	/** Total verified followers */
	verifiedFollowers: number;

	/** Total impressions on the given period */
	impressions: number;

	/** Total profile visits on the given period */
	profileVisits: number;

	/** Total Engagements on the given period */
	engagements: number;

	/** Total Follows on the given period */
	follows: number;

	/** Total Replies on the given period */
	replies: number;

	/** Total Likes on the given period */
	likes: number;

	/** Total Retweets on the given period */
	retweets: number;

	/** Total Bookmark on the given period */
	bookmarks: number;

	/** Total Shares on the given period */
	shares: number;

	/** Total CreateTweets on the given period */
	createTweets: number;

	/** Total CreateQuote on the given period */
	createQuote: number;

	/** Total Unfollows on the given period */
	unfollows: number;

	/** Total CreateReply on the given period */
	createReply: number;

	/** Organic metrics times series  */
	organicMetricsTimeSeries: IAnalyticsMetric[];
}
