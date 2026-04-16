import { AxiosProxyConfig, AxiosResponse } from 'axios';

import { IErrorHandler } from './ErrorHandler';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @public
 */
export interface IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	apiKey?: string;

	/**
	 * The proxy to use.
	 *
	 * @remarks
	 * <br>
	 * - If set to anything besides `undefined`, disables Axios' built-in environment variable-set proxy.
	 *
	 * @example
	 * ```
	 * // Use custom proxy config via config object
	 * {
	 *   proxy: {
	 *     host: '127.0.0.1',
	 *     port: 8080
	 *   }
	 * }
	 *
	 * // Use custom proxy config via URL
	 * {
	 *   proxy: 'https://127.0.0.1:8080'
	 * }
	 *
	 * // Use Axios environment variable for proxy
	 * {
	 *   proxy: undefined
	 * }
	 * ```
	 */
	proxy?: AxiosProxyConfig | string | null;

	/** The max wait time (in milli-seconds) for a response; if not set, Twitter server timeout is used. */
	timeout?: number;

	/** Whether to write logs to console or not. */
	logging?: boolean;

	/**
	 * Optional response middleware to be executed on obtaining a successful response.
	 *
	 * @param response -  The raw `AxiosReponse` object.
	 */
	responseMiddleware?: (response: AxiosResponse) => void | Promise<void>;

	/** Optional custom error handler to define error conditions and process API/HTTP errors in responses. */
	errorHandler?: IErrorHandler;

	/**
	 * Optional custom HTTP headers to add to all requests to Twitter API.
	 *
	 * @remarks Custom headers can be useful for proxies, avoiding rate limits, etc.
	 */
	headers?: { [key: string]: string };

	/**
	 * The delay (in ms) to use between concurrent request.
	 *
	 * Can either be a number or a function that returns a number synchronously or asynchronously.
	 */
	delay?: number | (() => number | Promise<number>);

	/**
	 * The maximum number of retries to use.
	 *
	 * @remarks Recommended to use a value of 5 combined with a `delay` of 1000 to prevent error 404.
	 */
	maxRetries?: number;
}
