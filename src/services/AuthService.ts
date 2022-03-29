// PACKAGE LIBS
import fetch from 'node-fetch';

// CUSTOM LIBS
import { config } from '../config/env';
import {
    guestTokenUrl,
    blankHeader
} from './helper/Requests';
import {
    FetcherService,
    HttpMethods
} from './FetcherService';

/**
 * @summary Handles authentication of http requests and other authentication related tasks
 */
export class AuthService {
    // MEMBER DATA
    private static instance: AuthService;                                    // To store the current instance of this service
    private requestCount: number;                                            // To store the total number of requests made
    private authCredentials: {
        authToken: string,
        csrfToken: string,
        cookie: string
    };                                                                       // To store the current authentication credentials
    private numCredentials: number;                                          // To store the total number of available credentials
    private credNumber: number;                                              // To keep track of the current credential's number

    // MEMEBER METHODS
    private constructor() {
        // Initializing member data
        this.requestCount = 0;

        // Initializing the total number of available credentials
        this.numCredentials = config['twitter']['auth'].length;

        // Initializing authentication credentials to the first available one
        this.authCredentials = config['twitter']['auth'][0];
        this.credNumber = 0;
    }

    /**
     * @returns The active instance of AuthService
     */
    static getInstance(): AuthService {
        // Checking if an instance does not exists already
        if(!this.instance) {
            // Creating a new instance
            this.instance = new AuthService();
        }

        return this.instance;
    }

    /**
     * @summary Changes to current active credential to the next available
     */
    private changeCredentials(): void {
        // Checking if more credentials are availabe and changing current credentials' number
        this.credNumber = (this.credNumber == (this.numCredentials - 1)) ? 0 : (this.credNumber + 1);

        // Changing the current credential
        this.authCredentials = config['twitter']['auth'][this.credNumber];
    }

    /**
     * @returns The current authentication credentials. A different credential is returned each time this is invoked
     */
    getAuthCredentials(): {
        authToken: string,
        csrfToken: string,
        cookie: string
    } {
        this.changeCredentials();
        return this.authCredentials;
    }

    /**
     * @returns The guest credentials required to fetch data anonymously
     */
    async getGuestCredentials(): Promise<{authToken: string, guestToken: string }> {
        // Fetching guest token from twitter api
        var res = await fetch(guestTokenUrl(), {
                headers: blankHeader(this.authCredentials.authToken),
                method: HttpMethods.POST,
                body: null
            })
            .then(data => data.json())
            .catch(err => {
                throw err;
            });

        return {
            authToken: this.authCredentials.authToken,
            //@ts-ignore
            guestToken: res['guest_token']
        };
    }
}