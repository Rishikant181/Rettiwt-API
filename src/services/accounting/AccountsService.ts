// PACKAGE LIBS
import { AxiosResponseHeaders } from 'axios';

// CUSTOM LIBS

// SERVICES
import { AuthService } from '../AuthService';
import { FetcherService } from '../FetcherService';

// TYPES
import { GuestCredentials, LoginCredentials, LoginFlow } from '../../types/Authentication';
import { HttpMethods } from '../../types/HTTP';

// HELPERS
import { generateLoginFlow, LoginFlows } from "./LoginFlows";

/**
 * The service that handles all operations related to accounting
 */
export class AccountsService extends FetcherService {
    // MEMBER METHODS

    /**
     * @returns The response from Twitter after execution of the given flow
     * @param flow The flow to be executed against Twitter API
     * @param guestCredentials The guest credentials to use for making HTTP request
     */
    private async executeFlow(flow: LoginFlow, guestCredentials: GuestCredentials): Promise<{headers: AxiosResponseHeaders, nextFlowName: LoginFlows, nextFlowToken: string}> {
        // Executing the given flow
        var res = await this.fetchData<any>(flow.url, HttpMethods.POST, flow.body, false, guestCredentials)
        // If error occurs while logging in
        .catch(err => {
            // Getting the list of errors
            const errors = err.response.data.errors;
            
            throw new Error(errors[0].message);
        });
        
        // Getting the response body
        var data = res.data;
            
        // Returning the response body as well as data of the flow
        return {
            headers: res.headers,
            nextFlowName: LoginFlows[data['subtasks'][0]['subtask_id'] as LoginFlows],
            nextFlowToken: data['flow_token']
        };
    }
    
    /**
     * @summary Logins into the given account and stores the cookies and store logged in credentials to database
     * @returns The logged in account's cookies and other credentials
     * @param cred The login credentials of the Twitter account to be logged into
     */
    async login(cred: LoginCredentials): Promise<AxiosResponseHeaders> {
        var currentFlowName: LoginFlows = LoginFlows.Login;                     // To store current flow name
        
        // Getting the initial flow
        var currentFlow = generateLoginFlow(cred, '', LoginFlows.Login);
        
        // Getting the guest credentials to use
        var guestCredentials = await (await AuthService.getInstance()).getGuestCredentials(true);

        // Executing each flow successively
        while(true) {
            var res = await this.executeFlow(currentFlow, guestCredentials);

            // If this is the last step of login
            /**
             * The last step is actually LoginSuccessSubtask, but it doesn't do anything substantial
             * The actual cookies and credentials are returned in AccountDuplicationCheck flow
             */
            if(currentFlowName == LoginFlows.AccountDuplicationCheck) {
                // Storing credentials in database
                await (await AuthService.getInstance()).storeCredentials(res.headers);
                
                // Returning the headers
                return res.headers;
            }
            else {
                // Changing flow name
                currentFlowName = LoginFlows[res.nextFlowName];

                // Changing current flow data
                currentFlow = generateLoginFlow(cred, res.nextFlowToken, currentFlowName);
            }
        }
    }
}