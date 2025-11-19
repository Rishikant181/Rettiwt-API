/* eslint-disable */

/**
 * The raw data received when fetching the initial state of the DM inbox.
 *
 * @public
 */
export interface IInboxInitialResponse {
	inbox_initial_state: InboxInitialState;
}

export interface InboxInitialState {
	last_seen_event_id: string;
	trusted_last_seen_event_id: string;
	untrusted_last_seen_event_id: string;
	cursor: string;
	inbox_timelines: InboxTimelines;
	entries: Entry[];
	users: Users;
	conversations: Conversations;
}

interface InboxTimelines {
	trusted: TimelineStatus;
	untrusted: TimelineStatus;
	untrusted_low_quality: TimelineStatus;
}

interface TimelineStatus {
	status: string; // "HAS_MORE" | "AT_END"
	min_entry_id: string;
}

interface Entry {
	message: Message;
}

export interface Message {
	id: string;
	time: string;
	affects_sort: boolean;
	request_id: string;
	conversation_id: string;
	message_data: MessageData;
}

interface MessageData {
	id: string;
	time: string;
	recipient_id: string;
	sender_id: string;
	text: string;
	edit_count: number;
}

export interface Users {
	[userId: string]: User;
}

interface User {
	id: number;
	id_str: string;
	name: string;
	screen_name: string;
	profile_image_url: string;
	profile_image_url_https: string;
	following: boolean;
	follow_request_sent: boolean;
	description: string;
	entities: UserEntities;
	verified: boolean;
	is_blue_verified: boolean;
	protected: boolean;
	blocking: boolean;
	subscribed_by: boolean;
	can_media_tag: boolean;
	dm_blocked_by: boolean;
	dm_blocking: boolean;
	created_at: string;
	friends_count: number;
	followers_count: number;
}

interface UserEntities {
	url: UrlEntity;
	description: DescriptionEntity;
}

interface UrlEntity {
	urls: UrlInfo[];
}

interface DescriptionEntity {
	urls: UrlInfo[];
}

interface UrlInfo {
	url: string;
	expanded_url: string;
	display_url: string;
	indices: [number, number];
}

export interface Conversations {
	[conversationId: string]: Conversation;
}

export interface Conversation {
	conversation_id: string;
	type: 'GROUP_DM' | 'ONE_TO_ONE';
	sort_event_id: string;
	sort_timestamp: string;
	participants: Participant[];
	nsfw: boolean;
	notifications_disabled: boolean;
	mention_notifications_disabled: boolean;
	last_read_event_id: string;
	trusted: boolean;
	low_quality: boolean;
	muted: boolean;
	status: 'HAS_MORE' | 'AT_END';
	min_entry_id: string;
	max_entry_id: string;
	create_time?: string; // Only for GROUP_DM
	created_by_user_id?: string; // Only for GROUP_DM
	name?: string; // Only for GROUP_DM
	avatar_image_https?: string; // Only for GROUP_DM
	avatar?: ConversationAvatar; // Only for GROUP_DM
	read_only?: boolean; // Only for ONE_TO_ONE
	social_proof?: SocialProof[]; // Only for untrusted conversations
}

interface ConversationAvatar {
	image: {
		original_info: {
			url: string;
			width: number;
			height: number;
		};
	};
}

interface Participant {
	user_id: string;
	join_time?: string; // Only for GROUP_DM
	last_read_event_id?: string;
	join_conversation_event_id?: string; // Only for GROUP_DM
	is_admin?: boolean; // Only for GROUP_DM
}

export interface SocialProof {
	proof_type: string; // e.g., "mutual_friends"
	users: any[]; // Array of users (structure depends on proof_type)
	total: number;
}
