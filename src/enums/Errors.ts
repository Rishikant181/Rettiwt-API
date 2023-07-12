/**
 * Different types of error messages related to authentication returned by services.
 *
 * @public
 */
export enum EAuthenticationErrors {
	INVALID_EMAIL = 'No Twitter account found for the given email address',
	INVALID_USERNAME = 'Incorrect username given for the given Twitter account',
	INVALID_PASSWORD = 'Incorrect password given for the given Twitter account',
}

/**
 * Different type of error messages related to data that are returned by services.
 *
 * @public
 */
export enum EDataErrors {
	USER_NOT_FOUND = 'An account with given username/id was not found',
	TWEET_NOT_FOUND = 'A tweet with the given id was not found',
	NO_MATCHING_TWEETS_FOUND = 'No tweets matching the given filter were found',
}
