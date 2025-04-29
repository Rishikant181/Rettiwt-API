/* eslint-disable */

/**
 * Error details for multiple errors.
 *
 * @public
 */
export interface IErrorData {
	errors: IErrorDetails[];
}

/**
 * Error details of a single error.
 *
 * @public
 */
export interface IErrorDetails {
	message: string;
	extensions?: IErrorExtensions;
	code: number;
	kind?: string;
	name?: string;
	source?: string;
	tracing?: IErrorTracing;
}

export interface IErrorExtensions {
	name: string;
	source: string;
	code: number;
	kind: string;
	tracing: IErrorTracing;
}

export interface IErrorTracing {
	trace_id: string;
}
