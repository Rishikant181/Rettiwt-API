import { AxiosRequestConfig } from 'axios';
import { Request } from 'rettiwt-core';

import { EResourceType } from '../enums/Resource';
import { FetchArgs } from '../models/args/FetchArgs';
import { PostArgs } from '../models/args/PostArgs';

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

	TWEET_DETAILS: (args: FetchArgs) => request.tweet.details(args.id!),
	TWEET_DETAILS_ALT: (args: FetchArgs) => request.tweet.replies(args.id!),
	TWEET_LIKE: (args: PostArgs) => request.tweet.like(args.id!),
	TWEET_POST: (args: PostArgs) => request.tweet.post(args.tweet!),
	TWEET_RETWEET: (args: PostArgs) => request.tweet.retweet(args.id!),
	TWEET_RETWEETERS: (args: FetchArgs) => request.tweet.retweeters(args.id!, args.count, args.cursor),
	TWEET_SCHEDULE: (args: PostArgs) => request.tweet.schedule(args.tweet!, args.tweet!.scheduleFor!),
	TWEET_SEARCH: (args: FetchArgs) => request.tweet.search(args.filter!, args.count, args.cursor),
	TWEET_UNLIKE: (args: PostArgs) => request.tweet.unlike(args.id!),
	TWEET_UNPOST: (args: PostArgs) => request.tweet.unpost(args.id!),
	TWEET_UNRETWEET: (args: PostArgs) => request.tweet.unretweet(args.id!),
	TWEET_UNSCHEDULE: (args: PostArgs) => request.tweet.unschedule(args.id!),

	USER_DETAILS_BY_USERNAME: (args: FetchArgs) => request.user.detailsByUsername(args.id!),
	USER_DETAILS_BY_ID: (args: FetchArgs) => request.user.detailsById(args.id!),
	USER_FEED_FOLLOWED: (args: FetchArgs) => request.user.followed(args.count, args.cursor),
	USER_FEED_RECOMMENDED: (args: FetchArgs) => request.user.recommended(args.count, args.cursor),
	USER_FOLLOW: (args: PostArgs) => request.user.follow(args.id!),
	USER_FOLLOWING: (args: FetchArgs) => request.user.following(args.id!, args.count, args.cursor),
	USER_FOLLOWERS: (args: FetchArgs) => request.user.followers(args.id!, args.count, args.cursor),
	USER_HIGHLIGHTS: (args: FetchArgs) => request.user.highlights(args.id!, args.count, args.cursor),
	USER_LIKES: (args: FetchArgs) => request.user.likes(args.id!, args.count, args.cursor),
	USER_MEDIA: (args: FetchArgs) => request.user.media(args.id!, args.count, args.cursor),
	USER_NOTIFICATIONS: (args: FetchArgs) => request.user.notifications(args.count, args.cursor),
	USER_SUBSCRIPTIONS: (args: FetchArgs) => request.user.subscriptions(args.id!, args.count, args.cursor),
	USER_TIMELINE: (args: FetchArgs) => request.user.tweets(args.id!, args.count, args.cursor),
	USER_TIMELINE_AND_REPLIES: (args: FetchArgs) => request.user.tweetsAndReplies(args.id!, args.count, args.cursor),
	USER_UNFOLLOW: (args: PostArgs) => request.user.unfollow(args.id!),
	/* eslint-enable @typescript-eslint/naming-convention */
};
