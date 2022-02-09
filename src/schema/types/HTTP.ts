// This file contains various objects for handling data related to HTTP communication

// TODO: Add object to hold error response and make the services use this error type

// Object to hold error data for http communication
export class Error {
    // MEMBER DATA
    type: string;                                                           // To store the type of error
    details: string;                                                        // To store additional details

    // MEMBER METHODS
    constructor(type: string, details: string) {
        this.type = type;
        this.details = details;
    }
}

// Object to hold data received from fetch request
export class Response {
    // MEMBER DATA
    success: boolean;                                                       // To store whether success or failure
    error: Error;                                                           // To store error details, if any
    data: any;                                                              // To store the data received
}