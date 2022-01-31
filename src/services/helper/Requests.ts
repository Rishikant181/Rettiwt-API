// This file contains various helper method for operations related to HTTP requests sent to twitter

// URLS
// Method to return the url for fetching user account details from screen name
export function userAccountUrl(screenName: string): string {
    return `https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screenName}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`
}

// Method to return the url for fetching user tweets from user id
export function userTweetsUrl(
    userId: string,
    numTweets: number
): string {
    return `https://twitter.com/i/api/graphql/B9izm_qt4l5qWUWrympCVw/UserTweetsAndReplies?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${numTweets}%2C%22cursor%22%3A%22HBb%2B%2F%2F%2Fv3o2ypikAAA%3D%3D%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%7D`
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