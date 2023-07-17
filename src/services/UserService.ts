// PACKAGES
import { EResourceType, ITweet as IRawTweet, IUser as IRawUser } from 'rettiwt-core';
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { FetcherService } from './FetcherService';

// MODELS
import { User } from '../models/User';
import { Tweet } from '../models/Tweet';

// TYPES
import { CursoredData } from '../models/CursoredData';

/**
 * Handles fetching of data related to user account
 */
export class UserService extends FetcherService {
	/**
	 * @param cred - The credentials to use for authenticating against Twitter API.
	 *
	 * @internal
	 */
	constructor(cred: AuthCredential) {
		super(cred);
	}

	/**
	 * Get the details of a user.
	 *
	 * @param userName - The username of the target user.
	 * @returns The details of the given user.
	 *
	 * @public
	 */
	async details(userName: string): Promise<User> {
		// Fetching the requested data
		const data = await this.fetch<IRawUser>(EResourceType.USER_DETAILS, { id: userName });

		// Deserializing data
		const user = new User(data.list[0]);

		return user;
	}

	/**
	 * Get the list of users who are followed by the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of following to fetch, must be \>= 40 (when no cursor is provided) and \<=100.
	 * @param cursor - The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users followed by the target user.
	 *
	 * @public
	 */
	async following(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetch<IRawUser>(EResourceType.USER_FOLLOWING, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing data
		const users = data.list.map((item) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}

	/**
	 * Get the list followers of a given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of followers to fetch, must be \>= 40 (when no cursor is provided) and \<=100.
	 * @param cursor - The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users following the target user.
	 *
	 * @public
	 */
	async followers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Fetching the requested data
		const data = await this.fetch<IRawUser>(EResourceType.USER_FOLLOWERS, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing data
		const users = data.list.map((item) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}

	/**
	 * Get the list of tweets liked by the given user.
	 *
	 * @param userId - The rest id of the target user.
	 * @param count - The number of likes to fetch.
	 * @param cursor - The cursor to next batch. If blank, first batch is fetched, must be \>= 40 (when no cursor is provided) and \<=100.
	 * @returns The list of tweets liked by the target user.
	 *
	 * @public
	 */
	async likes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Fetching the requested data
		const data = await this.fetch<IRawTweet>(EResourceType.USER_LIKES, {
			id: userId,
			count: count,
			cursor: cursor,
		});

		// Deserializing data
		const tweets = data.list.map((item) => new Tweet(item));

		return new CursoredData<Tweet>(tweets, data.next.value);
	}
}
