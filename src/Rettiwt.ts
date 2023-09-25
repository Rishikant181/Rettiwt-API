// SERVICES
import { TweetService } from './services/TweetService';
import { UserService } from './services/UserService';

/**
 * The class for fetching data from Twitter.
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
	 * @param apiKey - The apiKey (cookie) to use for authenticating Rettiwt against Twitter API.
	 * @param proxyUrl - Optional URL with proxy configuration to use for requests to Twitter API.
	 */
	constructor(apiKey: string, proxyUrl?: URL) {
		this.tweet = new TweetService(apiKey, proxyUrl);
		this.user = new UserService(apiKey, proxyUrl);
	}
}
