/* eslint-disable */

import { ISpace } from '../base/Space';

/**
 * The raw data received when fetching the details of a given Space.
 *
 * @public
 */
export interface IAudioSpaceByIdResponse {
	data?: {
		audioSpace?: IAudioSpace;
	};
	errors?: unknown[];
}

export interface IAudioSpace {
	metadata?: ISpace;
	participants?: IAudioSpaceParticipants;
	sharings?: IAudioSpaceSharings;
	is_subscribed?: boolean;
}

export interface IAudioSpaceParticipants {
	total?: number;
	admins?: IAudioSpaceParticipant[];
	speakers?: IAudioSpaceParticipant[];
	listeners?: IAudioSpaceParticipant[];
}

export interface IAudioSpaceParticipant {
	periscope_user_id?: string;
	start?: number | string;
	twitter_screen_name?: string;
	display_name?: string;
	avatar_url?: string;
	is_verified?: boolean;
	is_muted_by_admin?: boolean;
	is_muted_by_guest?: boolean;
	user_results?: {
		rest_id?: string;
		result?: {
			__typename?: string;
			rest_id?: string;
			is_blue_verified?: boolean;
			verification?: {
				verified_type?: string;
				verified?: boolean;
			};
		};
	};
}

export interface IAudioSpaceSharings {
	items?: unknown[];
	slice_info?: unknown;
}
