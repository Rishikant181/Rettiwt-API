// SERVICES
import { AccountService } from "../../services/accounts/AccountService";
import { TweetService } from "../../services/data/TweetService";
import { UserService } from "../../services/data/UserService";

/**
 * The cursor to the batch of data to be fetched
 * @public
 */
export class Cursor {
    // MEMBER DATA
    /** The cursor string */
    value: string;

    // MEMBER DATA
    /**
     * Initializes a new cursor from the given cursor string
     * 
     * @param cursorStr The string representation of the cursor
     */
    constructor(cursorStr: string) {
        this.value = cursorStr;
    }
}

/**
 * The data that us fetched batch-wise along with a cursor
 * 
 * @typeParam Type - The type of data present in the list
 * @public
 */
export interface CursoredData<Type> {
    /** The list of data of the given type */
    list: Type[];

    /** The cursor to the next batch of data */
    next: Cursor;
}

/**
 * The data context from where data is to be fetched
 * 
 * @public
 */
export interface DataContext {
    /** Handles data related to users */
    users: UserService,

    /** Handles data related to tweets */
    tweets: TweetService,

    /** Handles account related operations  */
    account: AccountService
}