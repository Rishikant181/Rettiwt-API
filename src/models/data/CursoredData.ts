import { BaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

import { ICursoredData } from '../../types/data/CursoredData';
import { ICursor as IRawCursor } from '../../types/raw/base/Cursor';

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
export class CursoredData<T extends Notification | Tweet | User | List> implements ICursoredData<T> {
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
