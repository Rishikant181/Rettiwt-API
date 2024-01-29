// ERRORS
import { RettiwtError } from './RettiwtError';

/**
 * Represents an error that is thrown by Twitter API.
 *
 * @internal
 */
export class ApiError extends RettiwtError {
	/** The error code thrown by Twitter API. */
	public code: number;

	/**
	 * Initializes a new ApiError based on the given error details.
	 *
	 * @param errorCode - The error code thrown by Twitter API.
	 * @param message - Any additional error message.
	 */
	public constructor(errorCode: number, message?: string) {
		super(message);

		this.code = errorCode;
	}
}
