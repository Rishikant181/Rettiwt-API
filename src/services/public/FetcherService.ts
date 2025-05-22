import axios from 'axios';
import { Cookie } from 'cookiejar';

import { allowGuestAuthentication, fetchResources, postResources } from '../../collections/Groups';
import { requests } from '../../collections/Requests';
import { EApiErrors } from '../../enums/Api';
import { ELogActions } from '../../enums/Logging';
import { EResourceType } from '../../enums/Resource';
import { FetchArgs } from '../../models/args/FetchArgs';
import { PostArgs } from '../../models/args/PostArgs';
import { AuthCredential } from '../../models/auth/AuthCredential';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { IFetchArgs } from '../../types/args/FetchArgs';
import { IPostArgs } from '../../types/args/PostArgs';
import { ITidHeader } from '../../types/auth/TidHeader';
import { ITidProvider } from '../../types/auth/TidProvider';
import { IErrorHandler } from '../../types/ErrorHandler';

import { AuthService } from '../internal/AuthService';
import { ErrorService } from '../internal/ErrorService';
import { LogService } from '../internal/LogService';
import { TidService } from '../internal/TidService';

/**
 * The base service that handles all HTTP requests.
 *
 * @public
 */
export class FetcherService {
	/** The AuthService instance to use. */
	private readonly _auth: AuthService;

	/** The delay/delay function to use (ms). */
	private readonly _delay?: number | (() => number | Promise<number>);

	/** The service used to handle HTTP and API errors */
	private readonly _errorHandler: IErrorHandler;

	/** Service responsible for generating the `x-client-transaction-id` header. */
	private readonly _tidProvider: ITidProvider;

	/** The max wait time for a response. */
	private readonly _timeout: number;

	/** The config object. */
	protected readonly config: RettiwtConfig;

	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 */
	public constructor(config: RettiwtConfig) {
		LogService.enabled = config.logging ?? false;
		this.config = config;
		this._delay = config.delay;
		this._errorHandler = config.errorHandler ?? new ErrorService();
		this._tidProvider = config.tidProvider ?? new TidService(config);
		this._timeout = config.timeout ?? 0;
		this._auth = new AuthService(config);
	}

	/**
	 * Checks the authorization status based on the requested resource.
	 *
	 * @param resource - The requested resource.
	 *
	 * @throws An error if not authorized to access the requested resource.
	 */
	private checkAuthorization(resource: EResourceType): void {
		// Logging
		LogService.log(ELogActions.AUTHORIZATION, { authenticated: this.config.userId != undefined });

		// Checking authorization status
		if (!allowGuestAuthentication.includes(resource) && this.config.userId == undefined) {
			throw new Error(EApiErrors.RESOURCE_NOT_ALLOWED);
		}
	}

	/**
	 * Returns the AuthCredentials based on the type of key present.
	 *
	 * @returns The generated AuthCredential
	 */
	private async getCredential(): Promise<AuthCredential> {
		if (this.config.apiKey) {
			// Logging
			LogService.log(ELogActions.GET, { target: 'USER_CREDENTIAL' });

			return new AuthCredential(
				AuthService.decodeCookie(this.config.apiKey)
					.split(';')
					.map((item) => new Cookie(item)),
			);
		} else {
			// Logging
			LogService.log(ELogActions.GET, { target: 'NEW_GUEST_CREDENTIAL' });

			return this._auth.guest();
		}
	}

	/**
	 * Generates the header for the transaction ID.
	 *
	 * @param method - The target method.
	 * @param url - The target URL.
	 *
	 * @returns The header containing the transaction ID.
	 */
	private async getTransactionHeader(method: string, url: string): Promise<ITidHeader | undefined> {
		// Getting the URL path excluding all params
		const path = new URL(url).pathname.split('?')[0].trim();

		// Generating the transaction ID
		const tid = await this._tidProvider.generate(method.toUpperCase(), path);

		if (tid) {
			return {
				/* eslint-disable @typescript-eslint/naming-convention */
				'x-client-transaction-id': tid,
				/* eslint-enable @typescript-eslint/naming-convention */
			};
		} else {
			return undefined;
		}
	}

	/**
	 * Validates the given args against the given resource.
	 *
	 * @param resource - The resource against which validation is to be done.
	 * @param args - The args to be validated.
	 *
	 * @returns The validated args.
	 */
	private validateArgs(resource: EResourceType, args: IFetchArgs | IPostArgs): FetchArgs | PostArgs | undefined {
		if (fetchResources.includes(resource)) {
			// Logging
			LogService.log(ELogActions.VALIDATE, { target: 'FETCH_ARGS' });

			return new FetchArgs(args);
		} else if (postResources.includes(resource)) {
			// Logging
			LogService.log(ELogActions.VALIDATE, { target: 'POST_ARGS' });

			return new PostArgs(args);
		}
	}

	/**
	 * Introduces a delay using the configured delay/delay function.
	 */
	private async wait(): Promise<void> {
		// If no delay is set, skip
		if (this._delay == undefined) {
			return;
		}

		/** The delay (in ms) to use. */
		let delay = 0;

		// Getting the delay
		if (this._delay && typeof this._delay == 'number') {
			delay = this._delay;
		} else if (this._delay && typeof this._delay == 'function') {
			delay = await this._delay();
		}

		// Awaiting for the delay time
		await new Promise((resolve) => setTimeout(resolve, delay));
	}

	/**
	 * Makes an HTTP request according to the given parameters.
	 *
	 * @param resource - The requested resource.
	 * @param config - The request configuration.
	 *
	 * @typeParam T - The type of the returned response data.
	 *
	 * @returns The raw data response received.
	 *
	 * @example
	 *
	 * #### Fetching the raw details of a single user, using their username
	 * ```ts
	 * import { FetcherService, EResourceType } from 'rettiwt-api';
	 *
	 * // Creating a new FetcherService instance using the given 'API_KEY'
	 * const fetcher = new FetcherService({ apiKey: API_KEY });
	 *
	 * // Fetching the details of the User with username 'user1'
	 * fetcher.request(EResourceType.USER_DETAILS_BY_USERNAME, { id: 'user1' })
	 * .then(res => {
	 * 	console.log(res);
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async request<T = unknown>(resource: EResourceType, args: IFetchArgs | IPostArgs): Promise<T> {
		// Logging
		LogService.log(ELogActions.REQUEST, { resource: resource, args: args });

		// Checking authorization for the requested resource
		this.checkAuthorization(resource);

		// Validating args
		args = this.validateArgs(resource, args)!;

		// Getting credentials from key
		const cred: AuthCredential = await this.getCredential();

		// Getting request configuration
		const config = requests[resource](args);

		// Setting additional request parameters
		config.headers = {
			...config.headers,
			...cred.toHeader(),
			...(await this.getTransactionHeader(config.method ?? '', config.url ?? '')),
			...this.config.headers,
		};
		config.httpAgent = this.config.httpsAgent;
		config.httpsAgent = this.config.httpsAgent;
		config.timeout = this._timeout;

		// Sending the request
		try {
			// Introducing a delay
			await this.wait();

			// Returning the reponse body
			return (await axios<T>(config)).data;
		} catch (error) {
			// If error, delegate handling to error handler
			this._errorHandler.handle(error);
			throw error;
		}
	}
}
