import { CalendarLinkStatus, CalendarProvider } from '../../enums/Call';
import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { ICalendarLink } from '../../types/data/CalendarLink';
import { ICalendarExternalLink as IRawCalendarExternalLink } from '../../types/raw/base/Calendar';
import { IExternalCalendarLinksListResponse } from '../../types/raw/call/ExternalCalendarLinksList';

/**
 * The details of an external calendar linked to X Calls.
 *
 * @public
 */
export class CalendarLink implements ICalendarLink {
	/** The raw link details. */
	private readonly _raw: IRawCalendarExternalLink;

	public accountEmail?: string;
	public provider: CalendarProvider;
	public status: CalendarLinkStatus;

	/**
	 * @param link - The raw link details.
	 */
	public constructor(link: IRawCalendarExternalLink) {
		this._raw = { ...link };
		this.provider = link.provider as CalendarProvider;
		this.accountEmail = link.account_email?.trim() || undefined;
		this.status = link.status as CalendarLinkStatus;
	}

	/** The raw link details. */
	public get raw(): IRawCalendarExternalLink {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes the linked calendars from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of linked calendars.
	 */
	public static multiple(response: IExternalCalendarLinksListResponse): CalendarLink[] {
		const links: CalendarLink[] = [];

		for (const item of response.data?.calendar_external_links ?? []) {
			if (item.provider) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: item.provider });

				links.push(new CalendarLink(item));
			}
		}

		return links;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICalendarLink {
		return {
			accountEmail: this.accountEmail,
			provider: this.provider,
			status: this.status,
		};
	}
}
