/* eslint-disable */

import { ConversationMessage } from '../dm/Conversation';
import { Message } from '../dm/InboxInitial';
import { TimelineMessage } from '../dm/InboxTimeline';

// Extract the message_data types
type ConversationMessageData = ConversationMessage['message_data'];
type InboxMessageData = Message['message_data'];
type TimelineMessageData = TimelineMessage['message_data'];

// Create unified message_data type that includes all possible fields
type UnifiedMessageData = InboxMessageData & Partial<ConversationMessageData> & Partial<TimelineMessageData>;

export interface IMessage {
	id: string;
	time: string;
	affects_sort?: boolean;
	request_id: string;
	conversation_id: string;
	message_data: UnifiedMessageData;
}
