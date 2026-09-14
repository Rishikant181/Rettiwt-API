import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { DMEventDecoder } from '../../helper/DMEventDecoder';
import { Conversation } from '../../models/data/Conversation';
import { Inbox } from '../../models/data/Inbox';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { XChatSession } from '../../models/XChatSession';
import { IDMConversationOptions, IXChatSigningKey } from '../../types/args/DirectMessageArgs';
import { IConversationPageResponse } from '../../types/raw/dm/ConversationPage';
import { IInboxInitialResponse } from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';
import { IXChatPublicKeysResponse } from '../../types/raw/dm/XChatPublicKeys';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to direct messages
 *
 * @public
 */
export class DirectMessageService extends FetcherService {
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

	private async _setConversationSigningKeys(encodedEvents: string[], conversationId: string): Promise<void> {
		if (!this._xChatSession?.isUnlocked) {
			return;
		}

		const senderIds = DMEventDecoder.decodeMessages(encodedEvents).map((event) => event.senderId);
		const participantIds = conversationId.includes(':') ? conversationId.split(':') : [];
		const response = await this._getXChatPublicKeys([...senderIds, ...participantIds, this.config.userId ?? '']);
		this._xChatSession.setSigningKeys(DirectMessageService._toSigningKeys(response));
	}

	/** Recover this account's XChat identity with its existing chat PIN. */
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

	/** Clear recovered private keys and disable automatic XChat decryption. */
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
	 * @param cursor - The cursor for pagination. Is equal to the ID of the oldest event from the previous batch.
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
		if (xChatSession === this._xChatSession) {
			await this._setConversationSigningKeys(encodedEvents, normalizedConversationId);
		}

		// Deserializing response
		const data = Conversation.fromConversationPage(response.data, normalizedConversationId, {
			conversationKeys: Object.keys(conversationKeys).length > 0 ? conversationKeys : undefined,
			keyChangeEvents: response.data.data?.get_conversation_page?.missing_conversation_key_change_events,
			xChatSession,
		});

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

			// Deserializing response
			const data = Extractors[resource](response.data);

			return data;
		}
		// Else, fetch next inbox data
		else {
			const resource = ResourceType.DM_INBOX_INITIAL_STATE;

			// Fetching raw inbox initial state
			const response = await this.request<IInboxInitialResponse>(resource, {});

			// Deserializing response
			const data = Extractors[resource](response.data);

			return data;
		}
	}
}
