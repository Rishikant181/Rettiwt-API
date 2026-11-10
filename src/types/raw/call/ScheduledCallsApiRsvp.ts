/* eslint-disable */

import { ICalendarEvent } from '../base/Calendar';

/**
 * The raw data received when responding to a scheduled call invitation.
 *
 * @public
 */
export interface IScheduledCallsApiRsvpResponse {
	data: {
		calendar_rsvp_event?: {
			event?: ICalendarEvent;
		};
	};
}
