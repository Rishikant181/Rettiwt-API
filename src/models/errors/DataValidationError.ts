// PACKAGES
import { ValidationError } from "class-validator";

/**
 * Error when any fields of a JSON data fails to validate.
 * 
 * @internal
 * 
 * @param errorDetails The details of about the specific fields that failed to validate.
 */
export class DataValidationError implements Error {
    /** The name of the error. */
    name: string;

    /** The user-friendly error message. */
    message: string;

    /** The error data. */
    data: ValidationError[];

    /**
     * @param data The error details.
     */
    constructor(errorDetails: ValidationError[]) {
        this.name = 'ValidationError';
        this.message = 'One or more validation errors occured. Refer to data for details';
        this.data = errorDetails;
    }
}