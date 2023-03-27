// TYPES
import { CursoredDataInterface } from "../../types/interfaces/Service";

/**
 * The cursor to the batch of data to be fetched.
 * 
 * @public
 */
export class Cursor {
    /** The cursor string. */
    value: string;

    /**
     * Initializes a new cursor from the given cursor string.
     * 
     * @param cursorStr The string representation of the cursor.
     */
    constructor(cursorStr: string) {
        this.value = cursorStr;
    }
}

/**
 * The data that us fetched batch-wise along with a cursor.
 * 
 * @typeParam Type - The type of data present in the list.
 * @public
 */
export class CursoredData<T> implements CursoredDataInterface<T> {
    /** The list of data of the given type. */
    list: T[];

    /** The cursor to the next batch of data. */
    next: Cursor;

    /**
     * @param list The list of data item to store.
     * @param next The cursor to the next batch of data.
     */
    constructor(list: T[] = [], next: string = '') {
        this.list = list;
        this.next = new Cursor(next);
    }
}