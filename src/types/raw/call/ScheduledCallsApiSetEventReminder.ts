/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when setting the reminder of a scheduled call.
 *
 * @public
 */
export interface IScheduledCallsApiSetEventReminderResponse {
	data: {
		calendar_set_event_reminder?: {
			event?: ICalendarEvent;
		};
	};
}
