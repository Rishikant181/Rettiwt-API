import { Command, createCommand } from 'commander';
import { TweetFilter } from 'rettiwt-core';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'tweet' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'tweet' command.
 */
function createTweetCommand(rettiwt: Rettiwt): Command {
	// Creating the 'tweet' command
	const tweet = createCommand('tweet').description('Access resources releated to tweets');

	// Details
	tweet
		.command('details')
		.description('Fetch the details of tweet with the given id')
		.argument('<id>', 'The id of the tweet whose details are to be fetched')
		.action(async (id: string) => {
			try {
				const details = await rettiwt.tweet.details(id);
				output(details);
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

	// List
	tweet
		.command('list')
		.description('Fetch the list of tweets in the tweet list with the given id')
		.argument('<id>', 'The id of the tweet list')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.tweet.list(id, count ? parseInt(count) : undefined, cursor);
				output(tweets);
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
				const tweets = await rettiwt.tweet.retweeters(id, count ? parseInt(count) : undefined, cursor);
				output(tweets);
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
		.option(
			'-m, --mentions <string>',
			'Matches the tweets that mention the given comma-separated list of usernames',
		)
		.option('-r, --min-replies <number>', 'Matches the tweets that have a minimum of given number of replies')
		.option('-l, --min-likes <number>', 'Matches the tweets that have a minimum of given number of likes')
		.option('-x, --min-retweets <number>', 'Matches the tweets that have a minimum of given number of retweets')
		.option('-q, --quoted <string>', 'Matches the tweets that quote the tweet with the given id')
		.option('--exclude-links', 'Matches tweets that do not contain links')
		.option('--exclude-replies', 'Matches the tweets that are not replies')
		.option('-s, --start <string>', 'Matches the tweets made since the given date (valid date/time string)')
		.option('-e, --end <string>', 'Matches the tweets made upto the given date (valid date/time string)')
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
	public excludeLinks?: boolean = false;
	public excludeReplies?: boolean = false;
	public excludeWords?: string;
	public from?: string;
	public hashtags?: string;
	public interval?: number;
	public mentions?: string;
	public minLikes?: number;
	public minReplies?: number;
	public minRetweets?: number;
	public optionalWords?: string;
	public phrase?: string;
	public quoted?: string;
	public start?: string;
	public stream?: boolean;
	public to?: string;
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
		this.mentions = options?.mentions;
		this.minReplies = options?.minReplies;
		this.minLikes = options?.minLikes;
		this.minRetweets = options?.minRetweets;
		this.quoted = options?.quoted;
		this.excludeLinks = options?.excludeLinks;
		this.excludeReplies = options?.excludeReplies;
		this.start = options?.start;
		this.end = options?.end;
		this.stream = options?.stream;
		this.interval = options?.interval;
	}

	/**
	 * Converts the filter options to a format recognizable by rettiwt-api.
	 *
	 * @returns The '{@link TweetFilter}' representation of filter options.
	 */
	public toTweetFilter(): TweetFilter {
		return new TweetFilter({
			fromUsers: this.from ? this.from.split(',') : undefined,
			toUsers: this.to ? this.to.split(',') : undefined,
			includeWords: this.words ? this.words.split(',') : undefined,
			includePhrase: this.phrase,
			optionalWords: this.optionalWords ? this.optionalWords.split(',') : undefined,
			excludeWords: this.excludeWords ? this.excludeWords.split(',') : undefined,
			hashtags: this.hashtags ? this.hashtags.split(',') : undefined,
			mentions: this.mentions ? this.mentions.split(',') : undefined,
			minReplies: this.minReplies,
			minLikes: this.minLikes,
			minRetweets: this.minRetweets,
			quoted: this.quoted,
			links: !this.excludeLinks,
			replies: !this.excludeReplies,
			startDate: this.start ? new Date(this.start) : undefined,
			endDate: this.end ? new Date(this.end) : undefined,
		});
	}
}

export default createTweetCommand;
