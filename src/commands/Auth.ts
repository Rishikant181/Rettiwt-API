import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'auth' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'auth' command.
 */
function createAuthCommand(rettiwt: Rettiwt): Command {
	// Creating the 'auth' command
	const auth = createCommand('auth').description('Manage authentication');

	// Login
	auth.command('login')
		.description('Generate a new API key using Twitter account login credentials')
		.argument('<email>', 'The email id of the Twitter account')
		.argument('<username>', 'The username associated with the Twitter account')
		.argument('<password>', 'The password to the Twitter account')
		.action(async (email: string, username: string, password: string) => {
			try {
				const apiKey: string = await rettiwt.auth.login(email, username, password);
				output(apiKey);
			} catch (error) {
				output(error);
			}
		});

	// Guest
	auth.command('guest')
		.description('Generate a new guest key')
		.action(async () => {
			try {
				const guestKey: string = await rettiwt.auth.guest();
				output(guestKey);
			} catch (error) {
				output(error);
			}
		});

	return auth;
}

export default createAuthCommand;
