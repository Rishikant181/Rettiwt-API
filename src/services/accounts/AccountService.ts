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

/**
 * Handles all operations related to a user's account, such as loggin in, managing account, etc
 * @public
 */
export class AccountService {
    // MEMBER DATA
    /** The AuthService instance to use for authentication. */
    private auth: AuthService;
    
    /** The current guest credentials to use. */
    private guestCreds: GuestCredentials;

    /** The cookies received from Twitter after logging in. */
    private cookies: Cookie[];

    /** The flow token received after execution of current flow. */
    private flowToken: string;

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
     * Step 1: Initiates login
     * @internal
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
     * Step 2: Does something
     * @internal
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
     * Step 3: Takes the email for login
     * @internal
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
     * Step 4: Takes the username for login
     * @internal
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
     * Step 5: Takes the password for login
     * @internal
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
     * Step 6: Gets the actual cookies
     * @internal
     */
    private async accountDuplicationCheck(): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.AccountDuplicationCheck.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.AccountDuplicationCheck.body(this.flowToken))
        });

        // Getting the cookies from the set-cookie header of the reponse.
        this.cookies = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * Login to Twitter using the given credentials and get back the cookies.
     * @public
     * 
     * @param email The email of the account to be logged into
     * @param userName The username associated with the given account
     * @param password The password to the account
     * @returns The cookies for authenticating with the given account
     */
    public async login(email: string, userName: string, password: string): Promise<string> {
        /**
         * This works by sending a chain of request that are required for login to twitter.
         * Each method in the chain returns a flow token that must be provied as payload in the next method in the chain.
         * Each such method is called a subtask.
         * Each subtask sets the {@link flowToken} property of the class which is then given in the payload of the next subtask.
         * The final subtask returns the headers which actually contains the cookie in the 'set-cookie' field.
         */
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