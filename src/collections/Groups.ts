import { ResourceType } from '../enums/Resource';

/**
 * Collection of resources that allow guest authentication.
 *
 * @internal
 */
export const AllowGuestAuthenticationGroup = [
	ResourceType.TWEET_DETAILS,
	ResourceType.USER_DETAILS_BY_USERNAME,
	ResourceType.USER_TIMELINE,
];

/**
 * Collection of resources that can be fetched.
 *
 * @internal
 */
export const FetchResourcesGroup = [
	ResourceType.LIST_DETAILS,
	ResourceType.LIST_MEMBERS,
	ResourceType.LIST_TWEETS,
	ResourceType.DM_CONVERSATION,
	ResourceType.DM_INBOX_INITIAL_STATE,
	ResourceType.DM_INBOX_TIMELINE,
	ResourceType.TWEET_DETAILS,
	ResourceType.TWEET_DETAILS_ALT,
	ResourceType.TWEET_DETAILS_BULK,
	ResourceType.TWEET_LIKERS,
	ResourceType.TWEET_REPLIES,
	ResourceType.TWEET_RETWEETERS,
	ResourceType.TWEET_SEARCH,
	ResourceType.USER_AFFILIATES,
	ResourceType.USER_ANALYTICS,
	ResourceType.USER_BOOKMARKS,
	ResourceType.USER_DETAILS_BY_USERNAME,
	ResourceType.USER_DETAILS_BY_ID,
	ResourceType.USER_DETAILS_BY_IDS_BULK,
	ResourceType.USER_FEED_FOLLOWED,
	ResourceType.USER_FEED_RECOMMENDED,
	ResourceType.USER_FOLLOWING,
	ResourceType.USER_FOLLOWERS,
	ResourceType.USER_HIGHLIGHTS,
	ResourceType.USER_LIKES,
	ResourceType.USER_LISTS,
	ResourceType.USER_MEDIA,
	ResourceType.USER_NOTIFICATIONS,
	ResourceType.USER_SUBSCRIPTIONS,
	ResourceType.USER_TIMELINE,
	ResourceType.USER_TIMELINE_AND_REPLIES,
];

/**
 * Collection of resources that can be posted.
 *
 * @internal
 */
export const PostResourcesGroup = [
	ResourceType.LIST_MEMBER_ADD,
	ResourceType.LIST_MEMBER_REMOVE,
	ResourceType.MEDIA_UPLOAD_APPEND,
	ResourceType.MEDIA_UPLOAD_FINALIZE,
	ResourceType.MEDIA_UPLOAD_INITIALIZE,
	ResourceType.DM_DELETE_CONVERSATION,
	ResourceType.TWEET_BOOKMARK,
	ResourceType.TWEET_LIKE,
	ResourceType.TWEET_POST,
	ResourceType.TWEET_RETWEET,
	ResourceType.TWEET_SCHEDULE,
	ResourceType.TWEET_UNBOOKMARK,
	ResourceType.TWEET_UNLIKE,
	ResourceType.TWEET_UNPOST,
	ResourceType.TWEET_UNRETWEET,
	ResourceType.TWEET_UNSCHEDULE,
	ResourceType.USER_FOLLOW,
	ResourceType.USER_UNFOLLOW,
];
