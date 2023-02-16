/**
 * @summary Stores the data returned from extractors
 */
export interface DataExtract {
    required: any;                                              // To store the required data extracted
    cursor: string;                                             // To store the cursor extracted
    users: any;                                                 // To store all user details extracted
    tweets: any;                                                // To store all tweets exracted
}