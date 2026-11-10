import { AxiosRequestConfig } from 'axios';

import { CalendarProvider, CallRecurrenceScope, CallRsvpStatus } from '../enums/Call';
import { ICallCustomization, ICallOccurrenceOptions, ICallUpdates, INewCall } from '../types/args/PostArgs';

/** The base url of the GraphQL API used by X Calls. */
const CallsGraphQLUrl = 'https://api.x.com/graphql';

/**
 * Converts the given date to the X Calls time format (Unix epoch minutes, as a string).
 *
 * @param date - The date to convert.
 */
function toEpochMinutes(date: Date): string {
	return String(Math.floor(date.getTime() / 60000));
}

/**
 * @returns The IANA time zone of the current environment.
 */
function defaultTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Builds a request to a GraphQL mutation of X Calls.
 *
 * @param queryId - The persisted query id of the mutation.
 * @param operationName - The name of the mutation.
 * @param variables - The variables of the mutation.
 */
function graphqlMutation(
	queryId: string,
	operationName: string,
	variables: Record<string, unknown>,
): AxiosRequestConfig {
	return {
		method: 'post',
		url: `${CallsGraphQLUrl}/${queryId}/${operationName}`,
		data: {
			queryId: queryId,
			variables: variables,
		},
	};
}

/**
 * Builds a request to a GraphQL query of X Calls.
 *
 * @param queryId - The persisted query id of the query.
 * @param operationName - The name of the query.
 * @param variables - The variables of the query.
 */
function graphqlQuery(queryId: string, operationName: string, variables: Record<string, unknown>): AxiosRequestConfig {
	return {
		method: 'get',
		url: `${CallsGraphQLUrl}/${queryId}/${operationName}`,
		params: {
			variables: JSON.stringify(variables),
		},
		paramsSerializer: { encode: encodeURIComponent },
	};
}

/**
 * Collection of requests related to X Calls.
 *
 * @public
 */
export class CallRequests {
	/**
	 * @param id - The id of the scheduled call to cancel.
	 * @param options - The occurrence(s) of the scheduled call to cancel.
	 */
	public static cancel(id: string, options?: ICallOccurrenceOptions): AxiosRequestConfig {
		return graphqlMutation('5pOI1IQ4QanA2vYAKx-dEA', 'scheduledCallsApiCancel', {
			eventId: id,
			occurrenceStartMin: options?.occurrence ? toEpochMinutes(options.occurrence) : null,
			scope: options?.scope ?? CallRecurrenceScope.THIS,
			emailGuests: options?.emailGuests ?? null,
		});
	}

	/**
	 * @param audioOnly - Whether the call is audio-only.
	 */
	public static create(audioOnly?: boolean): AxiosRequestConfig {
		return graphqlMutation('uBs8Yt37Pmmq4Sen1smelQ', 'xCallsStartCall', {
			audioOnly: audioOnly ?? false,
		});
	}

	/**
	 * @param id - The id of the scheduled call to customize.
	 * @param customization - The customization to apply.
	 * @param options - The occurrence(s) of the scheduled call to customize.
	 */
	public static customize(
		id: string,
		customization: ICallCustomization,
		options?: ICallOccurrenceOptions,
	): AxiosRequestConfig {
		const metadata = {
			...(customization.color !== undefined ? { color: customization.color } : {}),
			...(customization.hidden ? { hidden: true } : {}),
		};

		return graphqlMutation('zTzSDwCIh3cFuDuTA9AE9A', 'scheduledCallsApiSetEventMetadata', {
			eventId: id,
			occurrenceStartMin: options?.occurrence ? toEpochMinutes(options.occurrence) : null,
			scope: options?.scope ?? CallRecurrenceScope.THIS,
			metadata: Object.keys(metadata).length ? JSON.stringify(metadata) : null,
			fromMin: null,
			toMin: null,
		});
	}

	/**
	 * Lists the external calendars linked to X Calls.
	 */
	public static linkedCalendars(): AxiosRequestConfig {
		// This query is always sent as a POST request by the web client
		return graphqlMutation('F-WSJpE4grdoaZz_c14CHw', 'externalCalendarLinksList', {});
	}

	/**
	 * @param fromTime - The start of the time window.
	 * @param toTime - The end of the time window.
	 */
	public static list(fromTime: Date, toTime: Date): AxiosRequestConfig {
		return graphqlQuery('FNJ9EtyLBA4k1Ruj9CkQ8g', 'scheduledCallsApiList', {
			fromMin: toEpochMinutes(fromTime),
			toMin: toEpochMinutes(toTime),
		});
	}

	/**
	 * @param fromTime - The start of the time window.
	 * @param toTime - The end of the time window.
	 */
	public static refreshCalendars(fromTime: Date, toTime: Date): AxiosRequestConfig {
		return graphqlMutation('UPArLl37udnvRqu_Ky4Eyg', 'scheduledCallsApiRefreshExternal', {
			fromMin: toEpochMinutes(fromTime),
			toMin: toEpochMinutes(toTime),
		});
	}

