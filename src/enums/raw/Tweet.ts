/**
 * The different types of search results when searching for tweets.
 *
 * @public
 */
export enum ERawTweetSearchResultType {
	LATEST = 'Latest',
	TOP = 'Top',
}

/**
 * The different types of sorting options when fetching replies to tweets.
 *
 * @public
 */
export enum ERawTweetRepliesSortType {
	RELEVACE = 'Relevance',
	LATEST = 'Recency',
	LIKES = 'Likes',
}
