/**
 * @summary Stores different types of error messages related to authentication
 */
export enum AuthenticationErrors {
    NotAuthenticated = "Cannot fetch this data without authentication",
};

/**
 * @summary Stores different types error messages for validation errors
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required",
    NoUserIdentification = "Either userName or id must be given",
    InvalidCount = "Invalid count provided"
};

/**
 * @summary Stores all the different type of error messages that are returned by services
 */
export enum DataErrors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found"
};