import axios, { AxiosResponse } from 'axios';

import { Cookie } from 'cookiejar';

import { ApiErrors } from '../../enums/Api';
import { AuthCredential } from '../../models/auth/AuthCredential';
import { RettiwtConfig } from '../../models/RettiwtConfig';

/**
 * The services that handles authentication.
 *
 * @internal
 */
export class AuthService {
	/** The config object. */
	private readonly _config: RettiwtConfig;

	/**
	 * @param config - The config for Rettiwt.
	 */
	public constructor(config: RettiwtConfig) {
		this._config = config;
	}

	/**
	 * Splits the cookie header into a list of key=value pairs.
	 *
	 * @param cookieHeader - The value of the cookie header.
	 *
	 * @returns The list of key=value pairs in the cookies.
	 */
	private static _splitCookieHeader(cookieHeader: string | string[]): string[] {
		if (Array.isArray(cookieHeader)) {
			return cookieHeader;
		}

		return cookieHeader.split(/,(?=\s*[^;,]+=)/g);
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
	 * Gets a new API key from an HTTP response.
	 *
	 * @param response - The HTTP response received.
	 * @param config - The current Rettiwt config.
	 *
	 * @returns The new API key.
	 */
	public static getApiKeyFromReponse(response: AxiosResponse, config?: RettiwtConfig): string | undefined {
		// If new cookies not returned or user not authenticated, terminate
		if (response.headers['set-cookie'] === undefined || config?.apiKey === undefined) {
			return;
		}

		/** The collection of required cookie names. */
		const requiredCookieNames = new Set(['auth_token', 'ct0', 'kdt', 'twid']);

		/** The current cookie string. */
		const currentCookieString = AuthService.decodeCookie(config.apiKey);

		/** The cookie key=value pairs from the response. */
		const cookies = AuthService._splitCookieHeader(response.headers['set-cookie']);

		/** The map from cookie key to value. */
		const cookiesMap = new Map<string, string>();

		for (const cookieEntry of currentCookieString.split(';')) {
			const trimmedEntry = cookieEntry.trim();
			const separatorIndex = trimmedEntry.indexOf('=');

			if (!trimmedEntry || separatorIndex < 1) {
				continue;
			}

			const key = trimmedEntry.slice(0, separatorIndex).trim();
			const value = trimmedEntry.slice(separatorIndex + 1).trim();
			if (!key || !value || !requiredCookieNames.has(key)) {
				continue;
			}

			cookiesMap.set(key, value);
		}

		let hasUpdate = false;
		for (const cookie of cookies) {
			const cookieValuePair = cookie.split(';', 1)[0]?.trim();
			const separatorIndex = cookieValuePair?.indexOf('=') ?? -1;

			if (!cookieValuePair || separatorIndex < 1) {
				continue;
			}

			const key = cookieValuePair.slice(0, separatorIndex).trim();
			const value = cookieValuePair.slice(separatorIndex + 1).trim();
			if (!key || !value || !requiredCookieNames.has(key)) {
				continue;
			}

			cookiesMap.set(key, value);
			hasUpdate = true;
		}

		if (!hasUpdate || !cookiesMap.has('twid')) {
			return;
		}

		let mergedCookieString = '';
		for (const [key, value] of cookiesMap.entries()) {
			mergedCookieString += `${key}=${value};`;
		}

		if (!mergedCookieString) {
			return;
		}

		try {
			// Encoding the new cookies into an API key
			const newApiKey = AuthService.encodeCookie(mergedCookieString);

			return newApiKey;
		} catch {
			return;
		}
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
		const searchResults: string[] | null = cookieString.match(
			/((?<=twid="u=)(\d+)(?="))|((?<=twid=u%3D)(\d+)(?=;))/,
		);

		// If user id was found
		if (searchResults) {
			return searchResults[0];
		}
		// If user id was not found
		else {
			throw new Error(ApiErrors.BAD_AUTHENTICATION);
		}
	}

	/**
	 * Fetches a fresh CSRF from Twitter by making a lightweight
	 * authenticated request, then rotates the apiKey with the updated cookie.
	 *
	 * @param config - The current Rettiwt config.
	 */
	public static async refreshCsrfToken(config: RettiwtConfig): Promise<void> {
		// If unauthenticated, skip
		if (config.apiKey === undefined) {
			return;
		}

		try {
			const cred = new AuthCredential(
				AuthService.decodeCookie(config.apiKey)
					.split(';')
					.map((item) => new Cookie(item)),
			);

			const refreshResponse = await axios.get('https://x.com/i/api/1.1/account/verify_credentials.json', {
				headers: {
					...cred.toHeader(),
					authorization:
						'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
				},
				httpAgent: config.httpAgent,
				httpsAgent: config.httpsAgent,
				proxy: config.axiosProxyConfig,
				validateStatus: () => true,
			});

			// Getting the new API key
			const newApiKey = AuthService.getApiKeyFromReponse(refreshResponse, config);

			// If new API key is generated, update current API key
			if (newApiKey !== undefined) {
				config.apiKey = newApiKey;
			}
		} catch {
			// If ct0 refresh fails, leave apiKey as-is
			return;
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
	public async guest(): Promise<AuthCredential> {
		// Creating a new blank credential
		const cred: AuthCredential = new AuthCredential();

		// Getting the guest token
		await axios
			.post<{
				/* eslint-disable @typescript-eslint/naming-convention */
				guest_token: string;
				/* eslint-enable @typescript-eslint/naming-convention */
			}>('https://api.twitter.com/1.1/guest/activate.json', undefined, {
				headers: cred.toHeader(),
				httpAgent: this._config.httpAgent,
				httpsAgent: this._config.httpsAgent,
				proxy: this._config.axiosProxyConfig,
			})
			.then((res) => {
				cred.guestToken = res.data.guest_token;
			});

		return cred;
	}
}
