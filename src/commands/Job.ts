import { Command, createCommand } from 'commander';

import { JobEmploymentType, JobLocationType, JobSeniorityLevel } from '../enums/Job';
import { output } from '../helper/CliUtils';
import { JobSearchFilter } from '../models/args/FetchArgs';
import { Rettiwt } from '../Rettiwt';
import { IJobSearchFilter } from '../types/args/FetchArgs';

/**
 * Creates a new 'job' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'job' command.
 */
function createJobCommand(rettiwt: Rettiwt): Command {
	// Creating the 'job' command
	const job = createCommand('job').description('Access resources related to X Jobs');

	// Details
	job.command('details')
		.description('Fetch the details of an X Job')
		.argument('<id>', 'The id of the job')
		.action(async (id: string) => {
			try {
				const details = await rettiwt.job.details(id);
				output(details);
			} catch (error) {
				output(error);
			}
		});

	// Locations
	job.command('locations')
		.description('Fetch the list of suggested X Job locations')
		.argument('<query>', 'The location query to search for')
		.action(async (query: string) => {
			try {
				const locations = await rettiwt.job.locations(query);
				output(locations);
			} catch (error) {
				output(error);
			}
		});

	// Search
	job.command('search')
		.description('Fetch the list of X Jobs that match the given search options')
		.argument('<keyword>', 'The keyword to search for')
		.argument('[count]', 'The number of jobs to fetch')
		.argument('[cursor]', 'The cursor to the batch of jobs to fetch')
		.option('-c, --company <string>', 'Matches jobs from the given company')
		.option(
			'-e, --employment-type <string>',
			`Matches jobs with the given comma-separated employment types: ${Object.values(JobEmploymentType).join(', ')}`,
		)
		.option('-i, --industry <string>', 'Matches jobs from the given industry')
		.option('-l, --location <string>', 'Matches jobs from the given location')
		.option('--location-id <string>', 'Matches jobs from the given comma-separated location ids')
		.option(
			'--location-type <string>',
			`Matches jobs with the given comma-separated location types: ${Object.values(JobLocationType).join(', ')}`,
		)
		.option(
			'-s, --seniority <string>',
			`Matches jobs with the given comma-separated seniority levels: ${Object.values(JobSeniorityLevel).join(', ')}`,
		)
		.action(async (keyword: string, count?: string, cursor?: string, options?: JobSearchOptions) => {
			try {
				const jobs = await rettiwt.job.search(
					new JobSearchOptions(keyword, options).toJobSearchFilter(),
					count ? parseInt(count) : undefined,
					cursor,
				);
				output(jobs);
			} catch (error) {
				output(error);
			}
		});

	return job;
}

/**
 * The search options supplied while searching for X Jobs.
 *
 * @remarks The search options are implementations of the ones offered by {@link JobSearchFilter}
 */
class JobSearchOptions {
	public company?: string;
	public employmentType?: string;
	public industry?: string;
	public keyword: string;
	public location?: string;
	public locationId?: string;
	public locationType?: string;
	public seniority?: string;

	/**
	 * Initializes a new object from the given keyword and options.
	 *
	 * @param keyword - The keyword to search for.
	 * @param options - The search options.
	 */
	public constructor(keyword: string, options?: JobSearchOptions) {
		this.company = options?.company;
		this.employmentType = options?.employmentType;
		this.industry = options?.industry;
		this.keyword = keyword;
		this.location = options?.location;
		this.locationId = options?.locationId;
		this.locationType = options?.locationType;
		this.seniority = options?.seniority;
	}

	/**
	 * Converts the filter options to a format recognizable by rettiwt-api.
	 *
	 * @returns The '{@link IJobSearchFilter}' representation of filter options.
	 */
	public toJobSearchFilter(): IJobSearchFilter {
		return new JobSearchFilter({
			companyName: this.company,
			employmentTypes: splitCommaSeparated<JobEmploymentType>(this.employmentType),
			industry: this.industry,
			keyword: this.keyword,
			location: this.location,
			locationIds: splitCommaSeparated<string>(this.locationId),
			locationTypes: splitCommaSeparated<JobLocationType>(this.locationType),
			seniorityLevels: splitCommaSeparated<JobSeniorityLevel>(this.seniority),
		});
	}
}

function splitCommaSeparated<T extends string>(value?: string): T[] | undefined {
	return value
		? (value
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item.length) as T[])
		: undefined;
}

export default createJobCommand;
