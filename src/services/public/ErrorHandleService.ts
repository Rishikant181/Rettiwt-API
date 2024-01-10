// PACKAGES
import axios, { AxiosResponse} from "axios";
import { findKeyByValue } from "../../helper/JsonUtils";

// TYPES
import { IErrorHandleService } from "../../types/public/ErrorHandleService";

// ENUMS
import { EApiErrors } from "../../enums/ApiErrors";
import { EErrorCodes } from "rettiwt-core";
import { EHttpStatus } from "../../enums/HTTP";

// ERRORS
import ApiError from "../../errors/ApiError";
import HttpError from "../../errors/HttpError";

/**
 * Defines error conditions and processes API/HTTP errors in Axios responses.
 *
 * @public
 */
export class ErrorHandleService implements IErrorHandleService {
	/**
	 * Error message used when the specific error type is not defined in the required enums.
	 */
	protected static readonly DEFAULT_ERROR_MESSAGE = 'Unknown error';

	/**
	 * The method called when an error response is received from Twitter API.
	 *
	 * @param {unknown} error - The error caught while making Axios request to Twitter API.
	 */
	handle(error: unknown): void {
		const axiosResponse = this.getAxiosResponse(error);

		this.handleApiError(axiosResponse);
		this.handleHttpError(axiosResponse);
	}

	/**
	 * Retrieves the Axios response from the given error.
	 *
	 * @param {unknown} error - The error object.
	 * @returns {AxiosResponse} The Axios response.
	 * @throws {unknown} Throws the original error if it is not an Axios error with a response.
	 * @protected
	 */
	protected getAxiosResponse(error: unknown): AxiosResponse {
		if (axios.isAxiosError(error) && !!error.response) {
			return error.response;
		}

		throw error;
	}

	/**
	 * Handles HTTP error in an Axios response.
	 *
	 * @param {AxiosResponse} axiosResponse - The response object received.
	 * @throws {Error} An error with the corresponding HTTP status text if any HTTP-related error has occurred.
	 * @protected
	 */
	protected handleHttpError(axiosResponse: AxiosResponse): void {
		throw this.createHttpError(axiosResponse.status);
	}

	/**
	 * Handles API error in an Axios response.
	 *
	 * @param {AxiosResponse} axiosResponse - The response object received.
	 * @throws {Error} An error with the corresponding API error message if any API-related error has occurred.
	 * @protected
	 */
	protected handleApiError(axiosResponse: AxiosResponse): void {
		const errorCode = this.getErrorCode(axiosResponse);

		if (errorCode === undefined) {
			return;
		}

		throw this.createApiError(errorCode);
	}

	/**
	 * Creates an HTTP error instance based on the provided HTTP status.
	 *
	 * @param {number} httpStatus - The HTTP status code.
	 * @returns {HttpError} An HTTP error instance.
	 * @protected
	 */
	protected createHttpError(httpStatus: number): HttpError {
		return new HttpError(httpStatus, this.getHttpErrorMessage(httpStatus));
	}

	/**
	 * Retrieves the HTTP error message based on the provided HTTP status.
	 *
	 * @param {number} httpStatus - The HTTP status code.
	 * @returns {string} The HTTP error message.
	 * @protected
	 */
	protected getHttpErrorMessage(httpStatus: number): string {
		return Object.values(EHttpStatus).includes(httpStatus)
			? EHttpStatus[httpStatus]
			: ErrorHandleService.DEFAULT_ERROR_MESSAGE;
	}

	/**
	 * Retrieves the API error code from the Axios response data.
	 *
	 * @param {AxiosResponse} axiosResponse - The response object received.
	 * @returns {number | undefined} The error code, or undefined if not found.
	 * @protected
	 */
	protected getErrorCode(axiosResponse: AxiosResponse): number | undefined {
		const errors = axiosResponse.data.errors;

		return (!!errors && errors.length) ? errors[0].code : undefined;
	}

	/**
	 * Creates an API error instance based on the provided error code.
	 *
	 * @param {number} errorCode - The error code.
	 * @returns {ApiError} An API error instance.
	 * @protected
	 */
	protected createApiError(errorCode: number): ApiError {
		return new ApiError(errorCode, this.getApiErrorMessage(errorCode));
	}

	/**
	 * Retrieves the API error message based on the provided error code.
	 *
	 * @param {number} errorCode - The error code.
	 * @returns {string} The API error message.
	 * @protected
	 */
	protected getApiErrorMessage(errorCode: number): string {
		const errorCodeKey = findKeyByValue(EErrorCodes, errorCode.toString());

		return (!!errorCodeKey && errorCodeKey in EApiErrors)
			? EApiErrors[errorCodeKey as keyof typeof EApiErrors]
			: ErrorHandleService.DEFAULT_ERROR_MESSAGE;
	}
}
