/* eslint-disable @typescript-eslint/member-ordering */

import { IXChatDecryptor, IXChatEvent, XChatConversationKey } from '../types/XChatSession';

import { decryptPayload } from './XChatCrypto';

interface ITlvField {
	id: number;
	kind: 'bytes' | 'bool' | 'u32' | 'u64' | 'object' | 'list';
	value: Buffer | boolean | number | bigint | ITlvField[];
}

type IMessageEnvelope = Omit<IDecodedConversationMessage, 'isEncrypted' | 'mediaUrls' | 'text'>;

interface IDecodedEnvelope {
	message: IMessageEnvelope;
	payload: Buffer;
}

export interface IDecodedConversationMessage {
	id: string;
	conversationId: string;
	createdAt: string;
	createdAtMs: string;
	isEncrypted: boolean;
	mediaUrls?: string[];
	recipientId?: string;
	senderId: string;
	text: string;
}

export interface IDecodedConversationMessageOptions {
	conversationKeys?: Record<string, XChatConversationKey>;
	keyChangeEvents?: string[];
	xChatSession?: IXChatDecryptor;
}

const DefaultMediaHosts = /^(https?:\/\/(?:video|pbs)\.twimg\.com\/)/i;

const TlvKind = {
	terminator: 0x00,
	separator: 0x01,
	bool: 0x02,
	u32: 0x08,
	u64: 0x0a,
	bytes: 0x0b,
	object: 0x0c,
	list: 0x0f,
} as const;

const OuterEventField = {
	messageId: 1,
	senderId: 3,
	conversationId: 4,
	createdAtMs: 6,
	payloadWrapper: 7,
} as const;

const PayloadWrapperField = {
	encodedPayload: 100,
} as const;

const PayloadField = {
	event: 1,
} as const;

const EventField = {
	message: 1,
} as const;

const MessageField = {
	text: 1,
} as const;

/**
 * Decoder for the binary TLV payloads returned by X's encoded DM event API.
 *
 * @internal
 */

function _collectStrings(fields: ITlvField[]): string[] {
		const values: string[] = [];

		for (const field of fields) {
			if (field.kind === 'bytes') {
				const value = decodeBytes(field.value as Buffer);
				if (value !== undefined) {
					values.push(value);
				}
			} else if (field.kind === 'object' || field.kind === 'list') {
				values.push(...collectStrings(field.value as ITlvField[]));
			}
		}

		return values;
	}

function _decodeEnvelope(encodedEvent: string): IDecodedEnvelope | undefined {
		const fields = tryParseTlvDocument(Buffer.from(encodedEvent, 'base64'));
		const payload = fields ? findPayload(fields) : undefined;
		if (!fields || !payload) {
			return undefined;
		}

		const conversationId = readFieldAsString(fields, OuterEventField.conversationId) ?? '';
		const senderId = readFieldAsString(fields, OuterEventField.senderId) ?? '';
		const createdAtMs = readFieldAsString(fields, OuterEventField.createdAtMs) ?? '';

		return {
			message: {
				id: readFieldAsString(fields, OuterEventField.messageId) ?? '',
				conversationId,
				createdAt: toIsoDate(createdAtMs),
				createdAtMs,
				recipientId: inferRecipientId(conversationId, senderId),
				senderId,
			},
			payload,
		};
	}

function _decodeBytes(value: Buffer): string | undefined {
		if (value.includes(0)) {
			return undefined;
		}

		const decoded = value.toString('utf8');
		if (decoded.includes('\uFFFD')) {
			return undefined;
		}

		for (const char of decoded) {
			const code = char.charCodeAt(0);
			if (code < 32 && char !== '\n' && char !== '\r' && char !== '\t') {
				return undefined;
			}
		}

		return decoded;
	}

function _decodeXChatEvent(event: IXChatEvent): IDecodedConversationMessage | undefined {
		if (event.type !== 'message' || !event.conversationId || !event.senderId) {
			return undefined;
		}

		const createdAtMs = event.createdAtMsec ? String(event.createdAtMsec) : '';
		const mediaUrls = (event.attachments ?? [])
			.flatMap((attachment) => [attachment.legacyMediaUrlHttps, attachment.legacyMediaPreviewUrl, attachment.url])
			.filter((url): url is string => typeof url === 'string');

		return {
			id: event.id ?? event.sequenceId ?? '',
			conversationId: event.conversationId,
			createdAt: toIsoDate(createdAtMs),
			createdAtMs,
			isEncrypted: true,
			mediaUrls: mediaUrls.length > 0 ? [...new Set(mediaUrls)] : undefined,
			recipientId: inferRecipientId(event.conversationId, event.senderId),
			senderId: event.senderId,
			text: event.content?.text ?? '',
		};
	}

