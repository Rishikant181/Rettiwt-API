/* eslint-disable */

import { IJobResult } from '../base/Job';

/**
 * The raw data received when searching X Jobs.
 *
 * @public
 */
export interface IJobSearchQueryScreenJobsQueryResponse {
	data: {
		job_search?: {
			items_results?: IJobResult[];
			slice_info?: {
				next_cursor?: string;
			};
		};
	};
}
