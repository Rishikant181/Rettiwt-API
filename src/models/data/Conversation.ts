import { IConversation } from '../../types/data/Conversation';
import { IConversationTimelineResponse } from '../../types/raw/dm/Conversation';
import {
	IInboxInitialResponse,
	Conversation as RawConversation,
	Conversations as RawConversations,
} from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';

import { DirectMessage } from './DirectMessage';

/**
 * Type guard to check if the response is an IConversationTimelineResponse
 */
function isConversationTimelineResponse(
	response: IConversationTimelineResponse | IInboxInitialResponse | IInboxTimelineResponse,
): response is IConversationTimelineResponse {
	return 'conversation_timeline' in response;
}

/**
 * Type guard to check if the response is an IInboxInitialResponse
 */
function isInboxInitialResponse(
	response: IConversationTimelineResponse | IInboxInitialResponse | IInboxTimelineResponse,
): response is IInboxInitialResponse {
	return 'inbox_initial_state' in response;
}

/**
 * Type guard to check if the response is an IInboxTimelineResponse
 */
function isInboxTimelineResponse(
	response: IConversationTimelineResponse | IInboxInitialResponse | IInboxTimelineResponse,
): response is IInboxTimelineResponse {
	return 'inbox_timeline' in response;
}

/**
 * Extract typed conversation data from raw conversations object
 */
function extractConversationData(rawConversations: RawConversations): Array<[string, RawConversation]> {
	return Object.entries(rawConversations);
}

/**
 * The details of a single conversation.
 *
 * @public
 */
export class Conversation implements IConversation {
	/** The raw conversation details. */
	private readonly _raw: RawConversation;

	public avatarUrl?: string;
	public hasMore: boolean;
	public id: string;
	public lastActivityAt: string;
	public lastMessageId?: string;
	public messages: DirectMessage[];
	public muted: boolean;
	public name?: string;
	public notificationsDisabled: boolean;
	public participants: string[];
	public trusted: boolean;
	public type: 'ONE_TO_ONE' | 'GROUP_DM';

	/**
	 * @param conversation - The raw conversation details from the API response.
	 * @param messages - Array of messages in this conversation.
	 */
	public constructor(conversation: unknown, messages: DirectMessage[] = []) {
		this._raw = conversation as RawConversation;

		const conv = conversation as Record<string, unknown>;

		this.id = conv.conversation_id && typeof conv.conversation_id === 'string' ? conv.conversation_id : '';
		this.type = this._parseConversationType(conv.type);
		this.participants = this._parseParticipants(conv.participants);
		this.name = conv.name && typeof conv.name === 'string' ? conv.name : undefined;
		this.avatarUrl = this._parseAvatarUrl(conv);
		this.trusted = Boolean(conv.trusted);
		this.muted = Boolean(conv.muted);
		this.notificationsDisabled = Boolean(conv.notifications_disabled);
		this.lastActivityAt = this._parseTimestamp(conv.sort_timestamp);
		this.lastMessageId =
			conv.sort_event_id && typeof conv.sort_event_id === 'string' ? conv.sort_event_id : undefined;
		this.hasMore = conv.status === 'HAS_MORE';
		this.messages = messages;
	}

	/** The raw conversation details. */
	public get raw(): RawConversation {
		return this._raw;
	}

	/**
	 * Parse avatar URL from conversation data
	 */
	private _parseAvatarUrl(conv: Record<string, unknown>): string | undefined {
		// Try avatar_image_https first
		if (conv.avatar_image_https && typeof conv.avatar_image_https === 'string') {
			return conv.avatar_image_https;
		}

		// Try nested avatar.image.original_info.url
		const avatar = conv.avatar as Record<string, unknown> | undefined;
		const image = avatar?.image as Record<string, unknown> | undefined;
		const originalInfo = image?.original_info as Record<string, unknown> | undefined;

		if (originalInfo?.url && typeof originalInfo.url === 'string') {
			return originalInfo.url;
		}

		return undefined;
	}

	/**
	 * Parse conversation type with proper fallback
	 */
	private _parseConversationType(type: unknown): 'ONE_TO_ONE' | 'GROUP_DM' {
		if (type === 'ONE_TO_ONE' || type === 'GROUP_DM') {
			return type;
		}
		return 'ONE_TO_ONE';
	}

	/**
	 * Parse participants array with type safety
	 */
	private _parseParticipants(participants: unknown): string[] {
		if (!Array.isArray(participants)) {
			return [];
		}

		return participants
			.map((p) => {
				if (p && typeof p === 'object' && 'user_id' in p) {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					const participantObj = p as { user_id: unknown };
					if (typeof participantObj.user_id === 'string') {
						return participantObj.user_id;
					}
				}
				return '';
			})
			.filter(Boolean);
	}

	/**
	 * Parse timestamp with proper fallback
	 */
	private _parseTimestamp(timestamp: unknown): string {
		if (timestamp && (typeof timestamp === 'string' || typeof timestamp === 'number')) {
			const date = new Date(Number(timestamp));
			if (!isNaN(date.getTime())) {
				return date.toISOString();
			}
		}
		return new Date().toISOString();
	}

