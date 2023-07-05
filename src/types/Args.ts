/**
 * The arguments for fetching cursored list.
 * 
 * @public
 */
export interface IListArgs {
    /** The number of data items to fetch. */
    count?: number;

    /** The cursor to the batch of data to fetch. */
    cursor?: string;
};