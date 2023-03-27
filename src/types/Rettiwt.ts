// SERVICES
import { AccountService } from "../services/accounts/AccountService";
import { TweetService } from "../services/data/TweetService";
import { UserService } from "../services/data/UserService";

/**
 * The data context from where data is to be fetched.
 * 
 * @public
 */
export interface DataContext {
    /** Handles data related to users. */
    users: UserService,

    /** Handles data related to tweets. */
    tweets: TweetService,

    /** Handles account related operations. */
    account: AccountService
}