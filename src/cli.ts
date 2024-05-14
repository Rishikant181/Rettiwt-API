#! /usr/bin/env node

import { createCommand } from 'commander';

import auth from './commands/Auth';
import tweet from './commands/Tweet';
import user from './commands/User';
import { Rettiwt } from './Rettiwt';

// Creating a new commandline program
const program = createCommand('rettiwt')
	.description('A CLI tool for accessing the Twitter API for free!')
	.passThroughOptions()
	.enablePositionalOptions();

// Adding options
program
	.option('-k, --key <string>', 'The API key to use for authentication')
	.option('-l, --log', 'Enable logging to console')
	.option('-p, --proxy <string>', 'The URL to the proxy to use')
	.option('-t, --timeout <number>', 'The timout (in milli-seconds) to use for requests');

// Parsing the program to get supplied options
program.parse();

// Initializing Rettiwt instance using the given options
const rettiwt: Rettiwt = new Rettiwt({
	apiKey: process.env.API_KEY ?? (program.opts().key as string),
	logging: program.opts().log ? true : false,
	proxyUrl: program.opts().proxy as URL,
	timeout: program.opts().timeout ? Number(program.opts().timeout) : undefined,
});

// Adding sub-commands
program.addCommand(tweet(rettiwt));
program.addCommand(user(rettiwt));
program.addCommand(auth(rettiwt));

// Finalizing the CLI
program.parse();
