import { IXChatClient, IXChatDecryptResult, IXChatSessionOptions, IXChatSigningKey } from '../types/XChatSession';

/**
 * An XChat cryptographic session backed by X's official Chat XDK.
 *
 * @see {@link https://github.com/xdevplatform/chat-xdk | Chat XDK on GitHub}
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
