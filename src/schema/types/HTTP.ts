// This file contains various objects for handling data related to HTTP communication

// TODO: Evaluate the error message and generate different error objects for different errors

/**
 * An *enum* containing all the different type of **error messages** that are used throughout the app
 * 
 * **NOTE**: These error messages are of **internal purposes** only and should not used for communication over HTTP
 */
export enum Errors {
    UserNotFound = "An account with given username/id was not found",
    TweetNotFound = "A tweet with the given id was not found",
    NoTweetsFound = "No tweets matching the given criteria found",
    FatalError = "A run-time error occured",
    NoError = ""
}

/**
 * Object used to store any **error data**
 * 
 * **NOTE**: This object is only used for **internal purposes** only
 */
export class Error {
    // MEMBER DATA
    message: string;                                                        // To store actual error message

    // MEMBER METHODS
    // The constructor
    /**
     * @param err The error message to store.
     * @returns An **Error** *Object* containing the error data
     */
    constructor(err: Errors) {
        this.message = err;
    }
}

/**
 * Object used to store the **response** as returned by the **services**
 * 
 * **NOTE**: This object is only used for **internal purposes**
 */
export class Response<Type> {
    // MEMBER DATA
    success: boolean;                                                       // To store whether success or failure
    error: Error;                                                           // To store error details, if any
    data: Type;                                                             // To store the data received

    // MEMBER METHODS
    /**
     * @param success Whether the action was successful or not
     * @param error Stores *Error*, if any
     * @param data Any response data that is to be included in the response
     * @returns A *Response* *Object* containing the response data
     */
    constructor(success: boolean, error: Error, data: any) {
        this.success = success;
        this.error = error;
        this.data = data;
    }
}