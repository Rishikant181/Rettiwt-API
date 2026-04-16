import { IProfileUpdateOptions } from './ProfileArgs';

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export interface IPostArgs {
	/**
	 * The id of the target resource.
	 *
	 * @remarks
	 * Required only when posting using the following resources:
	 * - {@link ResourceType.COMMUNITY_JOIN}
	 * - {@link ResourceType.COMMUNITY_LEAVE}
	 * - {@link ResourceType.TWEET_BOOKMARK}
	 * - {@link ResourceType.TWEET_LIKE}
	 * - {@link ResourceType.TWEET_RETWEET}
	 * - {@link ResourceType.TWEET_UNBOOKMARK}
	 * - {@link ResourceType.TWEET_UNLIKE}
	 * - {@link ResourceType.TWEET_UNPOST}
	 * - {@link ResourceType.TWEET_UNRETWEET}
	 * - {@link ResourceType.USER_FOLLOW}
	 * - {@link ResourceType.USER_UNFOLLOW}
	 *
	 * For {@link ResourceType.USER_USERNAME_CHANGE}, use {@link IPostArgs.username}.
	 * `id` is still accepted for backward compatibility.
	 */
	id?: string;

	/**
	 * The new username to set.
	 *
	 * @remarks
	 * Required only when changing username using {@link ResourceType.USER_USERNAME_CHANGE}.
	 */
	username?: string;

	/**
	 * The tweet that is to be posted.
	 *
	 * @remarks
	 * Required only when posting a tweet using {@link ResourceType.TWEET_POST}
	 */
	tweet?: INewTweet;

	/**
	 * The media file to be uploaded.
	 *
	 * @remarks
	 * Required only when uploading a media using the following resources:
	 * - {@link ResourceType.MEDIA_UPLOAD_APPEND}
	 * - {@link ResourceType.MEDIA_UPLOAD_FINALIZE}
	 * - {@link ResourceType.MEDIA_UPLOAD_INITIALIZE}
	 */
	upload?: IUploadArgs;

	/**
	 * The id of the target user.
	 *
	 * @remarks
	 * Required only for the following resources:
	 * - {@link ResourceType.LIST_MEMBER_ADD}
	 * - {@link ResourceType.LIST_MEMBER_REMOVE}
	 */
	userId?: string;

	/**
	 * The id of the conversation to delete.
	 *
	 * @remarks
	 * Required only when deleting a conversation using {@link ResourceType.DM_DELETE_CONVERSATION}
	 */
	conversationId?: string;

	/**
	 * Profile update options.
	 *
	 * @remarks
	 * Required only when updating user profile using {@link ResourceType.USER_PROFILE_UPDATE}
	 */
	profileOptions?: IProfileUpdateOptions;

	/**
	 * Base64-encoded profile image data.
	 *
	 * @remarks
	 * Required only when updating profile image using {@link ResourceType.USER_PROFILE_IMAGE_UPDATE}.
	 */
	profileImage?: string;

	/**
	 * Base64-encoded profile banner data.
	 *
	 * @remarks
	 * Required only when updating profile banner using {@link ResourceType.USER_PROFILE_BANNER_UPDATE}.
	 */
	profileBanner?: string;

	/**
	 * Password change arguments.
	 *
	 * @remarks
	 * Required only when changing password using {@link ResourceType.USER_PASSWORD_CHANGE}.
	 */
	changePassword?: IChangePasswordArgs;
}

/**
 * Configuration for the new tweet to be posted.
 *
 * @public
 */
export interface INewTweet {
	/**
	 * The list of media to be uploaded.
	 *
	 * @remarks
	 * - The media first needs to be uploaded.
	 * - After uploading, the returned id(s) can be used to reference the media here.
	 * - Maximum number of media items that can be posted is 4.
	 */
	media?: INewTweetMedia[];

	/** The id of the tweet to quote. */
	quote?: string;

	/** The id of the Tweet to which the given Tweet must be a reply. */
	replyTo?: string;

	/** The date/time at which the tweet is to be scheduled for posting. */
	scheduleFor?: Date;

	/**
	 * The text for the tweet to be created.
	 *
	 * @remarks
	 * Length of the tweet must be \<= 280 characters for non-premium accounts.
	 * X Premium (Blue) accounts can post longer tweets (up to 25,000 characters).
	 */
	text?: string;
}

/**
 * Configuration for the media to be uploaded.
 *
 * @public
 */
export interface INewTweetMedia {
	/** The id of the media to upload. */
	id: string;

	/**
	 * The list of id of the users to tag in the media.
	 *
	 * @remarks
	 * Maximum number of users that can be tagged is 10.
	 */
	tags?: string[];
}

/**
 * Options specifying the media file to be uploaded.
 *
 * @public
 */
export interface IUploadArgs {
	/** The id allocated to the media file to be uploaded. */
	id?: string;

	/** The media file to be uploaded. */
	media?: string | ArrayBuffer;

	/**
	 * The size (in bytes) of the media file to be uploaded.
	 *
	 * @remarks The size must be \<= 5242880 bytes.
	 */
	size?: number;
}

/**
 * Arguments for changing the account password.
 *
 * @public
 */
export interface IChangePasswordArgs {
	/** The current account password. */
	currentPassword: string;

	/** The new password to set. */
	newPassword: string;
}
