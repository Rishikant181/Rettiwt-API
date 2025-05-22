import { createHash } from 'node:crypto';

import { ITidParams } from '../types/auth/TidParams';

export function getUnixTime(): number {
	const [seconds, nanoseconds] = process.hrtime();
	return Date.now() / 1000 + seconds + nanoseconds / 1e9;
}

export function getNanosecondPrecisionTime(): number {
	return Number(((BigInt(Date.now()) * 1000000n + process.hrtime.bigint()) * 1000n) / BigInt(1000000)) / 1000000;
}

export function calculateClientTransactionIdHeader(args: ITidParams): string {
	const time = Math.floor(((args.time || getUnixTime()) * 1000 - 1682924400 * 1000) / 1000);
	const timeBuffer = new Uint8Array(new Uint32Array([time]).buffer);

	const keyBytes = Array.from(Buffer.from(args.verificationKey, 'base64'));
	const animationKey = args.animationKey || getAnimationKey(keyBytes, args.frames, args.indices);

	const value = [args.method, args.path, time].join('!') + args.keyword + animationKey;
	const valueEncoded = new TextEncoder().encode(value);

	const hash = createHash('sha-256').update(valueEncoded).digest();
	const hashBytes = Array.from(new Uint8Array(hash));

	const xorByte = args.xorByte || Math.floor(Math.random() * 256);

	const bytes = new Uint8Array(keyBytes.concat(Array.from(timeBuffer), hashBytes.slice(0, 16), [args.extraByte]));
	return encode(xor(xorByte, bytes));
}

function getAnimationKey(keyBytes: number[], frames: number[][][], indices: number[]): string {
	const totalTime = 4096;
	const rowIndex = keyBytes[indices[0]] % 16;
	const frameTime = indices
		.slice(1)
		.map((idx) => keyBytes[idx] % 16)
		.reduce((a, b) => a * b, 1);
	const targetTime = frameTime / totalTime;
	const frameRow = frames[keyBytes[5] % 4][rowIndex];
	return animate(frameRow, targetTime);
}

function animate(frameRow: number[], targetTime: number): string {
	const curves = frameRow.slice(7).map((v, i) => Number(a(v, b(i), 1).toFixed(2)));
	const cubicValue = getCubicCurveValue(curves, targetTime);

	const fromColor = [...frameRow.slice(0, 3), 1];
	const toColor = [...frameRow.slice(3, 6), 1];
	const color = interpolate(fromColor, toColor, cubicValue);

	const fromRotation = [0];
	const toRotation = [Math.floor(a(frameRow[6], 60, 360))];
	const rotation = interpolate(fromRotation, toRotation, cubicValue);
	const matrix = convertRotationToMatrix(rotation[0]);

	const strArray: string[] = [];
	for (let i = 0; i < color.length - 1; i++) {
		strArray.push(Math.round(color[i]).toString(16));
	}

	for (let i = 0; i < matrix.length; i++) {
		let rounded = Number(matrix[i].toFixed(2));
		if (rounded < 0) {
			rounded = -rounded;
		}
		const hexValue = floatToHex(rounded);
		if (hexValue.startsWith('.')) {
			strArray.push('0' + hexValue);
		} else if (hexValue) {
			strArray.push(hexValue);
		} else {
			strArray.push('0');
		}
	}

	strArray.push('0', '0');
	return strArray.join('').replace(/[.-]/g, '').toLowerCase();
}

function a(b: number, c: number, d: number): number {
	return (b * (d - c)) / 255 + c;
}

function b(a: number): number {
	return a % 2 === 1 ? -1 : 0;
}

function getCubicCurveValue(curves: number[], time: number): number {
	let startGradient = 0;
	let endGradient = 0;

	if (time <= 0) {
		if (curves[0] > 0) {
			startGradient = curves[1] / curves[0];
		} else if (curves[1] === 0 && curves[2] > 0) {
			startGradient = curves[3] / curves[2];
		}
		return startGradient * time;
	}

	if (time >= 1) {
		if (curves[2] < 1) {
			endGradient = (curves[3] - 1) / (curves[2] - 1);
		} else if (curves[2] === 1 && curves[0] < 1) {
			endGradient = (curves[1] - 1) / (curves[0] - 1);
		}
		return 1 + endGradient * (time - 1);
	}

	let start = 0;
	let end = 1;
	let mid = 0;

	while (start < end) {
		mid = (start + end) / 2;
		const xEst = calculateBezier(curves[0], curves[2], mid);
		if (Math.abs(time - xEst) < 0.00001) {
			return calculateBezier(curves[1], curves[3], mid);
		}
		if (xEst < time) {
			start = mid;
		} else {
			end = mid;
		}
	}

	return calculateBezier(curves[1], curves[3], mid);
}

function calculateBezier(a: number, b: number, m: number): number {
	return 3 * a * (1 - m) * (1 - m) * m + 3 * b * (1 - m) * m * m + m * m * m;
}

function interpolate(from: number[], to: number[], f: number): number[] {
	const out: number[] = [];
	for (let i = 0; i < from.length; i++) {
		out.push(from[i] * (1 - f) + to[i] * f);
	}
	return out;
}

function convertRotationToMatrix(degrees: number): number[] {
	const radians = (degrees * Math.PI) / 180;
	const c = Math.cos(radians);
	const s = Math.sin(radians);
	return [c, -s, s, c];
}

function floatToHex(x: number): string {
	const result: string[] = [];
	let quotient = Math.floor(x);
	let fraction = x - quotient;

	while (quotient > 0) {
		const remainder = quotient % 16;
		quotient = Math.floor(quotient / 16);

		if (remainder > 9) {
			result.unshift(String.fromCharCode(remainder + 55));
		} else {
			result.unshift(remainder.toString());
		}
	}

	if (fraction === 0) {
		return result.join('');
	}

	result.push('.');

	while (fraction > 0) {
		fraction *= 16;
		const integer = Math.floor(fraction);
		fraction -= integer;

		if (integer > 9) {
			result.push(String.fromCharCode(integer + 55));
		} else {
			result.push(integer.toString());
		}
	}

	return result.join('');
}

function xor(xorByte: number, data: Uint8Array): Uint8Array {
	return new Uint8Array([xorByte, ...data.map((v) => v ^ xorByte)]);
}

function encode(data: Uint8Array): string {
	return btoa(
		Array.from(data)
			.map((v) => String.fromCharCode(v))
			.join(''),
	).replaceAll('=', '');
}
