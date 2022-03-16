// CUSTOM LIBS
import { config } from '../config/env';

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

    // MEMEBER METHODS
    private constructor() {
        // Initializing member data
        this.requestCount = 0;

        // Initializing authentication credentials
        this.authCredentials = config['twitter']['auth'];
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
     * @returns The current authentication credentials
     */
    getAuthCredentials(): {
        authToken: string,
        csrfToken: string,
        cookie: string
    } {
        return this.authCredentials;
    }
}