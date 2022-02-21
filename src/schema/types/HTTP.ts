// This file contains various objects for handling data related to HTTP communication

// TODO: Evaluate the error message and generate different error objects for different errors

// Enum to hold all different types of error messages
export enum Errors {
    UserNotFound = "An account with given username/id was not found",
    FatalError = "A run-time error occured",
    NoError = ""
}

// Object to hold error data for http communication
export class Error {
    // MEMBER DATA
    message: string;                                                        // To store actual error message

    // MEMBER METHODS
    constructor(err: Errors) {
        this.message = err;
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