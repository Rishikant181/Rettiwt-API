import { CalendarProvider, CallEventType, CallStatus } from '../../enums/Call';

import { ICallUser } from './CallUser';

/**
 * The details of a single occurrence of a scheduled call (or of any other calendar event).
 *
 * @public
 */
export interface IScheduledCall {
	/** Whether the event lasts the whole day. */
	allDay: boolean;

	/** The users invited to the call. */
	attendees: ICallUser[];

	/** The description of the call. */
	description?: string;

	/** The duration of the occurrence, in minutes. */
	duration: number;

	/** The date and time at which the occurrence ends. */
	endsAt: string;

	/** The details of the event, if it comes from a linked external calendar. */
	external?: IScheduledCallExternalDetails;

	/** The id of the event (shared by all the occurrences of a recurring call). */
	id: string;

	/** The url to join the call. */
	meetingUrl?: string;

	/**
	 * The original start of the occurrence, identifying it within a recurring call.
	 *
	 * @remarks
	 * Use this value as the `occurrence` option when acting on a single occurrence of a recurring call.
	 */
	occurrence: string;

	/** The user who organized the call. */
	organizer?: ICallUser;

	/** The recurrence rule (RFC 5545 RRULE) of the call, if it is a recurring call. */
	recurrence?: string;

	/** The number of minutes before the call at which the logged-in user is reminded of it. */
	reminder?: number;

	/** The date and time at which the occurrence starts. */
	startsAt: string;

	/** The status of the occurrence. */
	status: CallStatus;

	/** The time zone of the call. */
	timeZone?: string;

	/** The title of the call. */
	title?: string;

	/** The type of the event. */
	type: CallEventType;

	/** The JSON-encoded metadata (color, visibility) set by the logged-in user on the call. */
	viewerMetadata?: string;
}

/**
 * The details of an event coming from a linked external calendar.
 *
 * @public
 */
export interface IScheduledCallExternalDetails {
	/** The type of conference (GOOGLE_MEET, MICROSOFT_TEAMS, X_CALLS, OTHER, NONE). */
	conferenceType?: string;

	/** The id of the event in the external calendar. */
	id?: string;

	/** The url to join the conference. */
	joinUrl?: string;

	/** The location of the event. */
	location?: string;

	/** The provider of the external calendar. */
	provider?: CalendarProvider;

	/** The url of the event in the external calendar. */
	url?: string;
}
