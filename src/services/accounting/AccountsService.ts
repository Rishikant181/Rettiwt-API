// CUSTOM LIBS

// SERVICES
import { AuthService } from '../AuthService';
import { FetcherService } from '../FetcherService';

// TYPES
import { LoginCredentials } from '../../types/Authentication';
import {
    HttpMethods,
    Response
} from '../../types/HTTP';

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
     * @param cred The login credentials of the Twitter account to be logged into
     */
    async login(cred: LoginCredentials): Promise<Response<Headers>> {
        var flowName: LoginFlows = LoginFlows.Login;                            // To store current flow name
        var data = null;                                                        // To store the response of each fetch
        var loginComplete: boolean = false;                                     // To store whether login is complete or not
        var error: any = undefined;                                             // To store error, if any
        
        // Getting the initial flow
        var currentFlow = generateLoginFlow(cred, '', LoginFlows.Login);
        
        // Getting the guest credentials to use
        var guestCredentials = await (await AuthService.getInstance()).getGuestCredentials(true);

        while(true) {
            data = await this.fetchData(currentFlow.url, HttpMethods.POST, currentFlow.body, false, guestCredentials)
            .then(async res => {
                // If this is the last step of login
                /**
                 * The last step is actually LoginSuccessSubtask, but it doesn't do anything substantial
                 * The actual cookies and credentials are returned in AccountDuplicationCheck flow
                 */
                if(flowName == LoginFlows.AccountDuplicationCheck) {
                    loginComplete = true;
                    return res.headers;
                }

                // Parsing data to json
                res = await res.json();

                // Changing flow name
                flowName = LoginFlows[res['subtasks'][0]['subtask_id'] as LoginFlows];

                // Changing flow data
                currentFlow = generateLoginFlow(cred, res['flow_token'], flowName);
            })
            .catch(err => {
                error = err;
                loginComplete = true;
                return;
            });

            // If login is complete, return from loop
            if(loginComplete) break;
        }

        // Storing credentials in database and returning result
        return {
            success: (!error && await (await AuthService.getInstance()).storeCredentials(data)) ? true : false,
            error: error,
            data: data
        };
    }
}