import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { DMEventDecoder } from '../../helper/DMEventDecoder';
import { Conversation } from '../../models/data/Conversation';
import { Inbox } from '../../models/data/Inbox';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { XChatSession } from '../../models/XChatSession';
import { IDMConversationOptions, IXChatSigningKey } from '../../types/args/DirectMessageArgs';
import { IConversationPageResponse } from '../../types/raw/dm/ConversationPage';
import { IInboxInitialResponse, Conversation as RawConversation } from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';
import { IXChatPublicKeysResponse } from '../../types/raw/dm/XChatPublicKeys';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to direct messages
 *
 * @public
 */
export class DirectMessageService extends FetcherService {
	private readonly _conversationMetadata = new Map<string, RawConversation>();
	private _xChatSession?: XChatSession;

	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	private static _compareKeyVersions(first?: string, second?: string): number {
		try {
			const difference = BigInt(first ?? '0') - BigInt(second ?? '0');
			return difference < 0n ? -1 : difference > 0n ? 1 : 0;
		} catch {
			return (first ?? '').localeCompare(second ?? '');
		}
	}

	private static _normalizeConversationId(conversationId: string): string {
		return /^\d+-\d+$/.test(conversationId) ? conversationId.replace('-', ':') : conversationId;
	}

	private static _toSigningKeys(response: IXChatPublicKeysResponse): IXChatSigningKey[] {
		return (response.data?.user_results_by_rest_ids ?? []).flatMap((user) =>
			(user.result?.get_public_keys?.public_keys_with_token_map ?? []).flatMap((record) => {
				const metadata = record.public_key_with_metadata;
				const key = metadata?.public_key;
				if (
					!user.rest_id ||
					!metadata?.version ||
					!key?.signing_public_key ||
					!key.public_key ||
					!key.identity_public_key_signature
				) {
					return [];
				}

				return [
					{
						userId: user.rest_id,
						publicKeyVersion: metadata.version,
						publicKey: key.signing_public_key,
						identityPublicKey: key.public_key,
						identityPublicKeySignature: key.identity_public_key_signature,
					},
				];
			}),
		);
	}

	private _cacheConversationMetadata(conversations?: Record<string, RawConversation>): void {
		for (const [conversationId, conversation] of Object.entries(conversations ?? {})) {
			this._conversationMetadata.set(DirectMessageService._normalizeConversationId(conversationId), conversation);
		}
	}

	private async _getConversationMetadata(conversationId: string): Promise<RawConversation | undefined> {
		const cached = this._conversationMetadata.get(conversationId);
		if (cached) {
			return cached;
		}

		const response = await this.request<IInboxInitialResponse>(ResourceType.DM_INBOX_INITIAL_STATE, {});
		this._cacheConversationMetadata(response.data.inbox_initial_state?.conversations);

		return this._conversationMetadata.get(conversationId);
	}

	private async _getXChatPublicKeys(
		userIds: string[],
		includeJuiceboxTokens = false,
	): Promise<IXChatPublicKeysResponse> {
		const ids = [...new Set(userIds.filter(Boolean))];
		if (ids.length === 0) {
			return {};
		}

		return (
			await this.request<IXChatPublicKeysResponse>(ResourceType.DM_XCHAT_PUBLIC_KEYS, {
				ids,
				includeJuiceboxTokens,
			})
		).data;
	}

	private async _setConversationSigningKeys(
		events: string[],
		conversationId: string,
		metadata?: RawConversation,
	): Promise<void> {
		if (!this._xChatSession?.isUnlocked) {
			return;
		}

		const senderIds = DMEventDecoder.decodeMessages(events).map((event) => event.senderId);
		const participantIds = conversationId.includes(':')
			? conversationId.split(':')
			: (metadata?.participants.map((participant) => participant.user_id) ?? []);
		const response = await this._getXChatPublicKeys([...senderIds, ...participantIds, this.config.userId ?? '']);
		this._xChatSession.setSigningKeys(DirectMessageService._toSigningKeys(response));
	}

