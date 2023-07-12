// PACKAGES
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ITweet as IRawTweet, IUser as IRawUser } from 'rettiwt-core';
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { CacheService } from './CacheService';

// MODELS
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';

// ENUMS
import { HttpStatus } from "../../enums/HTTP";

/**
 * The different types of http requests.
 */
export enum HttpMethods {
    POST = "POST",
    GET = "GET"
};

/**
 * The base service that handles all HTTP requests.
 * 
 * @internal
 */
export class FetcherService {
    /** The credential to use for authenticating against Twitter API. */
    private cred: AuthCredential;

    /** The caching service instance. */
    private cache: CacheService;

    /**
     * @param cred The credentials to use for authenticating against Twitter API.
     */
    constructor(cred: AuthCredential) {
        this.cred = cred;
        this.cache = CacheService.getInstance();
    }

    /**
    * The middleware for handling any HTTP error.
    * 
    * @param res The response object received.
    * @returns The received response, if no HTTP errors are found.
    */
    private handleHTTPError(res: AxiosResponse): AxiosResponse {
        /**
         * If the status code is not 200 => the HTTP request was not successful. hence throwing error
         */
        if (res.status != 200 && res.status in HttpStatus) {
            throw new Error(HttpStatus[res.status])
        }

        return res;
    }

    /**
     * Makes an HTTP request according to the given parameters.
     * 
     * @param url The url to fetch data from.
     * @returns The response received.
     */
    protected async request<DataType>(url: string): Promise<AxiosResponse<DataType>> {
        /**
         * Creating the request configuration based on the params
         */
        let config: AxiosRequestConfig = {
            headers: JSON.parse(JSON.stringify(this.cred.toHeader()))
        };

        /**
         * After making the request, the response is then passed to HTTP error handling middlware for HTTP error handling.
         */
        return await axios.get(url, config).then(res => this.handleHTTPError(res));
    }

    /**
     * Caches the extracted data into the cache instance.
     * 
     * @param data The extracted data to be cached.
     */
    protected cacheData(data: any): void {
        /**
         * The extracted data is in raw form.
         * This raw data is deserialized into the respective known types.
         */
        let users = data.users.map((user: IRawUser) => new User(user));
        let tweets = data.tweets.map((tweet: IRawTweet) => new Tweet(tweet));

        // Caching the data
        this.cache.write(users);
        this.cache.write(tweets);
    }

    /**
     * Fetches the data with the given id from the cache.
     * 
     * @param id The id of the data to be read from cache.
     * @returns The data with the given id. If does not exists, returns undefined.
     */
    protected readData(id: string): any {
        // Reading data from cache
        return this.cache.read(id);
    }
}
