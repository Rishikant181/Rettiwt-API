#! /usr/bin/env node

// PACKAGES
import { createCommand } from 'commander';

// SUB-COMMANDS
import tweet from './commands/Tweet';
import user from './commands/User';

// Creating a new commandline program
const program = createCommand('rettiwt').description('A CLI tool for accessing the Twitter API for free!');

// Adding sub-commands
program.addCommand(tweet);
program.addCommand(user);

// Finalizing the CLI
program.parse();
