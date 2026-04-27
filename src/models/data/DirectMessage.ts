/* eslint-disable @typescript-eslint/member-ordering */

import { DMEventDecoder } from '../../helper/DMEventDecoder';
import { IDirectMessage } from '../../types/data/DirectMessage';
import { IMessage as IRawMessage } from '../../types/raw/base/Message';
import { IConversationTimelineResponse } from '../../types/raw/dm/Conversation';
import { IConversationPageResponse } from '../../types/raw/dm/ConversationPage';
import { IInboxInitialResponse } from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';

/**
 * Type guard to check if the response is an IInboxInitialResponse
 */
function isInboxInitialResponse(
	response:
		| IInboxInitialResponse
		| IConversationTimelineResponse
		| IInboxTimelineResponse
		| IConversationPageResponse,
): response is IInboxInitialResponse {
	return 'inbox_initial_state' in response;
}

/**
 * Type guard to check if the response is an IConversationTimelineResponse
 */
function isConversationTimelineResponse(
	response:
		| IInboxInitialResponse
		| IConversationTimelineResponse
		| IInboxTimelineResponse
		| IConversationPageResponse,
): response is IConversationTimelineResponse {
	return 'conversation_timeline' in response;
}

/**
 * Type guard to check if the response is an IInboxTimelineResponse
 */
function isInboxTimelineResponse(
	response:
		| IInboxInitialResponse
		| IConversationTimelineResponse
		| IInboxTimelineResponse
		| IConversationPageResponse,
): response is IInboxTimelineResponse {
	return 'inbox_timeline' in response;
}

/**
 * Type guard to check if the response is an IConversationPageResponse
 */
function isConversationPageResponse(
	response:
		| IInboxInitialResponse
		| IConversationTimelineResponse
		| IInboxTimelineResponse
		| IConversationPageResponse,
): response is IConversationPageResponse {
	return 'data' in response && 'get_conversation_page' in (response.data ?? {});
}

/**
 * The details of a single direct message.
 *
 * @public
 */
export class DirectMessage implements IDirectMessage {
	/** The raw message details. */
	private readonly _raw: IRawMessage | Record<string, unknown>;

	public conversationId: string;
	public createdAt: string;
	public editCount?: number;
	public id: string;
	public isEncrypted?: boolean;
	public mediaUrls?: string[];
	public read?: boolean;
	public recipientId?: string;
	public senderId: string;
	public text: string;

	/**
	 * @param message - The raw message details from the API response.
	 */
	public constructor(message: unknown) {
		this._raw = message as IRawMessage | Record<string, unknown>;

		const parsedData = this._parseMessageData(message);

		this.id = parsedData.id;
		this.conversationId = parsedData.conversationId;
		this.senderId = parsedData.senderId;
		this.recipientId = parsedData.recipientId;
		this.text = parsedData.text;
		this.isEncrypted = parsedData.isEncrypted;
		this.createdAt = parsedData.createdAt;
		this.editCount = parsedData.editCount ?? 0;
		this.mediaUrls = this._extractMediaUrls(message);
		this.read = true; // Default to true, can be enhanced later
	}

	/** The raw message details. */
	public get raw(): IRawMessage | Record<string, unknown> {
		return this._raw;
	}

