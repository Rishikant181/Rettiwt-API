export type Cursor = {
    value: string;                                                      // To store the cursor to next batch of data
}

/**
 * @summary Stores cursored data that is returned by services
 */
export type CursoredData<Type> = {
    list: Type[];                                                       // To store the list data
    next: Cursor;                                                       // To store the information about cursor to the next batch
}