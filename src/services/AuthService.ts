// PACKAGE LIBS
import fetch from 'node-fetch';

// CUSTOM LIBS

// SERVICES
import { HttpMethods } from '../types/HTTP';
import { DatabaseService } from './DatabaseService';

// TYPES
import {
    GuestCredentials,
    AuthCredentials
} from '../types/Authentication';

// HELPERS
import {
    guestTokenUrl,
    blankHeader
} from './helper/Requests';

// CONFIGS
import { config } from '../config/env';

/**
 * @summary Handles authentication of http requests and other authentication related tasks
 */
export class AuthService extends DatabaseService {
    // MEMBER DATA
    private static instance: AuthService;                                    // To store the current instance of this service
    private authToken: string;                                               // To store the common auth token
    private currentUser: AuthCredentials;                                    // To store the current authentication credentials
    private currentGuest: GuestCredentials;                                  // To store the current guest credentials
    private numCredentials: number;                                          // To store the total number of available credentials
    private credNumber: number;                                              // To keep track of the current credential's number

    // MEMEBER METHODS
    private constructor() {
        super(config['server']['db']['databases']['auth']['name'], config['server']['db']['databases']['auth']['tables']['cookies']);
        this.numCredentials = config['twitter']['auth']['credentials'].length;
        this.authToken = config['twitter']['auth']['authToken'];
        this.currentUser = { authToken: this.authToken, ...config['twitter']['auth']['credentials'][0]};
        this.currentGuest = { authToken: this.authToken, guestToken: '' };
        this.credNumber = 0;
    }

    /**
     * @summary Initializes the member data of AuthService, which needs to be done asynchronously
     */
    private async init(): Promise<void> {

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
        this.currentUser = { authToken: this.authToken , ...config['twitter']['auth']['credentials'][this.credNumber] };
    }

    /**
     * @returns The current authentication credentials. A different credential is returned each time this is invoked
     * @param newCred Whether to get a different credential or the current one
     */
    getAuthCredentials(newCred: boolean = false): {
        authToken: string,
        csrfToken: string,
        cookie: string
    } {
        // If new credential is required
        if(newCred) {
            // Changing credentials
            this.changeCredentials();
        }

        return this.currentUser;
    }

    /**
     * @returns The guest credentials required to fetch data anonymously
     * @param newCred Whether to get a different credential or the current one
     */
    async getGuestCredentials(newCred: boolean = true): Promise<{authToken: string, guestToken: string }> {
        // If new guest token is to used
        if(newCred || !this.currentGuest.guestToken) {
            // Fetching guest token from twitter api
            await fetch(guestTokenUrl(), {
                headers: blankHeader({ authToken: this.authToken }),
                method: HttpMethods.POST,
                body: null
            })
            .then(data => data.json())
            // Setting new guest credentials
            .then(data => {
                this.currentGuest.authToken = this.authToken;
                //@ts-ignore
                this.currentGuest.guestToken = data['guest_token'];
            })
            .catch(err => {
                throw err;
            });
        }

        return this.currentGuest;
    }
}