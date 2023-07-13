// PACKAGE
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { TweetService } from './services/TweetService';
import { UserService } from './services/UserService';

/**
 * The class for fetching data from Twitter.
 *
 * @param apiKey The API key (cookie string) to use for fetching data.
 * @returns The API for fetching user and tweet data.
 *
 * @public
 */
export class Rettiwt {
	/** The instance used to fetch data related to tweets. */
	tweet: TweetService;

	/** The instance used to fetch data related to users. */
	user: UserService;

	/**
	 * Initializes a new Rettiwt instance using the given api key.
	 * 
	 * @param apiKey The apiKey (cookie) to be used for authenticating Rettiwt against Twitter.
	 */
	constructor(apiKey: string) {
		// Preparing auth credentials
		const cred: AuthCredential = new AuthCredential(apiKey.split(';'));

		// Initalizing service instances
		this.tweet = new TweetService(cred);
		this.user = new UserService(cred);
	}
}
