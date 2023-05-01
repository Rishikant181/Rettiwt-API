// TYPES
import { IQueryArgs } from '../../types/raw/requests/Query';

/**
 * The arguments for fetching cursored list.
 * 
 * @public
 */
export class QueryArgs implements IQueryArgs {
    /** The query string that may be used to filter data. */
    query?: string;

    /** The rest id of the data item to be requested. */
    id?: string;

    /** The number of data items to fetch. */
    count?: number;

    /** The cursor to the batch of data to fetch. */
    cursor?: string;
};