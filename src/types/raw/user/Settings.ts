/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-explicit-any */

/**
 * The raw data received from the account settings endpoint.
 *
 * @public
 */
export interface IUserSettingsResponse {
	screen_name: string;
	protected: boolean;
	language: string;
	geo_enabled: boolean;
	discoverable_by_email: boolean;
	discoverable_by_mobile_phone: boolean;
	use_cookie_personalization: boolean;
	sleep_time: {
		enabled: boolean;
		end_time: any;
		start_time: any;
	};
	display_sensitive_media: boolean;
	allow_media_tagging: string;
}
