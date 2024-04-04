import { EResourceType } from '../enums/Resource';

/**
 * Collection of resources that allow guest authentication.
 *
 * @internal
 */
export const allowGuestAuthentication = [
	EResourceType.TWEET_DETAILS,
	EResourceType.USER_DETAILS_BY_USERNAME,
	EResourceType.USER_TWEETS,
];

/**
 * Collection of resources that can be fetched.
 *
 * @internal
 */
export const fetchResources = [
	EResourceType.LIST_TWEETS,
	EResourceType.TWEET_SEARCH,
	EResourceType.TWEET_DETAILS,
	EResourceType.TWEET_FAVORITERS,
	EResourceType.TWEET_RETWEETERS,
	EResourceType.USER_DETAILS_BY_USERNAME,
	EResourceType.USER_DETAILS_BY_ID,
	EResourceType.USER_FOLLOWING,
	EResourceType.USER_FOLLOWERS,
	EResourceType.USER_HIGHLIGHTS,
	EResourceType.USER_LIKES,
	EResourceType.USER_MEDIA,
	EResourceType.USER_SUBSCRIPTIONS,
	EResourceType.USER_TWEETS,
	EResourceType.USER_TWEETS_AND_REPLIES,
];

/**
 * Collection of resources that can be posted.
 *
 * @internal
 */
export const postResources = [
	EResourceType.MEDIA_UPLOAD_APPEND,
	EResourceType.MEDIA_UPLOAD_FINALIZE,
	EResourceType.MEDIA_UPLOAD_INITIALIZE,
	EResourceType.TWEET_RETWEET,
	EResourceType.TWEET_CREATE,
	EResourceType.TWEET_FAVORITE,
];
