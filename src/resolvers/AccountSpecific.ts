// This files contains resolvers for account specific operations

// CUSTOM LIBS

// SERVICES
import { AccountsService } from '../services/accounting/AccountsService';

// TYPES
import { LoginCredentials } from '../types/Authentication';

/**
 * @returns Whether login was successfull or not
 * @param email The email associated with the Twitter account to be logged into
 * @param userName The username of the user of the Twitter account
 * @param password The password to the Twitter account
 */
export async function resolveUserLogin(cred: LoginCredentials): Promise<boolean> {
    // Initializing the service used for handling accounting operations
    var accountsService = new AccountsService();

    // Logging into the given account
    return await accountsService.login(cred);
}