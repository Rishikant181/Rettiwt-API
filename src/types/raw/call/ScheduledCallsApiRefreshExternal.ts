/* eslint-disable */

import { ICalendarEventOccurrence } from '../base/Calendar';

/**
 * The raw data received when refreshing the events of the linked external calendars.
 *
 * @public
 */
export interface IScheduledCallsApiRefreshExternalResponse {
	data: {
		calendar_refresh_external?: ICalendarEventOccurrence[];
	};
}
