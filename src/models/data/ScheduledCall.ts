import { CalendarProvider, CallEventType, CallStatus } from '../../enums/Call';
import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IScheduledCall, IScheduledCallExternalDetails } from '../../types/data/ScheduledCall';
import {
	ICalendarEvent as IRawCalendarEvent,
	ICalendarEventOccurrence as IRawCalendarEventOccurrence,
} from '../../types/raw/base/Calendar';

import { CallUser } from './CallUser';

/** The number of milliseconds in a minute, the time unit used by the X Calls endpoints. */
const MinuteMs = 60000;

/**
 * The details of a single occurrence of a scheduled call (or of any other calendar event).
 *
 * @public
 */
export class ScheduledCall implements IScheduledCall {
	/** The raw occurrence details. */
	private readonly _raw: IRawCalendarEventOccurrence;

	public allDay: boolean;
	public attendees: CallUser[];
	public description?: string;
	public duration: number;
	public endsAt: string;
	public external?: IScheduledCallExternalDetails;
	public id: string;
	public meetingUrl?: string;
	public occurrence: string;
	public organizer?: CallUser;
	public recurrence?: string;
	public reminder?: number;
	public startsAt: string;
	public status: CallStatus;
	public timeZone?: string;
	public title?: string;
	public type: CallEventType;
	public viewerMetadata?: string;

	/**
	 * @param id - The id of the event the occurrence belongs to (falls back to the external event id).
	 * @param occurrence - The raw occurrence details.
	 */
	public constructor(id: string, occurrence: IRawCalendarEventOccurrence) {
		const start = Number(occurrence.start_min ?? occurrence.occurrence_start_min ?? 0);

		this._raw = { ...occurrence };
		this.id = id || occurrence.kind?.external_id || '';
		this.type = (occurrence.kind?.__typename ?? CallEventType.CALL) as CallEventType;
		this.status = (occurrence.status ?? CallStatus.ACTIVE) as CallStatus;
		this.title = occurrence.title?.trim() || occurrence.kind?.name?.trim() || undefined;
		this.description = occurrence.description ?? undefined;
		this.allDay = occurrence.all_day ?? false;
		this.duration = occurrence.duration_min ?? 0;
		this.occurrence = new Date(Number(occurrence.occurrence_start_min ?? start) * MinuteMs).toISOString();
		this.startsAt = new Date(start * MinuteMs).toISOString();
		this.endsAt = new Date((start + this.duration) * MinuteMs).toISOString();
		this.timeZone = occurrence.tz ?? undefined;
		this.recurrence = occurrence.rrule || undefined;
		this.reminder = occurrence.viewer_notify_before_min ?? undefined;
		this.viewerMetadata = occurrence.viewer_metadata ?? undefined;
		this.meetingUrl = occurrence.kind?.meeting_url?.trim() || occurrence.kind?.join_uri?.trim() || undefined;
		this.organizer = occurrence.organizer?.result ? new CallUser(occurrence.organizer.result) : undefined;
		this.attendees = (occurrence.attendees ?? [])
			.filter((attendee) => attendee.user_results?.result?.rest_id)
			.map((attendee) => new CallUser(attendee.user_results.result!, attendee.rsvp_status));
		this.external =
			this.type == CallEventType.EXTERNAL
				? {
						conferenceType: occurrence.kind?.conference_type ?? undefined,
						id: occurrence.kind?.external_id ?? undefined,
						joinUrl: occurrence.kind?.join_uri ?? undefined,
						location: occurrence.kind?.location ?? undefined,
						provider: (occurrence.kind?.provider as CalendarProvider) ?? undefined,
						url: occurrence.kind?.html_link ?? undefined,
					}
				: undefined;
	}

	/** The raw occurrence details. */
	public get raw(): IRawCalendarEventOccurrence {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes all the occurrences of the given raw calendar events.
	 *
	 * @param events - The raw calendar events.
	 *
	 * @returns The deserialized list of occurrences, sorted by start time.
	 */
	public static multiple(events: IRawCalendarEvent[]): ScheduledCall[] {
		const calls: ScheduledCall[] = [];

		for (const event of events) {
			for (const occurrence of event.occurrences ?? []) {
				if (occurrence.start_min ?? occurrence.occurrence_start_min) {
					// Logging
					LogService.log(LogActions.DESERIALIZE, { id: event.rest_id });

					calls.push(new ScheduledCall(event.rest_id, occurrence));
				}
			}
		}

		return calls.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IScheduledCall {
		return {
			allDay: this.allDay,
			attendees: this.attendees.map((attendee) => attendee.toJSON()),
			description: this.description,
			duration: this.duration,
			endsAt: this.endsAt,
			external: this.external,
			id: this.id,
			meetingUrl: this.meetingUrl,
			occurrence: this.occurrence,
			organizer: this.organizer?.toJSON(),
			recurrence: this.recurrence,
			reminder: this.reminder,
			startsAt: this.startsAt,
			status: this.status,
			timeZone: this.timeZone,
			title: this.title,
			type: this.type,
			viewerMetadata: this.viewerMetadata,
		};
	}
}
