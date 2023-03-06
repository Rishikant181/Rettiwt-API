/**
 * Different types of error messages related to authentication.
 * @public
 */
export enum AuthenticationErrors {
    NotAuthenticated = "Cannot fetch this data without authentication",
};

/**
 * Different types error messages for validation errors.
 * @public
 */
export enum ValidationErrors {
    InvalidTweetFilter = "Atleast one of fromUsers/toUsers/mentions/hashtags/words argument is required",
    NoUserIdentification = "Either userName or id must be given",
    InvalidCount = "Invalid count provided"
};

/**
 * Different type of error messages that are returned by services.
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
