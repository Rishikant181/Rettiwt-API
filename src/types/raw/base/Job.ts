/* eslint-disable */

/**
 * Represents a raw X Job search result item.
 *
 * @public
 */
export interface IJobResult {
	id: string;
	rest_id: string;
	result?: IJob;
}

/**
 * Represents the raw data of a single X Job.
 *
 * @public
 */
export interface IJob {
	__isJobResult?: string;
	__typename: string;
	company_profile_results?: IJobCompanyProfileResults;
	core: IJobCore;
	id: string;
	user_results?: IJobUserResults;
}

export interface IJobCore {
	external_url?: string;
	featured?: number;
	formatted_salary?: string;
	job_description?: string;
	job_function?: string;
	job_page_url?: string;
	location?: string;
	redirect_url?: string;
	salary_currency_code?: string;
	salary_interval?: number;
	salary_max?: number;
	salary_min?: number;
	title?: string;
}

export interface IJobCompanyProfileResults {
	id: string;
	rest_id: string;
	result?: IJobCompanyProfile;
}

export interface IJobCompanyProfile {
	__typename: string;
	core?: IJobCompanyProfileCore;
	id: string;
	logo?: IJobCompanyLogo;
	rest_id: string;
}

export interface IJobCompanyProfileCore {
	name?: string;
}

export interface IJobCompanyLogo {
	normal_url?: string;
}

export interface IJobUserResults {
	id: string;
	result?: IJobUser;
}

export interface IJobUser {
	__typename: string;
	avatar?: IJobUserAvatar;
	core?: IJobUserCore;
	id: string;
	profile_image_shape?: string;
	rest_id: string;
	verification?: IJobUserVerification;
}

export interface IJobUserAvatar {
	image_url?: string;
}

export interface IJobUserCore {
	name?: string;
	screen_name?: string;
}

export interface IJobUserVerification {
	verified?: boolean;
	verified_type?: string;
}
