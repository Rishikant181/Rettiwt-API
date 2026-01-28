/* eslint-disable */

import { IDataResult } from '../composite/DataResult';
import { IUser } from './User';
import { ITweet } from './Tweet';

/**
 * Represents the raw data of a single Space.
 *
 * @public
 */
export interface ISpace {
	rest_id: string;
	state?: string;
	title?: string;
	media_key?: string;
	content_type?: string;
	created_at?: number | string;
	scheduled_start?: number | string;
	started_at?: number | string;
	ended_at?: number | string;
	replay_start_time?: number | string;
	updated_at?: number | string;
	creator_id?: string;
	creator_results?: IDataResult<IUser>;
	conversation_controls?: number;
	disallow_join?: boolean;
	is_employee_only?: boolean;
	is_locked?: boolean;
	is_muted?: boolean;
	is_space_available_for_clipping?: boolean;
	is_space_available_for_replay?: boolean;
	narrow_cast_space_type?: number;
	no_incognito?: boolean;
	pending_admin_twitter_user_ids?: Array<{ rest_id?: string }>;
	total_replay_watched?: number;
	total_live_listeners?: number;
	participant_count?: number;
	subscriber_count?: number;
	max_guest_sessions?: number;
	max_admin_capacity?: number;
	is_ticketed?: boolean | string;
	lang?: string;
	host_ids?: string[];
	speaker_ids?: string[];
	invited_user_ids?: string[];
	topics?: ISpaceTopic[];
	tweet_results?: IDataResult<ITweet>;
}

export interface ISpaceTopic {
	id: string;
	name: string;
	description?: string;
}
