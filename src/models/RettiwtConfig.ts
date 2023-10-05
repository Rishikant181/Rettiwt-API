// TYPES
import { IRettiwtConfig } from '../types/RettiwtConfig';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @public
 */
export class RettiwtConfig implements IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	public apiKey: string;

	/** Optional URL with proxy configuration to use for requests to Twitter API. */
	public proxyUrl?: string;

	/** Whether to write logs to console or not. */
	public logging?: boolean;

	/**
	 * Initializes a new configuration object from the given config.
	 *
	 * @param config - The configuration object.
	 */
	public constructor(config: RettiwtConfig) {
		this.apiKey = config.apiKey;
		this.proxyUrl = config.proxyUrl;
		this.logging = config.logging;
	}
}