function _decodeXChatEvents(
		encodedEvents: string[],
		options?: IDecodedConversationMessageOptions,
	): Map<string, IDecodedConversationMessage | undefined> {
		const decodedByEvent = new Map<string, IDecodedConversationMessage | undefined>();
		const session = options?.xChatSession;

		if (!session?.isUnlocked) {
			return decodedByEvent;
		}

		let result;
		try {
			result = session.decryptEvents([...(options?.keyChangeEvents ?? []), ...encodedEvents]);
		} catch {
			return decodedByEvent;
		}

		for (const message of result.messages) {
			if (!message.originalB64) {
				continue;
			}

			const decoded = decodeXChatEvent(message.event);
			// Remember every event handled by the SDK. A handled reaction or control
			// event intentionally maps to undefined and must not become an empty
			// encrypted-message shell through the manual-key fallback below.
			decodedByEvent.set(message.originalB64, decoded);
		}

		return decodedByEvent;
	}

function _findPayload(fields: ITlvField[]): Buffer | undefined {
		const payloadWrapper = getFieldChildren(fields, OuterEventField.payloadWrapper);
		if (!payloadWrapper) {
			return undefined;
		}

		return findBytesField(payloadWrapper, PayloadWrapperField.encodedPayload);
	}

function _findBytesField(fields: ITlvField[], fieldId: number): Buffer | undefined {
		for (const field of fields) {
			if (field.id === fieldId && field.kind === 'bytes') {
				return field.value as Buffer;
			}

			if (field.kind === 'object' || field.kind === 'list') {
				const value = findBytesField(field.value as ITlvField[], fieldId);
				if (value) {
					return value;
				}
			}
		}

		return undefined;
	}

function _getFieldChildren(fields: ITlvField[], fieldId: number): ITlvField[] | undefined {
		const field = fields.find((candidate) => candidate.id === fieldId);
		if (!field || (field.kind !== 'object' && field.kind !== 'list')) {
			return undefined;
		}

		return field.value as ITlvField[];
	}

function _readFieldAsString(fields: ITlvField[], fieldId: number): string | undefined {
		const field = fields.find((candidate) => candidate.id === fieldId);
		if (!field) {
			return undefined;
		}

		if (field.kind === 'bytes') {
			return decodeBytes(field.value as Buffer);
		}

		if (field.kind === 'u32' || field.kind === 'u64') {
			return field.kind === 'u32' ? String(field.value as number) : String(field.value as bigint);
		}

		if (field.kind === 'bool') {
			return String(field.value === true);
		}

		return undefined;
	}

function _inferRecipientId(conversationId: string, senderId: string): string | undefined {
		const participants = conversationId.split(':').filter(Boolean);
		if (participants.length !== 2) {
			return undefined;
		}

		return participants.find((participantId) => participantId !== senderId);
	}

function _parseContainer(buffer: Buffer, offset: number, endOffset: number): [ITlvField[], number] {
		const fields: ITlvField[] = [];
		let cursor = offset;

		while (cursor < endOffset) {
			if (buffer[cursor] === TlvKind.terminator) {
				return [fields, cursor + 1];
			}
			if (buffer[cursor] === TlvKind.separator) {
				cursor++;
				continue;
			}

			const [field, nextCursor] = parseField(buffer, cursor, endOffset);
			fields.push(field);
			cursor = nextCursor;
		}

		return [fields, cursor];
	}

