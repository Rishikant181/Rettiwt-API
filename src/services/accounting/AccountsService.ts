// CUSTOM LIBS

// SERVICES
import { AuthService } from '../AuthService';
import { FetcherService } from '../FetcherService';

// TYPES
import { HttpMethods, Response } from '../../types/HTTP';

// HELPERS
import {
    generateLoginFlow,
    LoginFlows
} from "./LoginFlows";

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService extends FetcherService {
    // MEMBER METHODS
    
    /**
     * @summary Logins into the given account and stores the cookies and store logged in credentials to database
     * @returns The logged in account's cookies and other credentials
     * @param email The email associated with the account to be logged into
     * @param userName The user name of the account
     * @param password The password to the account
     */
    async login(email: string, userName: string, password: string): Promise<Response<Headers>> {
        var flowName: LoginFlows = LoginFlows.Login;                            // To store current flow name
        var data = null;                                                        // To store the response of each fetch
        var loginComplete: boolean = false;                                     // To store whether login is complete or not
        var error: any = undefined;                                             // To store error, if any
        
        // Getting the initial flow
        var currentFlow = generateLoginFlow(email, userName, password, '', LoginFlows.Login);
        
        // Getting the guest credentials to use
        var guestCredentials = await (await AuthService.getInstance()).getGuestCredentials(true);

        while(true) {
            data = await this.fetchData(currentFlow.url, HttpMethods.POST, currentFlow.body, false, guestCredentials)
            .then(async (res) => {
                // If this is the last step of login
                if(flowName == LoginFlows.AccountDuplicationCheck) {
                    loginComplete = true;
                    return res.headers;
                }
                // If it's any other step
                else {
                    res = await res.json();
                    
                    // Changing flow name
                    flowName = LoginFlows[res['subtasks'][0]['subtask_id'] as LoginFlows];

                    // Changing flow data
                    currentFlow = generateLoginFlow(email, userName, password, res['flow_token'], flowName);
                }
            })
            .catch(err => {
                error = err;
                loginComplete = true;
                return;
            });

            // If login is complete, return from loop
            if(loginComplete) {
                break;
            }
        }

        return { success: error ? false : true, error: error, data: data };
    }
}