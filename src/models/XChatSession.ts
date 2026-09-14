import type { ChatWithJuicebox, DecryptEventsResult, SigningKeyEntry } from '@xdevplatform/chat-xdk';

/** Options used to create a PIN-backed XChat session. */
export interface IXChatSessionOptions {
	/** Juicebox configuration returned with the account's XChat public-key record. */
	juiceboxConfig: string;

	/** Resolve a short-lived Juicebox authorization token for a realm. */
	getAuthToken: (realmId: string) => Promise<string>;

	/** Optional local limit for PIN attempts. */
	maxGuessCount?: number;
}

/**
 * An unlocked XChat cryptographic session backed by X's official Chat XDK.
 *
 * @public
 */
export class XChatSession {
	private readonly _chat: ChatWithJuicebox;

	private constructor(chat: ChatWithJuicebox) {
		this._chat = chat;
	}

	/** Whether the identity key required for conversation-key recovery is loaded. */
	public get isUnlocked(): boolean {
		return this._chat.hasIdentityKey();
	}

	/** Create a locked session without retaining a PIN. */
	public static async create(options: IXChatSessionOptions): Promise<XChatSession> {
		const { createChat } = await import('@xdevplatform/chat-xdk');
		const chat = await createChat(options);

		return new XChatSession(chat);
	}

	/** Decrypt messages and recover conversation keys from key-change events. */
	public decryptEvents(events: string[]): DecryptEventsResult {
		return this._chat.decryptEvents(events);
	}

	/** Permanently release the session and its key material. */
	public free(): void {
		this._chat.free();
	}

	/** Clear private and cached key material while keeping the session reusable. */
	public lock(): void {
		this._chat.lock();
	}

	/** Enable the in-memory, version-aware conversation-key cache. */
	public setCacheKeys(enabled: boolean): void {
		this._chat.setCacheKeys(enabled);
	}

	/** Set the account identity used by XChat event verification. */
	public setIdentity(userId: string, signingKeyVersion: string): void {
		this._chat.setIdentity(userId, signingKeyVersion);
	}

	/** Replace the public signing keys used to verify incoming events. */
	public setSigningKeys(signingKeys: SigningKeyEntry[]): void {
		this._chat.setSigningKeys(signingKeys);
	}

	/** Recover the account's private XChat keys from secure backup. */
	public async unlock(pin: string | Uint8Array): Promise<void> {
		await this._chat.unlock(pin);
	}
}

export type { SigningKeyEntry as IXChatSigningKey } from '@xdevplatform/chat-xdk';