	/**
	 * Recover this account's XChat identity with its existing chat PIN.
	 *
	 * @remarks Requires the optional `@xdevplatform/chat-xdk` and `juicebox-sdk` packages.
	 * The PIN is passed to the official SDK and is not retained by Rettiwt.
	 *
	 * @param pin - The account's existing XChat PIN as text or UTF-8 bytes.
	 * @throws If authentication is unavailable, recovery metadata is missing, the optional SDK is not installed,
	 * or the PIN cannot unlock the account's key backup.
	 */
	public async unlockXChat(pin: string | Uint8Array): Promise<void> {
		const userId = this.config.userId;
		if (!userId) {
			throw new Error('XChat recovery requires an authenticated API key');
		}
		if (typeof pin === 'string' && pin.trim().length === 0) {
			throw new Error('XChat PIN cannot be empty');
		}

		const response = await this._getXChatPublicKeys([userId], true);
		const user = response.data?.user_results_by_rest_ids?.find((result) => result.rest_id === userId);
		const records = user?.result?.get_public_keys?.public_keys_with_token_map ?? [];
		const record = records
			.filter((candidate) => {
				const tokenMap = candidate.token_map;
				return Boolean(tokenMap?.key_store_token_map_json && tokenMap.token_map?.length);
			})
			.sort((first, second) =>
				DirectMessageService._compareKeyVersions(
					second.public_key_with_metadata?.version,
					first.public_key_with_metadata?.version,
				),
			)[0];

		if (!record?.public_key_with_metadata?.version || !record.token_map?.key_store_token_map_json) {
			throw new Error('No PIN-backed XChat key is registered for this account');
		}

		const realmTokens = new Map(
			(record.token_map.token_map ?? []).flatMap((entry) =>
				entry.key && entry.value?.token ? [[entry.key.toLowerCase(), entry.value.token] as const] : [],
			),
		);
		const session = await XChatSession.create({
			juiceboxConfig: record.token_map.key_store_token_map_json,
			getAuthToken: (realmId) => {
				const token = realmTokens.get(realmId.toLowerCase());
				if (!token) {
					return Promise.reject(new Error(`No XChat authorization token for realm ${realmId}`));
				}
				return Promise.resolve(token);
			},
			userId,
			signingKeyVersion: record.public_key_with_metadata.version,
			signingKeys: DirectMessageService._toSigningKeys(response),
		});

		try {
			await session.unlock(pin);
		} catch (error) {
			session.free();
			throw error;
		}

		this._xChatSession?.free();
		this._xChatSession = session;
	}

	/** Permanently clear the internally recovered keys and disable automatic XChat decryption. */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public lockXChat(): void {
		this._xChatSession?.free();
		this._xChatSession = undefined;
	}

