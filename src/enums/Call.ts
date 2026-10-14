/**
 * The occurrences of a recurring scheduled call that an action applies to.
 *
 * @public
 */
export enum CallRecurrenceScope {
	ALL = 'ALL',
	THIS = 'THIS',
	THIS_AND_FOLLOWING = 'THIS_AND_FOLLOWING',
}

/**
 * The different RSVP statuses of a scheduled call attendee.
 *
 * @public
 */
export enum CallRsvpStatus {
	ACCEPTED = 'ACCEPTED',
	DECLINED = 'DECLINED',
	NEEDS_ACTION = 'NEEDS_ACTION',
	TENTATIVE = 'TENTATIVE',
}

/**
 * The different statuses of a scheduled call occurrence.
 *
 * @public
 */
export enum CallStatus {
	ACTIVE = 'ACTIVE',
	CANCELLED = 'CANCELLED',
}

/**
 * The different types of calendar events.
 *
 * @public
 */
export enum CallEventType {
	CALL = 'CallingEvent',
	EXTERNAL = 'ExternalCalendarEvent',
	HOLIDAY = 'HolidayEvent',
}

/**
 * The different external calendar providers that can be linked to X Calls.
 *
 * @public
 */
export enum CalendarProvider {
	GOOGLE = 'GOOGLE',
	OUTLOOK = 'OUTLOOK',
}

/**
 * The different statuses of a linked external calendar.
 *
 * @public
 */
export enum CalendarLinkStatus {
	LINKED = 'LINKED',
	REVOKED = 'REVOKED',
}

/**
 * The different colors that can be assigned to a scheduled call.
 *
 * @public
 */
export enum CalendarColor {
	BLUE = 'BLUE',
	GRAY = 'GRAY',
	GREEN = 'GREEN',
	MAGENTA = 'MAGENTA',
	ORANGE = 'ORANGE',
	PURPLE = 'PURPLE',
	RED = 'RED',
	TEAL = 'TEAL',
	YELLOW = 'YELLOW',
}
