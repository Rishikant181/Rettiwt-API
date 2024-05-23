import {
	IInitializeMediaUploadResponse,
	IListDetailsResponse,
	IResponse,
	ITweetLikeResponse,
	ITweetPostResponse,
	ITweetRetweetResponse,
	ITweetUnlikeResponse,
	ITweetUnpostResponse,
	ITweetUnretweetResponse,
	IUserFollowResponse,
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
	LIST_TWEETS: (response: IListDetailsResponse): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),

	MEDIA_UPLOAD_APPEND: (): void => undefined,
	MEDIA_UPLOAD_FINALIZE: (): void => undefined,
	MEDIA_UPLOAD_INITIALIZE: (response: IInitializeMediaUploadResponse): string =>
		response.media_id_string ?? undefined,

	TWEET_DETAILS: (response: IResponse<unknown>, id: string): Tweet | undefined => Tweet.single(response, id),
	TWEET_LIKE: (response: ITweetLikeResponse): boolean => (response?.data?.favorite_tweet ? true : false),
	TWEET_LIKERS: (response: IResponse<unknown>): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	TWEET_POST: (response: ITweetPostResponse): string =>
		response?.data?.create_tweet?.tweet_results?.result?.rest_id ?? undefined,
	TWEET_RETWEET: (response: ITweetRetweetResponse): boolean => (response?.data?.create_retweet ? true : false),
	TWEET_RETWEETERS: (response: IResponse<unknown>): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	TWEET_SEARCH: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	TWEET_UNLIKE: (response: ITweetUnlikeResponse): boolean => (response?.data?.unfavorite_tweet ? true : false),
	TWEET_UNPOST: (response: ITweetUnpostResponse): boolean => (response?.data?.delete_tweet ? true : false),
	TWEET_UNRETWEET: (response: ITweetUnretweetResponse): boolean =>
		response?.data?.unretweet?.source_tweet_results?.result ? true : false,

	USER_DETAILS_BY_USERNAME: (response: IResponse<unknown>): User | undefined => User.single(response),
	USER_DETAILS_BY_ID: (response: IResponse<unknown>): User | undefined => User.single(response),
	USER_FOLLOW: (response: IUserFollowResponse): boolean => (response?.id ? true : false),
	USER_FOLLOWING: (response: IResponse<unknown>): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_FOLLOWERS: (response: IResponse<unknown>): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_HIGHLIGHTS: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_LIKES: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_MEDIA: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_SUBSCRIPTIONS: (response: IResponse<unknown>): CursoredData<User> =>
		new CursoredData<User>(response, EBaseType.USER),
	USER_TIMELINE: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_TIMELINE_AND_REPLIES: (response: IResponse<unknown>): CursoredData<Tweet> =>
		new CursoredData<Tweet>(response, EBaseType.TWEET),
	USER_UNFOLLOW: (response: IUserUnfollowResponse): boolean => (response?.id ? true : false),
	/* eslint-enable @typescript-eslint/naming-convention */
};
