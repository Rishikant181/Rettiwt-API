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
import { FetcherService } from '../util/FetcherService';

// MODELS
import { User } from '../../models/data/User';
import { UserListArgs } from '../../models/args/UserListArgs';
import { Tweet } from '../../models/data/Tweet';

// TYPES
import { CursoredData } from '../../models/data/CursoredData';

// EXTRACTORS
import * as UserExtractors from '../helper/extractors/Users';

/**
 * Handles fetching of data related to user account
 */
export class UserService extends FetcherService {
	/**
	 * @param cred The credentials to use for authenticating against Twitter API.
	 */
	constructor(cred: AuthCredential) {
		super(cred);
	}

	/**
	 * @param id The id/username of the target user.
	 * @returns The details of the given user.
	 */
	async getUserDetails(id: string): Promise<User> {
		let res: IUserDetailsResponse;

		// Getting data from cache
		let cachedData = await this.readData(id);

		// If data exists in cache
		if (cachedData) {
			return cachedData;
		}
		// Else, fetch the data from Twitter instead
		else {
			// Preparing the URL
			const url: string = new Url(EResourceType.USER_DETAILS, { id: id }).toString();

			// Fetching the raw data
			res = await this.request<IUserDetailsResponse>(url).then((res) => res.data);

			// Extracting data
			let data = UserExtractors.extractUserDetails(res);

			// Caching data
			this.cacheData(data);

			// Parsing data
			let user = new User(data.required[0]);

			return user;
		}
	}

	/**
	 * @param userId The rest id of the target user.
	 * @param count The number of following to fetch, must be >= 40 (when no cursor is provided) and <=100.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users followed by the target user.
	 */
	async getUserFollowing(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Objectifying parameters
		let args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_FOLLOWING, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetchin the raw data
		let res = await this.request<IUserFollowingResponse>(url).then((res) => res.data);

		// Extracting data
		let data = UserExtractors.extractUserFollow(res);

		// Caching data
		this.cacheData(data);

		// Parsing data
		let users = data.required.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.cursor);
	}

	/**
	 * @param userId The rest id of the target user.
	 * @param count The number of followers to fetch, must be >= 40 (when no cursor is provided) and <=100.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched.
	 * @returns The list of users following the target user.
	 */
	async getUserFollowers(userId: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		// Objectifying parameters
		let args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_FOLLOWERS, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetching the raw data
		let res = await this.request<IUserFollowersResponse>(url).then((res) => res.data);

		// Extracting data
		let data = UserExtractors.extractUserFollow(res);

		// Caching data
		this.cacheData(data);

		// Parsing data
		let users = data.required.map((item: IRawUser) => new User(item));

		return new CursoredData<User>(users, data.cursor);
	}

	/**
	 * @param userId The rest id of the target user.
	 * @param count The number of likes to fetch.
	 * @param cursor The cursor to next batch. If blank, first batch is fetched, must be >= 40 (when no cursor is provided) and <=100.
	 * @returns The list of tweets liked by the target user.
	 */
	async getUserLikes(userId: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		// Objectifying parameters
		let args: UserListArgs = new UserListArgs(count, cursor);

		// Preparing the URL
		const url: string = new Url(EResourceType.USER_LIKES, {
			id: userId,
			count: args.count,
			cursor: args.cursor,
		}).toString();

		// Fetching the raw data
		let res = await this.request<IUserLikesResponse>(url).then((res) => res.data);

		// Extracting data
		let data = UserExtractors.extractUserLikes(res);

		// Caching data
		this.cacheData(data);

		// Parsing data
		let tweets = data.required.map((item: IRawTweet) => new Tweet(item));

		return new CursoredData<Tweet>(tweets, data.cursor);
	}
}
