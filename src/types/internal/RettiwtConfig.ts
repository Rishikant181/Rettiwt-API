/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @internal
 */
export interface IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	apiKey?: string;

	/** Optional URL with proxy configuration to use for requests to Twitter API. */
	proxyUrl?: URL;

	/** Whether to write logs to console or not. */
	logging?: boolean;
}
