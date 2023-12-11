#! /usr/bin/env node

// PACKAGES
import { createCommand } from 'commander';
import { Rettiwt } from './Rettiwt';

// SUB-COMMANDS
import tweet from './commands/Tweet';
import user from './commands/User';

// Creating a new commandline program
const program = createCommand('rettiwt').description('A CLI tool for accessing the Twitter API for free!');

// Initializing Rettiwt instance
const rettiwt: Rettiwt = new Rettiwt({ apiKey: process.env.API_KEY });

// Adding sub-commands
program.addCommand(tweet(rettiwt));
program.addCommand(user(rettiwt));

// Finalizing the CLI
program.parse();
