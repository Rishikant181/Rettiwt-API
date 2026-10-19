import { CalendarLinkStatus, CalendarProvider } from '../../enums/Call';

/**
 * The details of an external calendar linked to X Calls.
 *
 * @public
 */
export interface ICalendarLink {
	/** The email of the linked account. */
	accountEmail?: string;

	/** The provider of the linked calendar. */
	provider: CalendarProvider;

	/** The status of the link. */
	status: CalendarLinkStatus;
}
