import { RawAnalyticsMetric } from '../../enums/raw/Analytics';
import { IAnalytics as IRawAnalytics } from '../../types/raw/base/Analytic';

import type { IAnalytics } from '../../types/data/Analytics';
import type { IAnalyticsMetric } from '../../types/raw/base/Analytic';

/**
 * The details of the analytic result of the connected User.
 *
 * @public
 */
export class Analytics implements IAnalytics {
	/** The raw analytic details. */
	private readonly _raw: IRawAnalytics;

	public bookmarks: number;
	public createQuote: number;
	public createReply: number;
	public createTweets: number;
	public createdAt: string;
	public engagements: number;
	public followers: number;
	public follows: number;
	public impressions: number;
	public likes: number;
	public organicMetricsTimeSeries: IAnalyticsMetric[];
	public profileVisits: number;
	public replies: number;
	public retweets: number;
	public shares: number;
	public unfollows: number;
	public verifiedFollowers: number;

	public constructor(analytics: IRawAnalytics) {
		this._raw = { ...analytics };
		this.organicMetricsTimeSeries = analytics.organic_metrics_time_series;
		this.createdAt = new Date().toISOString();
		this.followers = analytics.relationship_counts.followers;
		this.verifiedFollowers = parseInt(analytics.verified_follower_count, 10);
		this.impressions = this._reduceMetrics(RawAnalyticsMetric.IMPRESSIONS);
		this.profileVisits = this._reduceMetrics(RawAnalyticsMetric.PROFILE_VISITS);
		this.engagements = this._reduceMetrics(RawAnalyticsMetric.ENGAGEMENTS);
		this.follows = this._reduceMetrics(RawAnalyticsMetric.FOLLOWS);
		this.replies = this._reduceMetrics(RawAnalyticsMetric.REPLIES);
		this.likes = this._reduceMetrics(RawAnalyticsMetric.LIKES);
		this.retweets = this._reduceMetrics(RawAnalyticsMetric.RETWEETS);
		this.bookmarks = this._reduceMetrics(RawAnalyticsMetric.BOOKMARK);
		this.shares = this._reduceMetrics(RawAnalyticsMetric.SHARE);
		this.createTweets = this._reduceMetrics(RawAnalyticsMetric.CREATE_TWEET);
		this.createQuote = this._reduceMetrics(RawAnalyticsMetric.CREATE_QUOTE);
		this.createReply = this._reduceMetrics(RawAnalyticsMetric.CREATE_REPLY);
		this.unfollows = this._reduceMetrics(RawAnalyticsMetric.UNFOLLOWS);
	}

	/** The raw analytic details. */
	public get raw(): IRawAnalytics {
		return { ...this._raw };
	}

	/**
	 * Reduces the organic metrics time series to a total value for a specific metric type.
	 *
	 * @param metricType - metricType The type of metric to reduce.
	 * @returns the total value of the specified metric type across all time series.
	 */
	private _reduceMetrics(metricType: RawAnalyticsMetric): number {
		return this.organicMetricsTimeSeries.reduce((acc, metric) => {
			const metricValue = metric.metric_values.find((m) => m.metric_type === (metricType as string));
			return acc + (metricValue ? metricValue.metric_value : 0);
		}, 0);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IAnalytics {
		return {
			createdAt: this.createdAt,
			followers: this.followers,
			verifiedFollowers: this.verifiedFollowers,
			impressions: this.impressions,
			profileVisits: this.profileVisits,
			engagements: this.engagements,
			follows: this.follows,
			replies: this.replies,
			likes: this.likes,
			retweets: this.retweets,
			bookmarks: this.bookmarks,
			shares: this.shares,
			createTweets: this.createTweets,
			createQuote: this.createQuote,
			unfollows: this.unfollows,
			createReply: this.createReply,
			organicMetricsTimeSeries: this.organicMetricsTimeSeries,
		};
	}
}
