// SERVICES
import { AuthService } from '../AuthService';

// FLOWS
import {
    getLoginFlow,
    initiateLogin,
    verifyEmail,
    verifyUserName,
    verifyPassword,
    finalizeLogin
} from './LoginFlows';

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService {
    // MEMBER METHODS
    /**
     * @summary Logins into the given account and stores the cookies and logged in credentials to database
     * @param email The email associated with the account to be logged into
     * @param userName The user name of the account
     * @param password The password to the account
     */
    async login(email: string, userName: string, password: string): Promise<void> {
        // Getting the guest credentials for logging in
        var guestCredentials = await AuthService.getInstance().getGuestCredentials();

        // Initiating login process
        getLoginFlow(guestCredentials.authToken, guestCredentials.guestToken)
        .then(token => initiateLogin(guestCredentials.authToken, guestCredentials.guestToken, token))
        .then(token => verifyEmail(guestCredentials.authToken, guestCredentials.guestToken, token, email))
        .then(token => verifyUserName(guestCredentials.authToken, guestCredentials.guestToken, token, userName))
        .then(token => verifyPassword(guestCredentials.authToken, guestCredentials.guestToken, token, password))
        .then(token => finalizeLogin(guestCredentials.authToken, guestCredentials.guestToken, token))
        .then(data => console.log(data))
        .catch(err => {
            throw err;
        })
    }
}