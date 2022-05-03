// This file contains various objects for handling data related to HTTP communication

// TODO: Evaluate the error message and generate different error objects for different errors

/**
 * @summary Stores all the different type of http requests
 */
export enum HttpMethods {
    POST = "POST",
    GET = "GET"
};

/**
 * @summary Stores the different types of http status codes
 */
export enum HttpStatus {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    RequestTimeout = 408,
    TooManyRequests = 429,
    InternalServerError = 500,
    BadGateway = 502,
    ServiceUnavailable = 503
};

/**
 * @summary Stores all the different type of error messages that are used throughout the app
 */
export enum Errors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoTweetsFound = "No tweets matching the given criteria found",
    FatalError = "A run-time error occured"
}

/**
 * @summary Stores the response as returned by the services.
 * This is a generic class and the type supplied is the type of data that this reponse object stores in it's data field
 */
export class Response<Type> {
    // MEMBER DATA
    success: boolean;                                                       // To store whether success or failure
    data: Type;                                                             // To store the data received
    error?: Error;                                                          // To store error details, if any

    // MEMBER METHODS
    /**
     * @param success Whether the action was successful or not
     * @param error Stores error, if any
     * @param data Any response data that is to be included in the response
     */
    constructor(success: boolean, data: any, error?: Error) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
}