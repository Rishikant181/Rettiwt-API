import { RettiwtConfig } from './models/RettiwtConfig';
import { ListService } from './services/public/ListService';
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
	/** The configuration for Rettiwt. */
	private _config: RettiwtConfig;

	/** The instance used to fetch data related to lists. */
	public list: ListService;

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
		this._config = new RettiwtConfig(config);
		this.list = new ListService(this._config);
		this.tweet = new TweetService(this._config);
		this.user = new UserService(this._config);
	}

	/** Get the current API key associated with this instance. */
	public get apiKey(): string | undefined {
		return this._config.apiKey;
	}

	/** Set the API key for the current instance. */
	public set apiKey(apiKey: string | undefined) {
		this._config.apiKey = apiKey;
	}

	/** Set the custom headers for the current instance. */
	public set headers(headers: { [key: string]: string }) {
		this._config.headers = headers;
	}

	/** Set the proxy URL for the current instance. */
	public set proxyUrl(proxyUrl: URL) {
		this._config.proxyUrl = proxyUrl;
	}
}
