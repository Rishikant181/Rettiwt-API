// This file contains the various urls used throughout the app

/**
 * @summary Stores the urls used for communication with core API
 */
export const core = {
    getCookie: (id: string) => `/Cookies/fetch/${id}`,                      // Endpoint to get a cookie with the given id
    getAllCookies: '/Cookies/fetch',                                        // Endpoint to get all the stored cookies
    addCookie: '/addCookie'                                                 // Endpoint to store a given cookie
};