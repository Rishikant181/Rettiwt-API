/* eslint-disable */

/**
 * The raw data received when unlinking an external calendar from X Calls.
 *
 * @public
 */
export interface IExternalCalendarLinksUnlinkResponse {
	data: {
		calendar_unlink_external?: {
			success?: boolean;
		};
	};
}
