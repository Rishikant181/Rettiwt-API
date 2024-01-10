/**
 * Defines the error handler that processes API/HTTP errors in the responses.
 *
 * @public
 */
export interface IErrorHandler {
	/**
	 * The method called when an error response is received from Twitter API.
	 *
	 * @param error - The error caught while making request to Twitter API.
	 */
	handle(error: unknown): void;
}
