import { EResourceType } from '../enums/Resource';

/**
 * Collection of resources that allow guest authentication.
 *
 * @internal
 */
export const allowGuestAuthentication = [
	EResourceType.TWEET_DETAILS,
	EResourceType.USER_DETAILS_BY_USERNAME,
	EResourceType.USER_TIMELINE,
];

/**
 * Collection of resources that can be fetched.
 *
 * @internal
 */
export const fetchResources = [
	EResourceType.LIST_TWEETS,
	EResourceType.TWEET_DETAILS,
	EResourceType.TWEET_DETAILS_ALT,
	EResourceType.TWEET_RETWEETERS,
	EResourceType.TWEET_SEARCH,
	EResourceType.USER_DETAILS_BY_USERNAME,
	EResourceType.USER_DETAILS_BY_ID,
	EResourceType.USER_FEED_FOLLOWED,
	EResourceType.USER_FEED_RECOMMENDED,
	EResourceType.USER_FOLLOWING,
	EResourceType.USER_FOLLOWERS,
	EResourceType.USER_HIGHLIGHTS,
	EResourceType.USER_LIKES,
	EResourceType.USER_MEDIA,
	EResourceType.USER_SUBSCRIPTIONS,
	EResourceType.USER_TIMELINE,
	EResourceType.USER_TIMELINE_AND_REPLIES,
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
	EResourceType.TWEET_LIKE,
	EResourceType.TWEET_POST,
	EResourceType.TWEET_RETWEET,
	EResourceType.TWEET_SCHEDULE,
	EResourceType.TWEET_UNLIKE,
	EResourceType.TWEET_UNPOST,
	EResourceType.TWEET_UNRETWEET,
	EResourceType.TWEET_UNSCHEDULE,
	EResourceType.USER_FOLLOW,
	EResourceType.USER_UNFOLLOW,
];
