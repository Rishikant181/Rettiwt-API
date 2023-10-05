/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @public
 */
export interface IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	apiKey: string;

	/** Optional URL with proxy configuration to use for requests to Twitter API. */
	proxyUrl?: string;

	/** Whether to write logs to console or not. */
	logging?: boolean;
}
