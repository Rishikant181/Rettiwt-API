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

/**
 * @summary Stores the urls used for caching data in redis
 */
export const redis_urls = {
    name: 'redis',
    root: `${process.env.CACHE_DB_URL}`,
    check: false
}

/**
 * @summary Stores the urls for storing data in mongodb
 */
export const mongodb_urls = {
    name: 'mongodb',
    root: `${process.env.DATA_DB_URL}`,
    check: false,
    logs_url: () => `${mongodb_urls.root}/logs`,
    cookies_url: () => `${mongodb_urls.root}/cookies`
}

/**
 * @summary Stores the urls used for communication with twitter api
 */
export const twitter_urls = {
    name: 'twitter',
    root: 'https://twitter.com/',                                           // The twitter root url
    check: true
};