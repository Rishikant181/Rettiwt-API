// PACKAGES
import {
	Url,
	EResourceType,
	IUserDetailsResponse,
	IUserFollowersResponse,
	IUserFollowingResponse,
	IUserLikesResponse,
	ITweet as IRawTweet,
	IUser as IRawUser,
} from 'rettiwt-core';
import { AuthCredential } from 'rettiwt-auth';

// SERVICES
import { FetcherService } from './FetcherService';

// MODELS
import { User } from '../models/data/User';
import { UserListArgs } from '../models/args/UserListArgs';
import { Tweet } from '../models/data/Tweet';

// TYPES
import { CursoredData } from '../models/data/CursoredData';

/**
 * Handles fetching of data related to user account
 */
export class UserService extends FetcherService {
	/**
	 * @param cred The credentials to use for authenticating against Twitter API.
	 *
	 * @internal
	 */
	constructor(cred: AuthCredential) {
		super(cred);
	}

	/**
	 * Get the details of a user.
	 *
	 * @param userName The username of the target user.
	 * @returns The details of the given user.
	 *
	 * @public
	 */
	async details(userName: string): Promise<User> {
		// Preparing the URL
		const url: string = new Url(EResourceType.USER_DETAILS, { id: userName }).toString();

		// Fetching the raw data
		const res = await this.request<IUserDetailsResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawUser>(res, EResourceType.USER_DETAILS);

		// Parsing data
		const user = new User(data.list[0]);

		return user;
	}

	/**
	 * Get the list of users who are followed by the given user.
	 *
	 * @param userId The rest id of the target user.
	 * @param count The number of following to fetch, must be >= 40 (when no cursor is provided) and <=100.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users followed by the target user.
	 *
	 * @public
	 */
	async following(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Objectifying parameters
		const args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_FOLLOWING, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetchin the raw data
		const res = await this.request<IUserFollowingResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawUser>(res, EResourceType.USER_FOLLOWING);

		// Parsing data
		const users = data.list.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}

	/**
	 * Get the list followers of a given user.
	 *
	 * @param userId The rest id of the target user.
	 * @param count The number of followers to fetch, must be >= 40 (when no cursor is provided) and <=100.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users following the target user.
	 *
	 * @public
	 */
	async followers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Objectifying parameters
		const args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_FOLLOWERS, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetching the raw data
		const res = await this.request<IUserFollowersResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawUser>(res, EResourceType.USER_FOLLOWERS);

		// Parsing data
		const users = data.list.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.next.value);
	}

	/**
	 * Get the list of tweets liked by the given user.
	 *
	 * @param userId The rest id of the target user.
	 * @param count The number of likes to fetch.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched, must be >= 40 (when no cursor is provided) and <=100.
	 * @returns The list of tweets liked by the target user.
	 *
	 * @public
	 */
	async likes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Objectifying parameters
		const args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_LIKES, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetching the raw data
		const res = await this.request<IUserLikesResponse>(url).then((res) => res.data);

		// Extracting data
		const data = this.extractData<IRawTweet>(res, EResourceType.USER_LIKES);

		// Parsing data
		const tweets = data.list.map((item: IRawTweet) => new Tweet(item));

		return new CursoredData<Tweet>(tweets, data.next.value);
	}
}
