import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IJob, IJobCompany, IJobUser } from '../../types/data/Job';
import { IJobResult as IRawJobResult, IJobUser as IRawJobUser } from '../../types/raw/base/Job';
import { IJobScreenQueryResponse } from '../../types/raw/job/JobScreenQuery';
import { IJobSearchQueryScreenJobsQueryResponse } from '../../types/raw/job/JobSearchQueryScreenJobsQuery';

type IRawJobResponse = IJobScreenQueryResponse | IJobSearchQueryScreenJobsQueryResponse;

/**
 * The company attached to an X Job.
 *
 * @public
 */
export class JobCompany implements IJobCompany {
	public id?: string;
	public logo?: string;
	public name: string;

	/**
	 * @param job - The raw job result.
	 */
	public constructor(job: IRawJobResult) {
		const company = job.result?.company_profile_results?.result;

		this.id = company?.rest_id ?? job.result?.company_profile_results?.rest_id;
		this.logo = company?.logo?.normal_url;
		this.name = company?.core?.name ?? '';
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IJobCompany {
		return {
			id: this.id,
			logo: this.logo,
			name: this.name,
		};
	}
}

/**
 * The X user attached to an X Job.
 *
 * @public
 */
export class JobUser implements IJobUser {
	public fullName: string;
	public id: string;
	public isVerified: boolean;
	public profileImage?: string;
	public userName: string;
	public verifiedType?: string;

	/**
	 * @param user - The raw user details.
	 */
	public constructor(user: IRawJobUser) {
		this.fullName = user.core?.name ?? '';
		this.id = user.rest_id;
		this.isVerified = user.verification?.verified ?? user.verification?.verified_type !== undefined;
		this.profileImage = user.avatar?.image_url;
		this.userName = user.core?.screen_name ?? '';
		this.verifiedType = user.verification?.verified_type;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IJobUser {
		return {
			fullName: this.fullName,
			id: this.id,
			isVerified: this.isVerified,
			profileImage: this.profileImage,
			userName: this.userName,
			verifiedType: this.verifiedType,
		};
	}
}

/**
 * The details of a single X Job.
 *
 * @public
 */
export class Job implements IJob {
	/** The raw job details. */
	private readonly _raw: IRawJobResult;

	public company: JobCompany;
	public description?: string;
	public formattedSalary?: string;
	public id: string;
	public isFeatured?: boolean;
	public jobFunction?: string;
	public jobPageUrl?: string;
	public location?: string;
	public redirectUrl?: string;
	public salaryCurrencyCode?: string;
	public salaryInterval?: number;
	public salaryMax?: number;
	public salaryMin?: number;
	public title: string;
	public user?: JobUser;

	/**
	 * @param job - The raw job result.
	 */
	public constructor(job: IRawJobResult) {
		this._raw = { ...job };
		this.company = new JobCompany(job);
		this.description = Job._parseDescription(job.result?.core.job_description);
		this.formattedSalary = job.result?.core.formatted_salary;
		this.id = job.rest_id;
		this.isFeatured = job.result?.core.featured !== undefined ? Boolean(job.result.core.featured) : undefined;
		this.jobFunction = job.result?.core.job_function;
		this.jobPageUrl = job.result?.core.job_page_url;
		this.location = job.result?.core.location;
		this.redirectUrl = job.result?.core.redirect_url ?? job.result?.core.external_url;
		this.salaryCurrencyCode = job.result?.core.salary_currency_code;
		this.salaryInterval = job.result?.core.salary_interval;
		this.salaryMax = job.result?.core.salary_max;
		this.salaryMin = job.result?.core.salary_min;
		this.title = job.result?.core.title ?? '';
		this.user = job.result?.user_results?.result ? new JobUser(job.result.user_results.result) : undefined;
	}

	/** The raw job details. */
	public get raw(): IRawJobResult {
		return { ...this._raw };
	}

	private static _parseDescription(description?: string): string | undefined {
		if (!description) {
			return undefined;
		}

		let parsed: unknown;
		try {
			parsed = JSON.parse(description) as unknown;
		} catch {
			return description;
		}

		if (!parsed || typeof parsed !== 'object' || !('blocks' in parsed)) {
			return description;
		}

		const blocks = (parsed as { blocks?: unknown }).blocks;
		if (!Array.isArray(blocks)) {
			return description;
		}

		const text = blocks
			.map((block) => {
				if (!block || typeof block !== 'object' || !('text' in block)) {
					return '';
				}

				const blockText = (block as { text?: unknown }).text;

				return typeof blockText === 'string' ? blockText.trim() : '';
			})
			.filter((blockText) => blockText.length)
			.join('\n');

		return text.length ? text : undefined;
	}

	private static _results(response: IRawJobResponse): IRawJobResult[] {
		if ('job_search' in response.data) {
			return response.data.job_search?.items_results ?? [];
		}

		if ('jobData' in response.data && response.data.jobData) {
			return [response.data.jobData];
		}

		return [];
	}

	/**
	 * Extracts and deserializes multiple target jobs from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param ids - The ids of the target jobs.
	 *
	 * @returns The target deserialized jobs.
	 */
	public static multiple(response: IRawJobResponse, ids?: string[]): Job[] {
		let jobs: Job[] = [];

		for (const item of Job._results(response)) {
			if (item.result?.core) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: item.rest_id });

				jobs.push(new Job(item));
			} else {
				// Logging
				LogService.log(LogActions.WARNING, {
					action: LogActions.DESERIALIZE,
					message: `Job not found, skipping`,
				});
			}
		}

		// Filtering only required jobs, if required
		if (ids && ids.length) {
			jobs = jobs.filter((job) => ids.includes(job.id));
		}

		return jobs;
	}

	/**
	 * Extracts and deserializes a single target job from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param id - The id of the target job.
	 *
	 * @returns The target deserialized job.
	 */
	public static single(response: IRawJobResponse, id?: string): Job | undefined {
		const jobs = Job.multiple(response, id ? [id] : undefined);

		return jobs.length ? jobs[0] : undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IJob {
		return {
			company: this.company.toJSON(),
			description: this.description,
			formattedSalary: this.formattedSalary,
			id: this.id,
			isFeatured: this.isFeatured,
			jobFunction: this.jobFunction,
			jobPageUrl: this.jobPageUrl,
			location: this.location,
			redirectUrl: this.redirectUrl,
			salaryCurrencyCode: this.salaryCurrencyCode,
			salaryInterval: this.salaryInterval,
			salaryMax: this.salaryMax,
			salaryMin: this.salaryMin,
			title: this.title,
			user: this.user?.toJSON(),
		};
	}
}
