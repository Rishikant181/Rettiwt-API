/* eslint-disable */

import { Users, Conversations, InboxInitialState } from './InboxInitial';

/**
 * The raw data received when fetching user updates from the DM system.
 * The response structure varies based on query parameters.
 *
 * @public
 */
export interface IUserUpdatesResponse {
	user_events?: UserEvents;
	inbox_initial_state?: InboxInitialState;
}

/**
 * User events can have different structures based on the request type:
 * - With active_conversation_id + cursor: Full data with users and conversations
 * - Without active_conversation_id and cursor: Same as inbox initial (see IInboxInitialResponse)
 * - With cursor only: Minimal data with just event IDs and cursor
 */
type UserEvents = UserEventsWithData | UserEventsMinimal;

/**
 * Full user events data returned when requesting with active_conversation_id and cursor.
 * Used for conversation-specific updates with user and conversation context.
 */
interface UserEventsWithData {
	cursor: string;
	last_seen_event_id: string;
	trusted_last_seen_event_id: string;
	untrusted_last_seen_event_id: string;
	users: Users;
	conversations: Conversations;
}

/**
 * Minimal user events data returned when requesting with cursor only (no active_conversation_id).
 * Used for lightweight polling of event state without full data.
 */
interface UserEventsMinimal {
	cursor: string;
	last_seen_event_id: string;
	trusted_last_seen_event_id: string;
	untrusted_last_seen_event_id: string;
}
