// SERVICES
import { AuthService } from "./services/AuthService";
import { UserAccountService } from "./services/data/UserAccountService";
import { TweetService } from "./services/data/TweetService";
import { AccountService } from "./services/accounts/AccountService";
import { TrendService } from "./services/data/TrendService";

/**
 * @param cookie The cookies string to use to fetch data
 * @returns The API for fetching user and tweet data
 */
export const Rettiwt = (cookie: string = '') => {
    // Creating new auth service instance using the given cookie string
    const auth: AuthService = new AuthService(cookie);

    // Using the auth service instance to create data services instances
    return {
        users: new UserAccountService(auth),
        tweets: new TweetService(auth),
        account: new AccountService(),
        trends: new TrendService(auth)
    };
}