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
 * @param apiKey The API key (cookie string) to use for fetching data.
 * @returns The API for fetching user and tweet data.
 */
export const Rettiwt = (apiKey: string) => {
    // Preparing auth credentials
    const cred: AuthCredential = new AuthCredential(apiKey.split(';'));

    // Using the auth service instance to create data services instances
    return {
        users: new UserService(cred),
        tweets: new TweetService(cred)
    };
}