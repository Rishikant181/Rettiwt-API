/**
 * @summary Store cursored data that is returned by services
 */
export type CursoredData<Type> = {
    list: Type[];                                                       // To store the list data
    next: string;                                                       // To store the cursor to the next batch
}