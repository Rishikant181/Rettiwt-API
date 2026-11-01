import { CalendarProvider, CallRsvpStatus } from '../../enums/Call';
import { SensitiveWarning } from '../../enums/SensitiveWarning';
import {
	ICallCustomization,
	ICallOccurrenceOptions,
	ICallUpdates,
	IChangePasswordArgs,
	IListUpdates,
	IMediaMetadataArgs,
	INewCall,
	INewList,
	INewTweet,
	INewTweetMedia,
	IPostArgs,
	IUploadArgs,
} from '../../types/args/PostArgs';

import { ProfileUpdateOptions } from './ProfileArgs';

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export class PostArgs implements IPostArgs {
	public audioOnly?: boolean;
	public calendarProvider?: CalendarProvider;
	public call?: NewCall;
	public callCustomization?: ICallCustomization;
	public callOccurrence?: ICallOccurrenceOptions;
	public callUpdates?: CallUpdates;
	public changePassword?: ChangePasswordArgs;
	public conversationId?: string;
	public id?: string;
	public list?: NewList;
	public listUpdates?: ListUpdates;
	public mediaMetadata?: MediaMetadataArgs;
	public profileBanner?: string;
	public profileImage?: string;
	public profileOptions?: ProfileUpdateOptions;
	public reminder?: number;
	public rsvp?: CallRsvpStatus;
	public tweet?: NewTweet;
	public upload?: UploadArgs;
	public userId?: string;
	public username?: string;

	/**
	 * @param resource - The resource to be posted.
	 * @param args - Additional user-defined arguments for posting the resource.
	 */
	public constructor(args: IPostArgs) {
		this.id = args.id;
		this.list = args.list ? new NewList(args.list) : undefined;
		this.tweet = args.tweet ? new NewTweet(args.tweet) : undefined;
		this.upload = args.upload ? new UploadArgs(args.upload) : undefined;
		this.mediaMetadata = args.mediaMetadata ? new MediaMetadataArgs(args.mediaMetadata) : undefined;
		this.userId = args.userId;
		this.username = PostArgs._validateNonEmptyString(args.username, 'Username');
		this.conversationId = args.conversationId;
		this.profileOptions = args.profileOptions ? new ProfileUpdateOptions(args.profileOptions) : undefined;
		this.profileImage = PostArgs._validateNonEmptyString(args.profileImage, 'Profile image');
		this.profileBanner = PostArgs._validateNonEmptyString(args.profileBanner, 'Profile banner');
		this.changePassword = args.changePassword ? new ChangePasswordArgs(args.changePassword) : undefined;
		this.listUpdates = args.listUpdates ? new ListUpdates(args.listUpdates) : undefined;
		this.audioOnly = args.audioOnly;
		this.calendarProvider = args.calendarProvider;
		this.call = args.call ? new NewCall(args.call) : undefined;
		this.callCustomization = args.callCustomization;
		this.callOccurrence = args.callOccurrence;
		this.callUpdates = args.callUpdates ? new CallUpdates(args.callUpdates) : undefined;
		this.reminder = PostArgs._validateReminder(args.reminder);
		this.rsvp = args.rsvp;
	}

	/**
	 * Validates if a data value is a valid string.
	 *
	 * @param value - The data to validate.
	 * @param fieldName - The field name whose value is to be validated.
	 *
	 * @returns The validated, parsed string. If data was `undefined`, returns `undefined`.
	 */
	private static _validateNonEmptyString(value: unknown, fieldName: string): string | undefined {
		if (value === undefined) {
			return undefined;
		}

		if (typeof value !== 'string') {
			throw new Error(`${fieldName} must be a string`);
		}

		if (value.trim().length === 0) {
			throw new Error(`${fieldName} cannot be empty`);
		}

		return value;
	}

	/**
	 * Validates that a reminder is a valid number of minutes (0 to 10080).
	 *
	 * @param value - The reminder to validate.
	 *
	 * @returns The validated reminder. If data was `undefined`, returns `undefined`.
	 */
	private static _validateReminder(value: number | undefined): number | undefined {
		if (value === undefined) {
			return undefined;
		}

		if (!Number.isInteger(value) || value < 0 || value > 10080) {
			throw new Error('Reminder must be an integer between 0 and 10080 minutes');
		}

		return value;
	}
}

/**
 * Configuration for the list to be created.
 *
 * @public
 */
export class NewList implements INewList {
	public description?: string;
	public isPrivate: boolean;
	public name: string;

	/**
	 * @param newList - The args specifying the list to be created.
	 */
	public constructor(newList: INewList) {
		this.name = newList.name;
		this.description = newList.description;
		this.isPrivate = newList.isPrivate ?? false;
	}
}

/**
 * Configuration for the updates to apply to an existing list.
 *
 * @public
 */
export class ListUpdates implements IListUpdates {
	public description?: string;
	public isPrivate?: boolean;
	public name?: string;

	/**
	 * @param updates - The updates to apply to the target list.
	 */
	public constructor(updates: IListUpdates) {
		this.name = updates.name;
		this.description = updates.description;
		this.isPrivate = updates.isPrivate;
	}
}

/**
 * Configuration for the new tweet to be posted.
 *
 * @public
 */
export class NewTweet implements INewTweet {
	public media?: NewTweetMedia[];
	public quote?: string;
	public replyTo?: string;
	public scheduleFor?: Date;
	public text: string;

