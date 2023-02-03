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

/**
 * @service The base serivice from which all other data services derive their behaviour
 */
export class FetcherService {
    // MEMBER DATA
    private auth: AuthService;                                              // To store the auth service instance to use for authentication

    // MEMBER METHODS
    constructor(auth: AuthService) {
        this.auth = auth;
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
     * @param authenticated Whether to authenticate requests or not
     */
    protected async request<DataType>(url: string, authenticated: boolean = false): Promise<CurlyResult<DataType>> {
        // Fetching the data
        let res = await curly.get(url, {
            httpHeader: authenticated ? Headers.authorizedHeader(await this.auth.getAuthCredentials()) : Headers.guestHeader(await this.auth.getGuestCredentials()),
            sslVerifyPeer: false
        }).then(res => this.handleHTTPError(res));

        return res;
    }

    /**
     * @summary Caches the extracted data
     * @param data The extracted data to be cached
     */
    protected async cacheData(data: any): Promise<void> {
        // Creating an instance of cache
        let cache = await CacheService.getInstance();

        // Parsing the extracted data
        let users = data.users.map((user: RawUser) => Deserializers.toUser(user));
        let tweets = data.tweets.map((tweet: RawTweet) => Deserializers.toTweet(tweet));

        // Caching the data
        cache.write(users);
        cache.write(tweets);
    }

    /**
     * @returns The data with the given id (if it exists in cache)
     * @param id The id of the data to be read from cache
     */
    protected async readData(id: string): Promise<any> {
        // Creating an instance of cache
        let cache = await CacheService.getInstance();

        // Reading data from cache
        return cache.read(id);
    }
}