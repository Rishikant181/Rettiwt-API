// PACKAGE LIBS
import fetch from 'node-fetch';

// CUSTOM LIBS
import { config } from '../config/env';

// HELPERS
import {
    guestTokenUrl,
    initiateLoginUrl,
    loginContinueUrl,
    blankHeader,
    unauthorizedHeader
} from './helper/Requests';
import { HttpMethods } from './FetcherService';

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
                headers: blankHeader({ authToken: this.authCredentials.authToken }),
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

    /**
     * @returns The flow token used to initiate the login process
     */
    private async getLoginFlow(authToken: string, guestToken: string): Promise<string> {
        // Fetching the flow token to initiate login process
        var res = await fetch(initiateLoginUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken }),
            method: HttpMethods.POST,
            body: "{\"input_flow_data\":{\"flow_context\":{\"debug_overrides\":{},\"start_location\":{\"location\":\"splash_screen\"}}},\"subtask_versions\":{\"contacts_live_sync_permission_prompt\":0,\"email_verification\":1,\"topics_selector\":1,\"wait_spinner\":1,\"cta\":4}}"
        })
        .then(data => data.json())
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res['flow_token'];
    }

    /**
     * @summary Initiates the login process
     * @returns The flow token used for verifying the email
     * @param authToken The authentication token to be used
     * @param guestToken The guest token to be used
     * @param flowToken The flow token used to initiate login, obtained from getLoginFlow method
     */
    private async initiateLogin(
        authToken: string,
        guestToken: string,
        flowToken: string
    ): Promise<string> {
        // Fetching the flow token used to verify email
        var res = await fetch(loginContinueUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken}),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${flowToken}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginJsInstrumentationSubtask\",\"js_instrumentation\":{\"response\":\"{\\\"rf\\\":{\\\"f3d0013d2401a9e86a63dac052aeec19524813e572f0b446241b550bc1e653e8\\\":-146,\\\"abef77ded0018c5ef4a2146465e76811c8ee7a377ff84c2181e58ac7e5bb8b97\\\":-17,\\\"a6d95f40b2cc05ac2baa2ce64ce976d3558cd9ca79a3e1ae797d3bda62847470\\\":112,\\\"ae30e4310433b0ae4e670acd918eebd0056daee600fa9db57082e8ace2c2fb1c\\\":14},\\\"s\\\":\\\"AR1nIiYWWtrhpM2n5cu-WDC77syV8L_zqLIHxmAePc0nhZAnrh3WdNig2MMFoIk-k1TjxWijXgVtjbLaYB-gTFA9KigwnaVsno0o6deCU1b_uH3XxKCRwaE-KN3c65PXRKNJP08YB1nQENeFXgM9MsrywIO0C60zGlPWj8XlB9sAICGoJ26OJ7IgvMZP_5VgIJZwMDpJx3gN4xhI44n32TiLxerU59vDbwltkf0rgsIL34PODWWDOt9m07jrFaPFkt40T_G0sWJhuy9xfEWetgOmMLnQCpn4Ut6kl_W9Yi6wNDH1vtnRMbgeKgaJJRv2cTIvOa9DBvYV63cp_3G9WQAAAYBLmqMB\\\"}\",\"link\":\"next_link\"}}]}`,
        })
        .then(data => data.json())
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res['flow_token'];
    }

    /**
     * @summary Verifies the input email
     * @returns The flow token to be used for verifying the user name
     * @param authToken The authentication token to be used
     * @param guestToken The guest token to be used
     * @param flowToken The flow token for verifying the email
     * @param email The email to be verified for login
     */
    private async verifyEmail(
        authToken: string,
        guestToken: string,
        flowToken: string,
        email: string
    ): Promise<string> {
        // Fetching the flow token used to verify user name of the account with given email
        var res = await fetch(loginContinueUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken }),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${flowToken}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterUserIdentifierSSOSubtask\",\"settings_list\":{\"setting_responses\":[{\"key\":\"user_identifier\",\"response_data\":{\"text_data\":{\"result\":\"${email}\"}}}],\"link\":\"next_link\"}}]}`
        })
        .then(data => data.json())
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res['flow_token'];
    }

    /**
     * @summary Verifies the input username
     * @returns The flow token to be used for verifying the password
     * @param authToken The authentication token to be used
     * @param guestToken The guest token to be used
     * @param flowToken The flow token for verifying the username
     * @param userName The username to be verified for login
     */
     private async verifyUserName(
        authToken: string,
        guestToken: string,
        flowToken: string,
        userName: string
    ): Promise<string> {
        // Fetching the flow token used to verify password of the account with given user name
        var res = await fetch(loginContinueUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken }),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${flowToken}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterAlternateIdentifierSubtask\",\"enter_text\":{\"text\":\"${userName}\",\"link\":\"next_link\"}}]}`
        })
        .then(data => data.json())
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res['flow_token'];
    }

    /**
     * @summary Verifies the input password
     * @returns The flow token to be used for finalizing login
     * @param authToken The authentication token to be used
     * @param guestToken The guest token to be used
     * @param flowToken The flow token for verifying the password
     * @param password The password to be verified for login
     */
     private async verifyPassword(
        authToken: string,
        guestToken: string,
        flowToken: string,
        password: string
    ): Promise<string> {
        // Fetching the flow token used to finalize login
        var res = await fetch(loginContinueUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken }),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${flowToken}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterPassword\",\"enter_password\":{\"password\":\"${password}\",\"link\":\"next_link\"}}]}`
        })
        .then(data => data.json())
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res['flow_token'];
    }

    /**
     * @summary Verifies the input password
     * @returns The flow token to be used for finalizing login
     * @param authToken The authentication token to be used
     * @param guestToken The guest token to be used
     * @param flowToken The flow token for verifying the password
     * @param password The password to be verified for login
     */
     private async finalizeLogin(
        authToken: string,
        guestToken: string,
        flowToken: string
    ): Promise<string> {
        // Fetching the headers after successfull login
        var res = await fetch(loginContinueUrl(), {
            headers: unauthorizedHeader({ authToken: authToken, guestToken: guestToken }),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${flowToken}\",\"subtask_inputs\":[{\"subtask_id\":\"AccountDuplicationCheck\",\"check_logged_in_account\":{\"link\":\"AccountDuplicationCheck_false\"}}]}`
        })
        .then(data => data.headers)
        .catch(err => {
            throw err;
        });

        //@ts-ignore
        return res;
    }

    /**
     * @returns The authentication credentials of the given account
     * @param email The email of the account which is to be logged into
     * @param userName The username of the user associated with the account
     * @param password The password to the account
     */
    async loginAccount(email: string, userName: string, password: string) {
        var flowToken: string = ''                                          // To store flow token for each step of login
        var guestCredentials = await this.getGuestCredentials();

        // Initiating login process
        flowToken = await this.getLoginFlow(guestCredentials.authToken, guestCredentials.guestToken);
        flowToken = await this.initiateLogin(guestCredentials.authToken, guestCredentials.guestToken, flowToken);
        flowToken = await this.verifyEmail(guestCredentials.authToken, guestCredentials.guestToken, flowToken, email);
        flowToken = await this.verifyUserName(guestCredentials.authToken, guestCredentials.guestToken, flowToken, userName);
        flowToken = await this.verifyPassword(guestCredentials.authToken, guestCredentials.guestToken, flowToken, password);
        
        // Getting the account credentials
        var creds = await this.finalizeLogin(guestCredentials.authToken, guestCredentials.guestToken, flowToken);

        console.log(creds);
    }
}