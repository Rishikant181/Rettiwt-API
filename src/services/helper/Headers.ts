/**
 * @returns The header required for making authorized HTTP requests
 * @param authToken The authentication token received from Twitter
 * @param csrfToken The csrf token received from Twitter
 * @param cookie The cookie associated with the logged in account
 */
export function authorizedHeader(authCred: {
    authToken: string,
    csrfToken: string,
    cookie: string
}): any {
    return {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": authCred.authToken,
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Microsoft Edge\";v=\"98\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token": authCred.csrfToken,
        "x-twitter-active-user": "no",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",
        "cookie": authCred.cookie,
    };
}