import { ICursor } from 'rettiwt-core';

import { EBaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

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
export class CursoredData<T extends Notification | Tweet | User> {
	/** The batch of data of the given type. */
	public list: T[] = [];

	/** The cursor to the next batch of data. */
	public next: Cursor = new Cursor('');

	/**
	 * @param response - The raw response.
	 * @param type - The base type of the data included in the batch.
	 */
	public constructor(response: NonNullable<unknown>, type: EBaseType) {
		if (type == EBaseType.TWEET) {
			this.list = Tweet.list(response) as T[];
			this.next = new Cursor(findByFilter<ICursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '');
		} else if (type == EBaseType.USER) {
			this.list = User.list(response) as T[];
			this.next = new Cursor(findByFilter<ICursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '');
		} else if (type == EBaseType.NOTIFICATION) {
			this.list = Notification.list(response) as T[];
			this.next = new Cursor(findByFilter<ICursor>(response, 'cursorType', 'Top')[0]?.value ?? '');
		}
	}
}

/**
 * The cursor to the batch of data to fetch.
 *
 * @public
 */
export class Cursor {
	/** The cursor string. */
	public value: string;

	/**
	 * @param cursor - The cursor string.
	 */
	public constructor(cursor: string) {
		this.value = cursor;
	}
}
