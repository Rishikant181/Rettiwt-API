import crypto from "crypto";
import base64url from "base64url";

interface TransactionIdParams {
	method: string;
	path: string;
	key: string;
	animationKey: string;
	timeNow?: number;
}

export function generateTransactionId({ method, path, key, animationKey, timeNow }: TransactionIdParams): string {
	try {
		const DEFAULT_KEYWORD = "obfiowerehiring";
		const ADDITIONAL_RANDOM_NUMBER = 3;

		timeNow = timeNow ?? Math.floor((Date.now() - 1682924400000) / 1000);

		const timeNowBytes = new Uint8Array(4);
		for (let i = 0; i < 4; i++) {
			timeNowBytes[i] = (timeNow >> (i * 8)) & 0xff;
		}

		const keyBytes = Buffer.from(key, "utf-8");

		const hashInput = `${method}!${path}!${timeNow}${DEFAULT_KEYWORD}${animationKey}`;
		const hashVal = crypto.createHash("sha256").update(hashInput).digest();
		const hashBytes = hashVal.subarray(0, 16);

		const randomNum = 57; // Precomputed to match Python's `random.seed(42); random.randint(0, 255)`

		const bytesArr = Buffer.concat([keyBytes, Buffer.from(timeNowBytes), Buffer.from(hashBytes), Buffer.from([ADDITIONAL_RANDOM_NUMBER])]);

		const xorBytes = new Uint8Array(bytesArr.length);
		for (let i = 0; i < bytesArr.length; i++) {
			xorBytes[i] = bytesArr[i] ^ randomNum;
		}

		const out = Buffer.concat([Buffer.from([randomNum]), Buffer.from(xorBytes)]);

		return base64url.encode(out).replace(/=/g, "");
	} catch (error) {
		throw new Error(`Couldn't generate transaction ID.\n${error}`);
	}
}
