/**
 * @summary Collection of different types of validation errors
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required",
    NoUserIdentification = "Either userName or id must be given"
};

/**
 * @summary Stores all the different type of error messages that are returned by services
 */
export enum DataErrors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoTweetsFound = "No tweets matching the given criteria found"
};