// PACKAGES
import 'reflect-metadata';

// SERVICES
import { AuthService } from "./services/auth/AuthService";
import { UserService } from "./services/data/UserService";
import { TweetService } from "./services/data/TweetService";
import { AccountService } from "./services/auth/AccountService";

// TYPES
import { AuthCookie as IAuthCookie } from './types/Authentication';

/**
 * The instance for fetching data from Twitter.
 * 
 * @public
 * 
 * @param cookie The cookie to use to fetch data.
 * 
 * @returns The API for fetching user and tweet data.
 * 
 * @remarks The cookie can be obtained by using {@link AccountService.login} method.
 * To use the {@link AccountService.login} method, create a {@link Rettiwt} instance without passing any cookie .
 * Then use the {@link AccountService.login} method of {@link AccountService} to get the cookie.
 */
export const Rettiwt = (cookie?: IAuthCookie) => {
    // Creating new auth service instance using the given cookie
    const auth: AuthService = new AuthService(cookie);

    // Using the auth service instance to create data services instances
    return {
        users: new UserService(auth),
        tweets: new TweetService(auth),
        account: new AccountService()
    };
}

// Exporting classes
export * from './services/auth/AuthService';
export * from './services/auth/AccountService';
export * from './services/data/TweetService';
export * from './services/data/UserService';
export * from './services/util/CacheService';
export * from './services/util/FetcherService';

// Exporting types
export * from './types/Args';
export { AuthCookie } from './types/Authentication';
export * from './types/Rettiwt';
export * from './types/Service';
export * from './types/Tweet';
export * from './types/User';