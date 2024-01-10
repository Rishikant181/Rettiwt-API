// ERRORS
import RettiwtError from './RettiwtError';

class HttpError extends RettiwtError {
	public httpStatus: number;

	public constructor(httpStatus: number, message?: string) {
		super(message);

		this.httpStatus = httpStatus;
	}
}

export default HttpError;
