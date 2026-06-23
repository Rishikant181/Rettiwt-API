import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { Job } from '../../models/data/Job';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IJobSearchFilter } from '../../types/args/FetchArgs';
import { IJobScreenQueryResponse } from '../../types/raw/job/JobScreenQuery';
import { IJobSearchQueryScreenJobsQueryResponse } from '../../types/raw/job/JobSearchQueryScreenJobsQuery';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to X Jobs.
 *
 * @public
 */
export class JobService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Get the details of an X Job.
	 *
	 * @param id - The ID of the target job.
	 *
	 * @returns The details of the job.
	 */
	public async details(id: string): Promise<Job | undefined> {
		const resource = ResourceType.JOB_DETAILS;

		// Fetching raw job details
		const response = await this.request<IJobScreenQueryResponse>(resource, { id: id });

		// Deserializing response
		const data = Extractors[resource](response.data, id);

		return data;
	}

	/**
	 * Search for X Jobs using a keyword.
	 *
	 * @param keyword - The keyword to be used for searching jobs.
	 * @param count - The number of jobs to fetch.
	 * @param cursor - The cursor to the batch of jobs to fetch.
	 *
	 * @returns The list of jobs that match the given keyword.
	 */
	public async search(keyword: string, count?: number, cursor?: string): Promise<CursoredData<Job>>;

	/**
	 * Search for X Jobs using a filter.
	 *
	 * @param filter - The filter to be used for searching jobs.
	 * @param count - The number of jobs to fetch.
	 * @param cursor - The cursor to the batch of jobs to fetch.
	 *
	 * @returns The list of jobs that match the given filter.
	 */
	public async search(filter: IJobSearchFilter, count?: number, cursor?: string): Promise<CursoredData<Job>>;

	public async search(
		filterOrKeyword: IJobSearchFilter | string,
		count?: number,
		cursor?: string,
	): Promise<CursoredData<Job>> {
		const resource = ResourceType.JOB_SEARCH;
		const filter = typeof filterOrKeyword === 'string' ? { keyword: filterOrKeyword } : filterOrKeyword;

		// Fetching raw list of filtered jobs
		const response = await this.request<IJobSearchQueryScreenJobsQueryResponse>(resource, {
			jobFilter: filter,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}
}
