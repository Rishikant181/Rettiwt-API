/**
 * The cursor to the batch of data to be fetched.
 * 
 * @public
 */
export interface Cursor {
    /** The cursor string. */
    value: string;
};

/**
 * The data that us fetched batch-wise along with a cursor.
 * 
 * @typeParam Type - The type of data present in the list.
 * 
 * @public
 */
export interface CursoredData<Type> {
    /** The list of data of the given type. */
    list: Type[];

    /** The cursor to the next batch of data. */
    next: Cursor;
};