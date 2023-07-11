// SERVICES
import { TweetService } from "../services/data/TweetService";
import { UserService } from "../services/data/UserService";

/**
 * The data context from where data is to be fetched.
 * 
 * @public
 */
export interface IDataContext {
    /** Handles data related to users. */
    users: UserService,

    /** Handles data related to tweets. */
    tweets: TweetService
}