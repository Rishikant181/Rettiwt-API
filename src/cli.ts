#! /usr/bin/env node

import { createCommand } from 'commander';

import community from './commands/Community';
import dm from './commands/DirectMessage';
import list from './commands/List';
import space from './commands/Space';
import tweet from './commands/Tweet';
import user from './commands/User';
import { Rettiwt } from './Rettiwt';

// Creating a new commandline program
const Program = createCommand('rettiwt')
	.description('A CLI tool for accessing the Twitter API for free!')
	.passThroughOptions()
	.enablePositionalOptions();

// Adding options
Program.option('-k, --key <string>', 'The API key to use for authentication')
	.option('-l, --log', 'Enable logging to console')
	.option('-p, --proxy <string>', 'The URL to the proxy to use')
	.option('-t, --timeout <number>', 'The timout (in milli-seconds) to use for requests')
	.option(
		'-r, --retries <number>',
		'The maximum number of retries to use, a value of 5 combined with a delay of 1000 is recommended',
	)
	.option('-d, --delay <number>', 'The delay in milliseconds to use in-between successive requests');

// Parsing the program to get supplied options
Program.parse();

// Initializing Rettiwt instance using the given options
const RettiwtInstance = new Rettiwt({
	apiKey: process.env.API_KEY ?? (Program.opts().key as string),
	logging: Program.opts().log ? true : false,
	proxy: Program.opts().proxy as string,
	timeout: Program.opts().timeout ? Number(Program.opts().timeout) : undefined,
	maxRetries: Program.opts().retries as number,
	delay: Program.opts().delay as number,
});

// Adding sub-commands
Program.addCommand(community(RettiwtInstance));
Program.addCommand(dm(RettiwtInstance));
Program.addCommand(list(RettiwtInstance));
Program.addCommand(space(RettiwtInstance));
Program.addCommand(tweet(RettiwtInstance));
Program.addCommand(user(RettiwtInstance));

// Finalizing the CLI
Program.parse();
