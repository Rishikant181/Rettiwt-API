/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when scheduling a new call.
 *
 * @public
 */
export interface IScheduledCallsApiScheduleResponse {
	data: {
		calendar_schedule_event?: {
			event?: ICalendarEvent;
		};
	};
}
