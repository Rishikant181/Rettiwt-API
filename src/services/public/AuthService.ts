// PACKAGES
import { AccountCredential, Auth } from 'rettiwt-auth';

// SERVICES
import { FetcherService } from '../internal/FetcherService';

// TYPES
import { IRettiwtConfig } from '../../types/RettiwtConfig';

/**
 * Handles authentication.
 *
 * @public
 */
export class AuthService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config?: IRettiwtConfig) {
		super(config);
	}

	/**
	 * Login to twitter using account credentials.
	 *
	 * @param cred - The credentials of the Twitter account to be logged into.
	 * @returns The API_KEY for the Twitter account.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance
	 * const rettiwt = new Rettiwt();
	 *
	 * // Logging in an getting the API_KEY
	 * rettiwt.auth.login({ email: "email@domain.com", userName: "username", password: "password" })
	 * .then(apiKey => {
	 * 	// Use the API_KEY
	 * 	...
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async login(cred: AccountCredential): Promise<string> {
		// Logging in and getting the credentials
		let apiKey: string =
			((await new Auth({ proxyUrl: this.authProxyUrl }).getUserCredential(cred)).toHeader().cookie as string) ??
			'';

		// Converting the credentials to base64 string
		apiKey = Buffer.from(apiKey).toString('base64');

		return apiKey;
	}

	/**
	 * Login to twitter as guest.
	 *
	 * @returns A new guest key.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance
	 * const rettiwt = new Rettiwt();
	 *
	 * // Logging in an getting a new guest key
	 * rettiwt.auth.guest()
	 * .then(guestKey => {
	 * 	// Use the guest key
	 * 	...
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async guest(): Promise<string> {
		// Getting a new guest key
		const guestKey: string = (await new Auth().getGuestCredential()).guestToken ?? '';

		return guestKey;
	}
}
