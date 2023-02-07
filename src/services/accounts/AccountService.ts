// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// SERVICES
import { AuthService } from '../AuthService';

// TYPES
import { GuestCredentials } from '../../types/Authentication';

// HELPERS
import LoginFlows from './LoginFlows';
import { loginHeader } from '../helper/Headers';
import { Cookie, CookieJar } from 'cookiejar';

export class AccountService {
    // MEMBER DATA
    private auth: AuthService;                                                  // To store the auth service instance to use
    private guestCreds: GuestCredentials;                                       // To store the guest credentials to use
    private cookies: Cookie[];                                                  // To store the cookies received from twitter
    private flowToken: string;                                                  // To store the flow token received from current flow

    // MEMBER METHODS
    constructor() {
        this.auth = new AuthService();
        this.guestCreds = { authToken: '', guestToken: '' };
        this.cookies = [];
        this.flowToken = '';
    }

    /**
     * @returns The current guest credentials to use. If if does not exists, then a new one is created
     */
    private async getGuestCredentials(): Promise<GuestCredentials> {
        // If a guest credential has not been already set, get a new one
        if (!this.guestCreds.guestToken) {
            this.guestCreds = await this.auth.getGuestCredentials();
        }

        return this.guestCreds;
    }

    /**
     * @summary Step 1: Initiates login
     */
    private async initiateLogin(): Promise<void> {
        // Initiating the login process
        const res: CurlyResult = await curly.post(LoginFlows.InitiateLogin.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.toString()),
            sslVerifyPeer: false,
            postFields: ''
        });

        // Storing cookies received
        this.cookies = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @summary Step 2: Does something
     */
    private async jsInstrumentationSubtask(): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.JsInstrumentationSubtask.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.JsInstrumentationSubtask.body(this.flowToken))
        });

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @summary Step 3: Takes the email for login
     */
    private async enterUserIdentifier(email: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterUserIdentifier.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterUserIdentifier.body(this.flowToken, email))
        });

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @summary Step 4: Takes the username for login
     */
    private async enterAlternateUserIdentifier(userName: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterAlternateUserIdentifier.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterAlternateUserIdentifier.body(this.flowToken, userName))
        });

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @summary Step 5: Takes the password for login
     */
    private async enterPassword(password: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterPassword.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterPassword.body(this.flowToken, password))
        });

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @summary Step 6: Gets the actual cookies
     */
    private async accountDuplicationCheck(): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.AccountDuplicationCheck.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.AccountDuplicationCheck.body(this.flowToken))
        });

        // Storing cookies received
        this.cookies = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * @param email The email of the account to be logged into
     * @param userName The username associated with the given account
     * @param password The password to the account
     * @returns The cookies for authenticating with the given account
     */
    public async login(email: string, userName: string, password: string): Promise<string> {
        // Executing each step of login flow
        await this.initiateLogin();
        await this.jsInstrumentationSubtask();
        await this.enterUserIdentifier(email);
        await this.enterAlternateUserIdentifier(userName);
        await this.enterPassword(password);
        await this.accountDuplicationCheck();
        
        // Returning the final cookies
        return this.cookies.join(';');
    }
}