import { CallRsvpStatus } from '../../enums/Call';
import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { ICallUser } from '../../types/data/CallUser';
import { ICalendarUser as IRawCalendarUser } from '../../types/raw/base/Calendar';
import { IScheduledCallsApiSearchPeopleResponse } from '../../types/raw/call/ScheduledCallsApiSearchPeople';

/**
 * The details of a user, as returned by the X Calls endpoints.
 *
 * @public
 */
export class CallUser implements ICallUser {
	/** The raw user details. */
	private readonly _raw: IRawCalendarUser;

	public canInvite?: boolean;
	public fullName: string;
	public id: string;
	public isVerified: boolean;
	public profileImage?: string;
	public rsvp?: CallRsvpStatus;
	public userName: string;

	/**
	 * @param user - The raw user details.
	 * @param rsvp - The raw RSVP status of the user, if the user is an attendee of a call.
	 */
	public constructor(user: IRawCalendarUser, rsvp?: string | null) {
		this._raw = { ...user };
		this.id = user.rest_id;
		this.userName = user.core?.screen_name ?? '';
		this.fullName = user.core?.name ?? '';
		this.isVerified = user.verification?.is_blue_verified ?? false;
		this.profileImage = user.avatar?.image_url;
		this.rsvp = rsvp ? (rsvp as CallRsvpStatus) : undefined;
		this.canInvite = user.chat_permissions
			? user.chat_permissions.can_dm_reason === 'Allowed' && user.chat_permissions.is_trusted === true
			: undefined;
	}

	/** The raw user details. */
	public get raw(): IRawCalendarUser {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes the users from the given raw people search response.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of users.
	 */
	public static multiple(response: IScheduledCallsApiSearchPeopleResponse): CallUser[] {
		const users: CallUser[] = [];

		for (const item of response.data?.search_by_raw_query?.x_chat_users_typeahead ?? []) {
			const user = item.typeahead_user?.user_results?.result;

			if (user?.__typename === 'User' && user.rest_id) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: user.rest_id });

				users.push(new CallUser(user));
			}
		}

		return users;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICallUser {
		return {
			canInvite: this.canInvite,
			fullName: this.fullName,
			id: this.id,
			isVerified: this.isVerified,
			profileImage: this.profileImage,
			rsvp: this.rsvp,
			userName: this.userName,
		};
	}
}
