// SERVICES
import { AccountService } from "../../services/accounts/AccountService";
import { TweetService } from "../../services/data/TweetService";
import { UserService } from "../../services/data/UserService";

/**
 * @summary Stores the cursor to the batch of data
 */
export class Cursor {
    // MEMBER DATA
    value: string;                                                      // To store the cursor to next batch of data

    // MEMBER DATA
    /**
     * @summary Initializes a new cursor from the given cursor string
     * @param cursorStr The string representation of the cursor
     */
    constructor(cursorStr: string) {
        this.value = cursorStr;
    }
}

/**
 * @summary Stores cursored data that is returned by services
 */
export interface CursoredData<Type> {
    list?: Type[];                                                      // To store the list data
    next?: Cursor;                                                      // To store the information about cursor to the next batch
}

/**
 * @summary Stores the data context from where data is to be fetched
 */
export interface DataContext {
    users: UserService,                                                 // To store the source for fetching user data
    tweets: TweetService,                                               // To store the source for fetching tweet data
    account: AccountService                                             // To store the source for account related operations
}