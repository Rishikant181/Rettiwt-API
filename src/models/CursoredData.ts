// PACKAGES
import { ITweet as IRawTweet, IUser as IRawUser } from 'rettiwt-core';

// MODELS
import { Tweet } from './Tweet';
import { User } from './User';

// TYPES
import { ICursor, ICursoredData } from '../types/CursoredData';

/**
 * The data that us fetched batch-wise along with a cursor.
 *
 * @typeParam T - Type of data to be stored in the list.
 *
 * @public
 */
export class CursoredData<T extends Tweet | User> implements ICursoredData<T> {
	/** The list of data of the given type. */
	list: T[] = [];

	/** The cursor to the next batch of data. */
	next: Cursor;

	/**
	 * @param list - The list of data item to store.
	 * @param next - The cursor to the next batch of data.
	 */
	constructor(list: (IRawTweet | IRawUser)[] = [], next: string = '') {
		// Deserializing the input raw data and storing it in the list
		for (const item of list) {
			// If the item is a valid raw tweet
			if (item && item.__typename == 'Tweet' && item.rest_id) {
				this.list.push(new Tweet(item as IRawTweet) as T);
			}
			// If the item is a valid raw user
			else if (item && item.__typename == 'User' && item.rest_id && (item as IRawUser).id) {
				this.list.push(new User(item as IRawUser) as T);
			}
		}

		// Initializing cursors
		this.next = new Cursor(next);
	}
}

/**
 * The cursor to the batch of data to be fetched.
 *
 * @public
 */
export class Cursor implements ICursor {
	/** The cursor string. */
	value: string;

	/**
	 * Initializes a new cursor from the given cursor string.
	 *
	 * @param cursorStr - The string representation of the cursor.
	 */
	constructor(cursorStr: string) {
		this.value = cursorStr;
	}
}
