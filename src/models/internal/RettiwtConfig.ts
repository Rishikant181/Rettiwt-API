// TYPES
import { IErrorHandler } from '../../types/public/ErrorHandler';
import { IRettiwtConfig } from '../../types/internal/RettiwtConfig';

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @internal
 */
export class RettiwtConfig implements IRettiwtConfig {
	public apiKey?: string;
	public guestKey?: string;
	public proxyUrl?: URL;
	public logging?: boolean;
	public errorHandler?: IErrorHandler;

	/**
	 * Initializes a new configuration object from the given config.
	 *
	 * @param config - The configuration object.
	 */
	public constructor(config: RettiwtConfig) {
		this.apiKey = config.apiKey;
		this.guestKey = config.guestKey;
		this.proxyUrl = config.proxyUrl;
		this.logging = config.logging;
		this.errorHandler = config.errorHandler;
	}
}
