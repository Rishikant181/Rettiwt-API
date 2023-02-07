// PACKAGES
import axios from 'axios';

// TYPES
import { GuestCredentials } from '../../types/Authentication';

// HELPERS
import LoginFlows from './LoginFlows';

export class AccountService {
    // MEMBER DATA
    private guestCreds: GuestCredentials;                                       // To store the guest credentials to use
    private cookie: string;                                                     // To store the cookies received

    // MEMBER METHODS
    constructor() {
        this.guestCreds = { authToken: '', guestToken: '' };
        this.cookie = '';
    }
}