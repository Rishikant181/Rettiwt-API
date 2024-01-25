/**
 * The arguments for posting a single tweet.
 *
 * @public
 */
export interface ITweetArgs {
	/** The text to post. */
	text: string;

	/** The list of media to post. */
	media: IMediaArgs[];
}

/**
 * The arguements specifying the media to be posted in a single tweet.
 *
 * @public
 */
export interface IMediaArgs {
	/** The path to the media file */
	path: string;

	/** The list usernames of users to be tagged in the media. */
	tags: string[];
}
