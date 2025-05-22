import { Cookie } from 'cookiejar';

import { IAuthCookie } from '../../types/auth/AuthCookie';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 *
 * @internal
 */
export class AuthCookie implements IAuthCookie {
	/* eslint-disable @typescript-eslint/naming-convention */

	public auth_token: string;
	public ct0: string;
	public kdt: string;
	public twid: string;

	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param cookies - The cookie list obtained from the browser.
	 */
	public constructor(cookies: Cookie[]) {
		// Initializing defaults
		this.auth_token = '';
		this.ct0 = '';
		this.kdt = '';
		this.twid = '';

		// Parsing the cookies
		for (const cookie of cookies) {
			if (cookie.name == 'kdt') {
				this.kdt = cookie.value;
			} else if (cookie.name == 'twid') {
				this.twid = cookie.value;
			} else if (cookie.name == 'ct0') {
				this.ct0 = cookie.value;
			} else if (cookie.name == 'auth_token') {
				this.auth_token = cookie.value;
			}
		}
	}

	/**
	 * @returns the string representation of 'this' object.
	 */
	public toString(): string {
		/** The string representation of 'this' object. */
		let outStr = '';

		// Iterating through the (key, value) pairs of this cookie
		for (const [key, value] of Object.entries(this)) {
			outStr += `${key}=${value as string};`;
		}

		return outStr;
	}
}
