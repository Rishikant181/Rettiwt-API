import { ETweetRepliesSortType } from '../../enums/Tweet';
import { IFetchArgs, ITweetFilter } from '../../types/args/FetchArgs';

/**
 * Options specifying the data that is to be fetched.
 *
 * @public
 */
export class FetchArgs implements IFetchArgs {
	public count?: number;
	public cursor?: string;
	public filter?: TweetFilter;
	public id?: string;
	public ids?: string[];
	public sortBy?: ETweetRepliesSortType;

	/**
	 * @param args - Additional user-defined arguments for fetching the resource.
	 */
	public constructor(args: IFetchArgs) {
		this.id = args.id;
		this.ids = args.ids;
		this.count = args.count;
		this.cursor = args.cursor;
		this.filter = args.filter ? new TweetFilter(args.filter) : undefined;
		this.sortBy = args.sortBy;
	}
}

/**
 * The filter to be used for searching tweets.
 *
 * @public
 */
export class TweetFilter implements ITweetFilter {
	public endDate?: Date;
	public excludeWords?: string[];
	public fromUsers?: string[];
	public hashtags?: string[];
	public includePhrase?: string;
	public includeWords?: string[];
	public language?: string;
	public list?: string;
	public maxId?: string;
	public mentions?: string[];
	public minLikes?: number;
	public minReplies?: number;
	public minRetweets?: number;
	public onlyLinks?: boolean;
	public onlyOriginal?: boolean;
	public onlyReplies?: boolean;
	public onlyText?: boolean;
	public optionalWords?: string[];
	public quoted?: string;
	public sinceId?: string;
	public startDate?: Date;
	public toUsers?: string[];
	public top?: boolean;

	/**
	 * @param filter - The filter configuration.
	 */
	public constructor(filter: ITweetFilter) {
		this.endDate = filter.endDate;
		this.excludeWords = filter.excludeWords;
		this.fromUsers = filter.fromUsers;
		this.hashtags = filter.hashtags;
		this.includePhrase = filter.includePhrase;
		this.language = filter.language;
		this.list = filter.list;
		this.mentions = filter.mentions;
		this.quoted = filter.quoted;
		this.sinceId = filter.sinceId;
		this.maxId = filter.maxId;
		this.minLikes = filter.minLikes;
		this.minReplies = filter.minReplies;
		this.minRetweets = filter.minRetweets;
		this.onlyLinks = filter.onlyLinks;
		this.onlyOriginal = filter.onlyOriginal;
		this.onlyReplies = filter.onlyReplies;
		this.onlyText = filter.onlyText;
		this.optionalWords = filter.optionalWords;
		this.startDate = filter.startDate;
		this.toUsers = filter.toUsers;
		this.top = filter.top;
		this.includeWords = filter.includeWords;
	}

	/**
	 * Convert Date object to Twitter string representation.
	 * eg - 2023-06-23_11:21:06_UTC
	 *
	 * @param date - The date object to convert.
	 * @returns The Twitter string representation of the date.
	 */
	private static dateToTwitterString(date: Date): string {
		// Converting localized date to UTC date
		const utc = new Date(
			Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours(),
				date.getUTCMinutes(),
				date.getUTCSeconds(),
			),
		);

		/**
		 * To convert ISO 8601 date string to Twitter date string:
		 *
		 * - 'T' between date and time substring is replace with '_'.
		 * - Milliseconds substring is omitted.
		 * - '_UTC' is appended as suffix.
		 */
		return utc.toISOString().replace(/T/, '_').replace(/\..+/, '') + '_UTC';
	}

	/**
	 * @returns The string representation of 'this' filter.
	 */
	public toString(): string {
		return (
			[
				this.includeWords ? this.includeWords.join(' ') : '',
				this.includePhrase ? `"${this.includePhrase}"` : '',
				this.optionalWords ? `(${this.optionalWords.join(' OR ')})` : '',
				this.excludeWords ? `${this.excludeWords.map((word) => '-' + word).join(' ')}` : '',
				this.hashtags ? `(${this.hashtags.map((hashtag) => '#' + hashtag).join(' OR ')})` : '',
				this.fromUsers ? `(${this.fromUsers.map((user) => `from:${user}`).join(' OR ')})` : '',
				this.toUsers ? `(${this.toUsers.map((user) => `to:${user}`).join(' OR ')})` : '',
				this.list ? `list:${this.list}` : '',
				this.mentions ? `(${this.mentions.map((mention) => '@' + mention).join(' OR ')})` : '',
				this.minReplies ? `min_replies:${this.minReplies}` : '',
				this.minLikes ? `min_faves:${this.minLikes}` : '',
				this.minRetweets ? `min_retweets:${this.minRetweets}` : '',
				this.language ? `lang:${this.language}` : '',
				this.startDate ? `since:${TweetFilter.dateToTwitterString(this.startDate)}` : '',
				this.endDate ? `until:${TweetFilter.dateToTwitterString(this.endDate)}` : '',
				this.sinceId ? `since_id:${this.sinceId}` : '',
				this.maxId ? `max_id:${this.maxId}` : '',
				this.quoted ? `quoted_tweet_id:${this.quoted}` : '',
			]
				.filter((item) => item !== '()' && item !== '')
				.join(' ') +
			(this.onlyText === true ? ' -filter:links' : '') +
			(this.onlyOriginal === true ? ' -filter:replies' : '') +
			(this.onlyLinks === true ? ' filter:links' : '') +
			(this.onlyReplies === true ? ' filter:replies' : '')
		);
	}
}
