// This file contains various helper methods and data for validating various types of data

/**
 * @summary Collection of different types of validation errors
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required",
    NoUserIdentification = "Either userName or id must be given"
};