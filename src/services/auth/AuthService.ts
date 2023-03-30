// PACKAGE
import axios from 'axios';

// URLS
import { guestTokenUrl } from '../helper/urls/Authentication';

// MODELS
import { AuthCookie } from '../../models/auth/AuthCookie';

// TYPES
import { GuestCredentials as IGuestCredentials, AuthCredentials as IAuthCredentials } from '../../types/Authentication';

// CONFIGS
import { config } from '../../config/env';

/**
 * Handles authentication of http requests and other authentication related tasks.
 * 
 * @internal
 */
export class AuthService {
    /** The common bearer token for authentication. */
    private authToken: string;

    /** The current authentication credentials. */
    private credentials: IAuthCredentials;

    /** Whether instance has been authenticated or not. */
    public isAuthenticated: boolean;

    /**
     * @param cookie The cookie to be used for authenticating.
     * 
     * @remarks
     * 
     * If no cookie is supplied, then guest authentication is used.
     */
    constructor(cookie?: AuthCookie) {
        // Reading the auth token from the config, since it's always the same
        this.authToken = config.twitter_auth_token;

        // Setting authentication status
        this.isAuthenticated = (cookie?.auth_token && cookie?.ct0 && cookie?.kdt && cookie?.twid) ? true : false;

        // If a cookies is supplied, initializing authenticated credentials
        if (this.isAuthenticated) {
            // Converting the cookie from JSON to object
            cookie = new AuthCookie(cookie);

            // Setting up the authenticated credentials
            this.credentials = { authToken: this.authToken, csrfToken: cookie.ct0, cookie: cookie.toString() };
        }
        // If no cookie has been supplied, initializing empty credentials
        else {
            // Setting up the authenticated credentials
            this.credentials = { authToken: this.authToken, csrfToken: '', cookie: '' };
        }
    }
    
    /**
     * @returns The current authentication credentials. A different credential is returned each time this is invoked
     */
    async getAuthCredentials(): Promise<IAuthCredentials> {
        return this.credentials;
    }

    /**
     * @returns The guest credentials fetched from twitter.
     */
    async getGuestCredentials(): Promise<IGuestCredentials> {
        // Getting the guest credentials from twitter
        return await axios.post<{ guest_token: string }>(guestTokenUrl(), null, {
            headers: {
                'Authorization': this.authToken
            }
        }).then(res => ({
            authToken: this.authToken,
            guestToken: res.data.guest_token
        }));
    }
}
