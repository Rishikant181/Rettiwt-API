import { EResourceType } from '../enums/Resource';

/**
 * Collection of resources that return a status.
 *
 * @internal
 */
export const returnStatus = [EResourceType.TWEET_CREATE, EResourceType.TWEET_FAVORITE, EResourceType.TWEET_RETWEET];

/**
 * Collection of resources which return a single tweet.
 *
 * @internal
 */
export const returnTweet = [EResourceType.TWEET_DETAILS];

/**
 * Collection of resources which return a single user.
 *
 * @internal
 */
export const returnUser = [EResourceType.USER_DETAILS_BY_ID, EResourceType.USER_DETAILS_BY_USERNAME];

/**
 * Collection of resources which return a list of tweets.
 *
 * @internal
 */
export const returnTweets = [
	EResourceType.TWEET_SEARCH,
	EResourceType.USER_LIKES,
	EResourceType.LIST_TWEETS,
	EResourceType.USER_HIGHLIGHTS,
	EResourceType.USER_MEDIA,
	EResourceType.USER_TWEETS,
	EResourceType.USER_TWEETS_AND_REPLIES,
];

/**
 * Collection of resources which return a list of users.
 *
 * @internal
 */
export const returnUsers = [
	EResourceType.TWEET_FAVORITERS,
	EResourceType.TWEET_RETWEETERS,
	EResourceType.USER_FOLLOWERS,
	EResourceType.USER_FOLLOWING,
	EResourceType.USER_SUBSCRIPTIONS,
];
