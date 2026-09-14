/* eslint-disable */

import { IJobLocation } from '../base/JobLocation';

/**
 * The raw data received when fetching X Job location suggestions.
 *
 * @public
 */
export interface ILocationSelectorQueryResponse {
	data: {
		location_type_ahead?: IJobLocation[];
	};
}
