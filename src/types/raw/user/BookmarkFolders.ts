/* eslint-disable */

/**
 * The raw data received when fetching bookmark folders.
 *
 * @public
 */
export interface IUserBookmarkFoldersResponse {
	data: Data;
}

interface Data {
	viewer: Viewer;
}

interface Viewer {
	user_results: UserResults;
}

interface UserResults {
	result: Result;
}

interface Result {
	__typename: string;
	bookmark_collections_slice: BookmarkCollectionsSlice;
}

interface BookmarkCollectionsSlice {
	items: BookmarkCollectionItem[];
	slice_info: SliceInfo;
}

interface BookmarkCollectionItem {
	id: string;
	name: string;
}

interface SliceInfo {
	next_cursor?: string;
}
