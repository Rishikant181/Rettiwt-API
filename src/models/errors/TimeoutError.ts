import { RettiwtError } from './RettiwtError';

/**
 * Represents a timeout error that occues while making a request to Twitter API.
 *
 * @public
 */
export class TimeoutError extends RettiwtError {
	/**
	 * @param message - Error message with the configured timeout.
	 */
	public constructor(message?: string) {
		super(message);
	}
}
