/**
 * @summary Stores the credentials for authenticated/logged in users
 */
export interface AuthCredentials {
    authToken: string,
    csrfToken: string,
    cookie: string
};