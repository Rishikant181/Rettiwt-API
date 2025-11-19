/* eslint-disable */

/**
 * The raw data received when unbookmarking a given tweet.
 *
 * @public
 */
export interface ITweetUnbookmarkResponse {
	data: Data;
}

export interface Data {
	tweet_bookmark_delete: string;
}
