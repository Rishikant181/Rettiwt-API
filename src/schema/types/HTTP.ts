// This file contains various objects for handling data related to HTTP communication

// TODO: Evaluate the error message and generate different error objects for different errors

/**
 * An enum containing all the different type of error messages that are used throughout the app
 */
export enum Errors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoTweetsFound = "No tweets matching the given criteria found",
    FatalError = "A run-time error occured",
    NoError = ""
}

/**
 * Object used to store any error data
 */
export class Error {
    // MEMBER DATA
    message: string;                                                        // To store actual error message

    // MEMBER METHODS
    // The constructor
    /**
     * @param err The error message to store.
     */
    constructor(err: Errors) {
        this.message = err;
    }
}

/**
 * Object used to store the response as returned by the services.
 * This is a generic class and the type supplied is the type of data that this reponse object stores in it's data field
 */
export class Response<Type> {
    // MEMBER DATA
    success: boolean;                                                       // To store whether success or failure
    error: Error;                                                           // To store error details, if any
    data: Type;                                                             // To store the data received

    // MEMBER METHODS
    /**
     * @param success Whether the action was successful or not
     * @param error Stores error, if any
     * @param data Any response data that is to be included in the response
     */
    constructor(success: boolean, error: Error, data: any) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
}