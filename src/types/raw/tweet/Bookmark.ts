/* eslint-disable */

/**
 * The raw data received when bookmarking a given tweet.
 *
 * @public
 */
export interface ITweetBookmarkResponse {
	data: Data;
}

interface Data {
	tweet_bookmark_put: string;
}
