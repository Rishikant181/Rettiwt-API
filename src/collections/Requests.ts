import { AxiosRequestConfig } from 'axios';
import { Request } from 'rettiwt-core';

import { EResourceType } from '../enums/Resource';
import { FetchArgs } from '../models/args/internal/FetchArgs';
import { PostArgs } from '../models/args/internal/PostArgs';

/**
 * The request generator from rettiwt-core.
 *
 * @internal
 */
const request = new Request();

/**
 * The collection of requests to various resources.
 *
 * @internal
 */
export const requests: { [key in keyof typeof EResourceType]: (args: FetchArgs | PostArgs) => AxiosRequestConfig } = {
	/* eslint-disable @typescript-eslint/naming-convention */
	LIST_TWEETS: (args: FetchArgs) => request.list.tweets(args.id!, args.count, args.cursor),

	MEDIA_UPLOAD_APPEND: (args: PostArgs) => request.media.appendUpload(args.upload!.id!, args.upload!.media!),
	MEDIA_UPLOAD_FINALIZE: (args: PostArgs) => request.media.finalizeUpload(args.upload!.id!),
	MEDIA_UPLOAD_INITIALIZE: (args: PostArgs) => request.media.initializeUpload(args.upload!.size!),

	TWEET_RETWEET: (args: PostArgs) => request.tweet.retweet(args.id!),
	TWEET_CREATE: (args: PostArgs) => request.tweet.post(args.tweet!),
	TWEET_FAVORITE: (args: PostArgs) => request.tweet.like(args.id!),
	TWEET_SEARCH: (args: FetchArgs) => request.tweet.search(args.filter!, args.count, args.cursor),
	TWEET_DETAILS: (args: FetchArgs) => request.tweet.details(args.id!),
	TWEET_FAVORITERS: (args: FetchArgs) => request.tweet.likers(args.id!, args.count, args.cursor),
	TWEET_RETWEETERS: (args: FetchArgs) => request.tweet.retweeters(args.id!, args.count, args.cursor),

	USER_DETAILS_BY_USERNAME: (args: FetchArgs) => request.user.detailsByUsername(args.id!),
	USER_DETAILS_BY_ID: (args: FetchArgs) => request.user.detailsById(args.id!),
	USER_FOLLOWING: (args: FetchArgs) => request.user.following(args.id!, args.count, args.cursor),
	USER_FOLLOWERS: (args: FetchArgs) => request.user.followers(args.id!, args.count, args.cursor),
	USER_HIGHLIGHTS: (args: FetchArgs) => request.user.highlights(args.id!, args.count, args.cursor),
	USER_LIKES: (args: FetchArgs) => request.user.likes(args.id!, args.count, args.cursor),
	USER_MEDIA: (args: FetchArgs) => request.user.media(args.id!, args.count, args.cursor),
	USER_SUBSCRIPTIONS: (args: FetchArgs) => request.user.subscriptions(args.id!, args.count, args.cursor),
	USER_TWEETS: (args: FetchArgs) => request.user.tweets(args.id!, args.count, args.cursor),
	USER_TWEETS_AND_REPLIES: (args: FetchArgs) => request.user.tweetsAndReplies(args.id!, args.count, args.cursor),
	/* eslint-enable @typescript-eslint/naming-convention */
};
