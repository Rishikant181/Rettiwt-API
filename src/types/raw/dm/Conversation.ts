/* eslint-disable */

import { Users, Conversations } from './InboxInitial';

/**
 * The raw data received when fetching a specific conversation timeline.
 *
 * @public
 */
export interface IConversationTimelineResponse {
	conversation_timeline: ConversationTimeline;
}

interface ConversationTimeline {
	status: 'HAS_MORE' | 'AT_END';
	min_entry_id: string;
	max_entry_id: string;
	entries: ConversationEntry[];
	users: Users;
	conversations: Conversations;
}

type ConversationEntry = { message: ConversationMessage } | { trust_conversation: TrustConversation };

export interface ConversationMessage {
	id: string;
	time: string;
	request_id: string;
	conversation_id: string;
	message_data: ConversationMessageData;
}

interface ConversationMessageData {
	id: string;
	time: string;
	recipient_id: string;
	sender_id: string;
	text: string;
	edit_count?: number;
	message_reactions?: MessageReaction[];
}

interface MessageReaction {
	id: string;
	time: string;
	conversation_id: string;
	message_id: string;
	reaction_key: string;
	emoji_reaction: string;
	sender_id: string;
}

interface TrustConversation {
	id: string;
	time: string;
	request_id: string;
	conversation_id: string;
	reason: string; // e.g., "accept"
}
