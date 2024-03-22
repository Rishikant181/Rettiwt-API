/**
 * The different types of resources that can be fetched.
 *
 * @public
 */
export enum EResourceType {
	// LIST
	LIST_DETAILS = '/i/api/graphql/gO1_eYPohKYHwCG2m-1ZnQ/ListByRestId',
	LIST_TWEETS = '/i/api/graphql/naCjgapXCSCsbZ7qnnItQA/ListLatestTweetsTimeline',

	// MEDIA
	MEDIA_UPLOAD = '/i/media/upload.json',
	VIDEO_STREAM = '/i/api/1.1/live_video_stream/status',

	// SPACE
	SPACE_DETAILS_BY_ID = '/i/api/graphql/s2tz6GAie-O1tdZx873PLA/AudioSpaceById',

	// TWEET
	CREATE_RETWEET = '/i/api/graphql/ojPdsZsimiJrUGLR1sjUtA/CreateRetweet',
	CREATE_TWEET = '/i/api/graphql/tTsjMKyhajZvK4q76mpIBg/CreateTweet',
	FAVORITE_TWEET = '/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet',
	TWEET_SEARCH = '/i/api/graphql/nK1dw4oV3k4w5TdtcAdSww/SearchTimeline',
	TWEET_DETAILS = '/i/api/graphql/0hWvDhmW8YQ-S_ib3azIrw/TweetResultByRestId',
	TWEET_FAVORITERS = '/i/api/graphql/9XKD3EWWC2BKpIFyDj4KKQ/Favoriters',
	TWEET_RETWEETERS = '/i/api/graphql/v5h-KLmyl-wqZ8i-a_q73w/Retweeters',

	// USER
	USER_DETAILS = '/i/api/graphql/oUZZZ8Oddwxs8Cd3iW3UEA/UserByScreenName',
	USER_DETAILS_BY_ID = '/i/api/graphql/i_0UQ54YrCyqLUvgGzXygA/UserByRestId',
	USER_FOLLOWING = '/i/api/graphql/V8zHw0SZijWORSsb-FNrng/Following',
	USER_FOLLOWERS = '/i/api/graphql/6y5TB_HrwQM0FBGDiNfoEA/Followers',
	USER_HIGHLIGHTS = '/i/api/graphql/Tqc024xHjye_svtpHJ236Q/UserHighlightsTweets',
	USER_LIKES = '/i/api/graphql/kgZtsNyE46T3JaEf2nF9vw/Likes',
	USER_MEDIA = '/i/api/graphql/EnIWTNQ8Tum-7t1NnZHOEQ/UserMedia',
	USER_SUBSCRIPTIONS = '/i/api/graphql/UWlxAhUnBNK0BYmeqNPqAw/UserCreatorSubscriptions',
	USER_TWEETS = '/i/api/graphql/H8OOoI-5ZE4NxgRr8lfyWg/UserTweets',
	USER_TWEETS_AND_REPLIES = '/i/api/graphql/GJuqLMoVxFZOvy8Oqec_9Q/UserTweetsAndReplies',
}

/**
 * The different steps involved in uploading a media file to Twitter.
 *
 * @public
 */
export enum EUploadSteps {
	INITIALIZE = 'INIT',
	APPEND = 'APPEND',
	FINALIZE = 'FINALIZE',
}
