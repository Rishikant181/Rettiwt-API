/* eslint-disable */

/**
 * The raw data received when fetching a specific conversation page from the
 * GraphQL DM endpoint.
 *
 * @public
 */
export interface IConversationPageResponse {
	data?: {
		get_conversation_page?: ConversationPage | null;
	};
}

export interface ConversationPage {
	__typename?: 'XChatGetConversationPageResponse';
	encoded_message_events?: string[];
	has_more?: boolean;
	missing_conversation_key_change_events?: string[];
}
