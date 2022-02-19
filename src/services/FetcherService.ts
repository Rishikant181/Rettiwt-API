// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS
import {
    authorizedHeader
} from './helper/Requests'

/**
 * @summary Stores all the different type of http requests
 */
export enum HttpMethods {
    POST = "POST",
    GET = "GET"
};

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    protected authToken: string;                                                   // To store the authentication token
    protected csrfToken: string;                                                   // To store the csrfToken
    protected cookie: string;                                                      // To store the cookie

    // MEMBER METHODS
    /**
     * @param authToken The authetication token received from TwitterAPI
     * @param csrfToken The csrf token received from TwitterAPI
     * @param cookie The cookie for the logged in user account received from TwitterAPI
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
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param method The type of HTTP request being made. Default is GET
     * @param body The content to be sent in the body of the response
     */
    protected async fetchData(
        url: string,
        method?: HttpMethods,
        body?: any
    ): Promise<any> {
        return fetch(url, {
            headers: authorizedHeader(
                this.authToken,
                this.csrfToken,
                this.cookie
            ),
            method: method ? method : HttpMethods.GET,
            body: body
        })
        // Parsing data to json
        .then(res => res.json())
        // If error connecting and parsing data
        .catch((err) => {
            throw err;
        })
    }
}
