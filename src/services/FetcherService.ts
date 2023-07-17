// PACKAGES
import { EResourceType, ICursor as IRawCursor } from 'rettiwt-core';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { AuthCredential } from 'rettiwt-auth';

// ENUMS
import { EHttpStatus } from '../enums/HTTP';

// MODELS
import { CursoredData } from '../models/CursoredData';

// HELPERS
import { findByFilter } from '../helper/JsonUtils';

/**
 * The base service that handles all HTTP requests.
 *
 * @internal
 */
export class FetcherService {
	/** The credential to use for authenticating against Twitter API. */
	private cred: AuthCredential;

	/**
	 * @param cred The credentials to use for authenticating against Twitter API.
	 */
	constructor(cred: AuthCredential) {
		this.cred = cred;
	}

	/**
	 * The middleware for handling any HTTP error.
	 *
	 * @param res The response object received.
	 * @returns The received response, if no HTTP errors are found.
	 */
	private handleHTTPError(res: AxiosResponse): AxiosResponse {
		/**
		 * If the status code is not 200 => the HTTP request was not successful. hence throwing error
		 */
		if (res.status != 200 && res.status in EHttpStatus) {
			throw new Error(EHttpStatus[res.status]);
		}

		return res;
	}

	/**
	 * Makes an HTTP request according to the given parameters.
	 *
	 * @param url The url to fetch data from.
	 * @typeParam T - Type of response data.
	 * @returns The response received.
	 */
	protected async request<T>(url: string): Promise<AxiosResponse<T>> {
		/**
		 * Creating the request configuration based on the params
		 */
		const config: AxiosRequestConfig = {
			headers: JSON.parse(JSON.stringify(this.cred.toHeader())) as AxiosRequestHeaders,
		};

		/**
		 * After making the request, the response is then passed to HTTP error handling middlware for HTTP error handling.
		 */
		return await axios.get(url, config).then((res) => this.handleHTTPError(res));
	}

	/**
	 * Extracts the required data based on the type of resource passed as argument.
	 *
	 * @param data The data from which extraction is to be done.
	 * @param type The type of data to extract.
	 * @typeParam T Type of extracted data.
	 * @returns The extracted required data, along with additional data.
	 */
	protected extractData<T>(data: NonNullable<unknown>, type: EResourceType): CursoredData<T> {
		/**
		 * The required extracted data.
		 */
		let required: T[] = [];

		// For 'Tweet' resources
		if (
			type == EResourceType.TWEET_DETAILS ||
			type == EResourceType.TWEET_SEARCH ||
			type == EResourceType.USER_LIKES
		) {
			required = findByFilter<T>(data, '__typename', 'Tweet');
		}
		// For 'User' resources
		else {
			required = findByFilter<T>(data, '__typename', 'User');
		}

		return new CursoredData(required, findByFilter<IRawCursor>(data, 'cursorType', 'Bottom')[0]?.value);
	}
}
