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
