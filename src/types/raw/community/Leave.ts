/* eslint-disable */

/**
 * The raw data received when leaving a Community.
 *
 * @public
 */
export interface ICommunityLeaveResponse {
	data?: {
		community_leave?: IRawCommunityLeave;
	};
}

export interface IRawCommunityLeave {
	id_str?: string;
	name?: string;
	member_count?: number;
	role?: string;
	actions?: ICommunityLeaveActions;
}

export interface ICommunityLeaveActions {
	join_action_result?: {
		__typename?: string;
	};
	leave_action_result?: ICommunityLeaveActionResult;
}

export interface ICommunityLeaveActionResult {
	__typename?: string;
	message?: string;
	reason?: string;
}
