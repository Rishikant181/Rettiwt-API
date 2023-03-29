// TYPES
import { AuthCookie as IAuthCookie } from '../../types/Authentication';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 * 
 * @internal
 */
export class AuthCookie implements IAuthCookie {
    /** Token used to authenticate a device. */
    kdt: string;

    /** Token used to authenticate a user using a Twitter ID. */
    twid: string;

    /** The CSRF token of the session. */
    ct0: string;

    /** The authentication token used while logging in to the account. */
    auth_token: string;

    constructor(cookie?: IAuthCookie) {
        this.auth_token = cookie?.auth_token ?? '';
        this.ct0 = cookie?.ct0 ?? '';
        this.kdt = cookie?.kdt ?? '';
        this.twid = cookie?.twid ?? '';
    }

    /**
     * @returns The string respresentation of this cookie in the valid cookie string format.
     */
    toString(): string {
        /** The string representation of this cookie. */
        let cookieString: string = '';
        
        // Iterating through the (key, value) pairs of this cookie
        for (let [key, value] of Object.entries(this)) {
            cookieString += `${key}=${value};`;
        }

        return cookieString;
    }
}