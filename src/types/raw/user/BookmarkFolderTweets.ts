/* eslint-disable */

/**
 * The raw data received when fetching tweets from a bookmark folder.
 *
 * @public
 */
export interface IUserBookmarkFolderTweetsResponse {
	data: Data;
}

interface Data {
	bookmark_collection_timeline: BookmarkCollectionTimeline;
}

interface BookmarkCollectionTimeline {
	timeline: Timeline;
}

interface Timeline {
	instructions: Instruction[];
}

interface Instruction {
	type: string;
	entries?: Entry[];
}

interface Entry {
	entryId: string;
	sortIndex: string;
	content: Content;
}

interface Content {
	entryType: string;
	__typename: string;
	itemContent?: ItemContent;
	value?: string;
	cursorType?: string;
	stopOnEmptyResponse?: boolean;
}

interface ItemContent {
	itemType: string;
	__typename: string;
	tweet_results: TweetResults;
	tweetDisplayType: string;
}

interface TweetResults {
	result: any; // Uses the same tweet structure as regular bookmarks
}
