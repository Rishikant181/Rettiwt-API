/**
 * Profile update options.
 *
 * @public
 */
export interface IProfileUpdateOptions {
	/**
	 * Bio/description of the user (max 160 characters).
	 */
	description?: string;

	/**
	 * Location of the user (max 30 characters).
	 */
	location?: string;

	/**
	 * Display name (max 50 characters).
	 *
	 * @remarks
	 * The name field represents the user's display name shown on their profile.
	 * This is different from the username (screen_name/handle).
	 */
	name?: string;

	/**
	 * URL associated with the profile.
	 *
	 * @remarks
	 * Will be prepended with http:// if not present.
	 */
	url?: string;
}