	/**
	 * Extracts a single conversation from conversation timeline response.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized conversation with full message history.
	 */
	public static fromConversationTimeline(response: IConversationTimelineResponse): Conversation | undefined {
		if (!response.conversation_timeline?.conversations) {
			return undefined;
		}

		const rawConversations = response.conversation_timeline.conversations;
		const entries = response.conversation_timeline.entries ?? [];

		// Extract messages from entries
		const messages: DirectMessage[] = [];
		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				messages.push(new DirectMessage(entry.message));
			}
		}

		// Get the first (and typically only) conversation
		const conversationEntries = extractConversationData(rawConversations);
		const firstEntry = conversationEntries[0];

		if (firstEntry) {
			const [, conversationData] = firstEntry;
			return new Conversation(conversationData, messages);
		}

		return undefined;
	}

	/**
	 * Extracts conversations from inbox initial state response.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of conversations with their preview messages.
	 */
	public static listFromInboxInitial(response: IInboxInitialResponse): Conversation[] {
		const conversations: Conversation[] = [];

		if (!response.inbox_initial_state?.conversations) {
			return conversations;
		}

		const rawConversations = response.inbox_initial_state.conversations;
		const entries = response.inbox_initial_state.entries ?? [];

		// Group messages by conversation ID
		const messagesByConversation = new Map<string, DirectMessage[]>();
		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				const message = new DirectMessage(entry.message);
				const convId = message.conversationId;
				if (convId) {
					if (!messagesByConversation.has(convId)) {
						messagesByConversation.set(convId, []);
					}
					messagesByConversation.get(convId)!.push(message);
				}
			}
		}

		// Create conversations with their messages
		const conversationEntries = extractConversationData(rawConversations);
		for (const [, conversation] of conversationEntries) {
			const convId = (conversation as unknown as Record<string, unknown>).conversation_id as string;
			const messages = messagesByConversation.get(convId) ?? [];
			conversations.push(new Conversation(conversation, messages));
		}

		return conversations;
	}

	/**
	 * Extracts conversations from inbox timeline response.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of conversations with their messages.
	 */
	public static listFromInboxTimeline(response: IInboxTimelineResponse): Conversation[] {
		const conversations: Conversation[] = [];

		if (!response.inbox_timeline?.conversations) {
			return conversations;
		}

		const rawConversations = response.inbox_timeline.conversations;
		const entries = response.inbox_timeline.entries ?? [];

		// Group messages by conversation ID
		const messagesByConversation = new Map<string, DirectMessage[]>();
		for (const entry of entries) {
			if ('message' in entry && entry.message) {
				const message = new DirectMessage(entry.message);
				const convId = message.conversationId;
				if (convId) {
					if (!messagesByConversation.has(convId)) {
						messagesByConversation.set(convId, []);
					}
					messagesByConversation.get(convId)!.push(message);
				}
			}
		}

		// Create conversations with their messages
		const conversationEntries = extractConversationData(rawConversations);
		for (const [, conversation] of conversationEntries) {
			const convId = (conversation as unknown as Record<string, unknown>).conversation_id as string;
			const messages = messagesByConversation.get(convId) ?? [];
			conversations.push(new Conversation(conversation, messages));
		}

		return conversations;
	}

	/**
	 * Generic method to extract conversations from any supported response type
	 */
	public static listFromResponse(
		response: IConversationTimelineResponse | IInboxInitialResponse | IInboxTimelineResponse,
	): Conversation[] {
		if (isConversationTimelineResponse(response)) {
			const conversation = Conversation.fromConversationTimeline(response);
			return conversation ? [conversation] : [];
		} else if (isInboxInitialResponse(response)) {
			return Conversation.listFromInboxInitial(response);
		} else if (isInboxTimelineResponse(response)) {
			return Conversation.listFromInboxTimeline(response);
		}
		return [];
	}

	/**
	 * Get the other participant's ID (only for one-to-one conversations)
	 */
	public getOtherParticipant(currentUserId: string): string | undefined {
		if (!this.isOneToOne() || this.participants.length !== 2) {
			return undefined;
		}
		return this.participants.find((id) => id !== currentUserId);
	}

	/**
	 * Check if this conversation is a group DM
	 */
	public isGroupDM(): boolean {
		return this.type === 'GROUP_DM';
	}

	/**
	 * Check if this conversation is one-to-one
	 */
	public isOneToOne(): boolean {
		return this.type === 'ONE_TO_ONE';
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IConversation {
		return {
			avatarUrl: this.avatarUrl,
			hasMore: this.hasMore,
			id: this.id,
			lastActivityAt: this.lastActivityAt,
			lastMessageId: this.lastMessageId,
			messages: this.messages.map((msg) => msg.toJSON()),
			muted: this.muted,
			name: this.name,
			notificationsDisabled: this.notificationsDisabled,
			participants: this.participants,
			trusted: this.trusted,
			type: this.type,
		};
	}
}
