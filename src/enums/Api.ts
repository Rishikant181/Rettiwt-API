/**
 * The different types of api error messages.
 *
 * @public
 */
export enum EApiErrors {
	COULD_NOT_AUTHENTICATE = 'Failed to authenticate',
	RESOURCE_NOT_FOUND = 'Requested resource not found',
	MISSING_PARAMETER = 'Missing named parameter',
	USER_NOT_FOUND = 'Requested user not found',
	USER_SUSPENDED = 'Requested user has been suspended',
	ACCOUNT_SUSPENDED = 'Account has been suspended',
	RATE_LIMIT_EXCEEDED = 'Rate limit exceeded',
	INTERNAL_ERROR = 'Internal server error',
	TIME_ERROR = 'Mismatched data/time with server',
	ALREADY_FAVORITED = 'Tweet already favorited',
	STATUS_NOT_FOUND = 'Requested tweeet not found',
	NOT_AUTHORIZED = 'Not authorized to view tweet',
	DAILY_STATUS_LIMIT_EXCEEDED = 'Exceeded daily tweet update limit',
	TWEET_LENGTH_EXCEEDED = 'Exceeded tweet text maximum length',
	DUPLICATE_STATUS = 'Tweet already posted',
	BAD_AUTHENTICATION = 'Invalid authentication data',
	RESOURCE_NOT_ALLOWED = 'Not authorized to access requested resource',
	AUTOMATED_REQUEST_ERROR = 'Automated request detected',
	ACCOUNT_LOCKED = 'Account has been locked',
	ALREADY_RETWEETED = 'Tweet already retweeted',
	TWEET_NOT_FOUND = 'Requested tweet not found',
	TWEET_VIOLATED_RULES = 'Requestd tweet has been removed for rules violation',
	DISABLED_TWEET_ACTIONS = 'Reqeusted action disabled on the tweet',
}

/**
 * The different error codes.
 *
 * @public
 */
export enum EErrorCodes {
	COULD_NOT_AUTHENTICATE = 32,
	RESOURCE_NOT_FOUND = 34,
	MISSING_PARAMETER = 38,
	USER_NOT_FOUND = 50,
	USER_SUSPENDED = 63,
	ACCOUNT_SUSPENDED = 64,
	RATE_LIMIT_EXCEEDED = 88,
	INTERNAL_ERROR = 131,
	TIME_ERROR = 135,
	ALREADY_FAVORITED = 139,
	STATUS_NOT_FOUND = 144,
	NOT_AUTHORIZED = 179,
	DAILY_STATUS_LIMIT_EXCEEDED = 185,
	TWEET_LENGTH_EXCEEDED = 186,
	DUPLICATE_STATUS = 187,
	BAD_AUTHENTICATION = 215,
	RESOURCE_NOT_ALLOWED = 220,
	AUTOMATED_REQUEST_ERROR = 226,
	ACCOUNT_LOCKED = 326,
	ALREADY_RETWEETED = 327,
	TWEET_NOT_FOUND = 421,
	TWEET_VIOLATED_RULES = 422,
	DISABLED_TWEET_ACTIONS = 425,
}
