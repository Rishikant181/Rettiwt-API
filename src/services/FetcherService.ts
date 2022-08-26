// PACKAGE LIBS
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// CUSTOM LIBS

// SERVICES
import { AuthService } from './AuthService';
import { CacheService } from './CacheService';
import { Logger } from './LogService';

// TYPES
import { HttpMethods, AuthType } from "../types/HTTP";
import { AuthCredentials, GuestCredentials, BlankCredentials } from "../types/Authentication";

// HELPERS
import { authorizedHeader, blankHeader, unauthorizedHeader } from './helper/Requests'
import { handleHTTPError } from './helper/Parser';
import { toUser, toTweet } from './helper/Deserializers';

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    public static allowCache: boolean;                                      // To store whether caching is enabled or not
    protected logger: Logger;                                               // To store the instance of the logging service to use

    // MEMBER METHODS
    /**
     * @param logger The log service to be used to log data and events
     */
    constructor(logger: Logger) {
        FetcherService.allowCache = process.env.USE_CACHE;
        this.logger = logger;
    }

    /**
     * @returns The requested credentials for authenticating requests
     * @param auth The type of authentication to use
     * @param guestCreds Pre deterermined guest credentials (if any)
     */
    private async getCredentials(auth: AuthType, guestCreds?: GuestCredentials): Promise<GuestCredentials | AuthCredentials | BlankCredentials> {
        // Getting the AuthService instance
        var service = await AuthService.getInstance();
        
        // If authenticated credential is required
        if (auth == AuthType.AUTH) {
            return await service.getAuthCredentials();
        }
        // If guest credential is required
        else if (auth == AuthType.GUEST) {
            return guestCreds ? guestCreds : (await service.getGuestCredentials());
        }
        // If no credential is required
        else {
            return await service.getBlankCredentials();
        }
    }

    /**
     * @returns The requested headers for making the http request
     * @param auth The type of authentication to use
     * @param guestCreds Pre deterermined guest credentials (if any)
     */
    private async getHeaders(auth: AuthType, guestCreds?: GuestCredentials): Promise<any> {
        // Getting the credentials to user
        var creds = await this.getCredentials(auth, guestCreds);
        
        // If header for authorized request is required
        if (auth == AuthType.AUTH) {
            return authorizedHeader(creds as AuthCredentials);
        }
        // If header for guest authorized request is required
        else if (auth == AuthType.GUEST) {
            return unauthorizedHeader(creds as GuestCredentials);
        }
        // If header for unauthorized request is required
        else {
            return blankHeader(creds);
        }
    }

    /**
     * @returns The absolute raw json data from give url
     * @param url The url to fetch data from
     * @param method The type of HTTP request being made. Default is GET
     * @param body The content to be sent in the body of the response
     * @param auth Whether to use authenticated requests or not
     * @param guestCreds Guest credentials to use rather than auto-generated one
     */
    async request<DataType>(
        url: string,
        method: HttpMethods,
        body: any = null,
        auth: AuthType,
        guestCreds?: GuestCredentials
    ): Promise<AxiosResponse<DataType>> {
        // Preparing the request config
        var config: AxiosRequestConfig<DataType> = {
            headers: await this.getHeaders(auth, guestCreds),
            method: method ? method : HttpMethods.GET,
            
            // Conditionally including body if request type if POST
            ...((method == HttpMethods.POST) ? { data: body } : undefined)
        };
    
        // Fetching the data
        var res = await axios(url, config).then(res => handleHTTPError(res));

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