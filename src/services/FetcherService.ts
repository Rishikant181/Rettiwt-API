// PACKAGE LIBS
import fetch, { Response } from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';

// TYPES
import { User } from '../schema/types/UserAccountData';
import { Tweet } from '../schema/types/TweetData';

// HELPERS
import {
    authorizedHeader
} from './helper/Requests'

// CONFIG
import { config } from '../config/env';

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
    private allowCache: boolean;                                            // To store whether caching is enabled or not

    // MEMBER METHODS
    protected constructor() {
        this.allowCache = config['server']['db']['enabled'];
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
            headers: authorizedHeader(AuthService.getInstance().getAuthCredentials()),
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

    /**
     * @summary Caches the extracted data
     * @param data The extracted data to be cached
     */
    protected async cacheData(data: any): Promise<void> {
        // If caching is enabled
        if (this.allowCache) {
            // Creating an instance of cache
            var cache = new CacheService();

            // Parsing the extracted data
            //@ts-ignore
            var users = data.users.map(user => new User().deserialize(user));
            //@ts-ignore
            var tweets = data.tweets.map(tweet => new Tweet().deserialize(tweet));

            // Caching the data
            cache.write(users);
            cache.write(tweets);
        }
    }

    /**
     * @returns The data with the given id (if it exists in cache)
     * @param id The id of the data to be read from cache
     */
    protected async readData(id: string): Promise<any> {
        // If caching is enabled
        if (this.allowCache) {
            // Creating an instance of cache
            var cache = new CacheService();

            // Reading data from cache
            return cache.read(id);
        }
    }
}