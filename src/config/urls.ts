// This file contains the various urls used throughout the app

/**
 * The general form of defining urls is as follows:
 * {
 *      name: <Nickname of the server>,
 *      root: <The root url of the server>,
 *      check: <Whether to check if the server is up or not>,
 *      <key1>: <Full url to sub path>,
 *      <key2>: <Full url to sub path>,
 *      <key3>: <Full url to sub path>,
 *      .....
 * }
 */

export const mongodb_urls = {
    name: 'mongodb',
    root: `mongodb://${process.env.DATA_DB_HOST}:${process.env.DATA_DB_PORT}`,
    check: false,
    logs_url: () => `${mongodb_urls.root}/logs`
}

/**
 * @summary Stores the urls used for communication with twitter api
 */
export const twitter_urls = {
    name: 'twitter',
    root: 'https://twitter.com/',                                           // The twitter root url
    check: true
};

/**
 * @summary Stores the urls used for communication with core API
 */
export const core_urls = {
    name: 'core',
    root: `http://${process.env.CORE_HOST}:${process.env.CORE_PORT}`,       // The core API root url
    check: true,
    single_cookie: (id: string) => `${core_urls.root}/Cookies/fetch/${id}`, // Endpoint to get a cookie with the given id
    all_cookies: () => `${core_urls.root}/Cookies/fetch`,                   // Endpoint to get all the stored cookies
    add_cookie: () => `${core_urls.root}/Cookies/add`                       // Endpoint to store a given cookie
};