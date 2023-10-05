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

	/** The cursor to the next batch of data. */
	next: ICursor;
}

/**
 * The cursor to the batch of data to be fetched.
 *
 * @public
 */
export interface ICursor {
	/** The cursor string. */
	value: string;
}
