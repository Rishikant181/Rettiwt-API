// MODELS
import { Tweet } from './Tweet';
import { User } from './User';

// TYPES
import { ICursor, ICursoredData } from '../../types/public/CursoredData';

/**
 * The data that us fetched batch-wise along with a cursor.
 *
 * @typeParam T - Type of data to be stored in the list.
 *
 * @public
 */
export class CursoredData<T extends Tweet | User> implements ICursoredData<T> {
	/** The list of data of the given type. */
	public list: T[] = [];

	/** The cursor to the next batch of data. */
	public next: Cursor;

	/**
	 * @param list - The list of data item to store.
	 * @param next - The cursor to the next batch of data.
	 */
	public constructor(list: T[] = [], next: string = '') {
		this.list = list;
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
