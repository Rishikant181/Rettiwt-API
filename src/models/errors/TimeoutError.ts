// ERRORS
import { RettiwtError } from './RettiwtError';

/**
 * Represents an HTTP error that occues while making a request to Twitter API.
 *
 * @internal
 */
export class TimeoutError extends RettiwtError {
	/**
	 * Initializes a new TimeoutError based on the given error details.
	 *
	 * @param message - Error message with the configured timeout.
	 */
	public constructor(message?: string) {
		super(message);
	}
}
