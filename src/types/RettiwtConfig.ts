import { AxiosProxyConfig } from 'axios';

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
	 * Optional URL to proxy server to use for requests to Twitter API.
	 *
	 * @remarks When deploying to cloud platforms, if setting {@link IRettiwtConfig.authProxyUrl} does not resolve Error 429, then this might be required.
	 */
	proxyUrl?: URL;

	/**
	 * Axios built-in proxy configuration.
	 *
	 * @remarks
	 * Controls proxy behavior with the following priority:
	 * 1. User explicitly set value → use user's proxy config
	 * 2. {@link proxyUrl} is set → defaults to `false` (uses httpsAgent instead)
	 * 3. Neither set → defaults to `undefined` (allows axios to use environment variables)
	 *
	 * @example
	 * ```
	 * // Use custom proxy config
	 * { proxy: { host: '127.0.0.1', port: 8080 } }
	 *
	 * // Explicitly disable proxy
	 * { proxy: false }
	 *
	 * // Use environment variables
	 * { proxy: undefined }
	 * ```
	 */
	proxy?: AxiosProxyConfig | false | undefined;

	/** The max wait time (in milli-seconds) for a response; if not set, Twitter server timeout is used. */
	timeout?: number;

	/** Whether to write logs to console or not. */
	logging?: boolean;

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
