// PACKAGES
import { curly, CurlyResult } from 'node-libcurl';

// SERVICES
import { AuthService } from './AuthService';

// TYPES
import { IGuestCredentials, IAuthCookie } from '../../types/Authentication';

// ENUMS
import { HttpStatus } from '../../enums/HTTP';
import { AuthenticationErrors } from '../../enums/Errors';

// HELPERS
import LoginFlows from '../helper/payloads/LoginFlows';
import { loginHeader } from '../helper/Headers';
import { Cookie, CookieJar } from 'cookiejar';

/**
 * Handles all operations related to a user's account, such as loggin in, managing account, etc
 * @public
 */
export class AccountService {
    /** The AuthService instance to use for authentication. */
    private auth: AuthService;
    
    /** The current guest credentials to use. */
    private guestCreds: IGuestCredentials;

    /** The cookies received from Twitter after logging in. */
    private cookies: Cookie[];

    /** The flow token received after execution of current flow. */
    private flowToken: string;

    constructor() {
        this.auth = new AuthService();
        this.guestCreds = { authToken: '', guestToken: '' };
        this.cookies = [];
        this.flowToken = '';
    }

    /**
     * @returns The current guest credentials to use. If if does not exists, then a new one is created
     */
    private async getGuestCredentials(): Promise<IGuestCredentials> {
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
     * 
     * @throws {@link AuthenticationErrors.InvalidEmail}, if email does not exist.
     */
    private async enterUserIdentifier(email: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterUserIdentifier.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterUserIdentifier.body(this.flowToken, email))
        });

        // If no account found with given email
        if (res.statusCode == HttpStatus.BadRequest && res.data.errors[0].code == 399) {
            throw new Error(AuthenticationErrors.InvalidEmail);
        }

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * Step 4: Takes the username for login
     * @internal
     * 
     * @throws {@link AuthenticationErrors.InvalidUsername}, if wrong username entered.
     */
    private async enterAlternateUserIdentifier(userName: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterAlternateUserIdentifier.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterAlternateUserIdentifier.body(this.flowToken, userName))
        });

        // If invalid username for the given account
        if (res.statusCode == HttpStatus.BadRequest && res.data.errors[0].code == 399) {
            throw new Error(AuthenticationErrors.InvalidUsername);
        }

        // Getting the flow token
        this.flowToken = res.data['flow_token'];
    }

    /**
     * Step 5: Takes the password for login
     * @internal
     * 
     * @throws {@link AuthenticationErrors.InvalidPassword}, incorrect password entered.
     */
    private async enterPassword(password: string): Promise<void> {
        // Executing the flow
        const res: CurlyResult = await curly.post(LoginFlows.EnterPassword.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.EnterPassword.body(this.flowToken, password))
        });

        // If invalid password for the given account
        if (res.statusCode == HttpStatus.BadRequest && res.data.errors[0].code == 399) {
            throw new Error(AuthenticationErrors.InvalidPassword);
        }

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
     * Execute all the flows required to login to Twitter, using the given credentials, then set the response cookies.
     * 
     * @internal
     * 
     * @param email The email of the account to be logged into.
     * @param userName The username associated with the given account.
     * @param password The password to the account.
     */
    private async executeLoginFlows(email: string, userName: string, password: string): Promise<void> {
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
    }

    /**
     * Parse the authentication cookies recieved from Twitter into known format.
     * 
     * @internal
     * 
     * @param cookies The raw cookies received from Twitter.
     * 
     * @returns The parsed cookies of type {@link AuthCookie}
     */
    private parseCookies(cookies: Cookie[]): IAuthCookie {
        /** The tempoorary parsed cookies. */
        let tempCookies: any = {};
        
        /**
         * Parsing the cookies into a standard JSON format.
         * The format is 'cookie_name': 'cookie_value'.
         * All other cookie parameters like expiry, etc are dropped.
         */
        cookies.forEach(cookie => {
            tempCookies[cookie.name] = cookie.value;
        });

        return {
            kdt: tempCookies['kdt'],
            twid: tempCookies['twid'],
            ct0: tempCookies['ct0'],
            auth_token: tempCookies['auth_token']
        };
    }

    /**
     * Login to Twitter using the given credentials and get back the cookies.
     * 
     * @public
     * 
     * @param email The email of the account to be logged into.
     * @param userName The username associated with the given account.
     * @param password The password to the account.
     * 
     * @returns The cookies for authenticating with the given account.
     */
    public async login(email: string, userName: string, password: string): Promise<IAuthCookie> {
        /** The parsed cookies that will be returned. */
        let parsedCookies: IAuthCookie;
        
        // Executing all login flows
        await this.executeLoginFlows(email, userName, password);

        // Parsing the cookies
        parsedCookies = this.parseCookies(this.cookies);
        
        // Returning the final parsed cookies
        return parsedCookies;
    }
}