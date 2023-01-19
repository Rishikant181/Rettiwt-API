// PACKAGE LIBS
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';

// TYPES
import { HttpMethods, HttpStatus } from "../types/HTTP";

// HELPERS
import { authorizedHeader } from './helper/Headers'
import { toUser, toTweet } from './helper/Deserializers';

// CONFIGS
import { config } from '../config/env';

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    public static allowCache: boolean;                                      // To store whether caching is enabled or not
    private auth: AuthService;                                              // To store the auth service instance to use for authentication

    // MEMBER METHODS
    constructor(auth: AuthService) {
        FetcherService.allowCache = config.use_cache;
        this.auth = auth;
    }

    /**
    * @summary Throws the appropriate http error after evaluation of the status code of reponse
    * @param res The response object received from http communication
    */
    private handleHTTPError(res: AxiosResponse): AxiosResponse {
        if (res.status != 200 && res.status in HttpStatus) {
            throw new Error(HttpStatus[res.status])
        }

        return res;
    }

    /**
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param method The type of HTTP request being made. Default is GET
     * @param body The content to be sent in the body of the response
     * @param auth Whether to use authenticated requests or not
     * @param guestCreds Guest credentials to use rather than auto-generated one
     */
    async request<DataType>(url: string): Promise<AxiosResponse<DataType>> {
        // Preparing the request config
        var config: AxiosRequestConfig<DataType> = {
            headers: await authorizedHeader(await this.auth.getAuthCredentials()),
            method: HttpMethods.GET
        };
    
        // Fetching the data
        var res = await axios(url, config).then(res => this.handleHTTPError(res));

        return res;
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