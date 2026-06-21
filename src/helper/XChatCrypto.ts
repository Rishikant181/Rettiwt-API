import nacl from 'tweetnacl';

import { XChatConversationKey } from '../types/args/DirectMessageArgs';

/**
 * Minimal XChat message payload crypto helpers.
 *
 * @internal
 */
export class XChatCrypto {
	private static _decodeKey(key: XChatConversationKey): Buffer | undefined {
		if (key instanceof Uint8Array) {
			return Buffer.from(key);
		}

		const normalized = key.trim();
		if (/^[a-f0-9]{64}$/i.test(normalized)) {
			return Buffer.from(normalized, 'hex');
		}

		const base64 = normalized.replace(/-/g, '+').replace(/_/g, '/');
		const decoded = Buffer.from(base64, 'base64');

		return decoded.length > 0 ? decoded : undefined;
	}

	private static _decryptMessagePayload(key: Buffer, payload: Buffer): Buffer | undefined {
		const nonceLength = 24;
		const macLength = 16;

		if (key.length !== 32 || payload.length <= nonceLength + macLength) {
			return undefined;
		}

		const decrypted = nacl.secretbox.open(
			new Uint8Array(payload.subarray(nonceLength)),
			new Uint8Array(payload.subarray(0, nonceLength)),
			new Uint8Array(key),
		);

		return decrypted ? Buffer.from(decrypted) : undefined;
	}

	/**
	 * Decrypt an encrypted message payload using the locally stored XChat
	 * conversation key bytes.
	 */
	public static decryptPayload(payload: Buffer, key: XChatConversationKey): Buffer | undefined {
		const decodedKey = XChatCrypto._decodeKey(key);
		if (!decodedKey) {
			return undefined;
		}

		return XChatCrypto._decryptMessagePayload(decodedKey, payload);
	}
}
