import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { Space } from '../../models/data/Space';
import { Tweet } from '../../models/data/Tweet';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ISpaceDetailsOptions } from '../../types/args/FetchArgs';
import { IAudioSpaceByIdResponse } from '../../types/raw/space/AudioSpaceById';
import { ISpaceSearchResponse } from '../../types/raw/space/Search';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to spaces.
 *
 * @public
 */
export class SpaceService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Extract a space id from a space URL.
	 *
	 * @param url - The URL to inspect.
	 * @returns The extracted space id, if found.
	 */
	private static _extractSpaceIdFromUrl(url: string): string | undefined {
		const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:x|twitter)\.com\/i\/spaces\/([a-zA-Z0-9]+)/i);

		return match ? match[1] : undefined;
	}

	/**
	 * Extract unique space IDs from tweets.
	 *
	 * @param tweets - The list of tweets to inspect.
	 * @returns The list of unique space ids.
	 */
	private static _extractSpaceIds(tweets: Tweet[]): string[] {
		const ids = new Set<string>();

		for (const tweet of tweets) {
			for (const url of tweet.entities.urls) {
				const id = SpaceService._extractSpaceIdFromUrl(url);

				if (id) {
					ids.add(id);
				}
			}
		}

		return Array.from(ids);
	}

	/**
	 * Get the details of a space.
	 *
	 * @param id - The ID of the target space.
	 * @param options - Additional options for the fetch.
	 *
	 * @returns The details of the space with the given ID.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.space.details('1YqJDNEzvoVKV', { withListeners: true })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async details(id: string, options?: ISpaceDetailsOptions): Promise<Space | undefined> {
		const resource = ResourceType.SPACE_DETAILS;

		// Fetching raw space details
		const response = await this.request<IAudioSpaceByIdResponse>(resource, {
			id: id,
			withReplays: options?.withReplays,
			withListeners: options?.withListeners,
			isMetatagsQuery: options?.isMetatagsQuery,
		});

		// Deserializing response
		const data = Extractors[resource](response);

		return data;
	}

	/**
	 * Search for spaces using a raw query.
	 *
	 * @param query - The raw query. `filter:spaces` is appended if omitted.
	 * @param count - The number of results to fetch.
	 * @param cursor - The cursor to the batch of results to fetch.
	 * @param top - Whether to fetch top results. Defaults to `true`.
	 *
	 * @returns The list of spaces matching the query.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.space.search('from:tbvxyz lang:zxx', 20)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async search(query: string, count?: number, cursor?: string, top = true): Promise<Space[]> {
		const resource = ResourceType.SPACE_SEARCH;

		// Fetching raw search results
		const response = await this.request<ISpaceSearchResponse>(resource, {
			query: query,
			count: count,
			cursor: cursor,
			top: top,
		});

		// Extracting space ids from search tweets
		const searchResults = Extractors[resource](response);
		const spaceIds = SpaceService._extractSpaceIds(searchResults.list);

		// Fetching details for each space id
		const spaces = await Promise.all(
			spaceIds.map(async (id) => {
				try {
					return await this.details(id, {
						withReplays: false,
						withListeners: false,
					});
				} catch {
					return undefined;
				}
			}),
		);

		return spaces.filter((space): space is Space => space != undefined);
	}
}
