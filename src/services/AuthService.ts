// PACKAGE LIBS
import axios, { AxiosResponseHeaders } from 'axios';

// CUSTOM LIBS

// SERVICES
import { FetcherService } from './FetcherService';
import { LogService } from './LogService';

// TYPES
import { GuestCredentials, AuthCredentials, BlankCredentials } from '../types/Authentication';
import { AuthType, HttpMethods } from '../types/HTTP';

// HELPERS
import { parseCookies } from './helper/Parser';

// CONFIGS
import { config } from '../config/env';
import { core_urls } from '../config/urls';
import { guestTokenUrl } from './helper/Requests';

/**
 * @summary Handles authentication of http requests and other authentication related tasks
 */
export class AuthService {
    // MEMBER DATA
    private static instance: AuthService;                                    // To store the current instance of this service
    private authToken: string;                                               // To store the common auth token
    private currentUser: AuthCredentials;                                    // To store the current authentication credentials
    private currentGuest: GuestCredentials;                                  // To store the current guest credentials
    private authCredList: AuthCredentials[];                                 // To store the cursored list of available authentication credentials
    private numCredentials: number;                                          // To store the total number of available auth credentials
    private credentialNum: number;                                           // To store the current credentials number

    // MEMBER METHODS
    private constructor() {
        this.authToken = config.twitter.auth.authToken;
        this.currentUser = { authToken: this.authToken, csrfToken: '', cookie: ''};
        this.currentGuest = { authToken: this.authToken, guestToken: '' };
    }

    /**
     * @summary Initializes asynchronous member data of AuthService
     */
    private async init(): Promise<void> {
        // Getting the list of stored credentials from core
        try {
            this.authCredList = (await axios.get<AuthCredentials[]>(core_urls.all_cookies())).data;
            this.numCredentials = this.authCredList.length;
            this.credentialNum = 0;
        }
        catch(err) {
            console.log(err);
        }
    }

    /**
     * @returns The active instance of AuthService
     */
    static async getInstance(): Promise<AuthService> {
        // If an instance doesn't exist already
        if(!this.instance) {
            // Creating a new instance
            this.instance = new AuthService();

            // Initializing async data
            await this.instance.init()

            // Returning the new instance
            return this.instance;
        }
        // If an instance already exists
        else {
            return this.instance;
        }
    }

    /**
     * @summary Changes to current active credential to the next available
     */
    private async changeCredentials(): Promise<void> {
        // If all credentials have been use, reset credential number
        this.credentialNum = (this.credentialNum == this.numCredentials) ? 0 : this.credentialNum;

        // Changing current auth credentials to the next available one
        this.currentUser = this.authCredList[this.credentialNum];
        this.currentUser.authToken = this.authToken;
        this.credentialNum++;
    }

    /**
     * @summary Stores the authentication credentials extracted from the given headers into the database
     * @param headers The headers from which the cookies are to be extracted and stored
     */
    async storeCredentials(headers: AxiosResponseHeaders): Promise<Boolean> {
        // Parsing the cookies
        const cookies: string = parseCookies(headers);

        // Getting csrf token from the cookie using regex
        //@ts-ignore
        const csrfToken: string = cookies.match(/ct0=(?<token>[a|A|0-z|Z|9]+);/)?.groups.token;
        
        // Preparing the credentials to write
        const creds = { authToken: this.authToken, csrfToken: csrfToken, cookie: cookies };

        // Sending credentials to core for storage
        await axios.post<string>(core_urls.add_cookie(), creds);

        // If write was successful, reinitializing credentials
        await this.init();

        return true;
    }

    /**
     * @returns The current authentication credentials. A different credential is returned each time this is invoked
     * @param newCred Whether to get a different credential or the current one
     */
    async getAuthCredentials(newCred: boolean = true): Promise<AuthCredentials> {
        // If new credential is required
        if(newCred) {
            // Changing to the next available credentials
            await this.changeCredentials();

            return this.currentUser;
        }
        // If new credential is not required
        else {
            return this.currentUser;
        }
    }

    /**
     * @returns The guest credentials required to fetch data anonymously
     * @param newCred Whether to get a different credential or the current one
     */
    async getGuestCredentials(newCred: boolean = true): Promise<GuestCredentials> {
        // If new guest token is to used
        if(newCred || !this.currentGuest.guestToken) {
            // Fetching guest token from twitter api
            var data = (await new FetcherService(await LogService.getInstance()).request<any>(guestTokenUrl(), HttpMethods.POST, undefined, AuthType.NONE)).data;

            // Setting new guest credentials
            this.currentGuest.authToken = this.authToken;
            this.currentGuest.guestToken = data.guest_token;

            return this.currentGuest;
        }
        // If new guest credential is not required
        else {
            return this.currentGuest;
        }
    }

    /**
     * @returns The blank credentials required to fetch unauthenticated requests
     */
    async getBlankCredentials(): Promise<BlankCredentials> {
        return { authToken: config.twitter.auth.authToken };
    }
}