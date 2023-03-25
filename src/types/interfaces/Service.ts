// TYPES
import { Cursor } from '../data/Service';

/**
 * The data that us fetched batch-wise along with a cursor.
 * 
 * @typeParam Type - The type of data present in the list.
 * @public
 */
export interface CursoredDataInterface<Type> {
    /** The list of data of the given type. */
    list: Type[];

    /** The cursor to the next batch of data. */
    next: Cursor;
}