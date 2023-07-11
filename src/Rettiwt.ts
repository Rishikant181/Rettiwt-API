// PACKAGE
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { UserService } from "./services/data/UserService";
import { TweetService } from "./services/data/TweetService";

/**
 * The instance for fetching data from Twitter.
 * 
 * @public
 * 
 * @param credential The credential to use to fetch data. * 
 * @returns The API for fetching user and tweet data.
 */
export const Rettiwt = (cred: AuthCredential) => {
    // Using the auth service instance to create data services instances
    return {
        users: new UserService(cred),
        tweets: new TweetService(cred)
    };
}