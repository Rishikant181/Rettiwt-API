/**
 * The error thrown by Twitter API.
 *
 * @public
 */
export interface ITwitterError extends Error {
	/** The details of each error. */
	details: ITwitterErrorDetails[];

	/** The error message in the response. */
	message: string;

	/** The name of the error response. */
	name: string;

	/** The response status code. */
	status: number;
}

/**
 * The error details.
 *
 * @public
 */
export interface ITwitterErrorDetails {
	/** The internal error code. */
	code: number;

	/** The message associated with the error. */
	message: string;

	/** The name of the error. */
	name?: string;

	/** The type of error. */
	type?: string;
}
