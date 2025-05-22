import { AxiosRequestConfig } from 'axios';

import { EResourceType } from '../enums/Resource';
import { ListRequests } from '../requests/List';
import { MediaRequests } from '../requests/Media';
import { TweetRequests } from '../requests/Tweet';
import { UserRequests } from '../requests/User';
import { IFetchArgs } from '../types/args/FetchArgs';
import { IPostArgs } from '../types/args/PostArgs';

import { rawTweetRepliesSortType } from './Tweet';

/**
 * Collection of requests to various resources.
 *
 * @internal
 */
export const requests: { [key in keyof typeof EResourceType]: (args: IFetchArgs | IPostArgs) => AxiosRequestConfig } = {
	/* eslint-disable @typescript-eslint/naming-convention */

	LIST_MEMBERS: (args: IFetchArgs) => ListRequests.members(args.id!, args.count, args.cursor),
	LIST_TWEETS: (args: IFetchArgs) => ListRequests.tweets(args.id!, args.count, args.cursor),

	MEDIA_UPLOAD_APPEND: (args: IPostArgs) => MediaRequests.appendUpload(args.upload!.id!, args.upload!.media!),
	MEDIA_UPLOAD_FINALIZE: (args: IPostArgs) => MediaRequests.finalizeUpload(args.upload!.id!),
	MEDIA_UPLOAD_INITIALIZE: (args: IPostArgs) => MediaRequests.initializeUpload(args.upload!.size!),

	TWEET_DETAILS: (args: IFetchArgs) => TweetRequests.details(args.id!),
	TWEET_DETAILS_ALT: (args: IFetchArgs) => TweetRequests.replies(args.id!),
	TWEET_DETAILS_BULK: (args: IFetchArgs) => TweetRequests.bulkDetails(args.ids!),
	TWEET_LIKE: (args: IPostArgs) => TweetRequests.like(args.id!),
	TWEET_LIKERS: (args: IFetchArgs) => TweetRequests.likers(args.id!, args.count, args.cursor),
	TWEET_POST: (args: IPostArgs) => TweetRequests.post(args.tweet!),
	TWEET_REPLIES: (args: IFetchArgs) =>
		TweetRequests.replies(args.id!, args.cursor, args.sortBy ? rawTweetRepliesSortType[args.sortBy] : undefined),
	TWEET_RETWEET: (args: IPostArgs) => TweetRequests.retweet(args.id!),
	TWEET_RETWEETERS: (args: IFetchArgs) => TweetRequests.retweeters(args.id!, args.count, args.cursor),
	TWEET_SCHEDULE: (args: IPostArgs) => TweetRequests.schedule(args.tweet!),
	TWEET_SEARCH: (args: IFetchArgs) => TweetRequests.search(args.filter!, args.count, args.cursor),
	TWEET_UNLIKE: (args: IPostArgs) => TweetRequests.unlike(args.id!),
	TWEET_UNPOST: (args: IPostArgs) => TweetRequests.unpost(args.id!),
	TWEET_UNRETWEET: (args: IPostArgs) => TweetRequests.unretweet(args.id!),
	TWEET_UNSCHEDULE: (args: IPostArgs) => TweetRequests.unschedule(args.id!),

	USER_AFFILIATES: (args: IFetchArgs) => UserRequests.affiliates(args.id!, args.count, args.cursor),
	USER_BOOKMARKS: (args: IFetchArgs) => UserRequests.bookmarks(args.count, args.cursor),
	USER_DETAILS_BY_USERNAME: (args: IFetchArgs) => UserRequests.detailsByUsername(args.id!),
	USER_DETAILS_BY_ID: (args: IFetchArgs) => UserRequests.detailsById(args.id!),
	USER_DETAILS_BY_IDS_BULK: (args: IFetchArgs) => UserRequests.bulkDetailsByIds(args.ids!),
	USER_FEED_FOLLOWED: (args: IFetchArgs) => UserRequests.followed(args.count, args.cursor),
	USER_FEED_RECOMMENDED: (args: IFetchArgs) => UserRequests.recommended(args.count, args.cursor),
	USER_FOLLOW: (args: IPostArgs) => UserRequests.follow(args.id!),
	USER_FOLLOWING: (args: IFetchArgs) => UserRequests.following(args.id!, args.count, args.cursor),
	USER_FOLLOWERS: (args: IFetchArgs) => UserRequests.followers(args.id!, args.count, args.cursor),
	USER_HIGHLIGHTS: (args: IFetchArgs) => UserRequests.highlights(args.id!, args.count, args.cursor),
	USER_LIKES: (args: IFetchArgs) => UserRequests.likes(args.id!, args.count, args.cursor),
	USER_MEDIA: (args: IFetchArgs) => UserRequests.media(args.id!, args.count, args.cursor),
	USER_NOTIFICATIONS: (args: IFetchArgs) => UserRequests.notifications(args.count, args.cursor),
	USER_SUBSCRIPTIONS: (args: IFetchArgs) => UserRequests.subscriptions(args.id!, args.count, args.cursor),
	USER_TIMELINE: (args: IFetchArgs) => UserRequests.tweets(args.id!, args.count, args.cursor),
	USER_TIMELINE_AND_REPLIES: (args: IFetchArgs) => UserRequests.tweetsAndReplies(args.id!, args.count, args.cursor),
	USER_UNFOLLOW: (args: IPostArgs) => UserRequests.unfollow(args.id!),

	/* eslint-enable @typescript-eslint/naming-convention */
};
