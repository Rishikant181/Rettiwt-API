// PACKAGES
import { Command, createCommand } from 'commander';
import { Auth } from 'rettiwt-auth';

// UTILITY
import { output } from '../helper/CliUtils';

function createAuthCommand(): Command {
	// Creating the 'auth' command
	const auth = createCommand('auth').description('Manage authentication');

	// Generate
	auth.command('generate')
		.description('Generate a new API key using Twitter account credentials')
		.argument('<email>', 'The email id of the Twitter account')
		.argument('<username>', 'The username associated with the Twitter account')
		.argument('<password>', 'The password to the Twitter account')
		.action(async (email: string, username: string, password: string) => {
			// Logging in and getting the credentials
			let apiKey: string =
				(
					await new Auth().getUserCredential({ email: email, userName: username, password: password })
				).toHeader().cookie ?? '';

			// Converting the credentials to base64 string
			apiKey = Buffer.from(apiKey).toString('base64');
			output(apiKey);
		});

	return auth;
}

export default createAuthCommand;
