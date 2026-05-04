/* eslint-disable */

/**
 * The raw data received when removing a given user from the authenticated user's followers.
 *
 * @public
 */
export interface IUserRemoveFollowerResponse {
	data?: {
		remove_follower?: {
			__typename?: string;
			unfollow_success_reason?: string;
		};
	};
}
