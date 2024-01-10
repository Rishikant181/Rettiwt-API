// TYPES
import { IErrorHandler } from '../public/ErrorHandler';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @internal
 */
export interface IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	apiKey?: string;

	/** The guestKey (guest token) to use for guest access to Twitter API. */
	guestKey?: string;

	/** Optional URL with proxy configuration to use for requests to Twitter API. */
	proxyUrl?: URL;

	/** Whether to write logs to console or not. */
	logging?: boolean;

	/** Optional custom error handler to define error conditions and process API/HTTP errors in axios responses. */
	errorHandleService?: IErrorHandler;
}
