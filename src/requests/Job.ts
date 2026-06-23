import { AxiosRequestConfig } from 'axios';

import { JobSearchFilter } from '../models/args/FetchArgs';
import { IJobSearchFilter } from '../types/args/FetchArgs';

/**
 * Collection of requests related to X Jobs.
 *
 * @public
 */
export class JobRequests {
	/**
	 * @param id - The id of the job whose details are to be fetched.
	 * @param loggedIn - Whether to fetch the details as a logged-in user.
	 */
	public static details(id: string, loggedIn?: boolean): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/8uZH_OBKTFNIMzTJaV5lbQ/JobScreenQuery',
			params: {
				variables: JSON.stringify({
					jobId: id,
					loggedIn: loggedIn ?? true,
				}),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param filter - The filter to use for searching jobs.
	 * @param count - The number of jobs to fetch.
	 * @param cursor - The cursor to the batch of jobs to fetch.
	 */
	public static search(filter: IJobSearchFilter, count?: number, cursor?: string): AxiosRequestConfig {
		const parsedFilter = new JobSearchFilter(filter);

		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/jVMK9qcOUB5xQQdSLr5ECg/JobSearchQueryScreenJobsQuery',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					count: count ?? 25,
					cursor: cursor ?? null,
					searchParams: {
						keyword: parsedFilter.keyword ?? null,
						job_location_id: parsedFilter.locationId ?? null,
						job_location: parsedFilter.location ?? null,
						job_location_type: parsedFilter.locationTypes ?? [],
						seniority_level: parsedFilter.seniorityLevels ?? [],
						company_name: parsedFilter.companyName ?? null,
						employment_type: parsedFilter.employmentTypes ?? [],
						industry: parsedFilter.industry ?? null,
					},
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}
}
