/**
 * The details of a single X Job.
 *
 * @public
 */
export interface IJob {
	/** The company that posted the job. */
	company: IJobCompany;

	/** The plain text job description, if available. */
	description?: string;

	/** The formatted salary range, if available. */
	formattedSalary?: string;

	/** The rest id of the job. */
	id: string;

	/** Whether the job is featured. */
	isFeatured?: boolean;

	/** The job function, if available. */
	jobFunction?: string;

	/** The X URL for the job page, if available. */
	jobPageUrl?: string;

	/** The job location. */
	location?: string;

	/** The external URL to apply for the job. */
	redirectUrl?: string;

	/** The salary currency code, if available. */
	salaryCurrencyCode?: string;

	/** The salary interval, if available. */
	salaryInterval?: number;

	/** The maximum salary, if available. */
	salaryMax?: number;

	/** The minimum salary, if available. */
	salaryMin?: number;

	/** The job title. */
	title: string;

	/** The X user associated with the job, if available. */
	user?: IJobUser;
}

/**
 * The company attached to an X Job.
 *
 * @public
 */
export interface IJobCompany {
	/** The company profile id. */
	id?: string;

	/** The URL to the company logo, if available. */
	logo?: string;

	/** The company name. */
	name: string;
}

/**
 * The X user attached to an X Job.
 *
 * @public
 */
export interface IJobUser {
	/** The full name of the user. */
	fullName: string;

	/** The rest id of the user. */
	id: string;

	/** Whether the account is verified or not. */
	isVerified: boolean;

	/** The verification type, if available. */
	verifiedType?: string;

	/** The url of the profile image. */
	profileImage?: string;

	/** The username/screenname of the user. */
	userName: string;
}
