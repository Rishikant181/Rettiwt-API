/* eslint-disable */

/**
 * The raw data received when fetching the about profile of the given user.
 *
 * @public
 */
export interface IUserAboutResponse {
	data: Data;
}

interface Data {
	user_result_by_screen_name: UserResultByScreenName;
}

interface UserResultByScreenName {
	result: IUserAboutResult;
	id: string;
}

export interface IUserAboutResult {
	__typename: string;
	id: string;
	rest_id: string;
	avatar?: Avatar;
	core?: Core;
	profile_image_shape?: string;
	verification?: Verification;
	affiliates_highlighted_label?: unknown;
	is_blue_verified?: boolean;
	privacy?: Privacy;
	about_profile?: AboutProfile;
	verification_info?: VerificationInfo;
	identity_profile_labels_highlighted_label?: unknown;
}

interface Avatar {
	image_url: string;
}

interface Core {
	created_at: string;
	name: string;
	screen_name: string;
}

interface Verification {
	verified: boolean;
}

interface Privacy {
	protected: boolean;
}

interface AboutProfile {
	created_country_accurate?: boolean;
	account_based_in?: string;
	location_accurate?: boolean;
	learn_more_url?: string;
	source?: string;
	username_changes?: UsernameChanges;
}

interface UsernameChanges {
	count?: string;
	last_changed_at_msec?: string;
}

interface VerificationInfo {
	reason?: VerificationReason;
	id?: string;
	is_identity_verified?: boolean;
}

interface VerificationReason {
	verified_since_msec?: string;
}
