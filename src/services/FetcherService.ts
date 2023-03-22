// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';

// ARGS
import { TweetFilter } from '../types/args/TweetFilter';

// TYPES
import { HttpStatus } from "../types/HTTP";
import { Result as RawUser } from '../types/raw/user/User';
import { Result as RawTweet } from '../types/raw/tweet/Tweet';
import { Tweet } from '../types/data/Tweet';

// HELPERS
import * as Headers from './helper/Headers'
import * as UserDeserializers from './helper/deserializers/Users';
import { CurlyOptions } from 'node-libcurl/dist/curly';

/**
 * The different types of http requests.
 */
export enum HttpMethods {
    POST = "POST",
    GET = "GET"
};

/**
 * Handles all HTTP requests.
 * @internal
 * 
 * This serves as the base service from which all other data services derive their behaviour.
 */
export class FetcherService {
    // MEMBER DATA
    /** The authentication service instance. */
    private auth: AuthService;

    /** The caching service instance. */
    private cache: CacheService;

    /** Whether instance has been authenticated or not. */
    protected isAuthenticated: boolean;

    // MEMBER METHODS
    /**
     * @param auth The AuthService instance to use for authentication.
     */
    constructor(auth: AuthService) {
        this.auth = auth;
        this.cache = CacheService.getInstance();
        this.isAuthenticated = this.auth.isAuthenticated;
    }

    /**
     * Validate the given data.
     * 
     * @param data The data to be validated.
     */
    protected async validate(data: TweetFilter) {
        // Converting plain JSON data to a validation enabled class
        data = plainToClass(TweetFilter, data);

        // Validating the data
        const validationResult = await validate(data);

        console.log(validationResult);
    }

    /**
    * The middleware for handling any HTTP error.
    * 
    * @param res The response object received.
    * 
    * @returns The received response, if no HTTP errors are found.
    * 
    * @throws {@link HttpStatus} error, if any HTTP error is found.
    */
    private handleHTTPError(res: CurlyResult): CurlyResult {
        /**
         * If the status code is not 200 => the HTTP request was not successful. hence throwing error
         */
        if (res.statusCode != 200 && res.statusCode in HttpStatus) {
            throw new Error(HttpStatus[res.statusCode])
        }
        
        return res;
    }

    /**
     * Creates an HTTP request according to the given parameters.
     * 
     * This method internally uses node-libcurl library to make curl requests to the URL, instead of node-fetch.
     * This has been done since that way it better mimics the HTTP requests made from browser.
     * 
     * @param url The url to fetch data from.
     * @param authenticate Whether to authenticate requests or not.
     * @param method The HTTP method (from {@link HttpMethods}) to use.
     * @param data The data to be sent along with the request (for POST request).
     * 
     * @returns The {@link CurlyResult} received.
     */
    protected async request<DataType>(url: string, authenticate: boolean = true, method: HttpMethods = HttpMethods.GET, data?: any): Promise<CurlyResult<DataType>> {
        /**
         * Creating the request configuration based on the params
         */
        let config: CurlyOptions = {
            /**
             * If authorization is required, using the authenticated header, using the authentication credentiials.
             * Else, using the guest header, using the guest credentials.
             */
            httpHeader: authenticate ? Headers.authorizedHeader(await this.auth.getAuthCredentials()) : Headers.guestHeader(await this.auth.getGuestCredentials()),
            /** 
             * Disabling SSL peer verification because verification causes Error 404 (only while fetching tweets), likely because peer verification fails.
             */
            sslVerifyPeer: false,
        };

        /**
         * While making requests, if data is to be sent, the JSON data first need to be stringified.
         * After making the request, the response is then passed to HTTP error handling middlware for HTTP error handling.
         */
        // If POST request is to be made
        if (method == HttpMethods.POST) {
            return await curly.post(url, { ...config, postFields: JSON.stringify(data) }).then(res => this.handleHTTPError(res));
        }
        // If GET request is to be made
        else {
            return await curly.get(url, config).then(res => this.handleHTTPError(res));
        }
    }

    /**
     * Caches the extracted data into the {@link CacheService} instance.
     * 
     * @param data The extracted data to be cached.
     */
    protected cacheData(data: any): void {
        /**
         * The extracted data is in raw form.
         * This raw data is deserialized into the respective known types.
         */
        let users = data.users.map((user: RawUser) => UserDeserializers.toUser(user));
        let tweets = data.tweets.map((tweet: RawTweet) => new Tweet(tweet));

        // Caching the data
        this.cache.write(users);
        this.cache.write(tweets);
    }

    /**
     * Fetches the data with the given id from the cache.
     * 
     * @param id The id of the data to be read from cache.
     * 
     * @returns The data with the given id. If does not exists, returns undefined.
     */
    protected readData(id: string): any {
        // Reading data from cache
        return this.cache.read(id);
    }
}
