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

    // MEMBER METHODS
    constructor() {
        this.auth = new AuthService();
        this.guestCreds = { authToken: '', guestToken: '' };
        this.cookies = [];
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
     * @summary Initiates the login process
     * @returns The response received from Twitter API
     */
    private async initiateLogin(): Promise<CurlyResult> {
        // Initiating the login process
        return await curly.post(LoginFlows.InitiateLogin.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.toString()),
            sslVerifyPeer: false,
            postFields: ''
        });
    }

    private async jsInstrumentationSubtask(): Promise<CurlyResult> {
        // Initiating login
        const res: CurlyResult = await this.initiateLogin();

        // Storing cookies received
        this.cookies = new CookieJar().setCookies(res.headers[0]['Set-Cookie'] as string[]);

        // Getting the flow token from previous flow
        let flowToken: string = res.data['flow_token'];

        // Executing the flow
        return await curly.post(LoginFlows.JsInstrumentationSubtask.url, {
            httpHeader: loginHeader(await this.getGuestCredentials(), this.cookies.join(';').toString()),
            sslVerifyPeer: false,
            postFields: JSON.stringify(LoginFlows.JsInstrumentationSubtask.body(flowToken))
        });
    }

    public async login(email: string, userName: string, password: string) {
        this.jsInstrumentationSubtask().then(res => {
            console.log(res);
        });
    }
}