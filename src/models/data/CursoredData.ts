import { BaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

import { ICursoredData } from '../../types/data/CursoredData';
import { ICursor as IRawCursor } from '../../types/raw/base/Cursor';
import { IJobSearchQueryScreenJobsQueryResponse } from '../../types/raw/job/JobSearchQueryScreenJobsQuery';
import { IUserBookmarkFoldersResponse } from '../../types/raw/user/BookmarkFolders';

import { BookmarkFolder } from './BookmarkFolder';
import { Job } from './Job';
import { List } from './List';
import { Notification } from './Notification';
import { Tweet } from './Tweet';
import { User } from './User';

/**
 * The data that is fetched batch-wise using a cursor.
 *
 * @typeParam T - Type of data to be stored.
 *
 * @public
 */
export class CursoredData<T extends Notification | Tweet | User | List | BookmarkFolder | Job>
	implements ICursoredData<T>
{
	public list: T[];
	public next: string;

	/**
	 * @param response - The raw response.
	 * @param type - The base type of the data included in the batch.
	 */
	public constructor(response: NonNullable<unknown>, type: BaseType) {
		// Initializing defaults
		this.list = [];
		this.next = '';

		if (type == BaseType.TWEET) {
			this.list = Tweet.timeline(response) as T[];
			this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
		} else if (type == BaseType.USER) {
			this.list = User.timeline(response) as T[];
			this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
		} else if (type == BaseType.LIST) {
			this.list = List.timeline(response) as T[];
			this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
		} else if (type == BaseType.NOTIFICATION) {
			this.list = Notification.list(response) as T[];
			this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
		} else if (type == BaseType.BOOKMARK_FOLDER) {
			this.list = BookmarkFolder.list(response) as T[];
			const sliceInfo = (response as IUserBookmarkFoldersResponse)?.data?.viewer?.user_results?.result
				?.bookmark_collections_slice?.slice_info;
			this.next = sliceInfo?.next_cursor ?? '';
		} else if (type == BaseType.JOB) {
			this.list = Job.multiple(response as IJobSearchQueryScreenJobsQueryResponse) as T[];
			this.next =
				(response as IJobSearchQueryScreenJobsQueryResponse)?.data?.job_search?.slice_info?.next_cursor ?? '';
		}
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICursoredData<T> {
		return {
			list: this.list.map((item) => item.toJSON() as T),
			next: this.next,
		};
	}
}