	/**
	 * @param newTweet - The args specifying the new tweet to be posted.
	 */
	public constructor(newTweet: INewTweet) {
		this.media = newTweet.media;
		this.quote = newTweet.quote;
		this.replyTo = newTweet.replyTo;
		this.scheduleFor = newTweet.scheduleFor;
		this.text = newTweet.text ?? '';
	}
}

/**
 * Configuration for the media to be uploaded.
 *
 * @public
 */
export class NewTweetMedia implements INewTweetMedia {
	public id: string;
	public tags?: string[];

	/**
	 * @param newTweetMedia - The args specifying the new media to be posted along with the tweet.
	 */
	public constructor(newTweetMedia: INewTweetMedia) {
		this.id = newTweetMedia.id;
		this.tags = newTweetMedia.tags;
	}
}

/**
 * Options specifying the media file to be uploaded.
 *
 * @public
 */
export class UploadArgs implements IUploadArgs {
	public id?: string;
	public media?: string | ArrayBuffer;
	public size?: number;

	/**
	 * @param step - The upload step.
	 * @param args - The upload arguments for uploading the media file.
	 */
	public constructor(args: IUploadArgs) {
		this.size = args.size;
		this.media = args.media;
		this.id = args.id;
	}
}

/**
 * Options specifying the metadata to set for an uploaded media item.
 *
 * @public
 */
export class MediaMetadataArgs implements IMediaMetadataArgs {
	public aiGenerated?: boolean;
	public allowDownload?: boolean;
	public altText?: string;
	public blockGrokEdit?: boolean;
	public id: string;
	public sensitiveWarning?: SensitiveWarning[];

	/**
	 * @param args - The metadata to set for the media item.
	 */
	public constructor(args: IMediaMetadataArgs) {
		if (!args.id || args.id.trim().length === 0) {
			throw new Error('Media id cannot be empty');
		}

		if (args.sensitiveWarning) {
			const valid = Object.values(SensitiveWarning);
			for (const warning of args.sensitiveWarning) {
				if (!valid.includes(warning)) {
					throw new Error(`Invalid sensitive warning '${warning}'. Must be one of: ${valid.join(', ')}`);
				}
			}
		}

		if (
			args.altText === undefined &&
			args.sensitiveWarning === undefined &&
			args.allowDownload === undefined &&
			args.blockGrokEdit === undefined &&
			args.aiGenerated === undefined
		) {
			throw new Error('At least one media metadata option must be specified');
		}

		this.id = args.id;
		this.altText = args.altText;
		this.sensitiveWarning = args.sensitiveWarning;
		this.allowDownload = args.allowDownload;
		this.blockGrokEdit = args.blockGrokEdit;
		this.aiGenerated = args.aiGenerated;
	}
}

/**
 * The args for changing authenticated user's password.
 *
 * @public
 */
export class ChangePasswordArgs implements IChangePasswordArgs {
	public currentPassword: string;
	public newPassword: string;

	public constructor(args: IChangePasswordArgs) {
		if (!args.currentPassword || args.currentPassword.trim().length === 0) {
			throw new Error('Current password cannot be empty');
		}
		if (!args.newPassword || args.newPassword.trim().length === 0) {
			throw new Error('New password cannot be empty');
		}
		if (args.newPassword.length < 8) {
			throw new Error('New password must be at least 8 characters long');
		}

		this.currentPassword = args.currentPassword;
		this.newPassword = args.newPassword;
	}
}

/**
 * Validates that the given call duration is a positive integer number of minutes.
 *
 * @param duration - The duration to validate.
 */
function validateCallDuration(duration: number | undefined): number | undefined {
	if (duration !== undefined && (!Number.isInteger(duration) || duration < 1)) {
		throw new Error('Call duration must be an integer of at least 1 minute');
	}

	return duration;
}

/**
 * Configuration for the call to be scheduled.
 *
 * @public
 */
export class NewCall implements INewCall {
	public description?: string;
	public duration: number;
	public emailGuests?: boolean;
	public inviteeIds?: string[];
	public recurrence?: string;
	public startsAt: Date;
	public timeZone?: string;
	public title?: string;

	/**
	 * @param newCall - The args specifying the call to be scheduled.
	 */
	public constructor(newCall: INewCall) {
		if (!(newCall.startsAt instanceof Date) || isNaN(newCall.startsAt.getTime())) {
			throw new Error('Call start must be a valid date');
		}

		this.description = newCall.description;
		this.duration = validateCallDuration(newCall.duration) ?? 60;
		this.emailGuests = newCall.emailGuests;
		this.inviteeIds = newCall.inviteeIds;
		this.recurrence = newCall.recurrence;
		this.startsAt = newCall.startsAt;
		this.timeZone = newCall.timeZone;
		this.title = newCall.title;
	}
}

/**
 * The updates to apply to a scheduled call.
 *
 * @public
 */
export class CallUpdates implements ICallUpdates {
	public description?: string;
	public duration?: number;
	public inviteeIds?: string[];
	public recurrence?: string;
	public startsAt?: Date;
	public timeZone?: string;
	public title?: string;

	/**
	 * @param updates - The updates to apply to the scheduled call.
	 */
	public constructor(updates: ICallUpdates) {
		if (updates.startsAt !== undefined && isNaN(updates.startsAt.getTime())) {
			throw new Error('Call start must be a valid date');
		}

		this.description = updates.description;
		this.duration = validateCallDuration(updates.duration);
		this.inviteeIds = updates.inviteeIds;
		this.recurrence = updates.recurrence;
		this.startsAt = updates.startsAt;
		this.timeZone = updates.timeZone;
		this.title = updates.title;
	}
}
