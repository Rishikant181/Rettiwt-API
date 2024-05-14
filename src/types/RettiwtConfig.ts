import { IErrorHandler } from './ErrorHandler';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @public
 */
export interface IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	apiKey?: string;

	/** The guestKey (guest token) to use for guest access to Twitter API. */
	guestKey?: string;

	/**
	 * Optional URL to proxy server to use for requests to Twitter API.
	 *
	 * @remarks When deploying to cloud platforms, if setting {@link IRettiwtConfig.authProxyUrl} does not resolve Error 429, then this might be required.
	 */
	proxyUrl?: URL;

	/**
	 * Optional URL to proxy server to use for authentication against Twitter API.
	 *
	 * @remarks Required when deploying to cloud platforms to bypass Error 429.
	 *
	 * @defaultValue Same as {@link IRettiwtConfig.proxyUrl}
	 */
	authProxyUrl?: URL;

	/** The max wait time (in milli-seconds) for a response; if not set, Twitter server timeout is used. */
	timeout?: number;

	/** Whether to write logs to console or not. */
	logging?: boolean;

	/** Optional custom error handler to define error conditions and process API/HTTP errors in responses. */
	errorHandler?: IErrorHandler;
}
