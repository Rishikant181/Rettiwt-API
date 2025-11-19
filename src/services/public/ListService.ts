import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { List } from '../../models/data/List';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IListMemberAddResponse } from '../../types/raw/list/AddMember';
import { IListDetailsResponse } from '../../types/raw/list/Details';
import { IListMembersResponse } from '../../types/raw/list/Members';
import { IListMemberRemoveResponse } from '../../types/raw/list/RemoveMember';
import { IListTweetsResponse } from '../../types/raw/list/Tweets';

import { FetcherService } from './FetcherService';

export class ListService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Add a user as a member of a list.
	 *
	 * @param listId - The ID of the target list.
	 * @param userId - The ID of the target user to be added as a member.
	 *
	 * @returns The new member count of the list. If adding was unsuccessful, return `undefined`.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Adding a user with ID '123456789' as a member to the list with ID '987654321'
	 * rettiwt.list.addMember('987654321', '123456789')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async addMember(listId: string, userId: string): Promise<number | undefined> {
		const resource: ResourceType = ResourceType.LIST_MEMBER_ADD;

		// Adding the user as a member
		const response = await this.request<IListMemberAddResponse>(resource, {
			id: listId,
			userId: userId,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the details of a list.
	 *
	 * @param id - The ID of the target list.
	 *
	 * @returns
	 * The details of the target list.
	 *
	 * If list not found, returns undefined.
	 *
	 * @example
	 *
	 * #### Fetching the details of a list
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the list with the id '1234567890'
	 * rettiwt.list.details('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(id: string): Promise<List | undefined> {
		const resource: ResourceType = ResourceType.LIST_DETAILS;

		// Getting the details of the list
		const response = await this.request<IListDetailsResponse>(resource, { id: id });

		// Deserializing response
		const data = Extractors[resource](response, id);

		return data;
	}

	/**
	 * Get the list of members of a tweet list.
	 *
	 * @param id - The ID of target list.
	 * @param count - The number of members to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of members to fetch.
	 *
	 * @returns The list tweets in the given list.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the first 100 members of the Twitter list with id '1234567890'
	 * rettiwt.list.members('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks Due a bug in Twitter API, the count is ignored when no cursor is provided and defaults to 100.
	 */
	public async members(id: string, count?: number, cursor?: string): Promise<CursoredData<User>> {
		const resource: ResourceType = ResourceType.LIST_MEMBERS;

		// Fetching the raw list of members
		const response = await this.request<IListMembersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Remove a member from a list.
	 *
	 * @param listId - The ID of the target list.
	 * @param userId - The ID of the target user to removed from the members.
	 *
	 * @returns The new member count of the list. If removal was unsuccessful, return `undefined`.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Removing a user with ID '123456789' from the member of the list with ID '987654321'
	 * rettiwt.list.removeMember('987654321', '123456789')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async removeMember(listId: string, userId: string): Promise<number | undefined> {
		const resource: ResourceType = ResourceType.LIST_MEMBER_REMOVE;

		// Removing the member
		const response = await this.request<IListMemberRemoveResponse>(resource, {
			id: listId,
			userId: userId,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Get the list of tweets from a tweet list.
	 *
	 * @param id - The ID of target list.
	 * @param count - The number of tweets to fetch, must be \<= 100.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 *
	 * @returns The list tweets in the given list.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the most recent 100 tweets of the Twitter list with id '1234567890'
	 * rettiwt.list.tweets('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks Due a bug in Twitter API, the count is ignored when no cursor is provided and defaults to 100.
	 */
	public async tweets(id: string, count?: number, cursor?: string): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.LIST_TWEETS;

		// Fetching raw list tweets
		const response = await this.request<IListTweetsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		// Sorting the tweets by date, from recent to oldest
		data.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data;
	}
}
