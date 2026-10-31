/**
 * The "Under the hood" transparency report of the logged-in user, listing the visibility labels applied to their posts and account during the report period.
 *
 * @public
 */
export interface IUnderTheHoodReport {
	/** The start date (YYYY-MM-DD) of the report period. */
	startDate: string;

	/** The end date (YYYY-MM-DD) of the report period. */
	endDate: string;

	/** The timezone of the report period. */
	timezone: string;

	/** The date and time when the report was generated. */
	generatedAt: string;

	/** The number of posts authored during the report period. */
	postCount: number;

	/** The notes attached to the report. */
	notes?: string;

	/** The labels that were applied to the user's posts during the report period. */
	postLabels: IUnderTheHoodPostLabel[];

	/** The labels that were applied to the user's account during the report period. */
	accountLabels: IUnderTheHoodAccountLabel[];
}

/**
 * A visibility label applied to some of the user's posts.
 *
 * @public
 */
export interface IUnderTheHoodPostLabel {
	/** The name of the label. */
	label: string;

	/** What the label means. */
	about: string;

	/** The effect of the label on visibility. */
	effect: string;

	/** The number of posts that carried the label. */
	posts: number;

	/** The total number of posts authored during the report period. */
	totalPosts: number;

	/** The share of posts that carried the label, as formatted by X (e.g. '7.50%'). */
	percentage: string;

	/** How to appeal the label. */
	howToAppeal?: string;

	/** The ids of the posts that carried the label. */
	postIds: string[];

	/** Explanation when only the most recent labeled posts are listed. */
	postIdsMostRecentNote?: string;

	/** Explanation when the labeled posts are not listed. */
	postIdsNotShownNote?: string;
}

/**
 * A visibility label applied to the user's account.
 *
 * @public
 */
export interface IUnderTheHoodAccountLabel {
	/** The name of the label. */
	label: string;

	/** What the label means. */
	about: string;

	/** The effect of the label on visibility. */
	effect: string;

	/** The number of days the label was active on the account. */
	days: number;

	/** The total number of days in the report period. */
	totalDays: number;

	/** The share of days the label was active, as formatted by X (e.g. '16.12%'). */
	percentage: string;

	/** How to appeal the label. */
	howToAppeal?: string;
}
