import { Extractors } from '../../collections/Extractors';
import { CalendarProvider, CallRsvpStatus } from '../../enums/Call';
import { ResourceType } from '../../enums/Resource';
import { CalendarLink } from '../../models/data/CalendarLink';
import { CallUser } from '../../models/data/CallUser';
import { ScheduledCall } from '../../models/data/ScheduledCall';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ICallCustomization, ICallOccurrenceOptions, ICallUpdates, INewCall } from '../../types/args/PostArgs';
import { IExternalCalendarLinksListResponse } from '../../types/raw/call/ExternalCalendarLinksList';
import { IExternalCalendarLinksUnlinkResponse } from '../../types/raw/call/ExternalCalendarLinksUnlink';
import { IScheduledCallsApiCancelResponse } from '../../types/raw/call/ScheduledCallsApiCancel';
import { IScheduledCallsApiListResponse } from '../../types/raw/call/ScheduledCallsApiList';
import { IScheduledCallsApiListUserResponse } from '../../types/raw/call/ScheduledCallsApiListUser';
import { IScheduledCallsApiRefreshExternalResponse } from '../../types/raw/call/ScheduledCallsApiRefreshExternal';
import { IScheduledCallsApiRsvpResponse } from '../../types/raw/call/ScheduledCallsApiRsvp';
import { IScheduledCallsApiScheduleResponse } from '../../types/raw/call/ScheduledCallsApiSchedule';
import { IScheduledCallsApiSearchPeopleResponse } from '../../types/raw/call/ScheduledCallsApiSearchPeople';
import { IScheduledCallsApiSetEventMetadataResponse } from '../../types/raw/call/ScheduledCallsApiSetEventMetadata';
import { IScheduledCallsApiSetEventReminderResponse } from '../../types/raw/call/ScheduledCallsApiSetEventReminder';
import { IScheduledCallsApiUpdateResponse } from '../../types/raw/call/ScheduledCallsApiUpdate';
import { IXCallsStartCallResponse } from '../../types/raw/call/XCallsStartCall';

import { FetcherService } from './FetcherService';

/** The default length of the time window used when listing calls, in milliseconds (7 days). */
const DefaultWindowMs = 7 * 24 * 60 * 60 * 1000;

/**
 * Handles interacting with resources related to X Calls.
 *
 * @public
 */
