import { IInbox } from '../../types/data/Inbox';
import { IInboxInitialResponse } from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';

import { Conversation } from './Conversation';

/**
 * Type guard to check if the response is an IInboxInitialResponse
 */
function isInboxInitialResponse(
	response: IInboxInitialResponse | IInboxTimelineResponse,
): response is IInboxInitialResponse {
	return 'inbox_initial_state' in response;
}

/**
 * Type guard to check if the response is an IInboxTimelineResponse
 */
function isInboxTimelineResponse(
	response: IInboxInitialResponse | IInboxTimelineResponse,
): response is IInboxTimelineResponse {
	return 'inbox_timeline' in response;
}

/**
 * The details of a DM inbox containing conversations and metadata.
 *
 * @public
 */
export class Inbox implements IInbox {
	/** The raw inbox details. */
	private readonly _raw: IInboxInitialResponse | IInboxTimelineResponse;

	public conversations: Conversation[];
	public cursor: string;
	public lastSeenEventId: string;
	public trustedLastSeenEventId: string;
	public untrustedLastSeenEventId: string;

	/**
	 * @param response - The raw inbox response from the API.
	 */
	public constructor(response: IInboxInitialResponse | IInboxTimelineResponse) {
		this._raw = response;

		// Handle inbox initial state response
		if (isInboxInitialResponse(response)) {
			const inboxState = response.inbox_initial_state;

			this.cursor = inboxState.cursor ?? '';
			this.lastSeenEventId = inboxState.last_seen_event_id ?? '';
			this.trustedLastSeenEventId = inboxState.trusted_last_seen_event_id ?? '';
			this.untrustedLastSeenEventId = inboxState.untrusted_last_seen_event_id ?? '';

			// Parse conversations from inbox initial state
			this.conversations = Conversation.listFromInboxInitial(response);
		}
		// Handle inbox timeline response
		else if (isInboxTimelineResponse(response)) {
			const inboxTimeline = response.inbox_timeline;

			this.cursor = inboxTimeline.min_entry_id ?? '';
			this.lastSeenEventId = '';
			this.trustedLastSeenEventId = '';
			this.untrustedLastSeenEventId = '';

			// Parse conversations from inbox timeline
			this.conversations = Conversation.listFromInboxTimeline(response);
		} else {
			// Fallback defaults (this should never happen with proper typing)
			this.cursor = '';
			this.lastSeenEventId = '';
			this.trustedLastSeenEventId = '';
			this.untrustedLastSeenEventId = '';
			this.conversations = [];
		}
	}

	/** The raw inbox details. */
	public get raw(): IInboxInitialResponse | IInboxTimelineResponse {
		return this._raw;
	}

	/**
	 * Get the raw inbox initial state if this inbox was created from one
	 */
	public getInitialState(): IInboxInitialResponse | undefined {
		return this.isInitialState() ? (this._raw as IInboxInitialResponse) : undefined;
	}

	/**
	 * Get the raw inbox timeline if this inbox was created from one
	 */
	public getTimeline(): IInboxTimelineResponse | undefined {
		return this.isTimeline() ? (this._raw as IInboxTimelineResponse) : undefined;
	}

	/**
	 * Check if this inbox was created from an initial state response
	 */
	public isInitialState(): boolean {
		return isInboxInitialResponse(this._raw);
	}

	/**
	 * Check if this inbox was created from a timeline response
	 */
	public isTimeline(): boolean {
		return isInboxTimelineResponse(this._raw);
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IInbox {
		return {
			conversations: this.conversations.map((conv) => conv.toJSON()),
			cursor: this.cursor,
			lastSeenEventId: this.lastSeenEventId,
			trustedLastSeenEventId: this.trustedLastSeenEventId,
			untrustedLastSeenEventId: this.untrustedLastSeenEventId,
		};
	}
}
