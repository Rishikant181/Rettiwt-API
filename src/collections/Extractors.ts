import {
	IInitializeMediaUploadResponse,
	IListTweetsResponse,
	ITweetDetailsResponse,
	ITweetLikeResponse,
	ITweetPostResponse,
	ITweetRepliesResponse,
	ITweetRetweetersResponse,
	ITweetRetweetResponse,
	ITweetScheduleResponse,
	ITweetSearchResponse,
	ITweetUnlikeResponse,
	ITweetUnpostResponse,
	ITweetUnretweetResponse,
	ITweetUnscheduleResponse,
	IUserDetailsResponse,
	IUserFollowedResponse,
	IUserFollowersResponse,
	IUserFollowingResponse,
	IUserFollowResponse,
	IUserHighlightsResponse,
	IUserLikesResponse,
	IUserMediaResponse,
	IUserRecommendedResponse,
	IUserSubscriptionsResponse,
	IUserTweetsAndRepliesResponse,
	IUserTweetsResponse,
	IUserUnfollowResponse,
} from 'rettiwt-core';

import { EBaseType } from '../enums/Data';
import { CursoredData } from '../models/data/CursoredData';
import { Tweet } from '../models/data/Tweet';
import { User } from '../models/data/User';

/**
 * Collection of data extractors for each resource.
 *
 * @internal
 */
export const extractors = {
	/* eslint-disable @typescript-eslint/naming-convention */
	LIST_TWEETS: (response: IListTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),

	MEDIA_UPLOAD_APPEND: (): void => undefined,
	MEDIA_UPLOAD_FINALIZE: (): void => undefined,
	MEDIA_UPLOAD_INITIALIZE: (response: IInitializeMediaUploadResponse): string =>
		response.media_id_string ?? undefined,

	TWEET_DETAILS: (response: ITweetDetailsResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_DETAILS_ALT: (response: ITweetRepliesResponse, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_LIKE: (response: ITweetLikeResponse): boolean => (response?.data?.favorite_tweet ? true : false),
	TWEET_POST: (response: ITweetPostResponse): string =>
		response?.data?.create_tweet?.tweet_results?.result?.rest_id ?? undefined,
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

	USER_DETAILS_BY_USERNAME: (response: IUserDetailsResponse): User | undefined => User.single(response),
	USER_DETAILS_BY_ID: (response: IUserDetailsResponse): User | undefined => User.single(response),
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
	USER_SUBSCRIPTIONS: (response: IUserSubscriptionsResponse): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_TIMELINE: (response: IUserTweetsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_TIMELINE_AND_REPLIES: (response: IUserTweetsAndRepliesResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_UNFOLLOW: (response: IUserUnfollowResponse): boolean => (response?.id ? true : false),
	/* eslint-enable @typescript-eslint/naming-convention */
};
