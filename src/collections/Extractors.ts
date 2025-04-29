import { EBaseType } from '../enums/Data';
import { CursoredData } from '../models/data/CursoredData';
import { Notification } from '../models/data/Notification';
import { Tweet } from '../models/data/Tweet';
import { User } from '../models/data/User';
import { IListMembersResponse } from '../types/raw/list/Members';
import { IListTweetsResponse } from '../types/raw/list/Tweets';
import { IMediaInitializeUploadResponse } from '../types/raw/media/InitalizeUpload';
import { ITweetDetailsResponse } from '../types/raw/tweet/Details';
import { ITweetDetailsBulkResponse } from '../types/raw/tweet/DetailsBulk';
import { ITweetLikeResponse } from '../types/raw/tweet/Like';
import { ITweetLikersResponse } from '../types/raw/tweet/Likers';
import { ITweetPostResponse } from '../types/raw/tweet/Post';
import { ITweetRepliesResponse } from '../types/raw/tweet/Replies';
import { ITweetRetweetResponse } from '../types/raw/tweet/Retweet';
import { ITweetRetweetersResponse } from '../types/raw/tweet/Retweeters';
import { ITweetScheduleResponse } from '../types/raw/tweet/Schedule';
import { ITweetSearchResponse } from '../types/raw/tweet/Search';
import { ITweetUnlikeResponse } from '../types/raw/tweet/Unlike';
import { ITweetUnpostResponse } from '../types/raw/tweet/Unpost';
import { ITweetUnretweetResponse } from '../types/raw/tweet/Unretweet';
import { ITweetUnscheduleResponse } from '../types/raw/tweet/Unschedule';
import { IUserAffiliatesResponse } from '../types/raw/user/Affiliates';
import { IUserBookmarksResponse } from '../types/raw/user/Bookmarks';
import { IUserDetailsResponse } from '../types/raw/user/Details';
import { IUserDetailsBulkResponse } from '../types/raw/user/DetailsBulk';
import { IUserFollowResponse } from '../types/raw/user/Follow';
import { IUserFollowedResponse } from '../types/raw/user/Followed';
import { IUserFollowersResponse } from '../types/raw/user/Followers';
import { IUserFollowingResponse } from '../types/raw/user/Following';
import { IUserHighlightsResponse } from '../types/raw/user/Highlights';
import { IUserLikesResponse } from '../types/raw/user/Likes';
import { IUserMediaResponse } from '../types/raw/user/Media';
import { IUserNotificationsResponse } from '../types/raw/user/Notifications';
import { IUserRecommendedResponse } from '../types/raw/user/Recommended';
import { IUserSubscriptionsResponse } from '../types/raw/user/Subscriptions';
import { IUserTweetsResponse } from '../types/raw/user/Tweets';
import { IUserTweetsAndRepliesResponse } from '../types/raw/user/TweetsAndReplies';
import { IUserUnfollowResponse } from '../types/raw/user/Unfollow';

/**
 * Collection of data extractors for each resource.
 *
 * @internal
 */
export const extractors = {
	/* eslint-disable @typescript-eslint/naming-convention */

	LIST_MEMBERS: (response: IListMembersResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	LIST_TWEETS: (response: IListTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),

	MEDIA_UPLOAD_APPEND: (): void => undefined,
	MEDIA_UPLOAD_FINALIZE: (): void => undefined,
	MEDIA_UPLOAD_INITIALIZE: (response: IMediaInitializeUploadResponse): string =>
		response.media_id_string ?? undefined,

	TWEET_DETAILS: (response: ITweetDetailsResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_DETAILS_ALT: (response: ITweetRepliesResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_DETAILS_BULK: (response: ITweetDetailsBulkResponse, ids: string[]): Tweet[] => Tweet.multiple(response, ids),
	TWEET_LIKE: (response: ITweetLikeResponse): boolean => (response?.data?.favorite_tweet ? true : false),
	TWEET_LIKERS: (response: ITweetLikersResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	TWEET_POST: (response: ITweetPostResponse): string =>
		response?.data?.create_tweet?.tweet_results?.result?.rest_id ?? undefined,
	TWEET_REPLIES: (response: ITweetDetailsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	TWEET_RETWEET: (response: ITweetRetweetResponse): boolean => (response?.data?.create_retweet ? true : false),
	TWEET_RETWEETERS: (response: ITweetRetweetersResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	TWEET_SCHEDULE: (response: ITweetScheduleResponse): string => response?.data?.tweet?.rest_id ?? undefined,
	TWEET_SEARCH: (response: ITweetSearchResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	TWEET_UNLIKE: (response: ITweetUnlikeResponse): boolean => (response?.data?.unfavorite_tweet ? true : false),
	TWEET_UNPOST: (response: ITweetUnpostResponse): boolean => (response?.data?.delete_tweet ? true : false),
	TWEET_UNRETWEET: (response: ITweetUnretweetResponse): boolean =>
		response?.data?.unretweet?.source_tweet_results?.result ? true : false,
	TWEET_UNSCHEDULE: (response: ITweetUnscheduleResponse): boolean => response?.data?.scheduledtweet_delete == 'Done',

	USER_AFFILIATES: (response: IUserAffiliatesResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_BOOKMARKS: (response: IUserBookmarksResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_DETAILS_BY_USERNAME: (response: IUserDetailsResponse): User | undefined => User.single(response),
	USER_DETAILS_BY_ID: (response: IUserDetailsResponse): User | undefined => User.single(response),
	USER_DETAILS_BY_IDS_BULK: (response: IUserDetailsBulkResponse, ids: string[]): User[] =>
		User.multiple(response, ids),
	USER_FEED_FOLLOWED: (response: IUserFollowedResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_FEED_RECOMMENDED: (response: IUserRecommendedResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_FOLLOW: (response: IUserFollowResponse): boolean => (response?.id ? true : false),
	USER_FOLLOWING: (response: IUserFollowingResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_FOLLOWERS: (response: IUserFollowersResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_HIGHLIGHTS: (response: IUserHighlightsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_LIKES: (response: IUserLikesResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_MEDIA: (response: IUserMediaResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_NOTIFICATIONS: (response: IUserNotificationsResponse): CursoredData<Notification> =>
		new CursoredData<Notification>(response, EBaseType.NOTIFICATION),
	USER_SUBSCRIPTIONS: (response: IUserSubscriptionsResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_TIMELINE: (response: IUserTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_TIMELINE_AND_REPLIES: (response: IUserTweetsAndRepliesResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_UNFOLLOW: (response: IUserUnfollowResponse): boolean => (response?.id ? true : false),

	/* eslint-enable @typescript-eslint/naming-convention */
};
