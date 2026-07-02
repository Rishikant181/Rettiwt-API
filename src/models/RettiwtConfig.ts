import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';

import { AxiosInstance, AxiosProxyConfig, AxiosRequestConfig, AxiosResponse, create } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

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
	private _instance: AxiosInstance;
	private _proxy?: AxiosProxyConfig | string | null;
	private _userId: string | undefined;

	// Parameters that can be set once, upon initialization
	public readonly delay?: number | (() => number | Promise<number>);
	public readonly errorHandler?: IErrorHandler;
	public readonly fetch?: typeof fetch;
	public readonly logging?: boolean;
	public readonly maxRetries: number;
	public readonly responseMiddleware?: (response: AxiosResponse) => void | Promise<void>;
	public readonly timeout?: number;

	/**
	 * @param config - The config for Rettiwt of type {@link IRettiwtConfig}.
	 */
	public constructor(config?: IRettiwtConfig) {
		this._apiKey = config?.apiKey;
		this._proxy = config?.proxy;
		this._userId = config?.apiKey ? AuthService.getUserId(config?.apiKey) : undefined;
		this.delay = config?.delay ?? 0;
		this.fetch = config?.fetch;
		this.maxRetries = config?.maxRetries ?? 0;
		this.errorHandler = config?.errorHandler;
		this.responseMiddleware = config?.responseMiddleware;
		this.logging = config?.logging;
		this.timeout = config?.timeout;
		this.apiKey = config?.apiKey;
		this._headers = {
			...DefaultHeaders,
			...config?.headers,
		};

		// Initializing the HTTP(S) agent(s)
		const agents = this._getRequestAgents(config?.proxy);
		this._httpAgent = agents.httpAgent;
		this._httpsAgent = agents.httpsAgent;

		// Creating the shared Axios instance
		this._instance = this._createAxiosInstance();
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

	/**
	 * The shared HTTP client instance used for all HTTP requests.
	 *
	 * @remarks The instance is configured with the proxy/adapter/timeout/fetch settings
	 * from this config, and is updated when the `proxy` is changed dynamically.
	 */
	public get instance(): AxiosInstance {
		return this._instance;
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
		// Update HTTP(s) agents
		const agents = this._getRequestAgents(proxy);
		this._httpAgent = agents.httpAgent;
		this._httpsAgent = agents.httpsAgent;

		this._proxy = proxy;

		// Update the shared instance defaults
		this._instance.defaults.httpAgent = this._httpAgent;
		this._instance.defaults.httpsAgent = this._httpsAgent;
		this._instance.defaults.proxy = this.axiosProxyConfig;
	}

	/**
	 * Creates the shared HTTP client instance with the current configuration.
	 *
	 * @returns The configured Axios instance.
	 */
	private _createAxiosInstance(): AxiosInstance {
		const config: AxiosRequestConfig = {
			httpAgent: this._httpAgent,
			httpsAgent: this._httpsAgent,
			proxy: this.axiosProxyConfig,
		};

		if (this.fetch !== undefined) {
			config.adapter = 'fetch';
			config.env = { fetch: this.fetch };
		}

		if (this.timeout !== undefined) {
			config.timeout = this.timeout;
		}

		return create(config);
	}

	/**
	 * Returns the appropriate HTTP(s) agents based on the type of proxy config.
	 *
	 * @param proxy - The proxy configuration.
	 *
	 * @returns The HTTP(s) agents.
	 */
	private _getRequestAgents(proxy?: AxiosProxyConfig | string | null): {
		httpAgent: HttpAgent;
		httpsAgent: HttpsAgent;
	} {
		let httpAgent: HttpAgent | undefined;
		let httpsAgent: HttpsAgent | undefined;

		if (typeof proxy === 'string' && (proxy.startsWith('http://') || proxy.startsWith('https://'))) {
			httpAgent = new HttpProxyAgent(proxy);
			httpsAgent = new HttpsProxyAgent(proxy);
		} else if (typeof proxy === 'string' && proxy.startsWith('socks')) {
			httpAgent = new SocksProxyAgent(proxy);
			httpsAgent = new SocksProxyAgent(proxy);
		} else {
			httpAgent = new HttpAgent();
			httpsAgent = new HttpsAgent();
		}

		return {
			httpAgent: httpAgent,
			httpsAgent: httpsAgent,
		};
	}
}

export { DefaultHeaders as DefaultRettiwtHeaders };
