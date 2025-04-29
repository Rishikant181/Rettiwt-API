import { AxiosError } from 'axios';

import { ITwitterError, ITwitterErrorDetails } from '../../types/errors/TwitterError';
import { IErrorData as IRawErrorData, IErrorDetails as IRawErrorDetails } from '../../types/raw/base/Error';

/**
 * The error thrown by Twitter API.
 *
 * @public
 */
export class TwitterError extends Error implements ITwitterError {
	public details: ITwitterErrorDetails[];
	public message: string;
	public name: string;
	public status: number;

	/**
	 * @param error - The error response received from Twitter.
	 */
	public constructor(error: AxiosError<IRawErrorData | IRawErrorDetails>) {
		super(error.message);
		this.details = (
			(error.response?.data as IRawErrorData).errors
				? (error.response?.data as IRawErrorData).errors.map((item) => new TwitterErrorDetails(item))
				: [new TwitterErrorDetails(error.response?.data as IRawErrorDetails)]
		).map((item) => item.toJSON());
		this.message = error.message;
		this.name = 'TWITTER_ERROR';
		this.status = error.status ?? 500;
	}
}

/**
 * The error details.
 *
 * @public
 */
export class TwitterErrorDetails implements ITwitterErrorDetails {
	public code: number;
	public message: string;
	public name?: string;
	public type?: string;

	/**
	 * @param details - The details of the error.
	 */
	public constructor(details: IRawErrorDetails) {
		this.code = details.code;
		this.message = details.message;
		this.name = details.name;
		this.type = details.kind;
	}

	/**
	 * @returns The JSON representation of `this` object.
	 */
	public toJSON(): ITwitterErrorDetails {
		return {
			code: this.code,
			message: this.message,
			name: this.message,
			type: this.type,
		};
	}
}
