import { BaseType } from '../enums/Data';
import { Analytics } from '../models/data/Analytics';
import { Article } from '../models/data/Article';
import { BookmarkFolder } from '../models/data/BookmarkFolder';
import { Conversation } from '../models/data/Conversation';
import { CursoredData } from '../models/data/CursoredData';
import { Inbox } from '../models/data/Inbox';
import { Job } from '../models/data/Job';
import { JobLocation } from '../models/data/JobLocation';
import { List } from '../models/data/List';
import { Notification } from '../models/data/Notification';
import { Space } from '../models/data/Space';
import { Tweet } from '../models/data/Tweet';
import { User } from '../models/data/User';
import { UserAbout } from '../models/data/UserAbout';
import { IConversationTimelineResponse } from '../types/raw/dm/Conversation';
import { IInboxInitialResponse } from '../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../types/raw/dm/InboxTimeline';
import { IJobScreenQueryResponse } from '../types/raw/job/JobScreenQuery';
import { IJobSearchQueryScreenJobsQueryResponse } from '../types/raw/job/JobSearchQueryScreenJobsQuery';
import { ILocationSelectorQueryResponse } from '../types/raw/job/LocationSelectorQuery';
import { IListMemberAddResponse } from '../types/raw/list/AddMember';
import { IListCreateResponse } from '../types/raw/list/Create';
import { IListDeleteResponse } from '../types/raw/list/Delete';
import { IListDetailsResponse } from '../types/raw/list/Details';
import { IListMembersResponse } from '../types/raw/list/Members';
import { IListMuteResponse } from '../types/raw/list/Mute';
import { IListMemberRemoveResponse } from '../types/raw/list/RemoveMember';
import { IListTweetsResponse } from '../types/raw/list/Tweets';
import { IListUnmuteResponse } from '../types/raw/list/Unmute';
import { IListUpdateResponse } from '../types/raw/list/Update';
import { IMediaInitializeUploadResponse } from '../types/raw/media/InitalizeUpload';
import { IAudioSpaceByIdResponse } from '../types/raw/space/AudioSpaceById';
import { ITweetBookmarkResponse } from '../types/raw/tweet/Bookmark';
import { ITweetDetailsResponse } from '../types/raw/tweet/Details';
import { ITweetDetailsBulkResponse } from '../types/raw/tweet/DetailsBulk';
import { ITweetHistoryResponse } from '../types/raw/tweet/History';
import { ITweetLikeResponse } from '../types/raw/tweet/Like';
import { ITweetLikersResponse } from '../types/raw/tweet/Likers';
import { ITweetPostNoteResponse, ITweetPostResponse } from '../types/raw/tweet/Post';
import { ITweetRepliesResponse } from '../types/raw/tweet/Replies';
import { ITweetRetweetResponse } from '../types/raw/tweet/Retweet';
import { ITweetRetweetersResponse } from '../types/raw/tweet/Retweeters';
import { ITweetScheduleResponse } from '../types/raw/tweet/Schedule';
import { ITweetSearchResponse } from '../types/raw/tweet/Search';
import { ITweetUnbookmarkResponse } from '../types/raw/tweet/Unbookmark';
import { ITweetUnlikeResponse } from '../types/raw/tweet/Unlike';
import { ITweetUnpostResponse } from '../types/raw/tweet/Unpost';
import { ITweetUnretweetResponse } from '../types/raw/tweet/Unretweet';
import { ITweetUnscheduleResponse } from '../types/raw/tweet/Unschedule';
import { IUserAboutResponse } from '../types/raw/user/About';
import { IUserAffiliatesResponse } from '../types/raw/user/Affiliates';
import { IUserAnalyticsResponse } from '../types/raw/user/Analytics';
import { IUserArticlesResponse } from '../types/raw/user/Articles';
import { IUserBookmarkFoldersResponse } from '../types/raw/user/BookmarkFolders';
import { IUserBookmarkFolderTweetsResponse } from '../types/raw/user/BookmarkFolderTweets';
import { IUserBookmarksResponse } from '../types/raw/user/Bookmarks';
import { IUserChangePasswordResponse } from '../types/raw/user/ChangePassword';
import { IUserDetailsResponse } from '../types/raw/user/Details';
import { IUserDetailsBulkResponse } from '../types/raw/user/DetailsBulk';
import { IUserFollowResponse } from '../types/raw/user/Follow';
import { IUserFollowedResponse } from '../types/raw/user/Followed';
import { IUserFollowersResponse } from '../types/raw/user/Followers';
import { IUserFollowingResponse } from '../types/raw/user/Following';
import { IUserHighlightsResponse } from '../types/raw/user/Highlights';
import { IUserLikesResponse } from '../types/raw/user/Likes';
import { IUserListsResponse } from '../types/raw/user/Lists';
import { IUserMediaResponse } from '../types/raw/user/Media';
import { IUserNotificationsResponse } from '../types/raw/user/Notifications';
import { IUserProfileUpdateResponse } from '../types/raw/user/ProfileUpdate';
import { IUserRecommendedResponse } from '../types/raw/user/Recommended';
import { IUserRemoveFollowerResponse } from '../types/raw/user/RemoveFollower';
import { IUserSearchResponse } from '../types/raw/user/Search';
import { IUserSettingsResponse } from '../types/raw/user/Settings';
import { IUserSubscriptionsResponse } from '../types/raw/user/Subscriptions';
import { IUserSuggestionsResponse } from '../types/raw/user/Suggestions';
import { IUserTweetsResponse } from '../types/raw/user/Tweets';
import { IUserTweetsAndRepliesResponse } from '../types/raw/user/TweetsAndReplies';
import { IUserUnfollowResponse } from '../types/raw/user/Unfollow';

