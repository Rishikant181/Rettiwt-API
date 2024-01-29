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
	 * @returns A new guest API_KEY.
	 */
	public async guest(): Promise<string> {
		// Getting a new guest API key
		const guestKey: string = (await new Auth().getGuestCredential()).guestToken ?? '';

		return guestKey;
	}
}