function _parseField(buffer: Buffer, offset: number, endOffset: number): [ITlvField, number] {
		requireBytes(offset, 3, endOffset);

		const kind = buffer[offset];
		const id = buffer.readUInt16BE(offset + 1);

		switch (kind) {
			case TlvKind.bool: {
				requireBytes(offset, 4, endOffset);
				return [{ id, kind: 'bool', value: buffer[offset + 3] === TlvKind.separator }, offset + 4];
			}

			case TlvKind.u32: {
				requireBytes(offset, 7, endOffset);
				return [{ id, kind: 'u32', value: buffer.readUInt32BE(offset + 3) }, offset + 7];
			}

			case TlvKind.u64: {
				requireBytes(offset, 11, endOffset);
				const value =
					(BigInt(buffer.readUInt32BE(offset + 3)) << 32n) | BigInt(buffer.readUInt32BE(offset + 7));
				return [{ id, kind: 'u64', value }, offset + 11];
			}

			case TlvKind.bytes: {
				requireBytes(offset, 7, endOffset);
				const length = buffer.readUInt32BE(offset + 3);
				const valueStart = offset + 7;
				const valueEnd = valueStart + length;
				requireBytes(valueStart, length, endOffset);
				return [{ id, kind: 'bytes', value: buffer.subarray(valueStart, valueEnd) }, valueEnd];
			}

			case TlvKind.object:
			case TlvKind.list: {
				const [children, nextCursor] = parseContainer(buffer, offset + 3, endOffset);

				return [{ id, kind: kind === TlvKind.object ? 'object' : 'list', value: children }, nextCursor];
			}

			default:
				throw new Error(`Unsupported TLV kind: ${kind.toString(16)}`);
		}
	}

function _requireBytes(offset: number, length: number, endOffset: number): void {
		if (length < 0 || offset < 0 || offset + length > endOffset) {
			throw new Error('Invalid TLV payload');
		}
	}

function _parseMessagePayload(
		payloadBytes: Buffer,
		outerMessage: IMessageEnvelope,
		isEncrypted = false,
	): IDecodedConversationMessage | undefined {
		const payloadFields = tryParseTlvDocument(payloadBytes);
		if (!payloadFields) {
			return undefined;
		}

		const eventFields = getFieldChildren(payloadFields, PayloadField.event);
		const messageFields = eventFields
			? getFieldChildren(eventFields, EventField.message)
			: undefined;
		if (!messageFields) {
			// Field 2 in the inner payload is currently used for reactions.
			return undefined;
		}

		const text = readFieldAsString(messageFields, MessageField.text) ?? '';
		const mediaUrls = [
			...new Set(collectStrings(messageFields).filter((value) => DefaultMediaHosts.test(value))),
		];

		return {
			...outerMessage,
			isEncrypted,
			mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
			text,
		};
	}

function _tryParseTlvDocument(buffer: Buffer): ITlvField[] | undefined {
		try {
			return parseContainer(buffer, 0, buffer.length)[0];
		} catch {
			return undefined;
		}
	}

function _toIsoDate(timestamp: string): string {
		const numericTimestamp = Number(timestamp);
		if (!Number.isNaN(numericTimestamp)) {
			const date = new Date(numericTimestamp);
			if (!Number.isNaN(date.getTime())) {
				return date.toISOString();
			}
		}

		return new Date().toISOString();
	}

	/**
	 * Decode a single encoded message event.
	 */
export function decodeMessage(
		encodedEvent: string,
		options?: IDecodedConversationMessageOptions,
	): IDecodedConversationMessage | undefined {
		const envelope = decodeEnvelope(encodedEvent);
		if (!envelope) {
			return undefined;
		}

		const { message, payload } = envelope;
		const decodedPayload = parseMessagePayload(payload, message);
		if (decodedPayload) {
			return decodedPayload;
		}

		const conversationKey = options?.conversationKeys?.[message.conversationId];
		if (conversationKey) {
			const decryptedPayload = decryptPayload(payload, conversationKey);
			if (decryptedPayload) {
				const decodedDecryptedPayload = parseMessagePayload(decryptedPayload, message, true);
				if (decodedDecryptedPayload) {
					return decodedDecryptedPayload;
				}
			}
		}

		return {
			...message,
			isEncrypted: true,
			text: '',
		};
	}

	/**
	 * Decode a list of message events and discard non-message events such as
	 * reactions that do not map to the current DirectMessage model.
	 */
export function decodeMessages(
		encodedEvents: string[],
		options?: IDecodedConversationMessageOptions,
	): IDecodedConversationMessage[] {
		const sessionMessages = decodeXChatEvents(encodedEvents, options);

		return encodedEvents
			.map((encodedEvent) =>
				sessionMessages.has(encodedEvent)
					? sessionMessages.get(encodedEvent)
					: decodeMessage(encodedEvent, options),
			)
			.filter((message): message is IDecodedConversationMessage => message !== undefined);
	}
