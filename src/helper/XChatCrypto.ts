import nacl from 'tweetnacl';

import { XChatConversationKey } from '../types/XChatSession';

/**
 * Minimal XChat message payload crypto helpers.
 *
 * @internal
 */
function decodeKey(key: XChatConversationKey): Buffer | undefined {
	if (key instanceof Uint8Array) {
		return key.length === 32 ? Buffer.from(key) : undefined;
	}

	const normalized = key.trim();
	if (/^[a-f0-9]{64}$/i.test(normalized)) {
		return Buffer.from(normalized, 'hex');
	}

	if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(normalized)) {
		return undefined;
	}

	const base64 = normalized.replace(/-/g, '+').replace(/_/g, '/');
	const decoded = Buffer.from(base64, 'base64');

	return decoded.length === 32 ? decoded : undefined;
}

function decryptMessagePayload(key: Buffer, payload: Buffer): Buffer | undefined {
	const nonceLength = 24;
	const macLength = 16;

	if (payload.length <= nonceLength + macLength) {
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
export function decryptPayload(payload: Buffer, key: XChatConversationKey): Buffer | undefined {
	const decodedKey = decodeKey(key);
	if (!decodedKey) {
		return undefined;
	}

	return decryptMessagePayload(decodedKey, payload);
}
