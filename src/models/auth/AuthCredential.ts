import { AxiosHeaders, AxiosRequestHeaders } from 'axios';

import { Cookie } from 'cookiejar';

import { EAuthenticationType } from '../../enums/Authentication';
import { IAuthCredential } from '../../types/auth/AuthCredential';

import { AuthCookie } from './AuthCookie';

/**
 * The credentials for authenticating against Twitter.
 *
 * Depending on which tokens are present, the authentication type is determined as follows:
 * - authToken, guestToken =\> Guest authentication.
 * - authToken, csrfToken, cookie =\> User authentication.
 * - authToken, guestToken, cookie =\> Guest authentication while logging in.
 *
 * @internal
 */
export class AuthCredential implements IAuthCredential {
	public authToken?: string;
	public authenticationType?: EAuthenticationType;
	public cookies?: string;
	public csrfToken?: string;
	public guestToken?: string;

	/**
	 * @param cookies - The list of cookies to be used for authenticating against Twitter.
	 * @param guestToken - The guest token to be used to authenticate a guest session.
	 */
	public constructor(cookies?: Cookie[], guestToken?: string) {
		this.authToken =
			'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
		// If guest credentials given
		if (!cookies && guestToken) {
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.GUEST;
		}
		// If login credentials given
		else if (cookies && guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.LOGIN;
		}
		// If user credentials given
		else if (cookies && !guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.csrfToken = parsedCookie.ct0;
			this.authenticationType = EAuthenticationType.USER;
		}
	}

	/**
	 * @returns The HTTP header representation of 'this' object.
	 */
	public toHeader(): AxiosRequestHeaders {
		const headers = new AxiosHeaders();

		/**
		 * Conditionally initializing only those data which are supplied.
		 *
		 * This is done to ensure that the data that is not supplied, is not included in output, not even undefined.
		 */
		if (this.authToken) {
			headers.set('authorization', `Bearer ${this.authToken}`);
		}
		if (this.guestToken) {
			headers.set('x-guest-token', this.guestToken);
		}
		if (this.csrfToken) {
			headers.set('x-csrf-token', this.csrfToken);
		}
		if (this.cookies) {
			headers.set('cookie', this.cookies);
		}

		return headers;
	}
}
