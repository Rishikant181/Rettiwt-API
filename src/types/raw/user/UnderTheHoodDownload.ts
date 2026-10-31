/* eslint-disable */

/**
 * The raw data received when downloading the "Under the hood" report of the logged-in user.
 *
 * @public
 */
export interface IUserUnderTheHoodDownloadResponse {
	notes?: string;
	period?: Period;
	generatedAt?: string;
	postCount?: number | string;
	postLabelsDescription?: string;
	postLabels?: IRawUnderTheHoodPostLabel[];
	accountLabelsDescription?: string;
	accountLabels?: IRawUnderTheHoodAccountLabel[];
	totalPostLabels?: number;
	totalAccountLabels?: number;
}

interface Period {
	startDate?: string;
	endDate?: string;
	timezone?: string;
}

export interface IRawUnderTheHoodPostLabel {
	label?: string;
	about?: string;
	effect?: string;
	posts?: number | string;
	totalPostsInMonth?: number | string;
	percentageOfPosts?: string;
	howToAppeal?: string;
	postIds?: string[];
	postIdsMostRecentNote?: string;
	postIdsNotShownNote?: string;
}

export interface IRawUnderTheHoodAccountLabel {
	label?: string;
	about?: string;
	effect?: string;
	days?: number | string;
	daysInPeriod?: number | string;
	percentageOfDays?: string;
	howToAppeal?: string;
}
