#! /usr/bin/env node

// PACKAGES
import { Command } from 'commander';
import { Rettiwt } from '.';

// Creating a new commandline program
const program = new Command();

// Setting program details
program.name('rettiwt').description('A CLI tool for fetching data from Twitter for free!');

// Initializing Rettiwt instance
const rettiwt = new Rettiwt();

/**
 * USER commands
 */
const user = program.command('user').description('Command for accessing resources releated to users');

user.command('details')
	.argument('<username>', 'The username of the Twitter user whose details are to be fetched')
	.action(async (username: string) => {
		const details = await rettiwt.user.details(username);
		console.log(details);
	});

// Finalizing the CLI
program.parse();
