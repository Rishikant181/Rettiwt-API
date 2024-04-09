import https, { Agent } from 'https';

import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Auth, AuthCredential } from 'rettiwt-auth';

import { extractors } from '../../collections/Extractors';
import { allowGuestAuthentication, fetchResources, postResources } from '../../collections/Groups';
import { requests } from '../../collections/Requests';
import { EApiErrors } from '../../enums/Api';
import { ELogActions } from '../../enums/Logging';
import { EResourceType } from '../../enums/Resource';
import { FetchArgs } from '../../models/args/FetchArgs';
import { PostArgs } from '../../models/args/PostArgs';
import { IErrorHandler } from '../../types/ErrorHandler';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

import { AllReturnTypes } from '../../types/ReturnTypes';

import { ErrorService } from './ErrorService';
import { LogService } from './LogService';

/**
 * The base service that handles all HTTP requests.
 *
 * @internal
 */
export class FetcherService {
	/** The service used to handle HTTP and API errors */
	private readonly errorHandler: IErrorHandler;

	/** The HTTPS Agent to use for requests to Twitter API. */
	private readonly httpsAgent: Agent;

	/** Whether the instance is authenticated or not. */
	private readonly isAuthenticated: boolean;

	/** The log service instance to use to logging. */
	private readonly logger: LogService;

	/** The max wait time for a response. */
	private readonly timeout: number;

	/** The credential to use for authenticating against Twitter API. */
	private cred?: AuthCredential;

	/** The URL to the proxy server to use for authentication. */
	protected readonly authProxyUrl?: URL;

	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 */
	public constructor(config?: IRettiwtConfig) {
		// If API key is supplied
		if (config?.apiKey) {
			this.cred = this.getAuthCredential(config.apiKey);
		}
		// If guest key is supplied
		else if (config?.guestKey) {
			this.cred = this.getGuestCredential(config.guestKey);
		}
		// If no key is supplied
		else {
			this.cred = undefined;
		}
		this.isAuthenticated = config?.apiKey ? true : false;
		this.authProxyUrl = config?.authProxyUrl ?? config?.proxyUrl;
		this.httpsAgent = this.getHttpsAgent(config?.proxyUrl);
		this.timeout = config?.timeout ?? 0;
		this.logger = new LogService(config?.logging);
		this.errorHandler = config?.errorHandler ?? new ErrorService();
	}

	/**
	 * Checks the authorization status based on the requested resource.
	 *
	 * @param resource - The requested resource.
	 * @throws An error if not authorized to access the requested resource.
	 */
	private checkAuthorization(resource: EResourceType): void {
		// Logging
		this.logger.log(ELogActions.AUTHORIZATION, { authenticated: this.isAuthenticated });

		// Checking authorization status
		if (!allowGuestAuthentication.includes(resource) && this.isAuthenticated == false) {
			throw new Error(EApiErrors.RESOURCE_NOT_ALLOWED);
		}
	}

	/**
	 * Returns an AuthCredential generated using the given API key.
	 *
	 * @param apiKey - The API key to use for authenticating.
	 * @returns The generated AuthCredential.
	 */
	private getAuthCredential(apiKey: string): AuthCredential {
		// Converting apiKey from base64 to string
		apiKey = Buffer.from(apiKey, 'base64').toString('ascii');

		return new AuthCredential(apiKey.split(';'));
	}

	/**
	 * Returns an AuthCredential generated using the given guest key.
	 *
	 * @param guestKey - The guest key to use for authenticating as guest.
	 * @returns The generated AuthCredential.
	 */
	private getGuestCredential(guestKey: string): AuthCredential {
		return new AuthCredential(undefined, guestKey);
	}

	/**
	 * Gets the https agent based on whether a proxy is used or not.
	 *
	 * @param proxyUrl - Optional URL with proxy configuration to use for requests to Twitter API.
	 * @returns The https agent to use.
	 */
	private getHttpsAgent(proxyUrl?: URL): Agent {
		if (proxyUrl) {
			return new HttpsProxyAgent(proxyUrl);
		}

		return new https.Agent();
	}

	/**
	 * Extracts and deserializes the required data based on the requested resource.
	 *
	 * @param data - The raw response data from which extraction is to be done.
	 * @param resource - The requested resource.
	 * @returns The extracted and deserialized data.
	 */
	protected extract<T extends AllReturnTypes>(
		response: NonNullable<unknown>,
		resource: EResourceType,
	): T | undefined {
		return extractors[resource](response) as T;
	}

	/**
	 * Makes an HTTP request according to the given parameters.
	 *
	 * @typeParam T - The type of the returned response data.
	 * @param resource - The requested resource.
	 * @param config - The request configuration.
	 * @returns The raw data response received.
	 */
	public async request<T>(resource: EResourceType, args: FetchArgs | PostArgs): Promise<T> {
		// Checking authorization for the requested resource
		this.checkAuthorization(resource);

		// If not authenticated, use guest authentication
		this.cred = this.cred ?? (await new Auth({ proxyUrl: this.authProxyUrl }).getGuestCredential());

		// Validating args
		if (fetchResources.includes(resource)) {
			args = new FetchArgs(resource, args);
		} else if (postResources.includes(resource)) {
			args = new PostArgs(resource, args);
		}

		// Getting request configuration
		const config = requests[resource](args);

		// Setting additional request parameters
		config.headers = { ...config.headers, ...this.cred.toHeader() };
		config.httpAgent = this.httpsAgent;
		config.httpsAgent = this.httpsAgent;
		config.timeout = this.timeout;

		// Sending the request
		try {
			// Returning the reponse body
			return (await axios<T>(config)).data;
		} catch (error) {
			// If error, delegate handling to error handler
			this.errorHandler.handle(error);
			throw error;
		}
	}
}
