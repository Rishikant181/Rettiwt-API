/**
 * Defines error conditions and processes API/HTTP errors in axios responses.
 *
 * @public
 */
export interface IErrorHandleService {
    /**
	 * The method called when an error response is received from Twitter API.
	 *
	 * @param {unknown} error - The error caught while making Axios request to Twitter API.
	 */
	handle(error: unknown): void;
}
