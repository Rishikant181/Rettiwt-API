// PACKAGES
import axios, { AxiosError, AxiosResponse } from 'axios';
import { findKeyByValue } from '../../helper/JsonUtils';

// TYPES
import { IErrorHandler } from '../../types/ErrorHandler';

// ENUMS
import { EApiErrors } from '../../enums/Api';
import { EHttpStatus } from '../../enums/Http';
import { EErrorCodes } from 'rettiwt-core';

// ERRORS
import { ApiError } from '../../models/errors/ApiError';
import { HttpError } from '../../models/errors/HttpError';
import { TimeoutError } from '../../models/errors/TimeoutError';

// TODO Refactor and document this module

/**
 * The base service that handles any errors.
 *
 * @public
 */
export class ErrorService implements IErrorHandler {
	/**
	 * Error message used when the specific error type is not defined in the required enums.
	 */
	protected static readonly DEFAULT_ERROR_MESSAGE = 'Unknown error';

	/**
	 * The method called when an error response is received from Twitter API.
	 *
	 * @param error - The error caught while making HTTP request to Twitter API.
	 */
	public handle(error: unknown): void {
		if (!axios.isAxiosError(error)) {
			throw error;
		}

		this.handleTimeoutError(error);

		const axiosResponse = this.getAxiosResponse(error);
		this.handleApiError(axiosResponse);
		this.handleHttpError(axiosResponse);
	}

	/**
	 * Handles exceeded timeout, configured in RettiwtConfig.
	 *
	 * @param error - The error object.
	 * @throws An error if the configured request timeout has been exceeded.
	 */
	protected handleTimeoutError(error: AxiosError): void {
		if (error.code === 'ECONNABORTED') {
			throw new TimeoutError(error.message);
		}
	}

	/**
	 * Retrieves the response data from the given error.
	 *
	 * @param error - The error object.
	 * @returns The response data.
	 * @throws The original error if it is not an HTTP error with a response.
	 */
	protected getAxiosResponse(error: AxiosError): AxiosResponse {
		if (error.response) {
			return error.response;
		}

		throw error;
	}

	/**
	 * Handles HTTP error in a response.
	 *
	 * @param response - The response object received.
	 * @throws An error with the corresponding HTTP status text if any HTTP-related error has occurred.
	 */
	protected handleHttpError(response: AxiosResponse): void {
		throw this.createHttpError(response.status);
	}

	/**
	 * Handles API error in a response.
	 *
	 * @param response - The response object received.
	 * @throws An error with the corresponding API error message if any API-related error has occurred.
	 */
	protected handleApiError(response: AxiosResponse): void {
		const errorCode = this.getErrorCode(response);

		if (errorCode === undefined) {
			return;
		}

		throw this.createApiError(errorCode);
	}

	/**
	 * Creates an HTTP error instance based on the provided HTTP status.
	 *
	 * @param httpStatus - The HTTP status code.
	 * @returns An HTTP error instance.
	 */
	protected createHttpError(httpStatus: number): HttpError {
		return new HttpError(httpStatus, this.getHttpErrorMessage(httpStatus));
	}

	/**
	 * Retrieves the HTTP error message based on the provided HTTP status.
	 *
	 * @param httpStatus - The HTTP status code.
	 * @returns The HTTP error message.
	 */
	protected getHttpErrorMessage(httpStatus: number): string {
		return Object.values(EHttpStatus).includes(httpStatus)
			? EHttpStatus[httpStatus]
			: ErrorService.DEFAULT_ERROR_MESSAGE;
	}

	/**
	 * Retrieves the API error code from the Axios response data.
	 *
	 * @param response - The response object received.
	 * @returns The error code, or undefined if not found.
	 */
	protected getErrorCode(response: AxiosResponse): number | undefined {
		const errors = (response.data as { errors: { code: number }[] }).errors;

		return !!errors && errors.length ? errors[0].code : undefined;
	}

	/**
	 * Creates an API error instance based on the provided error code.
	 *
	 * @param errorCode - The error code.
	 * @returns An API error instance.
	 */
	protected createApiError(errorCode: number): ApiError {
		return new ApiError(errorCode, this.getApiErrorMessage(errorCode));
	}

	/**
	 * Retrieves the API error message based on the provided error code.
	 *
	 * @param errorCode - The error code.
	 * @returns The API error message.
	 */
	protected getApiErrorMessage(errorCode: number): string {
		const errorCodeKey = findKeyByValue(EErrorCodes, errorCode.toString());

		return !!errorCodeKey && errorCodeKey in EApiErrors
			? EApiErrors[errorCodeKey as keyof typeof EApiErrors]
			: ErrorService.DEFAULT_ERROR_MESSAGE;
	}
}
