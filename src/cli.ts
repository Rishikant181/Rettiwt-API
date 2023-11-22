#! /usr/bin/env node

// PACKAGES
import { Command } from 'commander';
import { Rettiwt } from '.';
import { output } from './helper/CliUtils';

// Creating a new commandline program
const program = new Command();

// Setting program details
program.name('rettiwt').description('A CLI tool for fetching data from Twitter for free!');

// Initializing Rettiwt instance
const rettiwt = new Rettiwt({ apiKey: process.env.API_KEY });

// Creating parent commands to structure sub-commands
const user = program.command('user').description('Command for accessing resources releated to users');
const tweet = program.command('tweet').description('Command for accessing resources releated to tweets');

// Sub-commands for 'tweet'
{
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
		.argument('[count]', 'The number of items to fetch')
		.argument('[cursor]', 'The cursor to the batch of items to fetch')
		.option('-f, --from <string>', "Matches the tweets made by list of given users, separated by ';'")
		.option('-t, --to <string>', "Matches the tweets made to the list of given users, separated by ';'")
		.option('-w, --words <string>', "Matches the tweets containing the given list of words, separated by ';'")
		.option('-h, --hashtags <string>', "Matches the tweets containing the given list of hashtags, separated by ';'")
		.option('-s, --start <string>', 'Matches the tweets made since the given date')
		.option('-e, --end <string>', 'Matches the tweets made upto the given date')
		.action(
			async (
				count?: string,
				cursor?: string,
				options?: { from: string; to: string; words: string; hashtags: string; start: string; end: string },
			) => {
				const tweets = await rettiwt.tweet.search(
					{
						fromUsers: options?.from ? options?.from.split(';') : undefined,
						toUsers: options?.to ? options?.to.split(';') : undefined,
						words: options?.words ? options?.words.split(';') : undefined,
						hashtags: options?.hashtags ? options?.hashtags.split(';') : undefined,
						startDate: options?.start ? new Date(options.start) : undefined,
						endDate: options?.end ? new Date(options.end) : undefined,
					},
					count ? parseInt(count) : undefined,
					cursor,
				);
				output(tweets);
			},
		);
}

// Sub-commands for 'user'
{
	// Details
	user.command('details')
		.description('Fetch the details of the user with the given id/username')
		.argument('<id>', 'The username/id of the user whose details are to be fetched')
		.action(async (id: string) => {
			const details = await rettiwt.user.details(id);
			output(details);
		});
}

// Finalizing the CLI
program.parse();
