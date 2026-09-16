/** A 32-byte XChat conversation key, encoded as bytes, hexadecimal, base64, or base64url. */
export type XChatConversationKey = string | Uint8Array;

/** Resolves a conversation key on demand without requiring Rettiwt to persist it. */
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

/** @internal */
export interface IXChatClient {
	decryptEvents(events: string[]): IXChatDecryptResult;
	free(): void;
	hasIdentityKey(): boolean;
	lock(): void;
	setCacheKeys(enabled: boolean): void;
	setIdentity(userId: string, signingKeyVersion: string): void;
	setSigningKeys(signingKeys: IXChatSigningKey[]): void;
	unlock(pin: string | Uint8Array): Promise<void>;
}

/** The session capabilities required to decrypt XChat conversation history. */
export interface IXChatDecryptor {
	readonly isUnlocked: boolean;
	decryptEvents(events: string[]): IXChatDecryptResult;
}

/** An XChat decryptor whose signature-verification keys can be refreshed. */
export interface IXChatSession extends IXChatDecryptor {
	free(): void;
	lock(): void;
	setSigningKeys(signingKeys: IXChatSigningKey[]): void;
}

/** Options used to create a PIN-backed XChat session. */
export interface IXChatSessionOptions {
	juiceboxConfig: string;
	getAuthToken: (realmId: string) => Promise<string>;
	userId: string;
	signingKeyVersion: string;
	signingKeys?: IXChatSigningKey[];
}
