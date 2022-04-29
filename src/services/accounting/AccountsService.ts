// PACKAGE LIBS
import fetch from "node-fetch";

// CUSTOM LIBS

// SERVICES
import { AuthService } from '../AuthService';

// HELPERS
import { HttpMethods } from '../../schema/types/HTTP';
import { handleHTTPError } from '../helper/Parser';
import {
    unauthorizedHeader,
    initiateLoginUrl,
    loginContinueUrl
} from "../helper/Requests";
import { generateLoginFlow, LoginFlows } from "./LoginFlows";

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService {
    // MEMBER DATA
    private guestCredentials: {
        authToken: string,
        guestToken: string
    };                                                                  // To store the guest credentials for logging in
    private flowData: any;                                              // To store the current flow result
    
    // MEMBER METHODS
    /**
     * @summary Initializes the member data of the service and returns the initialized instance
     */
    async init(): Promise<AccountsService> {
        // Initializing member data
        this.guestCredentials = await AuthService.getInstance().getGuestCredentials();
        this.flowData = '';

        return this;
    }

    /**
     * @summary Store the cookies extracted from the given headers into the database
     * @param headers The headers from which the cookies are to be extracted and stored
     */
    private async storeCookies(headers: Headers): Promise<boolean> {
        // Getting the cookies from the headers
        const cookies: string = headers.get('set-cookie') + '';

        // Getting csrf token from the cookie using regex
        //@ts-ignore
        const csrfToken: string = cookies.match(/ct0=(?<token>[a|A|0-z|Z|9]+);/)?.groups.token;
        
        return true;
    }

    /**
     * @summary Logins into the given account and stores the cookies and store logged in credentials to database
     * @returns The logged in account's cookies and other credentials
     * @param email The email associated with the account to be logged into
     * @param userName The user name of the account
     * @param password The password to the account
     */
    async login(email: string, userName: string, password: string): Promise<void> {
        // Getting each flow of login process
        for(var flow in LoginFlows) {
            /**
             * The steps are the same for every flow except GetLoginFlow and FinalizeLogin
             * For GetLoginFlow, the url to be used is initiateLoginUrl, for all other flows, it is loginContinueUrl
             * For FinalizeLogin, the end data is the response headers, for all other flows, end data is the flow token from response body
             */
            // Executing each flow
            this.flowData = await fetch((flow == LoginFlows.GetLoginFlow) ? initiateLoginUrl() : loginContinueUrl(), {
                headers: unauthorizedHeader(this.guestCredentials),
                method: HttpMethods.POST,
                body: generateLoginFlow(email, userName, password, this.flowData, LoginFlows[flow as LoginFlows])
            })
            .then(data => handleHTTPError(data))
            .then(data => {
                if(flow == LoginFlows.FinalizeLogin) return data;
                else return data.json();
            })
            .then(data => {
                //@ts-ignore
                if(flow == LoginFlows.FinalizeLogin) return data.headers;
                //@ts-ignore
                else return data['flow_token'];
            })
            .catch(err => {
                throw err;
            });
        }

        this.storeCookies(this.flowData);
    }
}