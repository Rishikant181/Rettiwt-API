// PACKAGES
import { TweetFilter } from 'rettiwt-core';

/**
 * The search options supplied while searching for tweets.
 *
 * @remarks The search options are implementations of the ones offered by {@link TweetFilter}
 */
export class TweetSearchOptions {
	public from?: string;
	public to?: string;
	public words?: string;
	public hashtags?: string;
	public start?: string;
	public end?: string;

	/**
	 * Initializes a new object from the given options.
	 *
	 * @param options - The search options.
	 */
	public constructor(options?: TweetSearchOptions) {
		this.from = options?.from;
		this.to = options?.to;
		this.words = options?.words;
		this.hashtags = options?.hashtags;
		this.start = options?.start;
		this.end = options?.end;
	}

	/**
	 * Converts the filter options to a format recognizable by rettiwt-api.
	 *
	 * @returns The '{@link TweetFilter}' representation of filter options.
	 */
	public toTweetFilter(): TweetFilter {
		return new TweetFilter({
			fromUsers: this.from ? this.from.split(';') : undefined,
			toUsers: this.to ? this.to.split(';') : undefined,
			words: this.words ? this.words.split(';') : undefined,
			hashtags: this.hashtags ? this.hashtags.split(';') : undefined,
			startDate: this.start ? new Date(this.start) : undefined,
			endDate: this.end ? new Date(this.end) : undefined,
		});
	}
}
