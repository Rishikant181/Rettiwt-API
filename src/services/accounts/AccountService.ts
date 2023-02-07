// PACKAGES
import axios, { AxiosHeaders, AxiosResponse } from 'axios';

// SERVICES
import { AuthService } from '../AuthService';

// TYPES
import { GuestCredentials } from '../../types/Authentication';

// HELPERS
import LoginFlows from './LoginFlows';

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
     * @param guestCreds The guest credentials to use
     * @param cookie The cookie to be added to the header
     * @returns The AxiosHeader object containing the given param, to be used for logging in
     */
    private getLoginHeaders(guestCreds: GuestCredentials, cookie: string): AxiosHeaders {
        return new AxiosHeaders({ 
            'sec-ch-ua': '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"', 
            'x-twitter-client-language': 'en', 
            'sec-ch-ua-mobile': '?0', 
            'authorization': guestCreds.authToken, 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78', 
            'content-type': 'application/json', 
            'x-guest-token': guestCreds.guestToken, 
            'x-twitter-active-user': 'yes', 
            'sec-ch-ua-platform': '"Windows"', 
            'Accept': '*/*', 
            'host': 'api.twitter.com', 
            'Cookie': cookie
        });
    }

    /**
     * @summary Initiates the login process
     * @returns The response received from Twitter API
     */
    private async initiateLogin(): Promise<AxiosResponse> {
        // Initiating the login process
        const res: AxiosResponse = await axios.post(LoginFlows.InitiateLogin.url, JSON.stringify(LoginFlows.InitiateLogin.body));

        return res;
    }
}