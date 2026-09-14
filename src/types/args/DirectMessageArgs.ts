import type { XChatSession } from '../../models/XChatSession';

export type XChatConversationKey = string | Uint8Array;
export type XChatConversationKeyProvider = (
	conversationId: string,
) => XChatConversationKey | undefined | Promise<XChatConversationKey | undefined>;

export interface IDMConversationOptions {
	xChatConversationKey?: XChatConversationKey;
	xChatConversationKeyProvider?: XChatConversationKeyProvider;
	xChatConversationKeys?: Record<string, XChatConversationKey>;
	xChatSession?: XChatSession;
}
