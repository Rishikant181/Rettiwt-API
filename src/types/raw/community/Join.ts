/* eslint-disable */

/**
 * The raw data received when joining a Community.
 *
 * @public
 */
export interface ICommunityJoinResponse {
	data?: {
		community_join?: IRawCommunityJoin;
	};
}

export interface IRawCommunityJoin {
	id_str?: string;
	name?: string;
	member_count?: number;
	role?: string;
	actions?: ICommunityJoinActions;
}

export interface ICommunityJoinActions {
	join_action_result?: ICommunityJoinActionResult;
	leave_action_result?: {
		__typename?: string;
	};
}

export interface ICommunityJoinActionResult {
	__typename?: string;
	message?: string;
	reason?: string;
}
