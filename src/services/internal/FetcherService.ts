import { statSync } from 'fs';
import https, { Agent } from 'https';

import axios, { AxiosResponse } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Auth, AuthCredential } from 'rettiwt-auth';
import { IInitializeMediaUploadResponse, IResponse } from 'rettiwt-core';

import { allowGuestAuthentication } from '../../collections/Authentication';
import { requests } from '../../collections/Requests';
import { returnStatus, returnTweet, returnTweets, returnUser, returnUsers } from '../../collections/Resources';
import { postResponseValidators } from '../../collections/Validators';
import { EApiErrors } from '../../enums/Api';
import { EBaseType } from '../../enums/Data';
import { ELogActions } from '../../enums/Logging';
import { EResourceType } from '../../enums/Resource';
import { FetchArgs } from '../../models/args/internal/FetchArgs';
import { PostArgs } from '../../models/args/internal/PostArgs';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IErrorHandler } from '../../types/ErrorHandler';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

import { FetchReturnType, PostReturnType } from '../../types/ReturnTypes';

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
	 * Extracts and deserializes the required data based on the requested resource.
	 *
	 * @param data - The raw response data from which extraction is to be done.
	 * @param resource - The requested resource.
	 * @returns The extracted and deserialized data.
	 */
	private extract<T>(response: IResponse<unknown>, resource: EResourceType): T | undefined {
		// For resources that return a single tweet
		if (returnTweet.includes(resource)) {
			return Tweet.single(response) as T;
		}
		// For resources that return a single user
		else if (returnUser.includes(resource)) {
			return User.single(response) as T;
		}
		// For resources that return a list of tweets
		else if (returnTweets.includes(resource)) {
			return new CursoredData<Tweet>(response, EBaseType.TWEET) as T;
		}
		// For resources that return a list of users
		else if (returnUsers.includes(resource)) {
			return new CursoredData<User>(response, EBaseType.USER) as T;
		}
		// For resources that return a status
		else if (returnStatus.includes(resource)) {
			return postResponseValidators[resource]?.(response) as T;
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
	 * Get the HttpsAgent based on whether a proxy is used or not.
	 *
	 * @param proxyUrl - Optional URL with proxy configuration to use for requests to Twitter API.
	 * @returns The HttpsAgent to use.
	 */
	private getHttpsAgent(proxyUrl?: URL): Agent {
		if (proxyUrl) {
			return new HttpsProxyAgent(proxyUrl);
		}

		return new https.Agent();
	}

	/**
	 * Makes an HTTP request according to the given parameters.
	 *
	 * @typeParam T - The type of the returned response data.
	 * @param resource - The requested resource.
	 * @param config - The request configuration.
	 * @returns The response received.
	 */
	private async request<T>(resource: EResourceType, args: FetchArgs | PostArgs): Promise<AxiosResponse<T>> {
		// Checking authorization for the requested resource
		this.checkAuthorization(resource);

		// If not authenticated, use guest authentication
		this.cred = this.cred ?? (await new Auth({ proxyUrl: this.authProxyUrl }).getGuestCredential());

		// Getting request configuration
		const config = requests[resource](args);

		// Setting additional request parameters
		config.headers = { ...config.headers, ...this.cred.toHeader() };
		config.httpAgent = this.httpsAgent;
		config.httpsAgent = this.httpsAgent;
		config.timeout = this.timeout;

		/**
		 * If Axios request results in an error, catch it and rethrow a more specific error.
		 */
		return await axios<T>(config).catch((error: unknown) => {
			this.errorHandler.handle(error);

			throw error;
		});
	}

	/**
	 * Fetches the requested resource from Twitter and returns it after deserialization.
	 *
	 * @typeParam T - The type of data returned.
	 * @param resource - The resource to fetch.
	 * @param args - Resource specific arguments.
	 * @returns The deserialized data requested from Twitter.
	 */
	protected async fetchResource<T extends FetchReturnType>(
		resource: EResourceType,
		args: FetchArgs,
	): Promise<T | undefined> {
		// Logging
		this.logger.log(ELogActions.FETCH, { resource: resource, args: args });

		// Validating args
		args = new FetchArgs(resource, args);

		// Getting the raw data
		const res = await this.request<IResponse<unknown>>(resource, args).then((res) => res.data);

		// Extracting and deserializing data
		const extractedData = this.extract<T>(res, resource);

		return extractedData;
	}

	/**
	 * Posts the requested resource to Twitter and returns the response.
	 *
	 * @typeParam T - The type of data returned.
	 * @param resource - The resource to post.
	 * @param args - Resource specific arguments.
	 * @returns The deserialized response.
	 */
	protected async postResource<T extends PostReturnType>(resourceType: EResourceType, args: PostArgs): Promise<T> {
		// Logging
		this.logger.log(ELogActions.POST, { resourceType: resourceType, args: args });

		// Validating args
		args = new PostArgs(resourceType, args);

		// Posting the data
		const res = await this.request<unknown>(resourceType, args);

		// Extracting and deserializing data
		const extractedData = this.extract<T>(res, resourceType) as T;

		return extractedData;
	}

	/**
	 * Uploads the given media file to Twitter
	 *
	 * @param media - The path or ArrayBuffer to the media file to upload.
	 * @returns The id of the uploaded media.
	 */
	protected async uploadMedia(media: string | ArrayBuffer): Promise<string> {
		// INITIALIZE

		// Logging
		this.logger.log(ELogActions.UPLOAD, { step: EResourceType.MEDIA_UPLOAD_INITIALIZE });

		// Getting media size
		const size = typeof media == 'string' ? statSync(media).size : media.byteLength;

		// Validating args
		let args = new PostArgs(EResourceType.MEDIA_UPLOAD_INITIALIZE, { upload: { size: size } });

		const id: string = (
			await this.request<IInitializeMediaUploadResponse>(EResourceType.MEDIA_UPLOAD_INITIALIZE, args)
		).data.media_id_string;

		// APPEND

		// Logging
		this.logger.log(ELogActions.UPLOAD, { step: EResourceType.MEDIA_UPLOAD_APPEND });

		// Validating args
		args = new PostArgs(EResourceType.MEDIA_UPLOAD_APPEND, { upload: { id: id, media: media } });

		await this.request<unknown>(EResourceType.MEDIA_UPLOAD_APPEND, args);

		// FINALIZE

		// Logging
		this.logger.log(ELogActions.UPLOAD, { step: EResourceType.MEDIA_UPLOAD_FINALIZE });

		// Validating args
		args = new PostArgs(EResourceType.MEDIA_UPLOAD_FINALIZE, { upload: { id: id } });

		await this.request<unknown>(EResourceType.MEDIA_UPLOAD_FINALIZE, args);

		return id;
	}
}
