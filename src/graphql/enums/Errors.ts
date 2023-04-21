/**
 * Different types error messages for validation errors returned by GraphQL API.
 *
 * @public
 */
export enum ValidationErrors {
    NoUserIdentification = "Either userName or id must be given"
};

/**
 * Different type of error messages related to data that are returned by GraphQL API.
 *
 * @public
 */
export enum DataErrors {
    NoTweetsFound = "No tweets matching the given criteria found",
    NoLikersFound = "No likers found for the tweet with the given id",
    NoRetweetersFound = "No retweeters found for the tweet with the given id",
    NoUserTweetsFound = "No tweets were found for the user with the given id",
    NoFollowsFound = "No follow details were found for the user with the given id",
    NoLikedTweetsFound = "No liked tweets were found for the user with the given id"
};