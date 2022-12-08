// This file contains various types for handlind data related to authentication

/**
 * @summary Store each login flow
 */
export interface LoginFlow {
    url: string,
    body: string
};

/**
 * @summary Stores the credentials for unauthenticated/guest users
 */
export interface GuestCredentials {
    authToken: string,
    guestToken: string
};

/**
 * @summary Stores the credentials for authenticated/logged in users
 */
export interface AuthCredentials {
    authToken: string,
    csrfToken: string,
    cookie: string
};

/**
 * Stores the credentials for blank requests
 */
export interface BlankCredentials {
    authToken: string,
};

/**
 * @summary Stores the actual login credentials to a Twitter account
 */
export interface LoginCredentials {
    email: string,
    userName: string,
    password: string
};