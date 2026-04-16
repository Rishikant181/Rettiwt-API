/* eslint-disable */

/**
 * The raw data received when fetching tweets from a Community timeline.
 *
 * @public
 */
export interface ICommunityTweetsResponse {
	data?: {
		communityResults?: {
			result?: {
				__typename?: string;
				ranked_community_timeline?: {
					timeline?: unknown;
				};
			};
		};
	};
}
