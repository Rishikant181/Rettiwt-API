/**
 * The result of attempting to join a community.
 *
 * @public
 */
export interface ICommunityJoin {
	/** The rest id of the community. */
	id?: string;

	/** The display name of the community. */
	name?: string;

	/** Whether the viewer is a member after the action result. */
	isMember: boolean;

	/** The member count returned by the API. */
	memberCount?: number;

	/** The role of the viewer in the community after the action result. */
	role?: string;

	/** A human-readable message returned by the API. */
	message?: string;

	/** A machine-readable reason returned by the API. */
	reason?: string;
}