	/**
	 * @param id - The id of the scheduled call.
	 * @param minutes - The number of minutes before the call at which to be reminded.
	 * @param options - The occurrence(s) of the scheduled call to set the reminder for.
	 */
	public static reminder(id: string, minutes: number, options?: ICallOccurrenceOptions): AxiosRequestConfig {
		return graphqlMutation('DOwFHdkLNLHCfCemTvmm8w', 'scheduledCallsApiSetEventReminder', {
			eventId: id,
			occurrenceStartMin: options?.occurrence ? toEpochMinutes(options.occurrence) : null,
			scope: options?.scope ?? CallRecurrenceScope.THIS,
			notifyBeforeMin: minutes,
			fromMin: null,
			toMin: null,
		});
	}

	/**
	 * @param id - The id of the scheduled call.
	 * @param status - The RSVP status to respond with.
	 * @param options - The occurrence(s) of the scheduled call to respond to.
	 */
	public static rsvp(id: string, status: CallRsvpStatus, options?: ICallOccurrenceOptions): AxiosRequestConfig {
		return graphqlMutation('Fr6xaBip3kMeuV1A73k09Q', 'scheduledCallsApiRsvp', {
			eventId: id,
			occurrenceStartMin: options?.occurrence ? toEpochMinutes(options.occurrence) : null,
			scope: options?.scope ?? CallRecurrenceScope.THIS,
			status: status,
			fromMin: null,
			toMin: null,
		});
	}

	/**
	 * @param call - The call to schedule.
	 */
	public static schedule(call: INewCall): AxiosRequestConfig {
		const duration = call.duration ?? 60;
		const endsAt = new Date(call.startsAt.getTime() + duration * 60000);

		return graphqlMutation('N1jYdbFWCzhldiLvy1FjEg', 'scheduledCallsApiSchedule', {
			/* eslint-disable @typescript-eslint/naming-convention */
			event: {
				start_min: toEpochMinutes(call.startsAt),
				duration_min: duration,
				title: call.title ?? null,
				description: call.description ?? null,
				tz: call.timeZone ?? defaultTimeZone(),
				attendee_user_ids: call.inviteeIds ?? null,
				...(call.recurrence !== undefined ? { rrule: call.recurrence } : {}),
				kind: { calling: {} },
			},
			/* eslint-enable @typescript-eslint/naming-convention */
			emailGuests: call.emailGuests ?? null,
			fromMin: toEpochMinutes(call.startsAt),
			toMin: toEpochMinutes(endsAt),
		});
	}

	/**
	 * @param query - The search query.
	 * @param count - The maximum number of users to fetch.
	 */
	public static searchPeople(query: string, count?: number): AxiosRequestConfig {
		return graphqlQuery('D0ENVjYgOK1cU6gmR3s10A', 'scheduledCallsApiSearchPeople', {
			query: query,
			count: count ?? 8,
		});
	}

	/**
	 * @param provider - The provider of the external calendar to unlink.
	 */
	public static unlinkCalendar(provider: CalendarProvider): AxiosRequestConfig {
		return graphqlMutation('3OpvGfqiBiHVGlef9z1vHA', 'externalCalendarLinksUnlink', {
			provider: provider,
		});
	}

	/**
	 * @param id - The id of the scheduled call to update.
	 * @param updates - The updates to apply.
	 * @param options - The occurrence(s) of the scheduled call to update.
	 */
	public static update(id: string, updates: ICallUpdates, options?: ICallOccurrenceOptions): AxiosRequestConfig {
		return graphqlMutation('-SIlLNh5yZBsPcMSgoRAOA', 'scheduledCallsApiUpdate', {
			eventId: id,
			occurrenceStartMin: options?.occurrence ? toEpochMinutes(options.occurrence) : null,
			scope: options?.scope ?? CallRecurrenceScope.THIS,
			/* eslint-disable @typescript-eslint/naming-convention */
			event: {
				...(updates.startsAt !== undefined
					? { start_min: toEpochMinutes(updates.startsAt), tz: updates.timeZone ?? defaultTimeZone() }
					: {}),
				...(updates.duration !== undefined ? { duration_min: updates.duration } : {}),
				...(updates.title !== undefined ? { title: updates.title } : {}),
				...(updates.description !== undefined ? { description: updates.description } : {}),
				...(updates.recurrence !== undefined ? { rrule: updates.recurrence } : {}),
				...(updates.inviteeIds !== undefined ? { attendee_user_ids: updates.inviteeIds } : {}),
			},
			/* eslint-enable @typescript-eslint/naming-convention */
			emailGuests: options?.emailGuests ?? null,
			fromMin: null,
			toMin: null,
		});
	}

	/**
	 * @param id - The id of the user whose shared calendar is to be fetched.
	 * @param fromTime - The start of the time window.
	 * @param toTime - The end of the time window.
	 */
	public static userAvailability(id: string, fromTime: Date, toTime: Date): AxiosRequestConfig {
		return graphqlQuery('1pf2PLGgtu_2al_S-nQPww', 'scheduledCallsApiListUser', {
			restId: id,
			fromMin: toEpochMinutes(fromTime),
			toMin: toEpochMinutes(toTime),
		});
	}
}
