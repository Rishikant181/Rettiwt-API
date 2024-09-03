import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEmpty,
	IsNotEmpty,
	IsNumber,
	IsNumberString,
	IsObject,
	IsOptional,
	IsString,
	Max,
	Min,
	validateSync,
} from 'class-validator';

import { TweetFilter as TweetFilterCore } from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';
import { DataValidationError } from '../errors/DataValidationError';

/**
 * Options specifying the data that is to be fetched.
 *
 * @public
 */
export class FetchArgs {
	/**
	 * The number of data items to fetch.
	 *
	 * @remarks
	 * - Works only for cursored resources.
	 * - Must be \<= 20 for:
	 * 	- {@link EResourceType.USER_TIMELINE}
	 * 	- {@link EResourceType.USER_TIMELINE}
	 * 	- {@link EResourceType.USER_TIMELINE_AND_REPLIES}
	 * - Must be \<= 100 for all other cursored resources.
	 * - Due a bug on Twitter's end, count does not work for {@link EResourceType.USER_FOLLOWERS} and {@link EResourceType.USER_FOLLOWING}.
	 * - Has not effect for:
	 * 	- {@link EResourceType.USER_FEED_FOLLOWED}
	 * 	- {@link EResourceType.USER_FEED_RECOMMENDED}
	 */
	@IsEmpty({
		groups: [
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_DETAILS_BY_USERNAME,
			EResourceType.USER_FEED_FOLLOWED,
			EResourceType.USER_FEED_RECOMMENDED,
		],
	})
	@IsOptional({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.TWEET_SEARCH,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@Min(1, {
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.TWEET_SEARCH,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@Max(100, {
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
		],
	})
	@Max(20, {
		groups: [EResourceType.TWEET_SEARCH, EResourceType.USER_TIMELINE, EResourceType.USER_TIMELINE_AND_REPLIES],
	})
	public count?: number;

	/**
	 * The cursor to the batch of data to fetch.
	 *
	 * @remarks
	 * - May be used for cursored resources.
	 * - Has no effect for other resources.
	 */
	@IsEmpty({
		groups: [
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_DETAILS_BY_USERNAME,
		],
	})
	@IsOptional({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.TWEET_SEARCH,
			EResourceType.USER_FEED_FOLLOWED,
			EResourceType.USER_FEED_RECOMMENDED,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@IsString({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.TWEET_SEARCH,
			EResourceType.USER_FEED_FOLLOWED,
			EResourceType.USER_FEED_RECOMMENDED,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	public cursor?: string;

	/**
	 * The filter for searching tweets.
	 *
	 * @remarks
	 * Required when searching for tweets using {@link EResourceType.TWEET_SEARCH}.
	 */
	@IsEmpty({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.USER_DETAILS_BY_USERNAME,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_FEED_FOLLOWED,
			EResourceType.USER_FEED_RECOMMENDED,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@IsNotEmpty({ groups: [EResourceType.TWEET_SEARCH] })
	@IsObject({ groups: [EResourceType.TWEET_SEARCH] })
	public filter?: TweetFilter;

	/**
	 * The id of the target resource.
	 *
	 * @remarks
	 * - Required for all resources except {@link EResourceType.TWEET_SEARCH} and {@link EResourceType.USER_TIMELINE_RECOMMENDED}.
	 * - For {@link EResourceType.USER_DETAILS_BY_USERNAME}, can be alphanumeric, while for others, is strictly numeric.
	 */
	@IsEmpty({
		groups: [EResourceType.USER_FEED_FOLLOWED, EResourceType.USER_FEED_RECOMMENDED],
	})
	@IsNotEmpty({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.USER_DETAILS_BY_USERNAME,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@IsString({
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.USER_DETAILS_BY_USERNAME,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	@IsNumberString(undefined, {
		groups: [
			EResourceType.LIST_TWEETS,
			EResourceType.TWEET_DETAILS,
			EResourceType.TWEET_DETAILS_ALT,
			EResourceType.TWEET_RETWEETERS,
			EResourceType.USER_DETAILS_BY_ID,
			EResourceType.USER_FOLLOWERS,
			EResourceType.USER_FOLLOWING,
			EResourceType.USER_HIGHLIGHTS,
			EResourceType.USER_LIKES,
			EResourceType.USER_MEDIA,
			EResourceType.USER_SUBSCRIPTIONS,
			EResourceType.USER_TIMELINE,
			EResourceType.USER_TIMELINE_AND_REPLIES,
		],
	})
	public id?: string;

	/**
	 * @param resource - The resource to be fetched.
	 * @param args - Additional user-defined arguments for fetching the resource.
	 */
	public constructor(resource: EResourceType, args: FetchArgs) {
		this.id = args.id;
		this.count = args.count;
		this.cursor = args.cursor;
		this.filter = args.filter ? new TweetFilter(args.filter) : undefined;

		// Validating this object
		const validationResult = validateSync(this, { groups: [resource] });

		// If valiation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}

/**
 * The filter to be used for searching tweets.
 *
 * @public
 */
export class TweetFilter extends TweetFilterCore {
	/** The date upto which tweets are to be searched. */
	@IsOptional()
	@IsDate()
	public endDate?: Date;

	/** The list of words to exclude from search. */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public excludeWords?: string[];

	/**
	 * The list of usernames whose tweets are to be searched.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public fromUsers?: string[];

	/**
	 * The list of hashtags to search.
	 *
	 * @remarks
	 * '#' must be excluded from the hashtag!
	 */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public hashtags?: string[];

	/** The exact phrase to search. */
	@IsOptional()
	@IsString()
	public includePhrase?: string;

	/** The list of words to search. */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public includeWords?: string[];

	/** The language of the tweets to search. */
	@IsOptional()
	@IsString()
	public language?: string;

	/**
	 * Whether to fetch tweets that are links or not.
	 *
	 * @defaultValue true
	 */
	@IsOptional()
	@IsBoolean()
	public links?: boolean;

	/** The id of the tweet, before which the tweets are to be searched. */
	@IsOptional()
	@IsNumberString()
	public maxId?: string;

	/**
	 * The list of username mentioned in the tweets to search.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public mentions?: string[];

	/** The minimun number of likes to search by. */
	@IsOptional()
	@IsNumber()
	public minLikes?: number;

	/** The minimum number of replies to search by. */
	@IsOptional()
	@IsNumber()
	public minReplies?: number;

	/** The minimum number of retweets to search by. */
	@IsOptional()
	@IsNumber()
	public minRetweets?: number;

	/** The optional words to search. */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public optionalWords?: string[];

	/** The id of the tweet which is quoted in the tweets to search. */
	@IsOptional()
	@IsNumberString()
	public quoted?: string;

	/**
	 * Whether to fetch tweets that are replies or not.
	 *
	 * @defaultValue true
	 */
	@IsOptional()
	@IsBoolean()
	public replies?: boolean;

	/** The id of the tweet, after which the tweets are to be searched. */
	@IsOptional()
	@IsNumberString()
	public sinceId?: string;

	/** The date starting from which tweets are to be searched. */
	@IsOptional()
	@IsDate()
	public startDate?: Date;

	/**
	 * The list of username to whom the tweets to be searched, are adressed.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	public toUsers?: string[];

	/**
	 * @param filter - The filter to use for searching tweets.
	 */
	public constructor(filter: TweetFilter) {
		super(filter);

		// Validating this object
		const validationResult = validateSync(this);

		// If valiation error occured
		if (validationResult.length) {
			throw new DataValidationError(validationResult);
		}
	}
}
