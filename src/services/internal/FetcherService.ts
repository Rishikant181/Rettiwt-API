import { statSync } from 'fs';
import https, { Agent } from 'https';

import axios, { AxiosResponse } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Auth, AuthCredential } from 'rettiwt-auth';
import {
	IInitializeMediaUploadResponse,
	ICursor as IRawCursor,
	ITweet as IRawTweet,
	IUser as IRawUser,
	IResponse,
	ITimelineTweet,
	ITimelineUser,
} from 'rettiwt-core';

import { requests } from '../../collections/Requests';
import { EApiErrors } from '../../enums/Api';
import { ELogActions } from '../../enums/Logging';
import { EResourceType } from '../../enums/Resource';
import { findByFilter } from '../../helper/JsonUtils';
import { FetchArgs } from '../../models/args/internal/FetchArgs';
import { PostArgs } from '../../models/args/internal/PostArgs';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { User } from '../../models/data/User';
import { IErrorHandler } from '../../types/ErrorHandler';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

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
	 * @param resourceType - The type of resource to fetch.
	 * @throws An error if not authorized to access the requested resource.
	 */
	private checkAuthorization(resourceType: EResourceType): void {
		// Logging
		this.logger.log(ELogActions.AUTHORIZATION, { authenticated: this.isAuthenticated });

		// Checking authorization status
		if (
			resourceType != EResourceType.TWEET_DETAILS &&
			resourceType != EResourceType.USER_DETAILS_BY_USERNAME &&
			resourceType != EResourceType.USER_TWEETS &&
			this.isAuthenticated == false
		) {
			throw new Error(EApiErrors.RESOURCE_NOT_ALLOWED);
		}
	}

	/**
	 * Deserializes the extracted data into a cursored list.
	 *
	 * @param extractedData - The list of extracted data.
	 * @param next - The cursor to the next batch of data.
	 * @returns The cursored data object.
	 */
	private deserializeData<OutType extends Tweet | User>(
		extractedData: (IRawTweet | IRawUser)[] = [],
		next: string = '',
	): CursoredData<OutType> {
		/** The list of deserialized data. */
		const deserializedList: OutType[] = [];

		// Deserializing the extracted raw data and storing it in the list
		for (const item of extractedData) {
			// If the item is a valid raw tweet
			if (item && item.__typename == 'Tweet' && item.rest_id) {
				// Logging
				this.logger.log(ELogActions.DESERIALIZE, { type: item.__typename, id: item.rest_id });

				// Adding deserialized Tweet to list
				deserializedList.push(new Tweet(item as IRawTweet) as OutType);
			}
			// If the item is a valid raw user
			else if (item && item.__typename == 'User' && item.rest_id && (item as IRawUser).id) {
				// Logging
				this.logger.log(ELogActions.DESERIALIZE, { type: item.__typename, id: item.rest_id });

				// Adding deserialized User to list
				deserializedList.push(new User(item as IRawUser) as OutType);
			}
		}

		return new CursoredData<OutType>(deserializedList, next);
	}

	/**
	 * Extracts the required data based on the type of resource passed as argument.
	 *
	 * @param data - The data from which extraction is to be done.
	 * @param type - The type of data to extract.
	 * @returns The extracted data.
	 */
	private extractData(
		data: NonNullable<unknown>,
		type: EResourceType,
	): {
		/** The required extracted data. */
		required: (IRawTweet | IRawUser)[];

		/** The cursor string to the next batch of data. */
		next: string;
	} {
		/**
		 * The required extracted data.
		 */
		let required: IRawTweet[] | IRawUser[] = [];

		if (type == EResourceType.TWEET_DETAILS) {
			required = findByFilter<IRawTweet>(data, '__typename', 'Tweet');
		} else if (type == EResourceType.USER_DETAILS_BY_USERNAME || type == EResourceType.USER_DETAILS_BY_ID) {
			required = findByFilter<IRawUser>(data, '__typename', 'User');
		} else if (
			type == EResourceType.TWEET_SEARCH ||
			type == EResourceType.USER_LIKES ||
			type == EResourceType.LIST_TWEETS ||
			type == EResourceType.USER_HIGHLIGHTS ||
			type == EResourceType.USER_MEDIA ||
			type == EResourceType.USER_TWEETS ||
			type == EResourceType.USER_TWEETS_AND_REPLIES
		) {
			required = findByFilter<ITimelineTweet>(data, '__typename', 'TimelineTweet').map(
				(item) => item.tweet_results.result,
			);
		} else if (
			type == EResourceType.TWEET_FAVORITERS ||
			type == EResourceType.TWEET_RETWEETERS ||
			type == EResourceType.USER_FOLLOWERS ||
			type == EResourceType.USER_FOLLOWING ||
			type == EResourceType.USER_SUBSCRIPTIONS
		) {
			required = findByFilter<ITimelineUser>(data, '__typename', 'TimelineUser').map(
				(item) => item.user_results.result,
			);
		}

		return {
			required: required,
			next: findByFilter<IRawCursor>(data, 'cursorType', 'Bottom')[0]?.value,
		};
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
	 * Gets the HttpsAgent based on whether a proxy is used or not.
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
	 * @typeParam ResType - The type of the returned response data.
	 * @param resourceType - The type of resource to fetch.
	 * @param config - The request configuration.
	 * @returns The response received.
	 */
	private async request<ResType>(
		resourceType: EResourceType,
		args: FetchArgs | PostArgs,
	): Promise<AxiosResponse<ResType>> {
		// Checking authorization for the requested resource
		this.checkAuthorization(resourceType);

		// If not authenticated, use guest authentication
		this.cred = this.cred ?? (await new Auth({ proxyUrl: this.authProxyUrl }).getGuestCredential());

		// Getting request configuration
		const config = requests[resourceType](args);

		// Setting additional request parameters
		config.headers = { ...config.headers, ...this.cred.toHeader() };
		config.httpAgent = this.httpsAgent;
		config.httpsAgent = this.httpsAgent;
		config.timeout = this.timeout;

		/**
		 * If Axios request results in an error, catch it and rethrow a more specific error.
		 */
		return await axios<ResType>(config).catch((error: unknown) => {
			this.errorHandler.handle(error);

			throw error;
		});
	}

	/**
	 * Fetches the requested resource from Twitter and returns it after processing.
	 *
	 * @param resourceType - The type of resource to fetch.
	 * @param args - Resource specific arguments.
	 * @typeParam OutType - The type of deserialized data returned.
	 * @returns The processed data requested from Twitter.
	 */
	protected async fetchResource<OutType extends Tweet | User>(
		resourceType: EResourceType,
		args: FetchArgs,
	): Promise<CursoredData<OutType>> {
		// Logging
		this.logger.log(ELogActions.FETCH, { resourceType: resourceType, args: args });

		// Validating args
		args = new FetchArgs(resourceType, args);

		// Getting the raw data
		const res = await this.request<IResponse<unknown>>(resourceType, args).then((res) => res.data);

		// Extracting data
		const extractedData = this.extractData(res, resourceType);

		// Deserializing data
		const deserializedData = this.deserializeData<OutType>(extractedData.required, extractedData.next);

		return deserializedData;
	}

	/**
	 * Posts the requested resource to Twitter and returns the response.
	 *
	 * @param resourceType - The type of resource to post.
	 * @param args - Resource specific arguments.
	 * @returns Whether posting was successful or not.
	 */
	protected async postResource(resourceType: EResourceType, args: PostArgs): Promise<boolean> {
		// Logging
		this.logger.log(ELogActions.POST, { resourceType: resourceType, args: args });

		// Validating args
		args = new PostArgs(resourceType, args);

		// Posting the data
		await this.request<unknown>(resourceType, args);

		return true;
	}

	/**
	 * Uploads the given media file to Twitter
	 *
	 * @param media - The path or ArrayBuffer to the media file to upload.
	 * @returns The id of the uploaded media.
	 */
	protected async upload(media: string | ArrayBuffer): Promise<string> {
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
