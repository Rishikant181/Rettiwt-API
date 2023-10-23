// TYPES
import { IRettiwtConfig } from '../../types/internal/RettiwtConfig';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @internal
 */
export class RettiwtConfig implements IRettiwtConfig {
	/** The apiKey (cookie) to use for authenticating Rettiwt against Twitter API. */
	public apiKey?: string;

	/** Optional URL with proxy configuration to use for requests to Twitter API. */
	public proxyUrl?: URL;

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
