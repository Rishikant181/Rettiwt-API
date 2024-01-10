// ERRORS
import RettiwtError from "./RettiwtError";

class HttpError extends RettiwtError {
    httpStatus: number;

    constructor(httpStatus: number, message?: string) {
        super(message);

        this.httpStatus = httpStatus;
    }
}

export default HttpError;
