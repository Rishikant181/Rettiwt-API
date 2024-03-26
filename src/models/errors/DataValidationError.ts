import { ValidationError } from 'class-validator';

/**
 * Error when any fields of a JSON data fails to validate.
 *
 * @public
 */
export class DataValidationError {
	/** The error data. */
	public data: ValidationError[];

	/** The user-friendly error message. */
	public message: string;

	/** The name of the error. */
	public name: string;

	/**
	 * @param data - The error details, as a list of type {@link ValidationError}
	 */
	public constructor(errorDetails: ValidationError[]) {
		this.name = 'VALIDATION_ERROR';
		this.message = 'One or more validation error(s) occured, check data field for details.';
		this.data = errorDetails;
	}
}
