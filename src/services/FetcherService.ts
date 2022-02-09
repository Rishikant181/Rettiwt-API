// This file contains the base class for various fetcher services

// CUSTOM LIBS
import {
    authorizedHeader
} from './helper/Requests'

export class FetcherService {
    // MEMBER DATA
    protected authToken: string;                                                   // To store the authentication token
    protected csrfToken: string;                                                   // To store the csrfToken
    protected cookie: string;                                                      // To store the cookie

    // MEMBER METHODS
    // The constructor
    constructor(
        authToken: string,
        csrfToken: string,
        cookie: string
    ) {
        // Initialising authentication data
        this.authToken = authToken;
        this.csrfToken = csrfToken;
        this.cookie = cookie;
    }

    // Method to fetch data using an http reqiest
    protected fetchData(url: string): Promise<any> {
        return fetch(url, {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
    }
}