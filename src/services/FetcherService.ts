// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './data/CacheService';

// TYPES
import { User } from '../types/UserAccountData';
import { Tweet } from '../types/TweetData';
import { HttpMethods } from "../types/HTTP";

// HELPERS
import {
    authorizedHeader,
    unauthorizedHeader
} from './helper/Requests'
import { handleHTTPError } from './helper/Parser';

// CONFIG
import { config } from '../config/env';

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    private allowCache: boolean;                                            // To store whether caching is enabled or not

    // MEMBER METHODS
    constructor() {
        this.allowCache = config['server']['db']['databases']['cache']['enabled'];
    }

    /**
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param method The type of HTTP request being made. Default is GET
     * @param body The content to be sent in the body of the response
     * @param auth Whether to use authenticated requests or not
     * @param newCred Whether to use new credentials or old one
     * @param headers Whether to return response headers or not
     */
    protected async fetchData(
        url: string,
        method: HttpMethods = HttpMethods.GET,
        body: any = null,
        auth: boolean = true,
        newCred: boolean = true,
        headers: boolean = false
    ): Promise<any> {
        return fetch(url, {
            headers: auth ? authorizedHeader((await AuthService.getInstance()).getAuthCredentials(newCred)) : unauthorizedHeader(await (await AuthService.getInstance()).getGuestCredentials(newCred)),
            method: method ? method : HttpMethods.GET,
            body: body
        })
        // Checking http status
        .then(res => handleHTTPError(res))
        // Parsing data to json
        .then(res => {
            // If response headers are to be returned
            if(headers) return res.headers;
            // If response body is to returned
            else return res.json();
        })
        // If other unknown error
        .catch((err) => {
            throw err;
        });
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
        if (process.env.USE_CACHE) {
            // Creating an instance of cache
            var cache = new CacheService();

            // Reading data from cache
            return cache.read(id);
        }
    }
}