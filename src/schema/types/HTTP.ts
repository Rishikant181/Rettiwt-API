// This file contains various objects for handling data related to HTTP communication

// TODO: Evaluate the error message and generate different error objects for different errors

// Object to hold error data for http communication
export class Error {
    // MEMBER DATA
    name: string;                                                               // To store the type of error
    message: string;                                                            // To store actual error message
    details: any;                                                               // To store exact error message

    // MEMBER METHODS
    constructor(err: any) {
        // If no error
        if(!err) {
            this.name = '';
            this.message = '';
            this.details = null;
        }
        // If error
        else {
            this.name = err.name;
            this.message = err.message;
            this.details = err;
        }
    }
}

// Object to hold data received from fetch request
export class Response<Type> {
    // MEMBER DATA
    success: boolean;                                                       // To store whether success or failure
    error: Error;                                                           // To store error details, if any
    data: Type;                                                             // To store the data received

    // MEMBER METHODS
    constructor(success: boolean, error: Error, data: any) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
}