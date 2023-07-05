// TYPES
import { IGuestCredentials, IAuthCredentials } from '../../types/Authentication';

/**
 * @param authToken The authentication token received from Twitter
 * @param csrfToken The csrf token received from Twitter
 * @param cookie The cookie associated with the logged in account
 * @returns The header required for making authorized HTTP requests
 */
export function authorizedHeader(authCred: IAuthCredentials): any {
    return {
        'sec-ch-ua': '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
        'x-twitter-client-language': 'en',
        'x-csrf-token': authCred.csrfToken,
        'sec-ch-ua-mobile': '?0',
        'authorization': authCred.authToken,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61',
        'x-twitter-auth-type': 'OAuth2Session',
        'x-twitter-active-user': 'yes',
        'sec-ch-ua-platform': '"Windows"',
        'Accept': '*/*',
        'host': 'twitter.com',
        'Cookie': authCred.cookie
    };
}

/**
 * @param guestCred The guest credentials to use
 * @returns The header requred for making guest HTTP requests
 */
export function guestHeader(guestCred: IGuestCredentials): any {
    return {
        'Accept': '*/*',
        'authorization': guestCred.authToken,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70',
        'x-guest-token': guestCred.guestToken
    };
}

/**
 * @param guestCred The guest credentials to use for making the login requests
 * @param cookie The cookie to be used
 * @returns The header for making HTTP request for logging in
 */
export function loginHeader(guestCred: IGuestCredentials, cookie: string): any {
    return [
        `sec-ch-ua: "Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"`,
        `x-twitter-client-language: en`,
        `sec-ch-ua-mobile: ?0`,
        `authorization: ${guestCred.authToken}`,
        `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78`,
        `content-type: application/json`,
        `x-guest-token: ${guestCred.guestToken}`,
        `x-twitter-active-user: yes`,
        `sec-ch-ua-platform: "Windows"`,
        `Accept: */*`,
        `host: api.twitter.com`,
        `Cookie: ${cookie}`
    ];
}