	/**
	 * Extract messages from conversation timeline response
	 */
	private static _extractFromConversationTimeline(response: IConversationTimelineResponse): DirectMessage[] {
		const messages: DirectMessage[] = [];
		const entries = response.conversation_timeline?.entries ?? [];

		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				messages.push(new DirectMessage(entry.message));
			}
		}

		return messages;
	}

	/**
	 * Extract messages from inbox initial response
	 */
	private static _extractFromInboxInitial(response: IInboxInitialResponse): DirectMessage[] {
		const messages: DirectMessage[] = [];
		const entries = response.inbox_initial_state?.entries ?? [];

		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				messages.push(new DirectMessage(entry.message));
			}
		}

		return messages;
	}

	/**
	 * Extract messages from inbox timeline response
	 */
	private static _extractFromInboxTimeline(response: IInboxTimelineResponse): DirectMessage[] {
		const messages: DirectMessage[] = [];
		const entries = response.inbox_timeline?.entries ?? [];

		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				messages.push(new DirectMessage(entry.message));
			}
		}

		return messages;
	}

	/**
	 * Extract messages from encoded conversation page response
	 */
	private static _extractFromConversationPage(response: IConversationPageResponse): DirectMessage[] {
		const encodedEvents = response.data?.get_conversation_page?.encoded_message_events ?? [];

		return DMEventDecoder.decodeMessages(encodedEvents).map(
			(decodedMessage) =>
				new DirectMessage(
					/* eslint-disable @typescript-eslint/naming-convention */
					{
						conversation_id: decodedMessage.conversationId,
						id: decodedMessage.id,
						is_encrypted: decodedMessage.isEncrypted,
						media_urls: decodedMessage.mediaUrls,
						recipient_id: decodedMessage.recipientId,
						sender_id: decodedMessage.senderId,
						text: decodedMessage.text,
						time: decodedMessage.createdAtMs,
					},
					/* eslint-enable @typescript-eslint/naming-convention */
				),
		);
	}

	/**
	 * Extract media URLs from message attachment data with proper type safety.
	 */
	private _extractMediaUrls(message: unknown): string[] | undefined {
		const urls: string[] = [];
		const msg = message as Record<string, unknown>;

		if (Array.isArray(msg.media_urls)) {
			const mediaUrls = msg.media_urls.filter((url): url is string => typeof url === 'string' && url.length > 0);
			if (mediaUrls.length > 0) {
				return [...new Set(mediaUrls)];
			}
		}

		const messageData = msg.message_data as Record<string, unknown> | undefined;

		// Check for card attachments with images
		const attachment = messageData?.attachment as Record<string, unknown> | undefined;
		const card = attachment?.card as Record<string, unknown> | undefined;
		const bindingValues = card?.binding_values as Record<string, unknown> | undefined;

		if (bindingValues) {
			// Extract URLs from various image binding values
			const imageBindings = [
				'thumbnail_image',
				'photo_image_full_size',
				'summary_photo_image',
				'thumbnail_image_original',
				'summary_photo_image_original',
				'photo_image_full_size_original',
			];

			for (const bindingKey of imageBindings) {
				const imageBinding = bindingValues[bindingKey] as Record<string, unknown> | undefined;
				const imageValue = imageBinding?.image_value as Record<string, unknown> | undefined;

				if (imageValue?.url && typeof imageValue.url === 'string') {
					urls.push(imageValue.url);
				}
			}
		}

		// Check for tweet attachments
		const tweet = attachment?.tweet as Record<string, unknown> | undefined;
		if (tweet?.expanded_url && typeof tweet.expanded_url === 'string') {
			urls.push(tweet.expanded_url);
		}

		return urls.length > 0 ? [...new Set(urls)] : undefined; // Remove duplicates
	}

	/**
	 * Safely extract number value
	 */
	private _extractNumberValue(value: unknown): number | undefined {
		if (typeof value === 'number') {
			return value;
		}
		if (typeof value === 'string') {
			const parsed = Number(value);
			return isNaN(parsed) ? undefined : parsed;
		}
		return undefined;
	}

	/**
	 * Safely extract string value with fallback
	 */
	private _extractStringValue(...values: unknown[]): string | undefined {
		for (const value of values) {
			if (typeof value === 'string' && value.length > 0) {
				return value;
			}
		}
		return undefined;
	}

	/**
	 * Parse message data with proper type safety
	 */
	private _parseMessageData(message: unknown): IDirectMessage {
		const msg = message as Record<string, unknown>;
		const messageData = msg.message_data as Record<string, unknown> | undefined;

		const id = this._extractStringValue(messageData?.id, msg.id) ?? '';
		const conversationId = this._extractStringValue(msg.conversation_id, messageData?.conversation_id) ?? '';
		const senderId = this._extractStringValue(messageData?.sender_id, msg.sender_id) ?? '';
		const recipientId = this._extractStringValue(messageData?.recipient_id, msg.recipient_id);
		const text = this._extractStringValue(messageData?.text, msg.text) ?? '';
		const isEncrypted = messageData?.is_encrypted === true || msg.is_encrypted === true;
		const createdAt = this._parseTimestamp(this._extractStringValue(messageData?.time, msg.time) ?? '');
		const editCount = this._extractNumberValue(messageData?.edit_count);

		return {
			id,
			conversationId,
			senderId,
			recipientId,
			createdAt,
			text,
			isEncrypted,
			editCount,
		};
	}

	/**
	 * Parse timestamp with proper validation
	 */
	private _parseTimestamp(timestamp: string): string {
		const numericTimestamp = Number(timestamp);
		if (!isNaN(numericTimestamp)) {
			const date = new Date(numericTimestamp);
			if (!isNaN(date.getTime())) {
				return date.toISOString();
			}
		}
		return new Date().toISOString();
	}

	/**
	 * Filter messages by conversation ID
	 */
	public static filterByConversation(messages: DirectMessage[], conversationId: string): DirectMessage[] {
		return messages.filter((message) => message.conversationId === conversationId);
	}

	/**
	 * Filter messages by sender ID
	 */
	public static filterBySender(messages: DirectMessage[], senderId: string): DirectMessage[] {
		return messages.filter((message) => message.isFromSender(senderId));
	}

	/**
	 * Extracts and deserializes the list of direct messages from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of direct messages.
	 */
	public static list(
		response:
			| IInboxInitialResponse
			| IConversationTimelineResponse
			| IInboxTimelineResponse
			| IConversationPageResponse,
	): DirectMessage[] {
		const messages: DirectMessage[] = [];

		if (isInboxInitialResponse(response)) {
			return DirectMessage._extractFromInboxInitial(response);
		} else if (isConversationTimelineResponse(response)) {
			return DirectMessage._extractFromConversationTimeline(response);
		} else if (isInboxTimelineResponse(response)) {
			return DirectMessage._extractFromInboxTimeline(response);
		} else if (isConversationPageResponse(response)) {
			return DirectMessage._extractFromConversationPage(response);
		}

		return messages;
	}

	/**
	 * Generic method to extract messages from any supported response type
	 */
	public static listFromResponse(
		response:
			| IInboxInitialResponse
			| IConversationTimelineResponse
			| IInboxTimelineResponse
			| IConversationPageResponse,
	): DirectMessage[] {
		return DirectMessage.list(response);
	}

	/**
	 * Sort messages by creation time (oldest to newest)
	 */
	public static sortByTime(messages: DirectMessage[], ascending = true): DirectMessage[] {
		return [...messages].sort((a, b) => {
			const timeA = new Date(a.createdAt).getTime();
			const timeB = new Date(b.createdAt).getTime();
			return ascending ? timeA - timeB : timeB - timeA;
		});
	}

	/**
	 * Get the age of this message in milliseconds
	 */
	public getAgeInMs(): number {
		return Date.now() - new Date(this.createdAt).getTime();
	}

	/**
	 * Check if this message has media attachments
	 */
	public hasMedia(): boolean {
		return Boolean(this.mediaUrls && this.mediaUrls.length > 0);
	}

	/**
	 * Check if this message is from a specific sender
	 */
	public isFromSender(senderId: string): boolean {
		return this.senderId === senderId;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IDirectMessage {
		return {
			conversationId: this.conversationId,
			createdAt: this.createdAt,
			editCount: this.editCount,
			id: this.id,
			isEncrypted: this.isEncrypted,
			mediaUrls: this.mediaUrls,
			read: this.read,
			recipientId: this.recipientId,
			senderId: this.senderId,
			text: this.text,
		};
	}

	/**
	 * Check if this message was edited
	 */
	public wasEdited(): boolean {
		return Boolean(this.editCount && this.editCount > 0);
	}
}