	/**
	 * Get the full conversation history for a specific conversation, ordered recent to oldest.
	 * Use this to load complete message history for a conversation identified from the inbox.
	 *
	 * @param conversationId - The ID of the conversation (e.g., "394028042:1645287614").
	 * @param cursorOrOptions - Either the oldest event ID from the previous page or decoding options for this call.
	 * @param options - Decoding options when a pagination cursor is supplied as the second argument.
	 *
	 * @returns The conversation with full message history, or undefined if not found.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching a specific conversation
	 * rettiwt.dm.conversation('394028042:1645287614')
	 * .then(conversation => {
	 * 	if (conversation) {
	 * 		console.log(`Conversation with ${conversation.participants.length} participants`);
	 * 		console.log(`${conversation.messages.length} messages loaded`);
	 * 	}
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public async conversation(
		conversationId: string,
		cursorOrOptions?: string | IDMConversationOptions,
		options?: IDMConversationOptions,
	): Promise<Conversation | undefined> {
		const normalizedConversationId = DirectMessageService._normalizeConversationId(conversationId);
		const resource = ResourceType.DM_CONVERSATION;
		const cursor = typeof cursorOrOptions === 'string' ? cursorOrOptions : undefined;
		const conversationOptions = typeof cursorOrOptions === 'object' ? cursorOrOptions : options;
		const xChatSession = conversationOptions?.xChatSession ?? this._xChatSession ?? this.config.xChatSession;
		const conversationKeys = {
			...this.config.xChatConversationKeys,
			...conversationOptions?.xChatConversationKeys,
		};
		if (conversationKeys[conversationId] && normalizedConversationId !== conversationId) {
			conversationKeys[normalizedConversationId] = conversationKeys[conversationId];
		}
		const conversationKeyProvider =
			conversationOptions?.xChatConversationKeyProvider ?? this.config.xChatConversationKeyProvider;
		const providedConversationKey = await conversationKeyProvider?.(conversationId);

		if (conversationOptions?.xChatConversationKey) {
			conversationKeys[normalizedConversationId] = conversationOptions.xChatConversationKey;
		} else if (providedConversationKey) {
			conversationKeys[normalizedConversationId] = providedConversationKey;
		}

		// Fetching raw conversation page
		const response = await this.request<IConversationPageResponse>(resource, {
			conversationId: normalizedConversationId,
			maxId: cursor,
		});
		const encodedEvents = response.data.data?.get_conversation_page?.encoded_message_events ?? [];
		const keyChangeEvents = response.data.data?.get_conversation_page?.missing_conversation_key_change_events ?? [];
		const conversationMetadata = normalizedConversationId.includes(':')
			? undefined
			: await this._getConversationMetadata(normalizedConversationId);
		if (xChatSession === this._xChatSession) {
			await this._setConversationSigningKeys(
				[...keyChangeEvents, ...encodedEvents],
				normalizedConversationId,
				conversationMetadata,
			);
		}

		// Deserializing response
		const data = Conversation.fromConversationPage(
			response.data,
			normalizedConversationId,
			{
				conversationKeys: Object.keys(conversationKeys).length > 0 ? conversationKeys : undefined,
				keyChangeEvents,
				xChatSession,
			},
			conversationMetadata,
		);

		return data;
	}

	/**
	 * Delete a conversation.
	 * You will leave the conversation and it will be removed from your inbox.
	 *
	 * @param conversationId - The ID of the conversation to delete.
	 *
	 * @returns A promise that resolves when the conversation is deleted.
	 *
	 * @example
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 * // Deleting a conversation
	 * rettiwt.dm.deleteConversation('394028042-1712730991884689408')
	 * .then(() => {
	 * 	console.log('Conversation deleted successfully');
	 * })
	 * .catch(err => {
	 *  console.log('Failed to delete conversation:', err);
	 * 	});
	 * ```
	 **/
	public async deleteConversation(conversationId: string): Promise<void> {
		const resource = ResourceType.DM_DELETE_CONVERSATION;

		// Sending delete request
		await this.request<void>(resource, {
			conversationId,
		});
	}

	/**
	 * Get your inbox, ordered recent to oldest.
	 *
	 * @param cursor - The cursor to the inbox items to fetch. Is equal to the ID of the last inbox conversation.
	 *
	 * @returns The required inbox. Returns initial inbox if no cursor is provided.
	 *
	 * @example
	 *
	 * ```ts
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance using the given 'API_KEY'
	 * const rettiwt = new Rettiwt({ apiKey: API_KEY });
	 *
	 * // Fetching the initial DM inbox state
	 * rettiwt.dm.inbox()
	 * .then(inbox => {
	 * 	console.log(`Found ${inbox.conversations.length} conversations`);
	 * 	console.log('First conversation:', inbox.conversations[0]);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async inbox(cursor?: string): Promise<Inbox> {
		// If cursor is provided, fetch initial inbox
		if (cursor !== undefined) {
			const resource = ResourceType.DM_INBOX_TIMELINE;

			// Fetching raw inbox timeline
			const response = await this.request<IInboxTimelineResponse>(resource, {
				maxId: cursor,
			});
			this._cacheConversationMetadata(response.data.inbox_timeline?.conversations);

			// Deserializing response
			const data = Extractors[resource](response.data);

			return data;
		}
		// Else, fetch next inbox data
		else {
			const resource = ResourceType.DM_INBOX_INITIAL_STATE;

			// Fetching raw inbox initial state
			const response = await this.request<IInboxInitialResponse>(resource, {});
			this._cacheConversationMetadata(response.data.inbox_initial_state?.conversations);

			// Deserializing response
			const data = Extractors[resource](response.data);

			return data;
		}
	}
}
