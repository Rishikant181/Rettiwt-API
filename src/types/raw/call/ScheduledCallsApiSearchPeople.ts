/* eslint-disable */

import { ICalendarUserResults } from '../base/Calendar';

/**
 * The raw data received when searching for people to invite to a call.
 *
 * @public
 */
export interface IScheduledCallsApiSearchPeopleResponse {
	data: {
		search_by_raw_query?: {
			id?: string;
			x_chat_users_typeahead?: {
				typeahead_user?: {
					user_results?: ICalendarUserResults;
				};
			}[];
		};
	};
}
