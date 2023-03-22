/**
 * Different types of error messages related to authentication.
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
 * Different types error messages for validation errors.
 *
 * @public
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required",
    NoUserIdentification = "Either userName or id must be given",
    InvalidCount = "Invalid count provided"
};

/**
 * Different type of error messages that are returned by services.
 *
 * @public
 */
export enum DataErrors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoTweetsFound = "No tweets matching the given criteria found",
    NoLikersFound = "No likers found for the tweet with the given id",
    NoRetweetersFound = "No retweeters found for the tweet with the given id",
    NoFollowsFound = "No follow details were found for the user with the given id",
    NoLikedTweetsFound = "No liked tweets were found for the user with the given id"
};

/**
 * @typeParam The type of error details that this error object carries.
 */
export class ValidationError<T> implements Error {
    /** The name of the error. */
    name: string;

    /** The user-friendly error message. */
    message: string;

    /** The error data. */
    data: T;

    /**
     * @param data The error details.
     */
    constructor(data: T) {
        this.name = 'ValidationError';
        this.message = 'One or more validation errors occured. Refer to data for details';
        this.data = data;
    }
}
