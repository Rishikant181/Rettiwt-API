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
		.option('-h, --hashtags <string>', "Matches the tweets containing the given list of hashtags, separated by ';'")
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

export default createTweetCommand;
