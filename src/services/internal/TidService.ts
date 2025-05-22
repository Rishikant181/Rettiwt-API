import axios from 'axios';
import * as htmlParser from 'node-html-parser';

import { ELogActions } from '../../enums/Logging';

import { calculateClientTransactionIdHeader } from '../../helper/TidUtils';

import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ITidDynamicArgs } from '../../types/auth/TidDynamicArgs';
import { ITidProvider } from '../../types/auth/TidProvider';

import { LogService } from './LogService';

/**
 * Handles transaction ID generation for requests to Twitter.
 *
 * @internal
 */
export class TidService implements ITidProvider {
	private readonly _cdnUrl: string;
	private readonly _config: RettiwtConfig;
	private _dynamicArgs?: ITidDynamicArgs;

	/**
	 * @param config - The config for Rettiwt.
	 */
	public constructor(config: RettiwtConfig) {
		this._cdnUrl = 'https://abs.twimg.com/responsive-web/client-web';
		this._config = config;
	}

	/**
	 * Fetches the dynamic args embedded in the homepage.
	 *
	 * @returns The new dynamic args.
	 */
	private async getDynamicArgs(): Promise<ITidDynamicArgs> {
		const html = await this.getHomepageHtml();
		const root = htmlParser.parse(html);
		const keyElement = root.querySelector("[name='twitter-site-verification']");
		const frameElements = root.querySelectorAll("[id^='loading-x-anim']");

		return {
			verificationKey: keyElement?.getAttribute('content') ?? '',
			frames: frameElements.map((el) => this.parseFrameElement(el)),
			indices: await this.getKeyBytesIndices(html),
		};
	}

	/**
	 * Fetches the HTML content of Twitter's homepage.
	 *
	 * @returns The stringified HTML content of the homepage.
	 */
	private async getHomepageHtml(): Promise<string> {
		const response = await axios.get<string>('https://x.com', {
			headers: this._config.headers,
			httpAgent: this._config.httpsAgent,
			httpsAgent: this._config.httpsAgent,
		});

		return response.data;
	}

	private async getKeyBytesIndices(html: string): Promise<number[]> {
		const ondemandFileMatch = html.match(/ondemand\.s":"([^"]+)"/);
		if (!ondemandFileMatch || !ondemandFileMatch[1]) {
			LogService.log(ELogActions.WARNING, { message: 'ondemand.s file not found' });

			return [0, 0, 0, 0];
		}

		const onDemandFileHash = ondemandFileMatch ? ondemandFileMatch[1] : '';
		const response = await axios.get<string>(`${this._cdnUrl}/ondemand.s.${onDemandFileHash}a.js`, {
			httpAgent: this._config.httpsAgent,
			httpsAgent: this._config.httpsAgent,
		});
		const match = response.data.matchAll(/(\(\w\[(\d{1,2})],\s*16\))+?/gm);

		return Array.from(match).map((m) => Number(m[2]));
	}

	private parseFrameElement(element: htmlParser.HTMLElement): number[][] {
		const pathElement = element.children[0].children[1];
		const value = pathElement.getAttribute('d');
		if (!value) {
			return [[]];
		}

		const rawFrames = value.substring(9).split('C');

		return rawFrames.map((str) => str.replaceAll(/\D+/g, ' ').trim().split(' ')).map((arr) => arr.map(Number));
	}

	/**
	 * Generate an `x-client-transaction-id` for the specific URL method and path.
	 *
	 * @param method - The target method.
	 * @param path - The target path.
	 *
	 * @returns The specific `x-client-transaction-id` token.
	 */
	public async generate(method: string, path: string): Promise<string | undefined> {
		try {
			// Refreshing dynamic args
			await this.refreshDynamicArgs();

			// If dynamic args weren't obtained, skip with error
			if (!this._dynamicArgs) {
				throw new Error('Dynamic args failed to generate');
			}

			const { verificationKey, frames, indices } = this._dynamicArgs;

			return calculateClientTransactionIdHeader({
				keyword: 'obfiowerehiring',
				method: method,
				path: path,
				verificationKey: verificationKey,
				frames: frames,
				indices: indices,
				extraByte: 3,
			});
		} catch (err) {
			LogService.log(ELogActions.WARNING, {
				message: 'Failed to generated transaction token. Request may or may not work',
				error: err,
			});

			return;
		}
	}

	/**
	 * Refreshes the dynamic args from the homepage.
	 */
	public async refreshDynamicArgs(): Promise<void> {
		this._dynamicArgs = await this.getDynamicArgs();
	}
}
