/* eslint-disable */
import type { IAnalytics } from '../base/Analytic';
/**
 * The raw data received when fetching the analytic overview of the user.
 *
 * @public
 */
export interface IUserAnalyticsResponse {
	data: Data;
}

interface Data {
	viewer_v2: ViewerV2;
}

interface ViewerV2 {
	user_results: UserResults;
}

interface UserResults {
	id: string;
	result: IAnalytics;
}
