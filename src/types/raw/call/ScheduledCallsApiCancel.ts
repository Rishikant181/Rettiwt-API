/* eslint-disable */

/**
 * The raw data received when cancelling a scheduled call.
 *
 * @public
 */
export interface IScheduledCallsApiCancelResponse {
	data: {
		calendar_cancel_event?: {
			success?: boolean;
		};
	};
}
