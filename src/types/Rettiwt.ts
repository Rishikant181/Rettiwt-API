// SERVICES
import { TweetService } from '../services/TweetService';
import { UserService } from '../services/UserService';

/**
 * The data context from where data is to be fetched.
 *
 * @public
 */
export interface IDataContext {
	/** Handles data related to users. */
	users: UserService;

	/** Handles data related to tweets. */
	tweets: TweetService;
}
