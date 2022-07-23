/**
 * @summary Stores the cursor to the batch of data
 */
export class Cursor {
    // MEMBER DATA
    value: string;                                                      // To store the cursor to next batch of data

    // MEMBER DATA
    /**
     * @summary Initializes a new cursor from the given cursor string
     * @param cursorStr The string representation of the cursor
     */
    constructor(cursorStr: string) {
        this.value = cursorStr;
    }
}

/**
 * @summary Stores cursored data that is returned by services
 */
export type CursoredData<Type> = {
    list: Type[];                                                       // To store the list data
    next: Cursor;                                                       // To store the information about cursor to the next batch
}