export class CallService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Get the shared calendar (busy slots) of a user, to find a time to meet with them.
	 *
	 * @param id - The ID of the target user.
	 * @param from - The start of the time window. Defaults to now.
	 * @param to - The end of the time window. Defaults to 7 days after `from`.
	 *
	 * @returns The busy slots of the user, or `undefined` if the user does not share their calendar.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.availability('1234567890')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async availability(id: string, from?: Date, to?: Date): Promise<ScheduledCall[] | undefined> {
		const resource = ResourceType.CALL_USER_AVAILABILITY;
		const fromTime = from ?? new Date();

		// Fetching the raw shared calendar
		const response = await this.request<IScheduledCallsApiListUserResponse>(resource, {
			id: id,
			fromTime: fromTime,
			toTime: to ?? new Date(fromTime.getTime() + DefaultWindowMs),
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get the list of external calendars (Google, Outlook) linked to X Calls.
	 *
	 * @returns The list of linked calendars.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.calendars()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async calendars(): Promise<CalendarLink[]> {
		const resource = ResourceType.CALL_CALENDARS;

		// Fetching the raw list of linked calendars
		const response = await this.request<IExternalCalendarLinksListResponse>(resource, {});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Cancel a scheduled call.
	 *
	 * @param id - The ID of the scheduled call to cancel.
	 * @param options - The occurrence(s) to cancel, for recurring calls, and whether to notify the guests by email.
	 *
	 * @returns Whether the cancellation was successful.
	 *
	 * @example
	 *
	 * ```ts
	 * import { CallRecurrenceScope, Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Cancelling a whole recurring series and notifying the guests
	 * rettiwt.call.cancel('1234567890', { scope: CallRecurrenceScope.ALL, emailGuests: true })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async cancel(id: string, options?: ICallOccurrenceOptions): Promise<boolean> {
		const resource = ResourceType.CALL_CANCEL;

		// Cancelling the call
		const response = await this.request<IScheduledCallsApiCancelResponse>(resource, {
			id: id,
			callOccurrence: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Create a call link to use later.
	 *
	 * @param audioOnly - Whether the call is audio-only.
	 *
	 * @returns The ID of the created call.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.create()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async create(audioOnly?: boolean): Promise<string | undefined> {
		const resource = ResourceType.CALL_CREATE;

		// Creating the call
		const response = await this.request<IXCallsStartCallResponse>(resource, { audioOnly: audioOnly });

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Customize how a scheduled call appears in the calendar of the logged-in user.
	 *
	 * @param id - The ID of the scheduled call to customize.
	 * @param customization - The color and/or visibility to apply. Replaces the previous customization.
	 * @param options - The occurrence(s) to customize, for recurring calls.
	 *
	 * @returns Whether the customization was successful.
	 *
	 * @example
	 *
	 * ```ts
	 * import { CalendarColor, Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.customize('1234567890', { color: CalendarColor.PURPLE })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async customize(
		id: string,
		customization: ICallCustomization,
		options?: ICallOccurrenceOptions,
	): Promise<boolean> {
		const resource = ResourceType.CALL_CUSTOMIZE;

		// Customizing the call
		const response = await this.request<IScheduledCallsApiSetEventMetadataResponse>(resource, {
			id: id,
			callCustomization: customization,
			callOccurrence: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get the calendar of the logged-in user, including scheduled calls, holidays and events from linked calendars.
	 *
	 * @param from - The start of the time window. Defaults to now.
	 * @param to - The end of the time window. Defaults to 7 days after `from`.
	 *
	 * @returns The occurrences of the events within the time window, sorted by start time.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the calls of October 2026
	 * rettiwt.call.list(new Date('2026-10-01'), new Date('2026-11-01'))
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async list(from?: Date, to?: Date): Promise<ScheduledCall[]> {
		const resource = ResourceType.CALL_LIST;
		const fromTime = from ?? new Date();

		// Fetching the raw calendar
		const response = await this.request<IScheduledCallsApiListResponse>(resource, {
			fromTime: fromTime,
			toTime: to ?? new Date(fromTime.getTime() + DefaultWindowMs),
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Sync the linked external calendars and get their events.
	 *
	 * @param from - The start of the time window. Defaults to now.
	 * @param to - The end of the time window. Defaults to 7 days after `from`.
	 *
	 * @returns The occurrences of the events of the linked calendars within the time window.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.refreshCalendars()
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async refreshCalendars(from?: Date, to?: Date): Promise<ScheduledCall[]> {
		const resource = ResourceType.CALL_CALENDAR_REFRESH;
		const fromTime = from ?? new Date();

		// Refreshing the linked calendars
		const response = await this.request<IScheduledCallsApiRefreshExternalResponse>(resource, {
			fromTime: fromTime,
			toTime: to ?? new Date(fromTime.getTime() + DefaultWindowMs),
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Set the reminder of a scheduled call, for the logged-in user.
	 *
	 * @param id - The ID of the scheduled call.
	 * @param minutes - The number of minutes before the call at which to be reminded (0 to 10080).
	 * @param options - The occurrence(s) to set the reminder for, for recurring calls.
	 *
	 * @returns Whether the reminder was set successfully.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.remind('1234567890', 15)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async remind(id: string, minutes: number, options?: ICallOccurrenceOptions): Promise<boolean> {
		const resource = ResourceType.CALL_REMINDER;

		// Setting the reminder
		const response = await this.request<IScheduledCallsApiSetEventReminderResponse>(resource, {
			id: id,
			reminder: minutes,
			callOccurrence: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Respond to a scheduled call invitation.
	 *
	 * @param id - The ID of the scheduled call.
	 * @param status - The response to the invitation.
	 * @param options - The occurrence(s) to respond to, for recurring calls.
	 *
	 * @returns Whether the response was successful.
	 *
	 * @example
	 *
	 * ```ts
	 * import { CallRsvpStatus, Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.rsvp('1234567890', CallRsvpStatus.ACCEPTED)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async rsvp(id: string, status: CallRsvpStatus, options?: ICallOccurrenceOptions): Promise<boolean> {
		const resource = ResourceType.CALL_RSVP;

		// Responding to the invitation
		const response = await this.request<IScheduledCallsApiRsvpResponse>(resource, {
			id: id,
			rsvp: status,
			callOccurrence: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Schedule a new call.
	 *
	 * @param call - The details of the call to schedule.
	 *
	 * @returns The ID of the scheduled call.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Scheduling a weekly 30 minutes call with a given user
	 * rettiwt.call.schedule({
	 * 	title: 'Weekly sync',
	 * 	startsAt: new Date('2026-10-15T10:00:00Z'),
	 * 	duration: 30,
	 * 	inviteeIds: ['1234567890'],
	 * 	recurrence: 'FREQ=WEEKLY;BYDAY=TH',
	 * })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async schedule(call: INewCall): Promise<string | undefined> {
		const resource = ResourceType.CALL_SCHEDULE;

		// Scheduling the call
		const response = await this.request<IScheduledCallsApiScheduleResponse>(resource, { call: call });

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Search for people to invite to a call.
	 *
	 * @param query - The name or username to search for.
	 * @param count - The maximum number of users to fetch. Defaults to 8.
	 *
	 * @returns The list of matching users. Only users with `canInvite` set to `true` can be invited.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.search('elonmusk')
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async search(query: string, count?: number): Promise<CallUser[]> {
		const resource = ResourceType.CALL_SEARCH_PEOPLE;

		// Searching for people
		const response = await this.request<IScheduledCallsApiSearchPeopleResponse>(resource, {
			id: query,
			count: count,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Unlink an external calendar from X Calls.
	 *
	 * @param provider - The provider of the calendar to unlink.
	 *
	 * @returns Whether the calendar was unlinked successfully.
	 *
	 * @example
	 *
	 * ```ts
	 * import { CalendarProvider, Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * rettiwt.call.unlinkCalendar(CalendarProvider.GOOGLE)
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async unlinkCalendar(provider: CalendarProvider): Promise<boolean> {
		const resource = ResourceType.CALL_CALENDAR_UNLINK;

		// Unlinking the calendar
		const response = await this.request<IExternalCalendarLinksUnlinkResponse>(resource, {
			calendarProvider: provider,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Update a scheduled call.
	 *
	 * @param id - The ID of the scheduled call to update.
	 * @param updates - The updates to apply. Only the given fields are updated.
	 * @param options - The occurrence(s) to update, for recurring calls, and whether to notify the guests by email.
	 *
	 * @returns Whether the update was successful.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Moving a call one hour later
	 * rettiwt.call.update('1234567890', { startsAt: new Date('2026-10-15T11:00:00Z') }, { emailGuests: true })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async update(id: string, updates: ICallUpdates, options?: ICallOccurrenceOptions): Promise<boolean> {
		const resource = ResourceType.CALL_UPDATE;

		// Updating the call
		const response = await this.request<IScheduledCallsApiUpdateResponse>(resource, {
			id: id,
			callUpdates: updates,
			callOccurrence: options,
		});

		// Deserializing response
		const data = Extractors[resource](response.data);

		return data;
	}
}
