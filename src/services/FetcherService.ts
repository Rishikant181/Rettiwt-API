// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './data/CacheService';

// TYPES
import { HttpMethods } from "../types/HTTP";
import { AuthCredentials, GuestCredentials } from "../types/Authentication";

// HELPERS
import { authorizedHeader, unauthorizedHeader } from './helper/Requests'
import { handleHTTPError } from './helper/Parser';
import { toUser, toTweet } from './helper/Deserializers';

// CONFIG
import { config } from '../config/env';

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    private allowCache: boolean;                                            // To store whether caching is enabled or not
    private userTable: string;                                              // To store the name of the table to cache user data to
    private tweetTable: string;                                             // To store the name of the table to cache tweets to

    // MEMBER METHODS
    constructor() {
        this.allowCache = config['server']['db']['databases']['cache']['enabled'];
        this.userTable = config['server']['db']['databases']['cache']['tables']['users'];
        this.tweetTable = config['server']['db']['databases']['cache']['tables']['tweets'];
    }

    /**
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param method The type of HTTP request being made. Default is GET
     * @param body The content to be sent in the body of the response
     * @param auth Whether to use authenticated requests or not
     * @param guestCredes Guest credentials to use rather than auto-generated one
     */
    protected async fetchData(
        url: string,
        method: HttpMethods = HttpMethods.GET,
        body: any = null,
        auth: boolean = true,
        guestCreds?: GuestCredentials
    ): Promise<any> {
        var creds: AuthCredentials | GuestCredentials;

        // Getting credentials
        if(auth) creds = await (await AuthService.getInstance()).getAuthCredentials();
        else creds = await (await AuthService.getInstance()).getGuestCredentials();

        // Fetching data
        return fetch(url, {
            headers: auth ? authorizedHeader(creds as AuthCredentials) : unauthorizedHeader(guestCreds ? guestCreds : creds as GuestCredentials),
            method: method ? method : HttpMethods.GET,
            body: body
        })
        // Checking http status
        .then(res => handleHTTPError(res))
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
            var users = data.users.map(user => toUser(user));
            //@ts-ignore
            var tweets = data.tweets.map(tweet => toTweet(tweet));

            // Caching the data
            cache.write(users, this.userTable);
            cache.write(tweets, this.tweetTable);
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