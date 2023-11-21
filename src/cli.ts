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
const rettiwt = new Rettiwt();

// Creating parent commands to structure sub-commands
const user = program.command('user').description('Command for accessing resources releated to users');
const tweet = program.command('tweet').description('Command for accessing resources releated to tweets');

// Sub-commands for 'tweet'
{
	// Details
	tweet
		.command('details')
		.argument('<id>', 'The id of the tweet whose details are to be fetched')
		.action(async (id: string) => {
			const details = await rettiwt.tweet.details(id);
			output(details);
		});
}

// Sub-commands for 'user'
{
	// Details
	user.command('details')
		.argument('<id>', 'The username/id of the Twitter user whose details are to be fetched')
		.action(async (id: string) => {
			const details = await rettiwt.user.details(id);
			output(details);
		});
}

// Finalizing the CLI
program.parse();
