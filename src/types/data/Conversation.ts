import { IDirectMessage } from './DirectMessage';

/**
 * The details of a single conversation.
 *
 * @public
 */
export interface IConversation {
	/** The unique identifier of the conversation. */
	id: string;

	/** The type of conversation (ONE_TO_ONE or GROUP_DM). */
	type: 'ONE_TO_ONE' | 'GROUP_DM';

	/** Array of participant user IDs. */
	participants: string[];

	/** The name of the conversation (for group DMs). */
	name?: string;

	/** URL to the conversation avatar (for group DMs). */
	avatarUrl?: string;

	/** Whether the conversation is trusted. */
	trusted: boolean;

	/** Whether the conversation is muted. */
	muted: boolean;

	/** Whether notifications are disabled. */
	notificationsDisabled: boolean;

	/** The timestamp of the last activity (ISO 8601 format). */
	lastActivityAt: string;

	/** The ID of the last message. */
	lastMessageId?: string;

	/** Whether there are more messages to load. */
	hasMore: boolean;

	/** Array of messages in this conversation. */
	messages: IDirectMessage[];
}
