import { Command, createCommand } from 'commander';

import { TweetRepliesSortType } from '../enums/Tweet';
import { output } from '../helper/CliUtils';
import { TweetFilter } from '../models/args/FetchArgs';
import { Rettiwt } from '../Rettiwt';
import { ITweetFilter } from '../types/args/FetchArgs';

/**
 * Creates a new 'tweet' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'tweet' command.
 */
function createTweetCommand(rettiwt: Rettiwt): Command {
	// Creating the 'tweet' command
	const tweet = createCommand('tweet').description('Access resources related to tweets');

	// Bookmark
	tweet
		.command('bookmark')
		.description('Bookmark a tweet')
		.argument('<id>', 'The tweet to bookmark')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.bookmark(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Details
	tweet
		.command('details')
		.description('Fetch the details of tweet/tweets with the given id/ids')
		.argument('<id>', 'The comma-separated list of IDs of tweets whose details are to be fetched')
		.action(async (id: string) => {
			try {
				// Getting the different IDs
				const ids: string[] = id.split(',');

				// If single ID given
				if (ids.length <= 1) {
					const details = await rettiwt.tweet.details(ids[0]);
					output(details);
				}
				// If multiple IDs give
				else {
					const details = await rettiwt.tweet.details(ids);
					output(details);
				}
			} catch (error) {
				output(error);
			}
		});

	// Like
	tweet
		.command('like')
		.description('Like a tweet')
		.argument('<id>', 'The tweet to like')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.like(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Likers
	tweet
		.command('likers')
		.description('Fetch the list of users who liked the given tweet. Only works for your own tweets')
		.argument('<id>', 'The id of the tweet')
		.argument('[count]', 'The number of likers to fetch')
		.argument('[cursor]', 'The cursor to the batch of likers to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.tweet.likers(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Post
	tweet
		.command('post')
		.description('Post a tweet (text only)')
		.argument('<text>', 'The text to post as a tweet')
		.option('-m, --media [string]', 'Comma-separated list of ids of the media item(s) to be posted')
		.option('-q, --quote [string]', 'The id of the tweet to quote in the tweet to be posted')
		.option(
			'-r, --reply [string]',
			'The id of the tweet to which the reply is to be made, if the tweet is to be a reply',
		)
		.action(async (text: string, options?: { media?: string; quote?: string; reply?: string }) => {
			try {
				const result = await rettiwt.tweet.post({
					text: text,
					media: options?.media ? options?.media.split(',').map((item) => ({ id: item })) : undefined,
					quote: options?.quote,
					replyTo: options?.reply,
				});
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Replies
	tweet
		.command('replies')
		.description(
			'Fetch the list of replies to a tweet, with the first batch containing the whole thread, if the tweet is/part of a thread',
		)
		.argument('<id>', 'The id of the tweet')
		.argument('[cursor]', 'The cursor to the batch of replies to fetch')
		.option('-s, --sort-by <string>', 'Sort the tweets by likes, latest or relevance, default is latest')
		.action(async (id: string, cursor?: string, options?: { sortBy: string }) => {
			try {
				// Determining the sort type
				let sortType: TweetRepliesSortType | undefined = undefined;
				if (options?.sortBy === 'likes') {
					sortType = TweetRepliesSortType.LIKES;
				} else if (options?.sortBy === 'latest') {
					sortType = TweetRepliesSortType.LATEST;
				} else if (options?.sortBy === 'relevance') {
					sortType = TweetRepliesSortType.RELEVANCE;
				}

				const tweets = await rettiwt.tweet.replies(id, cursor, sortType);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Retweet
	tweet
		.command('retweet')
		.description('Retweet a tweet')
		.argument('<id>', 'The tweet to retweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.retweet(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Retweeters
	tweet
		.command('retweeters')
		.description('Fetch the list of users who retweeted the given tweets')
		.argument('<id>', 'The id of the tweet')
		.argument('[count]', 'The number of retweeters to fetch')
		.argument('[cursor]', 'The cursor to the batch of retweeters to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.tweet.retweeters(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Schedule
	tweet
		.command('schedule')
		.description('Schedule a tweet to be posted at a given date/time')
		.argument('<text>', 'The text to post as a tweet')
		.argument('<time>', 'The date/time at which the tweet is to be scheduled (valid date/time string)')
		.option('-m, --media [string]', 'Comma-separated list of ids of the media item(s) to be posted')
		.option('-q, --quote [string]', 'The id of the tweet to quote in the tweet to be posted')
		.option(
			'-r, --reply [string]',
			'The id of the tweet to which the reply is to be made, if the tweet is to be a reply',
		)
		.action(async (text: string, time: string, options?: { media?: string; quote?: string; reply?: string }) => {
			try {
				const result = await rettiwt.tweet.schedule({
					text: text,
					media: options?.media ? options?.media.split(',').map((item) => ({ id: item })) : undefined,
					quote: options?.quote,
					replyTo: options?.reply,
					scheduleFor: new Date(time),
				});
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Search
	tweet
		.command('search')
		.description('Fetch the list of tweets that match the given filter options')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.option('-f, --from <string>', 'Matches the tweets made by the comma-separated list of given users')
		.option('-t, --to <string>', 'Matches the tweets made to the comma-separated list of given users')
		.option('-w, --words <string>', 'Matches the tweets containing the given comma-separated list of words')
		.option('-p, --phrase <string>', 'Matches the tweets containing the exact phrase')
		.option(
			'--optional-words <string>',
			'Matches the tweets containing any of the given comma-separated list of words',
		)
		.option(
			'--exclude-words <string>',
			'Matches the tweets that do not contain any of the give comma-separated list of words',
		)
		.option('-h, --hashtags <string>', 'Matches the tweets containing the given comma-separated list of hashtags')
		.option('--list <string>', 'Matches the tweets from the list with the given id')
		.option(
			'-m, --mentions <string>',
			'Matches the tweets that mention the given comma-separated list of usernames',
		)
		.option('-r, --min-replies <number>', 'Matches the tweets that have a minimum of given number of replies')
		.option('-l, --min-likes <number>', 'Matches the tweets that have a minimum of given number of likes')
		.option('-x, --min-retweets <number>', 'Matches the tweets that have a minimum of given number of retweets')
		.option('-q, --quoted <string>', 'Matches the tweets that quote the tweet with the given id')
		.option('--only-original', 'Matches tweets are original posts')
		.option('--only-replies', 'Matches tweets that are replies')
		.option('--only-text', 'Matches tweets that are only text')
		.option('--only-links', 'Matches tweets that only contain links like media, quotes, etc')
		.option('-s, --start <string>', 'Matches the tweets made since the given date (valid date/time string)')
		.option('-e, --end <string>', 'Matches the tweets made upto the given date (valid date/time string)')
		.option('--top', 'Matches top tweets instead of latest')
		.option('--stream', 'Stream the filtered tweets in pseudo-realtime')
		.option('-i, --interval <number>', 'The polling interval (in ms) to use for streaming. Default is 60000')
		.action(async (count?: string, cursor?: string, options?: TweetSearchOptions) => {
			try {
				// If search results are to be streamed
				if (options?.stream) {
					for await (const tweet of rettiwt.tweet.stream(
						new TweetSearchOptions(options).toTweetFilter(),
						options?.interval,
					)) {
						output(tweet);
					}
				}
				// If a normal search is to be done
				else {
					const tweets = await rettiwt.tweet.search(
						new TweetSearchOptions(options).toTweetFilter(),
						count ? parseInt(count) : undefined,
						cursor,
					);
					output(tweets);
				}
			} catch (error) {
				output(error);
			}
		});

	// Unbookmark
	tweet
		.command('unbookmark')
		.description('Unbookmark a tweet')
		.argument('<id>', 'The id of the tweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.unbookmark(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Unlike
	tweet
		.command('unlike')
		.description('Unlike a tweet')
		.argument('<id>', 'The id of the tweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.unlike(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Unpost
	tweet
		.command('unpost')
		.description('Unpost a tweet')
		.argument('<id>', 'The id of the tweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.unpost(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Unretweet
	tweet
		.command('unretweet')
		.description('Unretweet a tweet')
		.argument('<id>', 'The id of the tweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.unretweet(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Unschedule
	tweet
		.command('unschedule')
		.description('Unschedule a tweet')
		.argument('<id>', 'The id of the tweet')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.tweet.unschedule(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Upload
	tweet
		.command('upload')
		.description('Upload a media file and returns the alloted id (valid for 24 hrs)')
		.argument('<path>', 'The path to the media to upload')
		.action(async (path: string) => {
			try {
				const id = await rettiwt.tweet.upload(path);
				output(id);
			} catch (error) {
				output(error);
			}
		});

	return tweet;
}

/**
 * The search options supplied while searching for tweets.
 *
 * @remarks The search options are implementations of the ones offered by {@link TweetFilter}
 */
class TweetSearchOptions {
	public end?: string;
	public excludeWords?: string;
	public from?: string;
	public hashtags?: string;
	public interval?: number;
	public list?: string;
	public mentions?: string;
	public minLikes?: number;
	public minReplies?: number;
	public minRetweets?: number;
	public onlyLinks?: boolean = false;
	public onlyOriginal?: boolean = false;
	public onlyReplies?: boolean = false;
	public onlyText?: boolean = false;
	public optionalWords?: string;
	public phrase?: string;
	public quoted?: string;
	public start?: string;
	public stream?: boolean;
	public to?: string;
	public top?: boolean;
	public words?: string;

	/**
	 * Initializes a new object from the given options.
	 *
	 * @param options - The search options.
	 */
	public constructor(options?: TweetSearchOptions) {
		this.from = options?.from;
		this.to = options?.to;
		this.words = options?.words;
		this.phrase = options?.phrase;
		this.optionalWords = options?.optionalWords;
		this.excludeWords = options?.excludeWords;
		this.hashtags = options?.hashtags;
		this.list = options?.list;
		this.mentions = options?.mentions;
		this.minReplies = options?.minReplies;
		this.minLikes = options?.minLikes;
		this.minRetweets = options?.minRetweets;
		this.onlyLinks = options?.onlyLinks;
		this.onlyOriginal = options?.onlyOriginal;
		this.onlyReplies = options?.onlyReplies;
		this.onlyText = options?.onlyText;
		this.quoted = options?.quoted;
		this.start = options?.start;
		this.end = options?.end;
		this.stream = options?.stream;
		this.interval = options?.interval;
		this.top = options?.top;
	}

	/**
	 * Converts the filter options to a format recognizable by rettiwt-api.
	 *
	 * @returns The '{@link ITweetFilter}' representation of filter options.
	 */
	public toTweetFilter(): ITweetFilter {
		return new TweetFilter({
			fromUsers: this.from ? this.from.split(',') : undefined,
			toUsers: this.to ? this.to.split(',') : undefined,
			includeWords: this.words ? this.words.split(',') : undefined,
			includePhrase: this.phrase,
			optionalWords: this.optionalWords ? this.optionalWords.split(',') : undefined,
			excludeWords: this.excludeWords ? this.excludeWords.split(',') : undefined,
			hashtags: this.hashtags ? this.hashtags.split(',') : undefined,
			list: this.list,
			mentions: this.mentions ? this.mentions.split(',') : undefined,
			minReplies: this.minReplies,
			minLikes: this.minLikes,
			minRetweets: this.minRetweets,
			onlyLinks: this.onlyLinks,
			onlyOriginal: this.onlyOriginal,
			onlyReplies: this.onlyReplies,
			onlyText: this.onlyText,
			quoted: this.quoted,
			startDate: this.start ? new Date(this.start) : undefined,
			top: this.top,
			endDate: this.end ? new Date(this.end) : undefined,
		});
	}
}

export default createTweetCommand;
