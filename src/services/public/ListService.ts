import { extractors } from '../../collections/Extractors';
import { EResourceType } from '../../enums/Resource';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IListMembersResponse } from '../../types/raw/list/Members';
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
		const resource: EResourceType = EResourceType.LIST_MEMBERS;

		// Fetching the raw list of members
		const response = await this.request<IListMembersResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

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
		const resource = EResourceType.LIST_TWEETS;

		// Fetching raw list tweets
		const response = await this.request<IListTweetsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		// Deserializing response
		const data = extractors[resource](response);

		// Sorting the tweets by date, from recent to oldest
		data.list.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

		return data;
	}
}
