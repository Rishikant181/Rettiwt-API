import { ETweetRepliesSortType } from '../../enums/Tweet';

/**
 * Options specifying the data that is to be fetched.
 *
 * @public
 */
export interface IFetchArgs {
	/**
	 * The number of data items to fetch.
	 *
	 * @remarks
	 * - Works only for cursored resources.
	 * - Does not work for {@link EResourceType.TWEET_REPLIES}.
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
	count?: number;

	/**
	 * The cursor to the batch of data to fetch.
	 *
	 * @remarks
	 * - May be used for cursored resources.
	 * - Has no effect for other resources.
	 */
	cursor?: string;

	/**
	 * The filter for searching tweets.
	 *
	 * @remarks
	 * Required when searching for tweets using {@link EResourceType.TWEET_SEARCH}.
	 */
	filter?: ITweetFilter;

	/**
	 * The id of the target resource.
	 *
	 * @remarks
	 * - Required for all resources except {@link EResourceType.TWEET_SEARCH} and {@link EResourceType.USER_TIMELINE_RECOMMENDED}.
	 * - For {@link EResourceType.USER_DETAILS_BY_USERNAME}, can be alphanumeric, while for others, is strictly numeric.
	 */
	id?: string;

	/**
	 * The IDs of the target resources.
	 *
	 * @remarks
	 * - Required only for {@link EResourceType.TWEET_DETAILS_BULK} and {@link EResourceType.USER_DETAILS_BY_IDS_BULK}.
	 */
	ids?: string[];

	/**
	 * The sorting to use for tweet results.
	 *
	 * @remarks
	 * - Only works for {@link EResourceType.TWEET_REPLIES}.
	 */
	sortBy?: ETweetRepliesSortType;
}

/**
 * The filter to be used for searching tweets.
 *
 * @public
 */
export interface ITweetFilter {
	/** The date upto which tweets are to be searched. */
	endDate?: Date;

	/** The list of words to exclude from search. */
	excludeWords?: string[];

	/**
	 * The list of usernames whose tweets are to be searched.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	fromUsers?: string[];

	/**
	 * The list of hashtags to search.
	 *
	 * @remarks
	 * '#' must be excluded from the hashtag!
	 */
	hashtags?: string[];

	/** The exact phrase to search. */
	includePhrase?: string;

	/** The list of words to search. */
	includeWords?: string[];

	/** The language of the tweets to search. */
	language?: string;

	/** The list from which tweets are to be searched. */
	list?: string;

	/** The id of the tweet, before which the tweets are to be searched. */
	maxId?: string;

	/**
	 * The list of username mentioned in the tweets to search.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	mentions?: string[];

	/** The minimun number of likes to search by. */
	minLikes?: number;

	/** The minimum number of replies to search by. */
	minReplies?: number;

	/** The minimum number of retweets to search by. */
	minRetweets?: number;

	/**
	 * Whether to search only posts that contain links.
	 *
	 * @remarks 'links' includes things like media, quotes, retweets, etc.
	 */
	onlyLinks?: boolean;

	/** Whether to search only original posts. */
	onlyOriginal?: boolean;

	/** Whether to search only replies */
	onlyReplies?: boolean;

	/** Whether to search posts that only contain text. */
	onlyText?: boolean;

	/** The optional words to search. */
	optionalWords?: string[];

	/** The id of the tweet which is quoted in the tweets to search. */
	quoted?: string;

	/** The id of the tweet, after which the tweets are to be searched. */
	sinceId?: string;

	/** The date starting from which tweets are to be searched. */
	startDate?: Date;

	/**
	 * The list of username to whom the tweets to be searched, are adressed.
	 *
	 * @remarks
	 * '\@' must be excluded from the username!
	 */
	toUsers?: string[];

	/** Whether to fetch top tweets or not. */
	top?: boolean;
}
