import { Agent } from 'https';

import { HttpsProxyAgent } from 'https-proxy-agent';

import { AuthService } from '../services/internal/AuthService';
import { IErrorHandler } from '../types/ErrorHandler';
import { IRettiwtConfig } from '../types/RettiwtConfig';

/**
 * The default headers.
 *
 * @public
 */
const DefaultHeaders = {
	/* eslint-disable @typescript-eslint/naming-convention */

	Authority: 'x.com',
	'Accept-Language': 'en-US,en;q=0.9',
	'Cache-Control': 'no-cache',
	Referer: 'https://x.com',
	'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:144.0) Gecko/20100101 Firefox/144.0',
	'X-Twitter-Active-User': 'yes',
	'X-Twitter-Client-Language': 'en',

	/* eslint-enable @typescript-eslint/naming-convention */
};

/**
 * The configuration for initializing a new Rettiwt instance.
 *
 * @public
 */
export class RettiwtConfig implements IRettiwtConfig {
	// Parameters for internal use
	private _apiKey?: string;
	private _headers: { [key: string]: string };
	private _httpsAgent: Agent;
	private _proxy: boolean | null = null;
	private _userId: string | undefined;

	// Parameters that can be set once, upon initialization
	public readonly delay?: number | (() => number | Promise<number>);
	public readonly errorHandler?: IErrorHandler;
	public readonly logging?: boolean;
	public readonly maxRetries: number;
	public readonly timeout?: number;

	/**
	 * @param config - The config for Rettiwt of type {@link IRettiwtConfig}.
	 */
	public constructor(config?: IRettiwtConfig) {
		this._apiKey = config?.apiKey;
		this._httpsAgent = config?.proxyUrl ? new HttpsProxyAgent(config?.proxyUrl) : new Agent();
		// Proxy logic: user explicit value > httpsAgent set > default true
		if (config?.proxy !== undefined) {
			this._proxy = config.proxy;
		}
		this._userId = config?.apiKey ? AuthService.getUserId(config?.apiKey) : undefined;
		this.delay = config?.delay ?? 0;
		this.maxRetries = config?.maxRetries ?? 0;
		this.errorHandler = config?.errorHandler;
		this.logging = config?.logging;
		this.timeout = config?.timeout;
		this.apiKey = config?.apiKey;
		this._headers = {
			...DefaultHeaders,
			...config?.headers,
		};
	}

	public get apiKey(): string | undefined {
		return this._apiKey;
	}

	public get headers(): { [key: string]: string } {
		return this._headers;
	}

	/** The HTTPS agent instance to use. */
	public get httpsAgent(): Agent {
		return this._httpsAgent;
	}

	/** Whether to use axios built-in proxy. */
	public get proxy(): false | undefined {
		// User explicitly set proxy
		if (this._proxy !== null) {
			return this._proxy ? undefined : false;
		}
		// httpsAgent set via proxyUrl → proxy should be false
		if (this._httpsAgent instanceof HttpsProxyAgent) {
			return false;
		}
		// Default: let axios use its default (env proxy)
		return undefined;
	}

	/** The ID of the user associated with the API key, if any. */
	public get userId(): string | undefined {
		return this._userId;
	}

	public set apiKey(apiKey: string | undefined) {
		this._apiKey = apiKey;
		this._userId = apiKey ? AuthService.getUserId(apiKey) : undefined;
	}

	public set headers(headers: { [key: string]: string } | undefined) {
		this._headers = {
			...DefaultHeaders,
			...headers,
		};
	}

	public set proxyUrl(proxyUrl: URL | undefined) {
		this._httpsAgent = proxyUrl ? new HttpsProxyAgent(proxyUrl) : new Agent();
	}

	public set proxy(proxy: boolean | undefined) {
		this._proxy = proxy ?? null;
	}
}

export { DefaultHeaders as DefaultRettiwtHeaders };
