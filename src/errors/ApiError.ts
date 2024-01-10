// ERRORS
import RettiwtError from "./RettiwtError";

class ApiError extends RettiwtError {
    errorCode: number;

    constructor(errorCode: number, message?: string) {
        super(message);

        this.errorCode = errorCode;
    }
}

export default ApiError;
