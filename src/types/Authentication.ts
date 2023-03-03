/**
 * The guest credentials for guest authentication.
 */
export interface GuestCredentials {
    /** The bearer token from twitter.com.
     * 
     * @remarks This is a static bearer token from twitter.com.
     */
    authToken: string,
    /** The guest token.
     * 
     * @remarks This is generated from twitter.com by calling GETTING https://api.twitter.com/1.1/guest/activate.json endpoint.
     */
    guestToken: string
};

/**
 * The credentials for authenticated/logged in users.
 */
export interface AuthCredentials {
    /** The bearer token from twitter.com.
     * 
     * @remarks This is a static bearer token from twitter.com.
     */
    authToken: string,
    /** The guest token.
     * 
     * @remarks This is generated from twitter.com by calling GETTING https://api.twitter.com/1.1/guest/activate.json endpoint.
     */
    csrfToken: string,
    /** The cookie of the twitter account, which is used to authenticate against twitter.
     * 
     * @remarks The cookie can be obtained/scraped from any one of the outgoing HTTP request headers to twitter.com.
     * It can also be obtained after logging in to twitter, from the 'set-cookie' field of response.
     */
    cookie: string
};