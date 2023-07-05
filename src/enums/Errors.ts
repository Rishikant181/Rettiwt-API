/**
 * Different types of error messages related to authentication returned by services.
 *
 * @public
 */
export enum AuthenticationErrors {
    NotAuthenticated = "Cannot fetch this data without authentication",
    InvalidEmail = "No Twitter account found for the given email address",
    InvalidUsername = "Incorrect username given for the given Twitter account",
    InvalidPassword = "Incorrect password given for the given Twitter account"
};

/**
 * Different type of error messages related to data that are returned by services.
 *
 * @public
 */
export enum DataErrors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoMatchingTweetsFound = "No tweets matching the given filter were found"
};