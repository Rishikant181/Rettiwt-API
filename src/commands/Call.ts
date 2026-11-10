import { Command, createCommand } from 'commander';

import { CalendarColor, CalendarProvider, CallRecurrenceScope, CallRsvpStatus } from '../enums/Call';
import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';
import { ICallOccurrenceOptions, ICallUpdates } from '../types/args/PostArgs';

interface ICallOccurrenceCommandOptions {
	occurrence?: string;
	scope?: CallRecurrenceScope;
	emailGuests?: boolean;
}

interface ICallScheduleCommandOptions {
	title?: string;
	description?: string;
	duration?: string;
	invite?: string[];
	recurrence?: string;
	timeZone?: string;
	emailGuests?: boolean;
}

interface ICallUpdateCommandOptions extends ICallOccurrenceCommandOptions {
	title?: string;
	description?: string;
	start?: string;
	duration?: string;
	invite?: string[];
	recurrence?: string;
	timeZone?: string;
}

interface ICallCustomizeCommandOptions extends ICallOccurrenceCommandOptions {
	color?: CalendarColor;
	hidden?: boolean;
}

/**
 * Parses the occurrence options of a command.
 *
 * @param options - The options of the command.
 */
function parseOccurrence(options?: ICallOccurrenceCommandOptions): ICallOccurrenceOptions {
	return {
		occurrence: options?.occurrence ? new Date(options.occurrence) : undefined,
		scope: options?.scope,
		emailGuests: options?.emailGuests,
	};
}

/**
 * Adds the options used to target the occurrence(s) of a recurring call to the given command.
 *
 * @param command - The command to add the options to.
 */
function withOccurrenceOptions(command: Command): Command {
	return command
		.option('-o, --occurrence <date>', 'The original start of the target occurrence, for recurring calls')
		.option(
			'-s, --scope <scope>',
			`The occurrences to act on (${Object.values(CallRecurrenceScope).join(', ')})`,
			CallRecurrenceScope.THIS,
		);
}

/**
 * Creates a new 'call' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'call' command.
 */
