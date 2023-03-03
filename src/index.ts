// SERVICES
import { AuthService } from "./services/AuthService";
import { UserService } from "./services/data/UserService";
import { TweetService } from "./services/data/TweetService";
import { AccountService } from "./services/accounts/AccountService";

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
        account: new AccountService()
    };
}

// Exporting classes
export * from './services/FetcherService';
export * from './services/accounts/AccountService';
export * from './services/data/TweetService';
export * from './services/data/UserService';

// Exporting types
export * from './types/data/Errors';
export * from './types/data/Service';
export * from './types/data/Tweet';
export * from './types/data/User';