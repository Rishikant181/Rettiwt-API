// PACKAGE LIBS
import fetch, { Response } from "node-fetch";

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
 * @summary Stores the different types of http status codes
 */
enum HttpStatus {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    TooManyRequests = 429,
    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503
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
        // Checking http status
        .then(res => this.handleHTTPError(res))
        // Parsing data to json
        .then(res => res.json())
        // If other unknown error
        .catch((err) => {
            throw err;
        });
    }

    /**
     * @summary Throws the appropriate http error after evaluation of the status code of reponse
     * @param res The response object received from http communication
     */
    private handleHTTPError(res: Response): Response {
        if (res.status != 200 && res.status in HttpStatus) {
            throw new Error(HttpStatus[res.status])
        }

        return res;
    }
}