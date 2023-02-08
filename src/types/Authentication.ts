/**
 * @summary Stores the guest credentials for guest users
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