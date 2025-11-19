/**
 * The details of a single direct message.
 *
 * @public
 */
export interface IDirectMessage {
	/** The unique identifier of the message. */
	id: string;

	/** The ID of the conversation this message belongs to. */
	conversationId: string;

	/** The ID of the user who sent the message. */
	senderId: string;

	/** The ID of the user who received the message (for one-to-one conversations). */
	recipientId?: string;

	/** The text content of the message. */
	text: string;

	/** The timestamp when the message was sent (ISO 8601 format). */
	createdAt: string;

	/** Array of media URLs attached to the message. */
	mediaUrls?: string[];

	/** Number of times the message has been edited. */
	editCount?: number;

	/** Whether the message has been read. */
	read?: boolean;
}
