// TYPES
import { GuestCredentials, AuthCredentials } from '../../types/Authentication';

/**
 * @returns The header required for making authorized HTTP requests
 * @param authToken The authentication token received from Twitter
 * @param csrfToken The csrf token received from Twitter
 * @param cookie The cookie associated with the logged in account
 */
export function authorizedHeader(authCred: AuthCredentials): any {
    return [
        `sec-ch-ua: "Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"`,
        `x-twitter-client-language: en`,
        `x-csrf-token: ${authCred.csrfToken}`,
        `sec-ch-ua-mobile: ?0`,
        `authorization: ${authCred.authToken}`,
        `User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61`,
        `x-twitter-auth-type: OAuth2Session`,
        `x-twitter-active-user: yes`,
        `sec-ch-ua-platform: "Windows"`,
        `Accept: */*`,
        `host: api.twitter.com`,
        `Cookie: ${authCred.cookie}`
    ];
}

export function guestHeader(guestCred: GuestCredentials): any {
    return [
        'Accept: */*',
        `authorization: ${guestCred.authToken}`,
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70',
        `x-guest-token: ${guestCred.guestToken}`
    ];
}