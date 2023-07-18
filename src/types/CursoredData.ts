/**
 * The cursor to the batch of data to be fetched.
 *
 * @public
 */
export interface ICursor {
	/** The cursor string. */
	value: string;
}

/**
 * The data that us fetched batch-wise along with a cursor.
 *
 * @typeParam T - Type of data present in the list.
 *
 * @public
 */
export interface ICursoredData<T> {
	/** The list of data of the given type. */
	list: T[];

	/** The cursor to the previous batch of data. */
	prev: ICursor;

	/** The cursor to the next batch of data. */
	next: ICursor;
}
