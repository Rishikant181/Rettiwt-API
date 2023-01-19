// PACKAGE LIBS
import { Request } from 'express';

// CUSTOM LIBS
import { UserAccountService } from '../services/data/UserAccountService';
import { TweetService } from '../services/data/TweetService';
import { AuthService } from '../services/AuthService';

export default class ResolverBase {
    // MEMBER DATA
    protected users: UserAccountService;                                // To store instance of user account service
    protected tweets: TweetService;                                     // To store instance of tweet services
    private auth: AuthService;                                          // To store instance of authentication service to use
    private cookie: string;                                             // To store the cookie string for authenticating

    // MEMBER METHODS
    constructor(context: Request) {
        // Getting the cookie from the context
        this.cookie = context.query.cookie + '';

        // Initializing services
        this.auth = new AuthService(this.cookie);
        this.users = new UserAccountService(this.auth);
        this.tweets = new TweetService(this.auth);
    }
}