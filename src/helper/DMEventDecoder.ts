interface ITlvField {
	id: number;
	kind: 'bytes' | 'bool' | 'u32' | 'u64' | 'object' | 'list';
	value: Buffer | boolean | number | bigint | ITlvField[];
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
export class DMEventDecoder {
	private static _collectMediaUrls(fields: ITlvField[]): string[] {
		const urls = DMEventDecoder._collectStrings(fields).filter((value) => DefaultMediaHosts.test(value));

		return [...new Set(urls)];
	}

	private static _collectStrings(fields: ITlvField[]): string[] {
		const values: string[] = [];

		for (const field of fields) {
			if (field.kind === 'bytes') {
				const value = DMEventDecoder._decodeBytes(field.value as Buffer);
				if (value !== undefined) {
					values.push(value);
				}
			} else if (field.kind === 'object' || field.kind === 'list') {
				values.push(...DMEventDecoder._collectStrings(field.value as ITlvField[]));
			}
		}

		return values;
	}

	private static _decodeBytes(value: Buffer): string | undefined {
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

	private static _extractPayloadBytes(fields: ITlvField[]): Buffer | undefined {
		const payloadWrapper = DMEventDecoder._getFieldChildren(fields, OuterEventField.payloadWrapper);
		if (!payloadWrapper) {
			return undefined;
		}

		return DMEventDecoder._findBytesField(payloadWrapper, PayloadWrapperField.encodedPayload);
	}

	private static _findBytesField(fields: ITlvField[], fieldId: number): Buffer | undefined {
		for (const field of fields) {
			if (field.id === fieldId && field.kind === 'bytes') {
				return field.value as Buffer;
			}

			if (field.kind === 'object' || field.kind === 'list') {
				const value = DMEventDecoder._findBytesField(field.value as ITlvField[], fieldId);
				if (value) {
					return value;
				}
			}
		}

		return undefined;
	}

	private static _getChildField(fields: ITlvField[], fieldId: number): ITlvField | undefined {
		return fields.find((field) => field.id === fieldId);
	}

	private static _getFieldChildren(fields: ITlvField[], fieldId: number): ITlvField[] | undefined {
		const field = DMEventDecoder._getChildField(fields, fieldId);
		if (!field || (field.kind !== 'object' && field.kind !== 'list')) {
			return undefined;
		}

		return field.value as ITlvField[];
	}

	private static _getFieldString(fields: ITlvField[], fieldId: number): string | undefined {
		const field = DMEventDecoder._getChildField(fields, fieldId);
		if (!field) {
			return undefined;
		}

		if (field.kind === 'bytes') {
			return DMEventDecoder._decodeBytes(field.value as Buffer);
		}

		if (field.kind === 'u32' || field.kind === 'u64') {
			return field.kind === 'u32' ? String(field.value as number) : String(field.value as bigint);
		}

		if (field.kind === 'bool') {
			return String(field.value === true);
		}

		return undefined;
	}

	private static _inferRecipientId(conversationId: string, senderId: string): string | undefined {
		const participants = conversationId.split(':').filter(Boolean);
		if (participants.length !== 2) {
			return undefined;
		}

		return participants.find((participantId) => participantId !== senderId);
	}

	private static _parseContainer(buffer: Buffer, offset: number, endOffset: number): [ITlvField[], number] {
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

			const [field, nextCursor] = DMEventDecoder._parseField(buffer, cursor, endOffset);
			fields.push(field);
			cursor = nextCursor;
		}

		return [fields, cursor];
	}

	private static _parseField(buffer: Buffer, offset: number, endOffset: number): [ITlvField, number] {
		if (offset + 3 > endOffset) {
			throw new Error('Invalid TLV payload');
		}

		const kind = buffer[offset];
		const id = buffer.readUInt16BE(offset + 1);

		switch (kind) {
			case TlvKind.bool:
				return [
					{
						id,
						kind: 'bool',
						value: buffer[offset + 3] === TlvKind.separator,
					},
					offset + 4,
				];

			case TlvKind.u32:
				return [
					{
						id,
						kind: 'u32',
						value: buffer.readUInt32BE(offset + 3),
					},
					offset + 7,
				];

			case TlvKind.u64:
				return [
					{
						id,
						kind: 'u64',
						value:
							(BigInt(buffer.readUInt32BE(offset + 3)) << 32n) | BigInt(buffer.readUInt32BE(offset + 7)),
					},
					offset + 11,
				];

			case TlvKind.bytes: {
				const length = buffer.readUInt32BE(offset + 3);
				const valueStart = offset + 7;
				const valueEnd = valueStart + length;

				return [
					{
						id,
						kind: 'bytes',
						value: buffer.subarray(valueStart, valueEnd),
					},
					valueEnd,
				];
			}

			case TlvKind.object:
			case TlvKind.list: {
				const [children, nextCursor] = DMEventDecoder._parseContainer(buffer, offset + 3, endOffset);

				return [
					{
						id,
						kind: kind === TlvKind.object ? 'object' : 'list',
						value: children,
					},
					nextCursor,
				];
			}

			default:
				throw new Error(`Unsupported TLV kind: ${kind.toString(16)}`);
		}
	}

	private static _parseRoot(buffer: Buffer): ITlvField[] {
		return DMEventDecoder._parseContainer(buffer, 0, buffer.length)[0];
	}

	private static _safeParseRoot(buffer: Buffer): ITlvField[] | undefined {
		try {
			return DMEventDecoder._parseRoot(buffer);
		} catch {
			return undefined;
		}
	}

	private static _toIsoDate(timestamp: string): string {
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
	public static decodeMessage(encodedEvent: string): IDecodedConversationMessage | undefined {
		const eventBuffer = Buffer.from(encodedEvent, 'base64');
		const outerFields = DMEventDecoder._safeParseRoot(eventBuffer);
		if (!outerFields) {
			return undefined;
		}

		const payloadBytes = DMEventDecoder._extractPayloadBytes(outerFields);

		if (!payloadBytes) {
			return undefined;
		}

		const messageId = DMEventDecoder._getFieldString(outerFields, OuterEventField.messageId) ?? '';
		const senderId = DMEventDecoder._getFieldString(outerFields, OuterEventField.senderId) ?? '';
		const conversationId = DMEventDecoder._getFieldString(outerFields, OuterEventField.conversationId) ?? '';
		const createdAtMs = DMEventDecoder._getFieldString(outerFields, OuterEventField.createdAtMs) ?? '';
		const recipientId = DMEventDecoder._inferRecipientId(conversationId, senderId);
		const payloadFields = DMEventDecoder._safeParseRoot(payloadBytes);
		if (!payloadFields) {
			return {
				id: messageId,
				conversationId,
				createdAt: DMEventDecoder._toIsoDate(createdAtMs),
				createdAtMs,
				isEncrypted: true,
				recipientId,
				senderId,
				text: '',
			};
		}

		const eventFields = DMEventDecoder._getFieldChildren(payloadFields, PayloadField.event);
		const messageFields = eventFields
			? DMEventDecoder._getFieldChildren(eventFields, EventField.message)
			: undefined;
		if (!messageFields) {
			// Field 2 in the inner payload is currently used for reactions.
			return undefined;
		}

		const text = DMEventDecoder._getFieldString(messageFields, MessageField.text) ?? '';
		const mediaUrls = DMEventDecoder._collectMediaUrls(messageFields);

		return {
			id: messageId,
			conversationId,
			createdAt: DMEventDecoder._toIsoDate(createdAtMs),
			createdAtMs,
			isEncrypted: false,
			mediaUrls: mediaUrls.length > 0 ? mediaUrls : undefined,
			recipientId,
			senderId,
			text,
		};
	}

	/**
	 * Decode a list of message events and discard non-message events such as
	 * reactions that do not map to the current DirectMessage model.
	 */
	public static decodeMessages(encodedEvents: string[]): IDecodedConversationMessage[] {
		return encodedEvents
			.map((encodedEvent) => DMEventDecoder.decodeMessage(encodedEvent))
			.filter((message): message is IDecodedConversationMessage => message !== undefined);
	}
}
