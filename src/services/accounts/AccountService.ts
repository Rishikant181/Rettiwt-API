// PACKAGES
import axios, { AxiosHeaders, AxiosResponse } from 'axios';

// SERVICES
import { AuthService } from '../AuthService';

// TYPES
import { GuestCredentials } from '../../types/Authentication';

// HELPERS
import LoginFlows from './LoginFlows';
import { loginHeader } from '../helper/Headers';

export class AccountService {
    // MEMBER DATA
    private auth: AuthService;                                                  // To store the auth service instance to use
    private guestCreds: GuestCredentials;                                       // To store the guest credentials to use
    private cookie: string;                                                     // To store the cookies received

    // MEMBER METHODS
    constructor() {
        this.auth = new AuthService();
        this.guestCreds = { authToken: '', guestToken: '' };
        this.cookie = '';
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
    private async initiateLogin(): Promise<AxiosResponse> {
        // Initiating the login process
        const res: AxiosResponse = await axios.post(LoginFlows.InitiateLogin.url, JSON.stringify(LoginFlows.InitiateLogin.body), {
            headers: loginHeader(await this.getGuestCredentials(), this.cookie)
        });

        return res;
    }

    public async login(email: string, userName: string, password: string) {
        this.initiateLogin().then(res => {
            console.log(res);
        });
    }
}