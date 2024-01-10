/**
 * Represents an HTTP error that occues while making a request to Twitter API.
 *
 * @internal
 */
export interface IHttpError {
	/** The HTTP status code. */
	status: number;
}
