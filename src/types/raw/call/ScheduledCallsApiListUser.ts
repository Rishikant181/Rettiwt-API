/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when listing the busy slots of the shared calendar of a given user.
 *
 * @public
 */
export interface IScheduledCallsApiListUserResponse {
	data: {
		user_result_by_rest_id?: {
			id?: string;
			result?: {
				__typename: string;
				id?: string;
				calendar_events?: {
					events?: ICalendarEvent[];
				} | null;
			};
		};
	};
}
