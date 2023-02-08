// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';

// TYPES
import { HttpStatus } from "../types/HTTP";
import { Result as RawUser } from '../types/raw/user/User';
import { Result as RawTweet } from '../types/raw/tweet/Tweet';

// HELPERS
import * as Headers from './helper/Headers'
import * as Deserializers from './helper/Deserializers';
import { CurlyOptions } from 'node-libcurl/dist/curly';

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
    private auth: AuthService;                                              // To store the auth service instance to use for authentication
    private cache: CacheService;                                            // To stoer the cache service instance to use for caching data
    protected isAuthenticated: boolean;                                     // To store whether user is authenticated or not

    // MEMBER METHODS
    constructor(auth: AuthService) {
        this.auth = auth;
        this.cache = CacheService.getInstance();
        this.isAuthenticated = this.auth.isAuthenticated;
    }

    /**
    * @summary Throws the appropriate http error after evaluation of the status code of reponse
    * @param res The response object received from http communication
    */
    private handleHTTPError(res: CurlyResult): CurlyResult {
        if (res.statusCode != 200 && res.statusCode in HttpStatus) {
            throw new Error(HttpStatus[res.statusCode])
        }

        return res;
    }

    /**
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param authenticate Whether to authenticate requests or not
     * @param method The HTTP method to use
     * @param data The data to be sent along with the request (works with only POST method)
     */
    protected async request<DataType>(url: string, authenticate: boolean = true, method: HttpMethods = HttpMethods.GET, data?: any): Promise<CurlyResult<DataType>> {
        // Creating the configuration for the http request
        let config: CurlyOptions = {
            httpHeader: authenticate ? Headers.authorizedHeader(await this.auth.getAuthCredentials()) : Headers.guestHeader(await this.auth.getGuestCredentials()),
            sslVerifyPeer: false,
        };

        // If post request is to be made
        if (method == HttpMethods.POST) {
            return await curly.post(url, { ...config, postFields: JSON.stringify(data) }).then(res => this.handleHTTPError(res));
        }
        // If get request is to be made
        else {
            return await curly.get(url, config).then(res => this.handleHTTPError(res));
        }
    }

    /**
     * @summary Caches the extracted data
     * @param data The extracted data to be cached
     */
    protected cacheData(data: any): void {
        // Parsing the extracted data
        let users = data.users.map((user: RawUser) => Deserializers.toUser(user));
        let tweets = data.tweets.map((tweet: RawTweet) => Deserializers.toTweet(tweet));

        // Caching the data
        this.cache.write(users);
        this.cache.write(tweets);
    }

    /**
     * @returns The data with the given id (if it exists in cache)
     * @param id The id of the data to be read from cache
     */
    protected readData(id: string): any {
        // Reading data from cache
        return this.cache.read(id);
    }
}