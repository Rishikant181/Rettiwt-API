// SERVICES
import { AuthService } from "./services/AuthService";
import { UserService } from "./services/data/UserService";
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
        users: new UserService(auth),
        tweets: new TweetService(auth),
        account: new AccountService(),
        trends: new TrendService(auth)
    };
}

// Exporting additional types
export { User } from './types/data/User';
export { Tweet, TweetEntities, TweetFilter } from './types/data/Tweet';
export { Cursor, CursoredData } from './types/data/Service';
export { AuthenticationErrors, ValidationErrors, DataErrors } from './types/data/Errors';