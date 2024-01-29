// PACKAGES
import { Command, createCommand } from 'commander';
import { Rettiwt } from '../Rettiwt';

// UTILITY
import { output } from '../helper/CliUtils';

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
			const apiKey: string = await rettiwt.auth.login(email, username, password);
			output(apiKey);
		});

	// Guest
	auth.command('guest')
		.description('Generate a new guest key')
		.action(async () => {
			const guestKey: string = await rettiwt.auth.guest();
			output(guestKey);
		});

	return auth;
}

export default createAuthCommand;
