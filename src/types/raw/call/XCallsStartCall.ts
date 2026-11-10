/* eslint-disable */

/**
 * The raw data received when creating a new call.
 *
 * @public
 */
export interface IXCallsStartCallResponse {
	data: {
		xchat_start_call?: {
			call?: {
				audio_only?: boolean;
				call_id?: string;
				conversation_id?: string | null;
				created_at_ms?: string;
				host_user_id?: string;
				p2p?: boolean;
				participants?: {
					is_host?: boolean;
					joined_at_ms?: string;
					user_id?: string;
				}[];
			};
			media_credentials?: {
				payload?: string;
				version?: number;
			};
			media_session_id?: string;
		};
	};
}
