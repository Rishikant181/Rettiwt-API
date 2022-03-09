// This files contains resolvers for user specific operations

// CUSTOM LIBS
import { UserAccountService } from "../../../services/DataServices/UserAccountService";
import { config } from '../../../config/env'

// Initialsing the service to fetch user details
var userService = new UserAccountService(
    config['twitter']['auth']['authToken'],
    config['twitter']['auth']['csrfToken'],
    config['twitter']['auth']['cookie']
);

/**
 * @param userName The user name of the target twitter user
 * @returns The details of the target twitter user
 */
export async function resolveUserDetails(userName: string): Promise<any> {
    // Getting the data
    var res = (await userService.getUserAccountDetails(userName)).data;

    return res;
}