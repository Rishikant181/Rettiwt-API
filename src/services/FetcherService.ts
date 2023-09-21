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
import { AuthCredential } from 'rettiwt-auth';
import { HttpsProxyAgent } from 'https-proxy-agent';

// ENUMS
import { EHttpStatus } from '../enums/HTTP';
import { EApiErrors } from '../enums/ApiErrors';

// MODELS
import { CursoredData } from '../models/CursoredData';
import { Tweet } from '../models/Tweet';
import { User } from '../models/User';

// HELPERS
import { findByFilter, findKeyByValue } from '../helper/JsonUtils';

/**
 * The base service that handles all HTTP requests.
 *
 * @internal
 */
export class FetcherService {
	/** The credential to use for authenticating against Twitter API. */
	private cred: AuthCredential;

	/** The HTTPS Agent to use for requests to Twitter API. */
	private readonly httpsAgent: Agent;

	/**
	 * @param apiKey - The apiKey (cookie) to use for authenticating Rettiwt against Twitter API.
	 * @param proxyUrl - Optional URL with proxy configuration to use for requests to Twitter API.
	 */
	constructor(apiKey: string, proxyUrl?: URL) {
		this.cred = this.getAuthCredential(apiKey);
		this.httpsAgent = this.getHttpsAgent(proxyUrl);
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
	 * @typeParam BaseType - The base type of the raw data present in the input.
	 * @typeParam DeserializedType - The type of data produced after deserialization of BaseType.
	 * @returns The extracted data.
	 */
	private extractData<DeserializedType extends Tweet | User>(
		data: NonNullable<unknown>,
		type: EResourceType,
	): CursoredData<DeserializedType> {
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
			type == EResourceType.USER_TWEETS
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

		return new CursoredData(required, findByFilter<IRawCursor>(data, 'cursorType', 'Bottom')[0]?.value);
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
		// Preparing the HTTP request
		const request: Request = new Request(resourceType, args);

		// Getting the raw data
		const res = await this.request(request).then((res) => res.data);

		// Extracting data
		const data = this.extractData<OutType>(res, resourceType);

		return data;
	}

	/**
	 * Posts the requested resource to Twitter and returns the response.
	 *
	 * @param resourceType - The type of resource to post.
	 * @param args - Resource specific arguments.
	 * @returns Whether posting was successful or not.
	 */
	protected async post(resourceType: EResourceType, args: Args): Promise<boolean> {
		// Preparing the HTTP request
		const request: Request = new Request(resourceType, args);

		// Posting the data
		await this.request(request);

		return true;
	}
}
