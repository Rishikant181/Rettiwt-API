/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when updating a scheduled call.
 *
 * @public
 */
export interface IScheduledCallsApiUpdateResponse {
	data: {
		calendar_update_event?: {
			event?: ICalendarEvent;
		};
	};
}
