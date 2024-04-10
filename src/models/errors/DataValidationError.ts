import { ValidationError } from 'class-validator';

/**
 * Represents and error when any fields of a validation-enabled class fails to validate.
 *
 * @public
 */
export class DataValidationError {
	/** The detaied error message(s). */
	public details: ValidationErrorDetails[];

	/** The user-friendly error message. */
	public message: string;

	/** The name of the error. */
	public name: string;

	/**
	 * @param data - The error details, as a list of type {@link ValidationError}
	 */
	public constructor(errorDetails: ValidationError[]) {
		this.name = 'VALIDATION_ERROR';
		this.message = 'One or more validation error(s) occured, check details field.';
		this.details = errorDetails.map((error) => new ValidationErrorDetails(error));
	}
}

/**
 * Represents the validation error details of a single field.
 *
 * @public
 */
export class ValidationErrorDetails {
	/** The constraints which failed to be validated for the given field. */
	public constraints: string[];

	/** The name of the field which failed validation. */
	public field: string;

	public constructor(details: ValidationError) {
		this.field = details.property;
		this.constraints = Object.values(details.constraints!);
	}
}
