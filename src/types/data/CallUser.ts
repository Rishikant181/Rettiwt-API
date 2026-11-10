import { CallRsvpStatus } from '../../enums/Call';

/**
 * The details of a user, as returned by the X Calls endpoints.
 *
 * @public
 */
export interface ICallUser {
	/** Whether the user can be invited to a call (only available when searching for people). */
	canInvite?: boolean;

	/** The full name of the user. */
	fullName: string;

	/** The rest id of the user. */
	id: string;

	/** Whether the user is verified or not. */
	isVerified: boolean;

	/** The url of the profile image of the user. */
	profileImage?: string;

	/** The RSVP status of the user (only available for attendees of a scheduled call). */
	rsvp?: CallRsvpStatus;

	/** The username/screenname of the user. */
	userName: string;
}