/**
 * Collection of data extractors for each resource.
 *
 * @internal
 */
export const Extractors = {
	/* eslint-disable @typescript-eslint/naming-convention */

	JOB_DETAILS: (response: IJobScreenQueryResponse, id: string): Job | undefined => Job.single(response, id),
	JOB_LOCATIONS: (response: ILocationSelectorQueryResponse): JobLocation[] => JobLocation.list(response),
	JOB_SEARCH: (response: IJobSearchQueryScreenJobsQueryResponse): CursoredData<Job> =>
		new CursoredData<Job>(response, BaseType.JOB),

	LIST_CREATE: (response: IListCreateResponse): string | undefined => response.data?.list?.id_str ?? undefined,
	LIST_DELETE: (response: IListDeleteResponse): boolean => response.data?.list_delete === 'Done',
	LIST_DETAILS: (response: IListDetailsResponse, id: string): List | undefined => List.single(response, id),
	LIST_MEMBERS: (response: IListMembersResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	LIST_MEMBER_ADD: (response: IListMemberAddResponse): number | undefined =>
		response.data?.list?.member_count ?? undefined,
	LIST_MEMBER_REMOVE: (response: IListMemberRemoveResponse): number | undefined =>
		response.data?.list?.member_count ?? undefined,
	LIST_MUTE: (response: IListMuteResponse): boolean => response.data?.list === 'Done',
	LIST_TWEETS: (response: IListTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	LIST_UNMUTE: (response: IListUnmuteResponse): boolean => response.data?.list === 'Done',
	LIST_UPDATE: (response: IListUpdateResponse): List | undefined =>
		response.data?.list ? new List(response.data.list) : undefined,

	MEDIA_UPLOAD_APPEND: (): void => undefined,
	MEDIA_UPLOAD_FINALIZE: (): void => undefined,
	MEDIA_UPLOAD_INITIALIZE: (response: IMediaInitializeUploadResponse): string =>
		response.media_id_string ?? undefined,

	DM_CONVERSATION: (response: IConversationTimelineResponse): Conversation | undefined =>
		Conversation.fromConversationTimeline(response),
	DM_INBOX_INITIAL_STATE: (response: IInboxInitialResponse): Inbox => new Inbox(response),
	DM_INBOX_TIMELINE: (response: IInboxTimelineResponse): Inbox => new Inbox(response),

	SPACE_DETAILS: (response: IAudioSpaceByIdResponse): Space | undefined => Space.single(response),

	TWEET_BOOKMARK: (response: ITweetBookmarkResponse): boolean => response?.data?.tweet_bookmark_put === 'Done',
	TWEET_ARTICLE: (response: ITweetRepliesResponse, id: string): Article | undefined =>
		Tweet.single(response, id)?.article,
	TWEET_DETAILS: (response: ITweetDetailsResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_DETAILS_ALT: (response: ITweetRepliesResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_DETAILS_BULK: (response: ITweetDetailsBulkResponse, ids: string[]): Tweet[] => Tweet.multiple(response, ids),
	TWEET_HISTORY: (response: ITweetHistoryResponse): Tweet[] => Tweet.timeline(response),
	TWEET_LIKE: (response: ITweetLikeResponse): boolean => (response?.data?.favorite_tweet ? true : false),
	TWEET_LIKERS: (response: ITweetLikersResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	TWEET_POST: (response: ITweetPostResponse): string | undefined =>
		response?.data?.create_tweet?.tweet_results?.result?.rest_id ??
		response?.data?.create_note_tweet?.tweet_results?.result?.rest_id ??
		undefined,
	TWEET_POST_NOTE: (response: ITweetPostNoteResponse): string | undefined =>
		response?.data?.notetweet_create?.tweet_results?.result?.rest_id ?? undefined,
	TWEET_REPLIES: (response: ITweetDetailsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	TWEET_RETWEET: (response: ITweetRetweetResponse): boolean => (response?.data?.create_retweet ? true : false),
	TWEET_RETWEETERS: (response: ITweetRetweetersResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	TWEET_SCHEDULE: (response: ITweetScheduleResponse): string => response?.data?.tweet?.rest_id ?? undefined,
	TWEET_SEARCH: (response: ITweetSearchResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	TWEET_UNBOOKMARK: (response: ITweetUnbookmarkResponse): boolean => response?.data?.tweet_bookmark_delete === 'Done',
	TWEET_UNLIKE: (response: ITweetUnlikeResponse): boolean => (response?.data?.unfavorite_tweet ? true : false),
	TWEET_UNPOST: (response: ITweetUnpostResponse): boolean => (response?.data?.delete_tweet ? true : false),
	TWEET_UNRETWEET: (response: ITweetUnretweetResponse): boolean =>
		response?.data?.unretweet?.source_tweet_results?.result ? true : false,
	TWEET_UNSCHEDULE: (response: ITweetUnscheduleResponse): boolean => response?.data?.scheduledtweet_delete == 'Done',

	USER_AFFILIATES: (response: IUserAffiliatesResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	USER_ARTICLES: (response: IUserArticlesResponse): CursoredData<Article> =>
		new CursoredData<Article>(response, BaseType.ARTICLE),
	USER_ANALYTICS: (response: IUserAnalyticsResponse): Analytics =>
		new Analytics(response.data.viewer_v2.user_results.result),
	USER_BOOKMARKS: (response: IUserBookmarksResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_BOOKMARK_FOLDERS: (response: IUserBookmarkFoldersResponse): CursoredData<BookmarkFolder> =>
		new CursoredData<BookmarkFolder>(response, BaseType.BOOKMARK_FOLDER),
	USER_BOOKMARK_FOLDER_TWEETS: (response: IUserBookmarkFolderTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_ABOUT_BY_USERNAME: (response: IUserAboutResponse): UserAbout | undefined => UserAbout.single(response),
	USER_DETAILS_BY_USERNAME: (response: IUserDetailsResponse): User | undefined => User.single(response),
	USER_DETAILS_BY_ID: (response: IUserDetailsResponse): User | undefined => User.single(response),
	USER_DETAILS_BY_IDS_BULK: (response: IUserDetailsBulkResponse, ids: string[]): User[] =>
		User.multiple(response, ids),
	USER_FEED_FOLLOWED: (response: IUserFollowedResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_FEED_RECOMMENDED: (response: IUserRecommendedResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_FOLLOW: (response: IUserFollowResponse): boolean => (response?.id ? true : false),
	USER_FOLLOWING: (response: IUserFollowingResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	USER_FOLLOWERS: (response: IUserFollowersResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	USER_HIGHLIGHTS: (response: IUserHighlightsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_LISTS: (response: IUserListsResponse): CursoredData<List> => new CursoredData<List>(response, BaseType.LIST),
	USER_LIKES: (response: IUserLikesResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_MEDIA: (response: IUserMediaResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_NOTIFICATIONS: (response: IUserNotificationsResponse): CursoredData<Notification> =>
		new CursoredData<Notification>(response, BaseType.NOTIFICATION),
	USER_REMOVE_FOLLOWER: (response: IUserRemoveFollowerResponse): boolean =>
		response?.data?.remove_follower?.unfollow_success_reason ? true : false,
	USER_SEARCH: (response: IUserSearchResponse): CursoredData<User> => new CursoredData<User>(response, BaseType.USER),
	USER_SUGGESTIONS: (response: IUserSuggestionsResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	USER_SUBSCRIPTIONS: (response: IUserSubscriptionsResponse): CursoredData<User> =>
		new CursoredData<User>(response, BaseType.USER),
	USER_TIMELINE: (response: IUserTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_TIMELINE_AND_REPLIES: (response: IUserTweetsAndRepliesResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, BaseType.TWEET),
	USER_UNFOLLOW: (response: IUserUnfollowResponse): boolean => (response?.id ? true : false),
	USER_PROFILE_UPDATE: (response: IUserProfileUpdateResponse): boolean => (response?.name ? true : false),
	USER_PROFILE_IMAGE_UPDATE: (response: IUserProfileUpdateResponse): boolean =>
		response?.profile_image_url || response?.profile_image_url_https ? true : false,
	USER_PROFILE_BANNER_UPDATE: (response: IUserProfileUpdateResponse): boolean =>
		!response || response?.profile_banner_url || response?.profile_banner_url_https ? true : false,
	USER_USERNAME_CHANGE: (response: IUserSettingsResponse): string | undefined => response?.screen_name ?? undefined,
	USER_PASSWORD_CHANGE: (response: IUserChangePasswordResponse): boolean => response?.status === 'ok',

	/* eslint-enable @typescript-eslint/naming-convention */
};
