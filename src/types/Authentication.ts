// This file contains various types for handlind data related to authentication

/**
 * @summary Store each login flow
 */
export type LoginFlow = {
    url: string,
    body: string
}

/**
 * @summary Stores the credentials for unauthenticated/guest users
 */
export type GuestCredentials = {
    authToken: string,
    guestToken: string
};

/**
 * @summary Stores the credentials for authenticated/logged in users
 */
export type AuthCredentials = {
    authToken: string,
    csrfToken: string,
    cookie: string
};