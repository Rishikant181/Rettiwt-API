/* eslint-disable */

/**
 * The raw data received when fetching suggested users from the Connect tab.
 *
 * @public
 */
export interface IUserSuggestionsResponse {
	data: {
		connect_tab_timeline?: {
			timeline?: {
				instructions?: unknown[];
			};
		};
	};
}
