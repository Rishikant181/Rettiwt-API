import { AuthService } from './services/public/AuthService';
import { TweetService } from './services/public/TweetService';
import { UserService } from './services/public/UserService';
import { IRettiwtConfig } from './types/RettiwtConfig';

/**
 * The class for accessing Twitter API.
 *
 * The created Rettiwt instance can be configured by passing in a configuration object to the constructor.
 *
 * For details regarding the available configuration options, refer to {@link IRettiwtConfig}
 *
 * @example Creating a Rettiwt instance with 'guest' authentication:
 * ```
 * import { Rettiwt } from 'rettiwt-api';
 *
 * // Creating a new Rettiwt instance
 * const rettiwt = new Rettiwt();
 * ```
 *
 * @example Creating a Rettiwt instance with 'guest' authentication, using a pre-generated guest key:
 * ```
 * import { Rettiwt } from 'rettiwt-api';
 *
 * // Creating a new Rettiwt instance
 * const rettiwt = new Rettiwt({ guestKey: 'GUEST_KEY' });
 * ```
 *
 * @example Creating a Rettiwt instance with 'user' authentication:
 * ```
 * import { Rettiwt } from 'rettiwt-api';
 *
 * // Creating a new Rettiwt instance
 * const rettiwt = new Rettiwt({ apiKey: 'API_KEY' });
 * ```
 *
 * @example Creating a Rettiwt instance with 'user'authentication, along with enabling debug logs and using a proxy:
 * ```
 * import { Rettiwt } from 'rettiwt-api';
 *
 * // Creating a new Rettiwt instance
 * const rettiwt = new Rettiwt({ apiKey: 'API_KEY', logging: true, proxyUrl: 'URL_TO_PROXY_SERVER' });
 * ```
 *
 * @public
 */
export class Rettiwt {
	/** The instance used to authenticate. */
	public auth: AuthService;

	/** The instance used to fetch data related to tweets. */
	public tweet: TweetService;

	/** The instance used to fetch data related to users. */
	public user: UserService;

	/**
	 * Initializes a new Rettiwt instance using the given api key.
	 *
	 * @param config - The config object for configuring the Rettiwt instance.
	 */
	public constructor(config?: IRettiwtConfig) {
		this.auth = new AuthService(config);
		this.tweet = new TweetService(config);
		this.user = new UserService(config);
	}
}
