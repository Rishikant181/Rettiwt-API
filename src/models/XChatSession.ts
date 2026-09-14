import { IXChatDecryptResult, IXChatSigningKey } from '../types/args/DirectMessageArgs';

interface IXChatClient {
	decryptEvents(events: string[]): IXChatDecryptResult;
	free(): void;
	hasIdentityKey(): boolean;
	lock(): void;
	setCacheKeys(enabled: boolean): void;
	setIdentity(userId: string, signingKeyVersion: string): void;
	setSigningKeys(signingKeys: IXChatSigningKey[]): void;
	unlock(pin: string | Uint8Array): Promise<void>;
}

/** Options used to create a PIN-backed XChat session. */
export interface IXChatSessionOptions {
	/** Juicebox configuration returned with the account's XChat public-key record. */
	juiceboxConfig: string;

	/** Resolve a short-lived Juicebox authorization token for a realm. */
	getAuthToken: (realmId: string) => Promise<string>;

	/** User ID that owns the registered XChat keys. */
	userId: string;

	/** Version of the user's registered XChat signing key. */
	signingKeyVersion: string;

	/** Registered participant keys used to verify incoming event signatures. */
	signingKeys?: IXChatSigningKey[];
}

/**
 * An XChat cryptographic session backed by X's official Chat XDK.
 *
 * @public
 */
export class XChatSession {
	private readonly _chat: IXChatClient;

	private constructor(chat: IXChatClient) {
		this._chat = chat;
	}

	/** Whether the identity key required for conversation-key recovery is loaded. */
	public get isUnlocked(): boolean {
		return this._chat.hasIdentityKey();
	}

	/** Create a locked session with identity, verification, and versioned caching configured. */
	public static async create(options: IXChatSessionOptions): Promise<XChatSession> {
		const { createChat } = await import('@xdevplatform/chat-xdk');
		const chat = await createChat({
			getAuthToken: options.getAuthToken,
			juiceboxConfig: options.juiceboxConfig,
		});

		chat.setIdentity(options.userId, options.signingKeyVersion);
		chat.setCacheKeys(true);
		if (options.signingKeys) {
			chat.setSigningKeys(options.signingKeys);
		}

		return new XChatSession(chat);
	}

	/** Decrypt messages and recover conversation keys from key-change events. */
	public decryptEvents(events: string[]): IXChatDecryptResult {
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

	/** Replace the public signing keys used to verify incoming events. */
	public setSigningKeys(signingKeys: IXChatSigningKey[]): void {
		this._chat.setSigningKeys(signingKeys);
	}

	/** Recover the account's private XChat keys from secure backup. */
	public async unlock(pin: string | Uint8Array): Promise<void> {
		await this._chat.unlock(pin);
	}
}
