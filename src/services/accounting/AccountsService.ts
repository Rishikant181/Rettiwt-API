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

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService {
    // MEMBER DATA
    private guestCredentials: {
        authToken: string,
        guestToken: string
    };                                                                  // To store the guest credentials for logging in
    private currentFlow: string;                                        // To store the current flow token
    
    // MEMBER METHODS
    /**
     * @summary Initializes the member data of the service and returns the initialized instance
     */
    async init(): Promise<AccountsService> {
        // Initializing member data
        this.guestCredentials = await AuthService.getInstance().getGuestCredentials();
        this.currentFlow = '';

        return this;
    }

    // LOGIN FLOWS

    /**
    * @returns The flow token used to initiate the login process
    */
    private async getLoginFlow(): Promise<void> {
        // Fetching the flow token to initiate login process
        return fetch(initiateLoginUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: "{\"input_flow_data\":{\"flow_context\":{\"debug_overrides\":{},\"start_location\":{\"location\":\"splash_screen\"}}},\"subtask_versions\":{\"contacts_live_sync_permission_prompt\":0,\"email_verification\":1,\"topics_selector\":1,\"wait_spinner\":1,\"cta\":4}}"
        })
        .then(data => handleHTTPError(data))
        .then(data => data.json())
        //@ts-ignore
        .then(data => { this.currentFlow = data['flow_token'] })
        .catch(err => {
            throw err;
        });
    }

    /**
    * @summary Initiates the login process
    * @returns The flow token used for verifying the email
    */
    private async initiateLogin(): Promise<void> {
        // Fetching the flow token used to verify email
        return fetch(loginContinueUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${this.currentFlow}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginJsInstrumentationSubtask\",\"js_instrumentation\":{\"response\":\"{\\\"rf\\\":{\\\"f3d0013d2401a9e86a63dac052aeec19524813e572f0b446241b550bc1e653e8\\\":-146,\\\"abef77ded0018c5ef4a2146465e76811c8ee7a377ff84c2181e58ac7e5bb8b97\\\":-17,\\\"a6d95f40b2cc05ac2baa2ce64ce976d3558cd9ca79a3e1ae797d3bda62847470\\\":112,\\\"ae30e4310433b0ae4e670acd918eebd0056daee600fa9db57082e8ace2c2fb1c\\\":14},\\\"s\\\":\\\"AR1nIiYWWtrhpM2n5cu-WDC77syV8L_zqLIHxmAePc0nhZAnrh3WdNig2MMFoIk-k1TjxWijXgVtjbLaYB-gTFA9KigwnaVsno0o6deCU1b_uH3XxKCRwaE-KN3c65PXRKNJP08YB1nQENeFXgM9MsrywIO0C60zGlPWj8XlB9sAICGoJ26OJ7IgvMZP_5VgIJZwMDpJx3gN4xhI44n32TiLxerU59vDbwltkf0rgsIL34PODWWDOt9m07jrFaPFkt40T_G0sWJhuy9xfEWetgOmMLnQCpn4Ut6kl_W9Yi6wNDH1vtnRMbgeKgaJJRv2cTIvOa9DBvYV63cp_3G9WQAAAYBLmqMB\\\"}\",\"link\":\"next_link\"}}]}`,
        })
        .then(data => handleHTTPError(data))
        .then(data => data.json())
        //@ts-ignore
        .then(data => { this.currentFlow = data['flow_token'] })
        .catch(err => {
            throw err;
        });
    }

    /**
    * @summary Verifies the input email
    * @param email The email associated with account to be logged into
    */
    private async verifyEmail(email: string): Promise<void> {
        // Fetching the flow token used to verify user name of the account with given email
        return fetch(loginContinueUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${this.currentFlow}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterUserIdentifierSSOSubtask\",\"settings_list\":{\"setting_responses\":[{\"key\":\"user_identifier\",\"response_data\":{\"text_data\":{\"result\":\"${email}\"}}}],\"link\":\"next_link\"}}]}`
        })
        .then(data => handleHTTPError(data))
        .then(data => data.json())
        //@ts-ignore
        .then(data => { this.currentFlow = data['flow_token'] })
        .catch(err => {
            throw err;
        });
    }

    /**
    * @summary Verifies the input username
    * @param userName The user name of the user of the account to log into
    */
    private async verifyUserName(userName: string): Promise<void> {
        // Fetching the flow token used to verify password of the account with given user name
        return fetch(loginContinueUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${this.currentFlow}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterAlternateIdentifierSubtask\",\"enter_text\":{\"text\":\"${userName}\",\"link\":\"next_link\"}}]}`
        })
        .then(data => handleHTTPError(data))
        .then(data => data.json())
        //@ts-ignore
        .then(data => { this.currentFlow = data['flow_token'] })
        .catch(err => {
            throw err;
        });
    }

    /**
    * @summary Verifies the input password
    * @param password The password of the account to be logged into
    */
    private async verifyPassword(password: string): Promise<void> {
        // Fetching the flow token used to finalize login
        return fetch(loginContinueUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${this.currentFlow}\",\"subtask_inputs\":[{\"subtask_id\":\"LoginEnterPassword\",\"enter_password\":{\"password\":\"${password}\",\"link\":\"next_link\"}}]}`
        })
        .then(data => handleHTTPError(data))
        .then(data => data.json())
        //@ts-ignore
        .then(data => { this.currentFlow = data['flow_token'] })
        .catch(err => {
            throw err;
        });
    }

    /**
    * @summary Verifies the input password
    * @returns The flow token to be used for finalizing login
    */
    private async finalizeLogin(): Promise<Headers> {
        // Fetching the headers after successfull login
        return fetch(loginContinueUrl(), {
            headers: unauthorizedHeader(this.guestCredentials),
            method: HttpMethods.POST,
            body: `{\"flow_token\":\"${this.currentFlow}\",\"subtask_inputs\":[{\"subtask_id\":\"AccountDuplicationCheck\",\"check_logged_in_account\":{\"link\":\"AccountDuplicationCheck_false\"}}]}`
        })
        .then(data => handleHTTPError(data))
        .then(data => data.headers)
        .catch(err => {
            throw err;
        });
    }

    /**
     * @summary Logins into the given account and stores the cookies and logged in credentials to database
     * @returns The logged in account's cookies and other credentials
     * @param email The email associated with the account to be logged into
     * @param userName The user name of the account
     * @param password The password to the account
     */
    async login(email: string, userName: string, password: string): Promise<void> {
        // Getting the guest credentials for logging in
        // Initiating login process
        this.getLoginFlow()
        .then(() => this.initiateLogin())
        .then(() => this.verifyEmail(email))
        .then(() => this.verifyUserName(userName))
        .then(() => this.verifyPassword(password))
        .then(() => this.finalizeLogin())
        .then(data => console.log(data))
        .catch(err => {
            throw err
        });
    }
}