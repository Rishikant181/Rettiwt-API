export type XChatConversationKey = string | Uint8Array;
export type XChatConversationKeyProvider = (
	conversationId: string,
) => XChatConversationKey | undefined | Promise<XChatConversationKey | undefined>;

/** A registered public signing key used to verify incoming XChat events. */
export interface IXChatSigningKey {
	userId: string;
	publicKeyVersion: string;
	publicKey: string;
	identityPublicKey: string;
	identityPublicKeySignature: string;
}

/** @internal */
export interface IXChatEvent {
	type: string;
	id?: string;
	sequenceId?: string;
	senderId?: string;
	conversationId?: string;
	createdAtMsec?: number;
	content?: { text?: string };
	attachments?: Array<{
		legacyMediaPreviewUrl?: string;
		legacyMediaUrlHttps?: string;
		url?: string;
	}>;
}

/** @internal */
export interface IXChatDecryptResult {
	messages: Array<{ event: IXChatEvent; originalB64?: string }>;
	errors: Record<string, string>;
}

/** The session capabilities required to decrypt XChat conversation history. */
export interface IXChatDecryptor {
	readonly isUnlocked: boolean;
	decryptEvents(events: string[]): IXChatDecryptResult;
}

export interface IDMConversationOptions {
	xChatConversationKey?: XChatConversationKey;
	xChatConversationKeyProvider?: XChatConversationKeyProvider;
	xChatConversationKeys?: Record<string, XChatConversationKey>;
	xChatSession?: IXChatDecryptor;
}
