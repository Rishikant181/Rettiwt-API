// CUSTOM LIBS
// TYPES
import { GuestCredentials, AuthCredentials, BlankCredentials } from '../types/Authentication';

// CONFIGS
import { config } from '../config/env';

/**
 * @summary Handles authentication of http requests and other authentication related tasks
 */
export class AuthService {
    // MEMBER DATA
    private authToken: string;                                               // To store the common auth token
    private credentials: AuthCredentials;                                    // To store the current authentication credentials

    // MEMBER METHODS
    constructor(cookie: string) {
        // Reading the auth token from the config, since it's always the same
        this.authToken = config.twitter.auth.authToken;

        // Setting up the authenticated credentials
        /**
         * The following regex pattern is used to extract the csrfToken from the cookie string.
         * This is done by matching any string between the characters 'ct0=' and nearest enclosing ';'.
         * (?<=pattern) starts matching after the given pattern.
         * (?=pattern) stops matching just before the pattern
         */
        this.credentials = { authToken: this.authToken, csrfToken: cookie.match(/(?<=ct0=).+?(?=;)/) + '', cookie: cookie};
        
    }
    
    /**
     * @returns The current authentication credentials. A different credential is returned each time this is invoked
     */
    async getAuthCredentials(): Promise<AuthCredentials> {
        return this.credentials;
    }
}