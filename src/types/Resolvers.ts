/**
 * The data returned from extractor methods.
 * 
 * @internal
 */
export interface DataExtract {
    /** The required data. */
    required: any[];

    /** The cursor string to the next batch of data. */
    cursor: string;

    /** Additional extracted user details. */
    users: any[];

    /** Additional extracted tweet details */
    tweets: any[];
}