function createCallCommand(rettiwt: Rettiwt): Command {
	// Creating the 'call' command
	const call = createCommand('call').description('Access resources related to X Calls');

	// List
	call.command('list')
		.description('Fetch the calendar of the logged-in user')
		.argument('[from]', 'The start of the time window (defaults to now)')
		.argument('[to]', 'The end of the time window (defaults to 7 days after the start)')
		.action(async (from?: string, to?: string) => {
			try {
				const calls = await rettiwt.call.list(from ? new Date(from) : undefined, to ? new Date(to) : undefined);
				output(calls);
			} catch (error) {
				output(error);
			}
		});

	// Availability
	call.command('availability')
		.description('Fetch the busy slots of the shared calendar of a user')
		.argument('<id>', 'The id of the user')
		.argument('[from]', 'The start of the time window (defaults to now)')
		.argument('[to]', 'The end of the time window (defaults to 7 days after the start)')
		.action(async (id: string, from?: string, to?: string) => {
			try {
				const calls = await rettiwt.call.availability(
					id,
					from ? new Date(from) : undefined,
					to ? new Date(to) : undefined,
				);
				output(calls);
			} catch (error) {
				output(error);
			}
		});

	// Search
	call.command('search')
		.description('Search for people to invite to a call')
		.argument('<query>', 'The name or username to search for')
		.argument('[count]', 'The maximum number of users to fetch')
		.action(async (query: string, count?: string) => {
			try {
				const users = await rettiwt.call.search(query, count ? parseInt(count) : undefined);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Create
	call.command('create')
		.description('Create a call link to use later')
		.option('--audio-only', 'Create an audio-only call')
		.action(async (options?: { audioOnly?: boolean }) => {
			try {
				const id = await rettiwt.call.create(options?.audioOnly);
				output(id);
			} catch (error) {
				output(error);
			}
		});

	// Schedule
	call.command('schedule')
		.description('Schedule a new call')
		.argument('<start>', 'The date and time at which the call starts')
		.option('-t, --title <string>', 'The title of the call')
		.option('-d, --description <string>', 'The description of the call')
		.option('--duration <minutes>', 'The duration of the call, in minutes', '60')
		.option('-i, --invite <ids...>', 'The ids of the users to invite')
		.option('-r, --recurrence <rrule>', "The recurrence rule of the call, e.g. 'FREQ=WEEKLY;BYDAY=TH'")
		.option('-z, --time-zone <tz>', 'The IANA time zone of the call')
		.option('-e, --email-guests', 'Send an invitation email to the guests')
		.action(async (start: string, options?: ICallScheduleCommandOptions) => {
			try {
				const id = await rettiwt.call.schedule({
					startsAt: new Date(start),
					title: options?.title,
					description: options?.description,
					duration: options?.duration ? parseInt(options.duration) : undefined,
					inviteeIds: options?.invite,
					recurrence: options?.recurrence,
					timeZone: options?.timeZone,
					emailGuests: options?.emailGuests,
				});
				output(id);
			} catch (error) {
				output(error);
			}
		});

	// Update
	withOccurrenceOptions(
		call
			.command('update')
			.description('Update a scheduled call')
			.argument('<id>', 'The id of the scheduled call')
			.option('-t, --title <string>', 'The new title of the call')
			.option('-d, --description <string>', 'The new description of the call')
			.option('--start <date>', 'The new date and time at which the call starts')
			.option('--duration <minutes>', 'The new duration of the call, in minutes')
			.option('-i, --invite <ids...>', 'The new ids of the users invited')
			.option('-r, --recurrence <rrule>', 'The new recurrence rule of the call')
			.option('-z, --time-zone <tz>', 'The IANA time zone of the new start time')
			.option('-e, --email-guests', 'Notify the guests by email'),
	).action(async (id: string, options?: ICallUpdateCommandOptions) => {
		try {
			const updates: ICallUpdates = {
				title: options?.title,
				description: options?.description,
				startsAt: options?.start ? new Date(options.start) : undefined,
				duration: options?.duration ? parseInt(options.duration) : undefined,
				inviteeIds: options?.invite,
				recurrence: options?.recurrence,
				timeZone: options?.timeZone,
			};
			const result = await rettiwt.call.update(id, updates, parseOccurrence(options));
			output(result);
		} catch (error) {
			output(error);
		}
	});

	// Cancel
	withOccurrenceOptions(
		call
			.command('cancel')
			.description('Cancel a scheduled call')
			.argument('<id>', 'The id of the scheduled call')
			.option('-e, --email-guests', 'Notify the guests by email'),
	).action(async (id: string, options?: ICallOccurrenceCommandOptions) => {
		try {
			const result = await rettiwt.call.cancel(id, parseOccurrence(options));
			output(result);
		} catch (error) {
			output(error);
		}
	});

	// RSVP
	withOccurrenceOptions(
		call
			.command('rsvp')
			.description('Respond to a scheduled call invitation')
			.argument('<id>', 'The id of the scheduled call')
			.argument(
				'<status>',
				`The response (${[CallRsvpStatus.ACCEPTED, CallRsvpStatus.DECLINED, CallRsvpStatus.TENTATIVE].join(', ')})`,
			),
	).action(async (id: string, status: CallRsvpStatus, options?: ICallOccurrenceCommandOptions) => {
		try {
			const result = await rettiwt.call.rsvp(id, status, parseOccurrence(options));
			output(result);
		} catch (error) {
			output(error);
		}
	});

	// Remind
	withOccurrenceOptions(
		call
			.command('remind')
			.description('Set the reminder of a scheduled call')
			.argument('<id>', 'The id of the scheduled call')
			.argument('<minutes>', 'The number of minutes before the call at which to be reminded'),
	).action(async (id: string, minutes: string, options?: ICallOccurrenceCommandOptions) => {
		try {
			const result = await rettiwt.call.remind(id, parseInt(minutes), parseOccurrence(options));
			output(result);
		} catch (error) {
			output(error);
		}
	});

	// Customize
	withOccurrenceOptions(
		call
			.command('customize')
			.description('Customize how a scheduled call appears in the calendar')
			.argument('<id>', 'The id of the scheduled call')
			.option('-c, --color <color>', `The color of the call (${Object.values(CalendarColor).join(', ')})`)
			.option('--hidden', 'Remove the call from the calendar'),
	).action(async (id: string, options?: ICallCustomizeCommandOptions) => {
		try {
			const result = await rettiwt.call.customize(
				id,
				{ color: options?.color, hidden: options?.hidden },
				parseOccurrence(options),
			);
			output(result);
		} catch (error) {
			output(error);
		}
	});

	// Calendars
	call.command('calendars')
		.description('Fetch the external calendars linked to X Calls')
		.action(async () => {
			try {
				const links = await rettiwt.call.calendars();
				output(links);
			} catch (error) {
				output(error);
			}
		});

	// Refresh calendars
	call.command('refresh-calendars')
		.description('Sync the linked external calendars and fetch their events')
		.argument('[from]', 'The start of the time window (defaults to now)')
		.argument('[to]', 'The end of the time window (defaults to 7 days after the start)')
		.action(async (from?: string, to?: string) => {
			try {
				const calls = await rettiwt.call.refreshCalendars(
					from ? new Date(from) : undefined,
					to ? new Date(to) : undefined,
				);
				output(calls);
			} catch (error) {
				output(error);
			}
		});

	// Unlink calendar
	call.command('unlink-calendar')
		.description('Unlink an external calendar from X Calls')
		.argument('<provider>', `The calendar provider (${Object.values(CalendarProvider).join(', ')})`)
		.action(async (provider: CalendarProvider) => {
			try {
				const result = await rettiwt.call.unlinkCalendar(provider);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	return call;
}

export default createCallCommand;
