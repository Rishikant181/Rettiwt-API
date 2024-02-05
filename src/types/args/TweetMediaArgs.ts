/**
 * The arguments specifying the media to be posted in a single tweet.
 *
 * @public
 */
export interface ITweetMediaArgs {
	/**
	 * The path to the media file.
	 *
	 * @remarks The size of the media file must be \<= 5242880 bytes.
	 */
	path: string;

	/**
	 * The list of id of users to be tagged in the media.
	 *
	 * @remarks The number of tags must be \<= 10.
	 */
	tags?: string[];
}
