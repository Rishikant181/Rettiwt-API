// PACKAGE
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { UserService } from './services/UserService';
import { TweetService } from './services/TweetService';

/**
 * The class for fetching data from Twitter.
 *
 * @param apiKey The API key (cookie string) to use for fetching data.
 * @returns The API for fetching user and tweet data.
 *
 * @public
 */
export class Rettiwt {
	/** The instance used to fetch data related to users. */
	users: UserService;

	/** The instance used to fetch data related to tweets. */
	tweets: TweetService;

	constructor(apiKey: string) {
		// Preparing auth credentials
		const cred: AuthCredential = new AuthCredential(apiKey.split(';'));

		// Initalizing service instances
		this.users = new UserService(cred);
		this.tweets = new TweetService(cred);
	}
}
