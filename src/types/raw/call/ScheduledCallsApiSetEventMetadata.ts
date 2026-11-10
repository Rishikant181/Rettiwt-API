/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when customizing (color, visibility) a scheduled call.
 *
 * @public
 */
export interface IScheduledCallsApiSetEventMetadataResponse {
	data: {
		calendar_set_event_metadata?: {
			event?: ICalendarEvent;
		};
	};
}
