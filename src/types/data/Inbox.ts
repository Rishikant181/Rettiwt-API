import { IConversation } from './Conversation';

/**
 * The details of a DM inbox containing conversations and metadata.
 *
 * @public
 */
export interface IInbox {
	/** List of conversations in the inbox. */
	conversations: IConversation[];

	/** The cursor for pagination of conversations. */
	cursor: string;

	/** The ID of the last seen event. */
	lastSeenEventId: string;

	/** The ID of the last seen trusted event. */
	trustedLastSeenEventId: string;

	/** The ID of the last seen untrusted event. */
	untrustedLastSeenEventId: string;
}
