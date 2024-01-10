// ERRORS
import { RettiwtError } from './RettiwtError';

/**
 * Represents an HTTP error that occues while making a request to Twitter API.
 *
 * @internal
 */
export class HttpError extends RettiwtError {
	/** The HTTP status code. */
	public status: number;

	/**
	 * Initializes a new HttpError based on the given error details.
	 *
	 * @param httpStatus - The HTTP status code received upon making the request
	 * @param message - Any additional error message.
	 */
	public constructor(httpStatus: number, message?: string) {
		super(message);

		this.status = httpStatus;
	}
}
