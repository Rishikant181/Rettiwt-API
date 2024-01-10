// ERRORS
import RettiwtError from './RettiwtError';

class ApiError extends RettiwtError {
	public errorCode: number;

	public constructor(errorCode: number, message?: string) {
		super(message);

		this.errorCode = errorCode;
	}
}

export default ApiError;
