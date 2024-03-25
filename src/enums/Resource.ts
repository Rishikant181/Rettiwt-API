/**
 * The different types of resources that can be fetched.
 *
 * @public
 */
export enum EResourceType {
	// LIST
	LIST_DETAILS = 'LIST_DETAILS',
	LIST_TWEETS = 'LIST_TWEETS',

	// MEDIA
	MEDIA_UPLOAD_APPEND = 'MEDIA_UPLOAD_APPEND',
	MEDIA_UPLOAD_FINALIZE = 'MEDIA_UPLOAD_FINALIZE',
	MEDIA_UPLOAD_INITIALIZE = 'MEDIA_UPLOAD_INITIALIZE',

	// SPACE
	SPACE_DETAILS_BY_ID = 'SPACE_DETAILS_BY_ID',

	// TWEET
	TWEET_RETWEET = 'TWEET_RETWEET',
	TWEET_CREATE = 'TWEET_CREATE',
	TWEET_FAVORITE = 'TWEET_FAVORITE',
	TWEET_SEARCH = 'TWEET_SEARCH',
	TWEET_DETAILS = 'TWEET_DETAILS',
	TWEET_FAVORITERS = 'TWEET_FAVORITERS',
	TWEET_RETWEETERS = 'TWEET_RETWEETERS',

	// USER
	USER_DETAILS_BY_USERNAME = 'USER_DETAILS_BY_USERNAME',
	USER_DETAILS_BY_ID = 'USER_DETAILS_BY_ID',
	USER_FOLLOWING = 'USER_FOLLOWING',
	USER_FOLLOWERS = 'USER_FOLLOWERS',
	USER_HIGHLIGHTS = 'USER_HIGHLIGHTS',
	USER_LIKES = 'USER_LIKES',
	USER_MEDIA = 'USER_MEDIA',
	USER_SUBSCRIPTIONS = 'USER_SUBSCRIPTIONS',
	USER_TWEETS = 'USER_TWEETS',
	USER_TWEETS_AND_REPLIES = 'USER_TWEETS_AND_REPLIES',
}
