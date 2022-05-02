// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from '../AuthService';
import { FetcherService } from '../FetcherService';

// TYPES
import { Errors, HttpMethods, Response } from '../../types/HTTP';

// HELPERS
import {
    generateLoginFlow,
    LoginFlows
} from "./LoginFlows";

// CONFIGS
import { config } from '../../config/env';

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService extends FetcherService {
    // MEMBER DATA
    private guestCredentials: {
        authToken: string,
        guestToken: string
    };                                                                  // To store the guest credentials for logging in
    private flowData: any;                                              // To store the current flow result
    private cookiesTable: string;                                       // To store the name of the table that stores cookies in db
    
    // MEMBER METHODS
    constructor() {
        super();

        // Initializing member data
        this.cookiesTable = config['server']['db']['databases']['auth']['tables']['cookies'];
    }

    /**
     * @summary Initializes the member data of the service and returns the initialized instance
     */
    async init(): Promise<AccountsService> {
        // Initializing member data
        this.guestCredentials = await (await AuthService.getInstance()).getGuestCredentials();
        this.flowData = '';

        return this;
    }

    /**
     * @summary Store the cookies extracted from the given headers into the database
     * @param headers The headers from which the cookies are to be extracted and stored
     */
    /*
    private async storeCookies(headers: Headers): Promise<boolean> {
        // Getting the cookies from the headers
        const cookies: string = headers.get('set-cookie') + '';

        // Getting csrf token from the cookie using regex
        //@ts-ignore
        const csrfToken: string = cookies.match(/ct0=(?<token>[a|A|0-z|Z|9]+);/)?.groups.token;

        // Preparing the credentials to write
        const cred = { csrfToken: csrfToken, cookie: cookies };

        // Writing the credentials to db
        return await this.write(cred, this.cookiesTable);
    }
    */

    /**
     * @summary Logins into the given account and stores the cookies and store logged in credentials to database
     * @returns The logged in account's cookies and other credentials
     * @param email The email associated with the account to be logged into
     * @param userName The user name of the account
     * @param password The password to the account
     */
    async login(email: string, userName: string, password: string) {
        // Getting the initial flow
        var currentFlow = generateLoginFlow(email, userName, password, '', LoginFlows.Login);
        var guestCredentials = await (await AuthService.getInstance()).getGuestCredentials(true);
        var res = null;
    }
}