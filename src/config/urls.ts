// This file contains the various urls used throughout the app

/**
 * @summary Stores the urls used for communication with twitter api
 */
export const twitter_urls = {
    name: 'twitter',
    root: 'https://twitter.com/'                                            // The twitter root url
};

/**
 * @summary Stores the urls used for communication with core API
 */
export const core_urls = {
    name: 'core',
    root: `http://${process.env.CORE_HOST}:${process.env.CORE_PORT}`,       // The core API root url
    single_cookie: (id: string) => `${core_urls.root}/Cookies/fetch/${id}`, // Endpoint to get a cookie with the given id
    all_cookies: () => `${core_urls.root}/Cookies/fetch`,                   // Endpoint to get all the stored cookies
    add_cookie: () => `${core_urls.root}/Cookies/add`                       // Endpoint to store a given cookie
};