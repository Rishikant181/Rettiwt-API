// PACKAGES
import {
	Request,
	Args,
	EResourceType,
	ICursor as IRawCursor,
	ITweet as IRawTweet,
	IUser as IRawUser,
	ITimelineTweet,
	ITimelineUser,
	IResponse,
	EErrorCodes,
} from 'rettiwt-core';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import https, { Agent } from 'https';
import { AuthCredential, Auth } from 'rettiwt-auth';
import { HttpsProxyAgent } from 'https-proxy-agent';

// SERVICES
import { LogService } from './LogService';

// ENUMS
import { EHttpStatus } from '../../enums/HTTP';
import { EApiErrors } from '../../enums/ApiErrors';
import { ELogActions } from '../../enums/Logging';

// MODELS
import { RettiwtConfig } from '../../models/internal/RettiwtConfig';
import { CursoredData } from '../../models/public/CursoredData';
import { Tweet } from '../../models/public/Tweet';
import { User } from '../../models/public/User';

// HELPERS
import { findByFilter, findKeyByValue } from '../../helper/JsonUtils';

/**
 * The base service that handles all HTTP requests.
 *
 * @internal
 */
export class FetcherService {
	/** The credential to use for authenticating against Twitter API. */
	private cred?: AuthCredential;

	/** Whether the instance is authenticated or not. */
	private readonly isAuthenticated: boolean;

	/** The HTTPS Agent to use for requests to Twitter API. */
	private readonly httpsAgent: Agent;

	/** The log service instance to use to logging. */
	private readonly logger: LogService;

	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 */
	public constructor(config?: RettiwtConfig) {
		this.cred = config?.apiKey ? this.getAuthCredential(config.apiKey) : undefined;
		this.isAuthenticated = config?.apiKey ? true : false;
		this.httpsAgent = this.getHttpsAgent(config?.proxyUrl);
		this.logger = new LogService(config?.logging);
	}

	/**
	 * Returns an AuthCredential generated using the given API key.
	 *
	 * @param apiKey - The API key to use for authenticating.
	 * @returns The generated AuthCredential.
	 */
	private getAuthCredential(apiKey: string): AuthCredential {
		return new AuthCredential(apiKey.split(';'));
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
			resourceType != EResourceType.USER_DETAILS &&
			resourceType != EResourceType.USER_TWEETS &&
			this.isAuthenticated == false
		) {
			throw new Error(EApiErrors.RESOURCE_NOT_ALLOWED);
		}
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
	 * The middleware for handling any http error.
	 *
	 * @param res - The response object received.
	 * @returns The received response, if no HTTP errors are found.
	 * @throws An error if any HTTP-related error has occured.
	 */
	private handleHttpError(res: AxiosResponse<IResponse<unknown>>): AxiosResponse<IResponse<unknown>> {
		/**
		 * If the status code is not 200 =\> the HTTP request was not successful. hence throwing error
		 */
		if (res.status != 200 && res.status in EHttpStatus) {
			throw new Error(EHttpStatus[res.status]);
		}

		return res;
	}

	/**
	 * The middleware for handling any Twitter API-level errors.
	 *
	 * @param res - The response object received.
	 * @returns The received response, if no API errors are found.
	 * @throws An error if any API-related error has occured.
	 */
	private handleApiError(res: AxiosResponse<IResponse<unknown>>): AxiosResponse<IResponse<unknown>> {
		// If error exists
		if (res.data.errors && res.data.errors.length) {
			// Getting the error code
			const code: number = res.data.errors[0].code;

			// Getting the error message
			const message: string = EApiErrors[
				findKeyByValue(EErrorCodes, `${code}`) as keyof typeof EApiErrors
			] as string;

			// Throw the error
			throw new Error(message);
		}

		return res;
	}

	/**
	 * Makes an HTTP request according to the given parameters.
	 *
	 * @param config - The request configuration.
	 * @returns The response received.
	 */
	private async request(config: Request): Promise<AxiosResponse<IResponse<unknown>>> {
		// Checking authorization for the requested resource
		this.checkAuthorization(config.endpoint);

		// If not authenticated, use guest authentication
		this.cred = this.cred ?? (await new Auth().getGuestCredential());

		/**
		 * Creating axios request configuration from the input configuration.
		 */
		const axiosRequest: AxiosRequestConfig = {
			url: config.url,
			method: config.type,
			data: config.payload,
			headers: JSON.parse(JSON.stringify(this.cred.toHeader())) as AxiosRequestHeaders,
			httpsAgent: this.httpsAgent,
		};

		/**
		 * After making the request, the response is then passed to HTTP error handling middleware for HTTP error handling.
		 */
		return await axios<IResponse<unknown>>(axiosRequest)
			.then((res) => this.handleHttpError(res))
			.then((res) => this.handleApiError(res));
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
		} else if (type == EResourceType.USER_DETAILS || type == EResourceType.USER_DETAILS_BY_ID) {
			required = findByFilter<IRawUser>(data, '__typename', 'User');
		} else if (
			type == EResourceType.TWEET_SEARCH ||
			type == EResourceType.USER_LIKES ||
			type == EResourceType.LIST_TWEETS ||
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
			type == EResourceType.USER_FOLLOWING
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
	 * Fetches the requested resource from Twitter and returns it after processing.
	 *
	 * @param resourceType - The type of resource to fetch.
	 * @param args - Resource specific arguments.
	 * @typeParam OutType - The type of deserialized data returned.
	 * @returns The processed data requested from Twitter.
	 */
	protected async fetch<OutType extends Tweet | User>(
		resourceType: EResourceType,
		args: Args,
	): Promise<CursoredData<OutType>> {
		// Logging
		this.logger.log(ELogActions.FETCH, { resourceType: resourceType, args: args });

		// Preparing the HTTP request
		const request: Request = new Request(resourceType, args);

		// Getting the raw data
		const res = await this.request(request).then((res) => res.data);

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
	protected async post(resourceType: EResourceType, args: Args): Promise<boolean> {
		// Logging
		this.logger.log(ELogActions.POST, { resourceType: resourceType, args: args });

		// Preparing the HTTP request
		const request: Request = new Request(resourceType, args);

		// Posting the data
		await this.request(request);

		return true;
	}
}
