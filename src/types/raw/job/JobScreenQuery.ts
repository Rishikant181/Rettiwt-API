/* eslint-disable */

import { IJobResult } from '../base/Job';

/**
 * The raw data received when fetching X Job details.
 *
 * @public
 */
export interface IJobScreenQueryResponse {
	data: {
		jobData?: IJobResult;
		viewer?: {
			user_results?: {
				id: string;
				result?: {
					__typename: string;
					id: string;
				};
			};
		};
	};
}
