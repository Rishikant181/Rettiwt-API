// PACKAGES
import { Command, createCommand } from 'commander';
import { Rettiwt } from '../Rettiwt';
import { TweetFilter } from 'rettiwt-core';

// UTILITY
import { output } from '../helper/CliUtils';

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
			const details = await rettiwt.tweet.details(id);
			output(details);
		});

	// Search
	tweet
		.command('search')
		.description('Fetch the list of tweets that match the given filter options')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.option('-f, --from <string>', "Matches the tweets made by list of given users, separated by ';'")
		.option('-t, --to <string>', "Matches the tweets made to the list of given users, separated by ';'")
		.option('-w, --words <string>', "Matches the tweets containing the given list of words, separated by ';'")
		.option('-p, --phrase <string>', 'Matches the tweets containing the exact phrase')
		.option(
			'--optional-words <string>',
			"Matches the tweets containing any of the given list of words, separated by ';'",
		)
		.option(
			'--exclude-words <string>',
			"Matches the tweets that do not contain any of the give list of words, separated by ';'",
		)
		.option('-h, --hashtags <string>', "Matches the tweets containing the given list of hashtags, separated by ';'")
		.option(
			'-m',
			'--mentions <string>',
			"Matches the tweets that mention the give list of usernames, separated by ';'",
		)
		.option('-r, --min-replies <number>', 'Matches the tweets that have a minimum of given number of replies')
		.option('-l, --min-likes <number>', 'Matches the tweets that have a minimum of given number of likes')
		.option('-x, --min-retweets <number>', 'Matches the tweets that have a minimum of given number of retweets')
		.option('-q, --quoted <string>', 'Matches the tweets that quote the tweet with the given id')
		.option('--exclude-links', 'Matches tweets that do not contain links')
		.option('--exclude-replies', 'Matches the tweets that are not replies')
		.option('-s, --start <string>', 'Matches the tweets made since the given date (valid date string)')
		.option('-e, --end <string>', 'Matches the tweets made upto the given date (valid date string)')
		.action(async (count?: string, cursor?: string, options?: TweetSearchOptions) => {
			const tweets = await rettiwt.tweet.search(
				new TweetSearchOptions(options).toTweetFilter(),
				count ? parseInt(count) : undefined,
				cursor,
			);
			output(tweets);
		});

	// List
	tweet
		.command('list')
		.description('Fetch the list of tweets in the tweet list with the given id')
		.argument('<id>', 'The id of the tweet list')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			const tweets = await rettiwt.tweet.list(id, count ? parseInt(count) : undefined, cursor);
			output(tweets);
		});

	// Likes
	tweet
		.command('likes')
		.description('Fetch the list of users who liked the given tweets')
		.argument('<id>', 'The id of the tweet')
		.argument('[count]', 'The number of likers to fetch')
		.argument('[cursor]', 'The cursor to the batch of likers to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			const tweets = await rettiwt.tweet.favoriters(id, count ? parseInt(count) : undefined, cursor);
			output(tweets);
		});

	// Retweets
	tweet
		.command('retweets')
		.description('Fetch the list of users who retweeted the given tweets')
		.argument('<id>', 'The id of the tweet')
		.argument('[count]', 'The number of retweeters to fetch')
		.argument('[cursor]', 'The cursor to the batch of retweeters to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			const tweets = await rettiwt.tweet.retweeters(id, count ? parseInt(count) : undefined, cursor);
			output(tweets);
		});

	// Post
	tweet
		.command('post')
		.description('Post a tweet (text only)')
		.argument('<text>', 'The text to post as a tweet')
		.action(async (text: string) => {
			const result = await rettiwt.tweet.tweet(text);
			output(result);
		});

	// Like
	tweet
		.command('like')
		.description('Like a tweet')
		.argument('<id>', 'The tweet to like')
		.action(async (id: string) => {
			const result = await rettiwt.tweet.favorite(id);
			output(result);
		});

	// Retweet
	tweet
		.command('retweet')
		.description('Retweet a tweet')
		.argument('<id>', 'The tweet to retweet')
		.action(async (id: string) => {
			const result = await rettiwt.tweet.retweet(id);
			output(result);
		});

	return tweet;
}

/**
 * The search options supplied while searching for tweets.
 *
 * @remarks The search options are implementations of the ones offered by {@link TweetFilter}
 */
class TweetSearchOptions {
	/* eslint-disable @typescript-eslint/naming-convention */
	public from?: string;
	public to?: string;
	public words?: string;
	public phrase?: string;
	public 'optional-words'?: string;
	public 'exclude-words'?: string;
	public hashtags?: string;
	public mentions?: string;
	public 'min-replies'?: number;
	public 'min-likes'?: number;
	public 'min-retweets'?: number;
	public quoted?: string;
	public 'exclude-links'?: boolean;
	public 'exclude-replies'?: boolean;
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
		this.phrase = options?.phrase;
		this['optional-words'] = options?.['optional-words'];
		this['exclude-words'] = options?.['exclude-words'];
		this.hashtags = options?.hashtags;
		this.mentions = options?.mentions;
		this['min-replies'] = options?.['min-replies'];
		this['min-likes'] = options?.['min-likes'];
		this['min-retweets'] = options?.['min-retweets'];
		this.quoted = options?.quoted;
		this['exclude-links'] = options?.['exclude-links'];
		this['exclude-replies'] = options?.['exclude-replies'];
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
			includeWords: this.words ? this.words.split(';') : undefined,
			includePhrase: this.phrase,
			optionalWords: this['optional-words'] ? this['optional-words'].split(';') : undefined,
			excludeWords: this['exclude-words'] ? this['exclude-words'].split(';') : undefined,
			hashtags: this.hashtags ? this.hashtags.split(';') : undefined,
			mentions: this.mentions ? this.mentions.split(';') : undefined,
			minReplies: this['min-replies'],
			minLikes: this['min-likes'],
			minRetweets: this['min-retweets'],
			quoted: this.quoted,
			links: !this['exclude-links'],
			replies: !this['exclude-replies'],
			startDate: this.start ? new Date(this.start) : undefined,
			endDate: this.end ? new Date(this.end) : undefined,
		});
	}
}

export default createTweetCommand;
