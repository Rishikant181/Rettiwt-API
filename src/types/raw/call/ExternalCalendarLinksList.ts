/* eslint-disable */

import { ICalendarExternalLink } from '../base/Calendar';

/**
 * The raw data received when listing the external calendars linked to X Calls.
 *
 * @public
 */
export interface IExternalCalendarLinksListResponse {
	data: {
		calendar_external_links?: ICalendarExternalLink[];
	};
}
