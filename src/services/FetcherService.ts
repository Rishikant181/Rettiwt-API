// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';

// TYPES
import { HttpMethods } from "../types/HTTP";
import { AuthCredentials, GuestCredentials } from "../types/Authentication";

// HELPERS
import { authorizedHeader, unauthorizedHeader } from './helper/Requests'
import { handleHTTPError } from './helper/Parser';
import { toUser, toTweet } from './helper/Deserializers';

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    public static allowCache: boolean;                                      // To store whether caching is enabled or not

    // MEMBER METHODS
    constructor() {
        FetcherService.allowCache = process.env.USE_CACHE;
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
        try {
            // Getting the AuthService instance
            var service = await AuthService.getInstance();

            // Getting the required credentials
            var creds = await (auth ? service.getAuthCredentials() : service.getGuestCredentials());
        
            // Fetching the data
            var res = await fetch(url, {
                headers: auth ? authorizedHeader(creds as AuthCredentials) : unauthorizedHeader(guestCreds ? guestCreds : creds as GuestCredentials),
                method: method ? method : HttpMethods.GET,
                body: body
            })
            // Checking http status
            .then(res => handleHTTPError(res))

            return res;
        }
        catch(err) {
            // If other unknown error
            console.log("Failed to fetch data from Twitter");
            throw err;
        }
    }

    /**
     * @summary Caches the extracted data
     * @param data The extracted data to be cached
     */
    protected async cacheData(data: any): Promise<void> {
        // If caching is enabled
        if (FetcherService.allowCache) {
            // Creating an instance of cache
            var cache = await CacheService.getInstance();

            // Parsing the extracted data
            //@ts-ignore
            var users = data.users.map(user => toUser(user));
            //@ts-ignore
            var tweets = data.tweets.map(tweet => toTweet(tweet));

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
        if (FetcherService.allowCache) {
            // Creating an instance of cache
            var cache = await CacheService.getInstance();

            // Reading data from cache
            return cache.read(id);
        }
    }
}