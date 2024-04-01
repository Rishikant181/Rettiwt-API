import { ICursor, IResponse } from 'rettiwt-core';

import { EBaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

import { Tweet } from './Tweet';
import { User } from './User';

/**
 * The data that is fetched batch-wise along with a cursor.
 *
 * @typeParam T - Type of data to be stored in the list.
 *
 * @public
 */
export class CursoredData<T extends Tweet | User> {
	/** The list of data of the given type. */
	public list: T[] = [];

	/** The cursor to the next batch of data. */
	public next: Cursor;

	/**
	 * Initializes a new CursoredData object from the given raw reponse data.
	 *
	 * @param response - The raw response.
	 * @param type - The base type of the required data.
	 */
	public constructor(response: IResponse<unknown>, type: EBaseType) {
		if (type == EBaseType.TWEET) {
			this.list = Tweet.list(response) as T[];
		} else {
			this.list = User.list(response) as T[];
		}

		this.next = new Cursor(findByFilter<ICursor>(response, 'cursorType', 'Bottom')[0].value);
	}
}

/**
 * The cursor to the batch of data to be fetched.
 *
 * @public
 */
export class Cursor {
	/** The cursor string. */
	public value: string;

	/**
	 * Initializes a new cursor from the given cursor string.
	 *
	 * @param cursorStr - The string representation of the cursor.
	 */
	public constructor(cursorStr: string) {
		this.value = cursorStr;
	}
}
