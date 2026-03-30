import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';

import { AxiosProxyConfig } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
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
	private _httpAgent: HttpAgent;
	private _httpsAgent: HttpsAgent;
	private _proxy?: AxiosProxyConfig | string | null;
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
		this._proxy = config?.proxy;
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

		// Initializing the HTTP(S) agent(s)
		if (typeof config?.proxy === 'string') {
			this._httpAgent = new HttpProxyAgent(config.proxy);
			this._httpsAgent = new HttpsProxyAgent(config.proxy);
		} else {
			this._httpAgent = new HttpAgent();
			this._httpsAgent = new HttpsAgent();
		}
	}

	public get apiKey(): string | undefined {
		return this._apiKey;
	}

	/**
	 * The Axios proxy configuration to use.
	 *
	 * @remarks
	 * <br>
	 * - If `proxy` is set, Axios' built-in env-variable-based proxy is disabled.
	 */
	public get axiosProxyConfig(): AxiosProxyConfig | false | undefined {
		// If user explicitly set to null or a proxy URL, disable Axios' built-in proxy
		if (this._proxy === null || typeof this._proxy === 'string') {
			return false;
		}
		// If user has set an AxiosProxyConfig, use that
		if (this._proxy !== undefined) {
			return this._proxy;
		}

		// Default: Let axios use it's built-in env-variable-based proxy.
		return undefined;
	}

	public get headers(): { [key: string]: string } {
		return this._headers;
	}

	/** The HTTP agent instance to use. */
	public get httpAgent(): HttpAgent {
		return this._httpAgent;
	}

	/** The HTTPS agent instance to use. */
	public get httpsAgent(): HttpsAgent {
		return this._httpsAgent;
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

	public set proxy(proxy: AxiosProxyConfig | string | null | undefined) {
		// Update HTTPs agent
		if (typeof proxy === 'string') {
			this._httpAgent = new HttpProxyAgent(proxy);
			this._httpsAgent = new HttpsProxyAgent(proxy);
		} else {
			this._httpAgent = new HttpAgent();
			this._httpsAgent = new HttpsAgent();
		}

		this._proxy = proxy;
	}
}

export { DefaultHeaders as DefaultRettiwtHeaders };
