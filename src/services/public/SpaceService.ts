import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { Space } from '../../models/data/Space';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ISpaceDetailsOptions } from '../../types/args/FetchArgs';
import { IAudioSpaceByIdResponse } from '../../types/raw/space/AudioSpaceById';

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
		const data = Extractors[resource](response.data);

		return data;
	}
}
