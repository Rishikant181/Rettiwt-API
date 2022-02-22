// This file contains the base class for various fetcher services

// PACKAGE LIBS
import fetch from "node-fetch";

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
    /**
     * @param authToken The **authetication token** received from TwitterAPI
     * @param csrfToken The **csrf token** received from TwitterAPI
     * @param cookie The **cookie** for the **logged in user account** received from TwitterAPI
     */
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

    /**
     * **Fetches** the absolute **raw** *json* data from give url
     * @param url The **url** to fetch data
     */
    protected fetchData(url: string): Promise<any> {
        return fetch(url, {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            )
        })
        // Parsing data to json
        .then(res => res.json())
        // If error connecting and parsing data
        .catch((err) => {
            throw err;
        })
    }
}