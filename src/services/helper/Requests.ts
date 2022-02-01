// This file contains various helper method for operations related to HTTP requests sent to twitter

// URLS
// Method to return the url for fetching user account details from screen name
export function userAccountUrl(screenName: string): string {
    return `https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screenName}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`
}

// HEADERS
// Method to return a header for unauthorized guest users
export function authorizedGuestHeader(
    authToken: string,
    guestToken: string
) {
    return {
        "authorization": `Bearer ${authToken}`,
        "content-type": "application/json",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-guest-token": `${guestToken}`
    };
}

