/** A 32-byte XChat conversation key, encoded as bytes, hexadecimal, base64, or base64url. */
export type XChatConversationKey = string | Uint8Array;

/** Resolves a conversation key on demand without requiring Rettiwt to persist it. */
export type XChatConversationKeyProvider = (
	conversationId: string,
) => XChatConversationKey | undefined | Promise<XChatConversationKey | undefined>;

/** A registered public signing key used to verify incoming XChat events. */
export interface IXChatSigningKey {
	/** ID of the participant who owns the key. */
	userId: string;
	/** Version identifier registered for the signing key. */
	publicKeyVersion: string;
	/** Base64-encoded signing public key. */
	publicKey: string;
	/** Base64-encoded identity public key. */
	identityPublicKey: string;
	/** Signature binding the signing key to the identity key. */
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
	/** Whether the identity key needed for decryption is available. */
	readonly isUnlocked: boolean;
	/** Decrypt encoded events, including any key-change events in the batch. */
	decryptEvents(events: string[]): IXChatDecryptResult;
}

/** An XChat decryptor whose signature-verification keys can be refreshed. */
export interface IXChatSession extends IXChatDecryptor {
	/** Permanently release the session and its key material. */
	free(): void;
	/** Clear private and cached key material while keeping the session reusable. */
	lock(): void;
	/** Replace the participant signing keys used to verify events. */
	setSigningKeys(signingKeys: IXChatSigningKey[]): void;
}

/** Options for decoding one XChat conversation page. */
export interface IDMConversationOptions {
	/** Conversation key used only for this request. */
	xChatConversationKey?: XChatConversationKey;
	/** Key resolver used for this request instead of the configured provider. */
	xChatConversationKeyProvider?: XChatConversationKeyProvider;
	/** Conversation keys indexed by conversation ID; overrides configured keys with matching IDs. */
	xChatConversationKeys?: Record<string, XChatConversationKey>;
	/** Unlocked decryptor used for this request instead of the configured session. */
	xChatSession?: IXChatDecryptor;
}
