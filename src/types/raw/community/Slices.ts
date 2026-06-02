/* eslint-disable */

/**
 * The raw data received when fetching community member and moderator slices.
 *
 * @public
 */
export interface ICommunityMembersSliceResponse {
	data?: {
		communityResults?: {
			id?: string;
			result?: {
				__typename?: string;
				id?: string;
				members_slice?: ICommunitySlice;
			};
		};
	};
}

export interface ICommunityModeratorsSliceResponse {
	data?: {
		communityResults?: {
			id?: string;
			result?: {
				__typename?: string;
				id?: string;
				moderators_slice?: ICommunitySlice;
			};
		};
	};
}

export interface ICommunitySlice {
	items_results?: ICommunitySliceItem[];
	slice_info?: ICommunitySliceInfo;
}

export interface ICommunitySliceItem {
	id?: string;
	result?: ICommunitySliceUser;
}

export interface ICommunitySliceUser {
	__typename?: string;
	id?: string;
	rest_id?: string;
	community_role?: string;
	core?: {
		name?: string;
		screen_name?: string;
	};
	avatar?: {
		image_url?: string;
	};
	is_blue_verified?: boolean;
	privacy?: {
		protected?: boolean;
	};
	relationship_perspectives?: {
		blocking?: boolean;
		followed_by?: boolean;
		following?: boolean;
	};
	verification?: {
		verified?: boolean;
	};
}

export interface ICommunitySliceInfo {
	next_cursor?: string;
}
