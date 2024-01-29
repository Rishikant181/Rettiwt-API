// PACKAGES
import { Command, createCommand } from 'commander';
import { Auth } from 'rettiwt-auth';

// UTILITY
import { output } from '../helper/CliUtils';

function createAuthCommand(): Command {
	// Creating the 'auth' command
	const auth = createCommand('auth').description('Manage authentication');

	// Login
	auth.command('login')
		.description('Generate a new API key using Twitter account login credentials')
		.argument('<email>', 'The email id of the Twitter account')
		.argument('<username>', 'The username associated with the Twitter account')
		.argument('<password>', 'The password to the Twitter account')
		.action(async (email: string, username: string, password: string) => {
			// Logging in and getting the credentials
			let apiKey: string =
				((
					await new Auth().getUserCredential({ email: email, userName: username, password: password })
				).toHeader().cookie as string) ?? '';

			// Converting the credentials to base64 string
			apiKey = Buffer.from(apiKey).toString('base64');
			output(apiKey);
		});

	// Guest
	auth.command('guest')
		.description('Generate a new guest API key')
		.action(async () => {
			// Getting a new guest API key
			let guestKey: string = (await new Auth().getGuestCredential()).guestToken ?? '';

			// Converting the credentials to base64 string
			guestKey = Buffer.from(guestKey).toString('base64');
			output(guestKey);
		});

	return auth;
}

export default createAuthCommand;
