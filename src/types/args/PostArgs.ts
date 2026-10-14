import { CalendarColor, CalendarProvider, CallRecurrenceScope, CallRsvpStatus } from '../../enums/Call';

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
	 * - {@link ResourceType.TWEET_BOOKMARK}
	 * - {@link ResourceType.TWEET_LIKE}
	 * - {@link ResourceType.TWEET_RETWEET}
	 * - {@link ResourceType.TWEET_UNBOOKMARK}
	 * - {@link ResourceType.TWEET_UNLIKE}
	 * - {@link ResourceType.TWEET_UNPOST}
	 * - {@link ResourceType.TWEET_UNRETWEET}
	 * - {@link ResourceType.LIST_DELETE}
	 * - {@link ResourceType.LIST_MUTE}
	 * - {@link ResourceType.LIST_UNMUTE}
	 * - {@link ResourceType.LIST_UPDATE}
	 * - {@link ResourceType.USER_FOLLOW}
	 * - {@link ResourceType.USER_UNFOLLOW}
	 * - {@link ResourceType.CALL_CANCEL}
	 * - {@link ResourceType.CALL_CUSTOMIZE}
	 * - {@link ResourceType.CALL_REMINDER}
	 * - {@link ResourceType.CALL_RSVP}
	 * - {@link ResourceType.CALL_UPDATE}
	 *
	 * For {@link ResourceType.USER_USERNAME_CHANGE}, use {@link IPostArgs.username}.
	 * `id` is still accepted for backward compatibility.
	 */
	id?: string;

	/**
	 * The list that is to be created.
	 *
	 * @remarks
	 * Required only when creating a list using the following resources:
	 * - {@link ResourceType.LIST_CREATE}
	 */
	list?: INewList;

	/**
	 * The updates to apply to an existing list.
	 *
	 * @remarks
	 * Required only when updating a list using {@link ResourceType.LIST_UPDATE}.
	 */
	listUpdates?: IListUpdates;

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

	/**
	 * Whether the call to create is audio-only.
	 *
	 * @remarks
	 * Used only when creating a call using {@link ResourceType.CALL_CREATE}.
	 */
	audioOnly?: boolean;

	/**
	 * The external calendar provider.
	 *
	 * @remarks
	 * Required only when unlinking a calendar using {@link ResourceType.CALL_CALENDAR_UNLINK}.
	 */
	calendarProvider?: CalendarProvider;

	/**
	 * The call that is to be scheduled.
	 *
	 * @remarks
	 * Required only when scheduling a call using {@link ResourceType.CALL_SCHEDULE}.
	 */
	call?: INewCall;

	/**
	 * The customization (color, visibility) to apply to a scheduled call.
	 *
	 * @remarks
	 * Required only when customizing a scheduled call using {@link ResourceType.CALL_CUSTOMIZE}.
	 */
	callCustomization?: ICallCustomization;

	/**
	 * The occurrence(s) of the scheduled call to act on.
	 *
	 * @remarks
	 * Used only with the following resources:
	 * - {@link ResourceType.CALL_CANCEL}
	 * - {@link ResourceType.CALL_CUSTOMIZE}
	 * - {@link ResourceType.CALL_REMINDER}
	 * - {@link ResourceType.CALL_RSVP}
	 * - {@link ResourceType.CALL_UPDATE}
	 */
	callOccurrence?: ICallOccurrenceOptions;

	/**
	 * The updates to apply to a scheduled call.
	 *
	 * @remarks
	 * Required only when updating a scheduled call using {@link ResourceType.CALL_UPDATE}.
	 */
	callUpdates?: ICallUpdates;

	/**
	 * The number of minutes before a scheduled call at which to be reminded of it (0 to 10080).
	 *
	 * @remarks
	 * Required only when setting a reminder using {@link ResourceType.CALL_REMINDER}.
	 */
	reminder?: number;

	/**
	 * The RSVP status to respond to a scheduled call invitation with.
	 *
	 * @remarks
	 * Required only when responding to an invitation using {@link ResourceType.CALL_RSVP}.
	 */
	rsvp?: CallRsvpStatus;
}

/**
 * Configuration for the list to be created.
 *
 * @public
 */
export interface INewList {
	/** The list name. */
	name: string;

	/** The list description. */
	description?: string;

	/** Whether the list is private. */
	isPrivate?: boolean;
}

/**
 * Configuration for the updates to apply to an existing list.
 *
 * @public
 */
export interface IListUpdates {
	/** The updated list name. */
	name?: string;

	/**
	 * The updated list description.
	 *
	 * @remarks
	 * Use an empty string to clear the existing description.
	 */
	description?: string;

	/** Whether the list is private. */
	isPrivate?: boolean;
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

/**
 * Configuration for the call to be scheduled.
 *
 * @public
 */
export interface INewCall {
	/** The description of the call. */
	description?: string;

	/**
	 * The duration of the call, in minutes.
	 *
	 * @defaultValue 60
	 */
	duration?: number;

	/** Whether to send an invitation email to the guests. */
	emailGuests?: boolean;

	/** The ids of the users to invite to the call. */
	inviteeIds?: string[];

	/**
	 * The recurrence rule (RFC 5545 RRULE) of the call, for recurring calls.
	 *
	 * @example 'FREQ=WEEKLY;BYDAY=MO,TH'
	 */
	recurrence?: string;

	/** The date and time at which the call starts. */
	startsAt: Date;

	/**
	 * The IANA time zone of the call.
	 *
	 * @defaultValue The time zone of the current environment.
	 */
	timeZone?: string;

	/** The title of the call. */
	title?: string;
}

/**
 * The updates to apply to a scheduled call.
 *
 * @public
 */
export interface ICallUpdates {
	/** The new description of the call. */
	description?: string;

	/** The new duration of the call, in minutes. */
	duration?: number;

	/** The new list of ids of the users invited to the call. */
	inviteeIds?: string[];

	/** The new recurrence rule (RFC 5545 RRULE) of the call. Use an empty string to stop the recurrence. */
	recurrence?: string;

	/** The new date and time at which the call starts. */
	startsAt?: Date;

	/**
	 * The IANA time zone of the new start time.
	 *
	 * @defaultValue The time zone of the current environment.
	 */
	timeZone?: string;

	/** The new title of the call. */
	title?: string;
}

/**
 * The occurrence(s) of a scheduled call to act on.
 *
 * @public
 */
export interface ICallOccurrenceOptions {
	/**
	 * Whether to notify the guests by email (for updates and cancellations).
	 */
	emailGuests?: boolean;

	/**
	 * The original start of the target occurrence, for recurring calls.
	 *
	 * @remarks
	 * Use the `occurrence` field of the target {@link ScheduledCall}.
	 */
	occurrence?: Date;

	/**
	 * The occurrences of a recurring call the action applies to.
	 *
	 * @defaultValue {@link CallRecurrenceScope.THIS}
	 */
	scope?: CallRecurrenceScope;
}

/**
 * The customization (color, visibility) to apply to a scheduled call, for the logged-in user only.
 *
 * @remarks
 * The given customization replaces the previous one.
 *
 * @public
 */
export interface ICallCustomization {
	/** The color of the call in the calendar. */
	color?: CalendarColor;

	/** Whether to remove the call from the calendar. */
	hidden?: boolean;
}
