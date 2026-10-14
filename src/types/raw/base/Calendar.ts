/* eslint-disable */

/**
 * Represents the raw data of a single calendar event (a scheduled call or an external/holiday event).
 *
 * @public
 */
export interface ICalendarEvent {
	id?: string;
	rest_id: string;
	occurrences?: ICalendarEventOccurrence[];
}

/**
 * Represents the raw data of a single occurrence of a calendar event.
 *
 * @public
 */
export interface ICalendarEventOccurrence {
	occurrence_start_min?: string;
	start_min?: string;
	duration_min?: number;
	all_day?: boolean;
	tz?: string | null;
	title?: string | null;
	description?: string | null;
	rrule?: string | null;
	status?: string;
	organizer?: ICalendarUserResults | null;
	attendees?: ICalendarAttendee[] | null;
	kind?: ICalendarEventKind;
	viewer_notify_before_min?: number | null;
	viewer_metadata?: string | null;
}

/**
 * Represents the raw data of the type-specific details of a calendar event.
 *
 * @public
 */
export interface ICalendarEventKind {
	__typename: string;

	/** CallingEvent */
	meeting_url?: string | null;

	/** HolidayEvent */
	name?: string | null;

	/** ExternalCalendarEvent */
	provider?: string | null;
	external_id?: string | null;
	html_link?: string | null;
	conference_type?: string | null;
	conference_label?: string | null;
	join_uri?: string | null;
	location?: string | null;
	organizer?: ICalendarExternalPerson | null;
	attendees?: ICalendarExternalAttendee[] | null;
	attachments?: ICalendarExternalAttachment[] | null;
	event_type?: string | null;
}

export interface ICalendarAttendee {
	rsvp_status?: string | null;
	user_results: ICalendarUserResults;
}

export interface ICalendarUserResults {
	id?: string;
	result?: ICalendarUser;
}

/**
 * Represents the raw data of a user, as returned by the X Calls endpoints.
 *
 * @public
 */
export interface ICalendarUser {
	__typename: string;
	id?: string;
	rest_id: string;
	core?: {
		name?: string;
		screen_name?: string;
	};
	avatar?: {
		image_url?: string;
	};
	verification?: {
		is_blue_verified?: boolean;
		verified_type?: string;
	};
	affiliates_highlighted_label?: {
		label?: {
			badge?: { url?: string };
			description?: string;
			user_label_display_type?: string;
			user_label_type?: string;
		};
	};
	chat_permissions?: {
		can_dm_reason?: string;
		is_trusted?: boolean;
	};
}

export interface ICalendarExternalPerson {
	email?: string | null;
	display_name?: string | null;
}

export interface ICalendarExternalAttendee extends ICalendarExternalPerson {
	response?: string | null;
	optional?: boolean | null;
	is_organizer?: boolean | null;
	is_self?: boolean | null;
	is_resource?: boolean | null;
}

export interface ICalendarExternalAttachment {
	title?: string | null;
	file_url?: string | null;
}

/**
 * Represents the raw data of a single linked external calendar.
 *
 * @public
 */
export interface ICalendarExternalLink {
	provider: string;
	account_email?: string | null;
	status: string;
}
