import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { Conversation } from '../../models/data/Conversation';
import { Inbox } from '../../models/data/Inbox';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IConversationPageResponse } from '../../types/raw/dm/ConversationPage';
import { IInboxInitialResponse } from '../../types/raw/dm/InboxInitial';
import { IInboxTimelineResponse } from '../../types/raw/dm/InboxTimeline';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to direct messages
 *
 * @public
 */
export class DirectMessageService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
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
	public async conversation(conversationId: string, cursor?: string): Promise<Conversation | undefined> {
		const resource = ResourceType.DM_CONVERSATION;

		// Fetching raw conversation page
		const response = await this.request<IConversationPageResponse>(resource, {
			conversationId,
			maxId: cursor,
		});

		// Deserializing response
		const data = Extractors[resource](response, conversationId);

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
			const data = Extractors[resource](response);

			return data;
		}
		// Else, fetch next inbox data
		else {
			const resource = ResourceType.DM_INBOX_INITIAL_STATE;

			// Fetching raw inbox initial state
			const response = await this.request<IInboxInitialResponse>(resource, {});

			// Deserializing response
			const data = Extractors[resource](response);

			return data;
		}
	}
}
