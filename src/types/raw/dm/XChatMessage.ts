/* eslint-disable @typescript-eslint/naming-convention */

/**
 * The normalized message shape produced from an encoded XChat event.
 *
 * @internal
 */
export interface IXChatMessage {
	conversation_id: string;
	id: string;
	is_encrypted: boolean;
	media_urls?: string[];
	recipient_id?: string;
	sender_id: string;
	text: string;
	time: string;
}
