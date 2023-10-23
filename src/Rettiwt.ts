// SERVICES
import { TweetService } from './services/public/TweetService';
import { UserService } from './services/public/UserService';

// MODELS
import { RettiwtConfig } from './models/internal/RettiwtConfig';

/**
 * The class for fetching data from Twitter.
 *
 * @public
 */
export class Rettiwt {
	/** The instance used to fetch data related to tweets. */
	public tweet: TweetService;

	/** The instance used to fetch data related to users. */
	public user: UserService;

	/**
	 * Initializes a new Rettiwt instance using the given api key.
	 *
	 * @param config - The config object for configuring the Rettiwt instance.
	 */
	public constructor(config?: RettiwtConfig) {
		this.tweet = new TweetService(config);
		this.user = new UserService(config);
	}
}
