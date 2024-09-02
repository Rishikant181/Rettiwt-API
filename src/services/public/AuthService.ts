import { Auth } from 'rettiwt-auth';

import { EApiErrors } from '../../enums/Api';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

import { FetcherService } from './FetcherService';

/**
 * The services that handles authentication.
 *
 * @public
 */
export class AuthService extends FetcherService {
	/**
	 * @param config - The config object for configuring the `Rettiwt` instance.
	 *
	 * @internal
	 */
	public constructor(config?: IRettiwtConfig) {
		super(config);
	}

	/**
	 * Decodes the encoded cookie string.
	 *
	 * @param encodedCookies - The encoded cookie string to decode.
	 * @returns The decoded cookie string.
	 */
	public static decodeCookie(encodedCookies: string): string {
		// Decoding the encoded cookie string
		const decodedCookies: string = Buffer.from(encodedCookies, 'base64').toString('ascii');

		return decodedCookies;
	}

	/**
	 * Encodes the given cookie string.
	 *
	 * @param cookieString - The cookie string to encode.
	 * @returns The encoded cookie string.
	 */
	public static encodeCookie(cookieString: string): string {
		// Encoding the cookie string to base64
		const encodedCookies: string = Buffer.from(cookieString).toString('base64');

		return encodedCookies;
	}

	/**
	 * Gets the user's id from the given API key.
	 *
	 * @param apiKey - The API key.
	 * @returns The user id associated with the API key.
	 */
	public static getUserId(apiKey: string): string {
		// Getting the cookie string from the API key
		const cookieString: string = AuthService.decodeCookie(apiKey);

		// Searching for the user id in the cookie string
		const searchResults: string[] | null = cookieString.match(/((?<=twid="u=)(.*)(?="))|((?<=twid=u%3D)(.*)(?=;))/);

		// If user id was found
		if (searchResults) {
			return searchResults[0];
		}
		// If user id was not found
		else {
			throw new Error(EApiErrors.BAD_AUTHENTICATION);
		}
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

	/**
	 * Login to twitter using account credentials.
	 *
	 * @param email - The email id associated with the Twitter account.
	 * @param userName - The username associated with the Twitter account.
	 * @param password - The password to the Twitter account.
	 *
	 * @returns The `API_KEY` for the Twitter account.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance
	 * const rettiwt = new Rettiwt();
	 *
	 * // Logging in an getting the API_KEY
	 * rettiwt.auth.login("email@domain.com", "username", "password")
	 * .then(apiKey => {
	 * 	// Use the API_KEY
	 * 	...
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 * Interchanging `email` and `userName` works too.
	 */
	public async login(email: string, userName: string, password: string): Promise<string> {
		// Logging in and getting the credentials
		let apiKey: string =
			((
				await new Auth({ proxyUrl: this.authProxyUrl }).getUserCredential({
					email: email,
					userName: userName,
					password: password,
				})
			).toHeader().cookie as string) ?? '';

		// Converting the credentials to base64 string
		apiKey = AuthService.encodeCookie(apiKey);

		return apiKey;
	}
}
