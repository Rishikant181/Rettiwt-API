/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when listing the scheduled calls of the logged-in user.
 *
 * @public
 */
export interface IScheduledCallsApiListResponse {
	data: {
		calendar_list_events?: {
			viewer_metadata?: string | null;
			events?: ICalendarEvent[];
		};
	};
}
