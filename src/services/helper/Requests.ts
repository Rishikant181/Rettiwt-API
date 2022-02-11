// This file contains various helper method for operations related to HTTP requests sent to twitter

import { TweetFilter } from "../../schema/types/TweetData";

// URLS
// Method to return the url for fetching user account details from screen name
export function userAccountUrl(screenName: string): string {
    return `https://twitter.com/i/api/graphql/7mjxD3-C6BxitPMVQ6w0-Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screenName}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`
}

// Method to return the url for fetching the followers of the given user
export function userFollowingUrl(
    userId: string,
    count: number,
    cursor: string
): string {
    var url = '';

    // If a cursor is provided
    if(cursor) {
        url = `https://twitter.com/i/api/graphql/RL_g7COnuCi8Rwr8X4Gm0w/Following?variables=%7B%22userId%22%3A%2244196397%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`;
    }
    // If no cursor if provided
    else {
        url = `https://twitter.com/i/api/graphql/RL_g7COnuCi8Rwr8X4Gm0w/Following?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`;
    }
    
    return  url;
}

// Method to return the url for fetching the list of followers of the given user
export function userFollowersUrl(
    userId: string,
    count: number,
    cursor: string
): string {
    var url = '';

    // If a cursor if supplied
    if(cursor) {
        url = `https://twitter.com/i/api/graphql/ApPIkCxgE55eeRqH6829GA/Followers?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`;
    }
    // If no cursor has been supplied
    else {
        url = `https://twitter.com/i/api/graphql/ApPIkCxgE55eeRqH6829GA/Followers?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`;
    }

    return url;
}

// Method to return the url for fetching tweets using a given filter
export function tweetsUrl(
    filter: TweetFilter,
    cursor: string
): string {
    // Concatenating the input argument lists to a URL query formatted string
    var query = [
        filter.words ? filter.words.join(' ') : '',
        filter.hashtags ? `(${filter.hashtags.join(' OR ')})` : '',
        filter.fromUsers ? `(${filter.fromUsers.map(user => `from:${user}`).join(' OR ')})` : '',
        filter.toUsers ? `(${filter.toUsers.map(user => `to:${user}`).join(' OR ')})` : '',
        filter.mentions ? `(${filter.mentions.join(' OR ')})` : '',
        filter.startDate ? `since:${filter.startDate}` : '',
        filter.endDate ? `until:${filter.endDate}` : '',
    ]
        .filter(item => item !== '()' && item !== '')
        .join(' ');

    var url = '';

    // If a cursor has been supplied
    if(cursor) {
        url = `https://twitter.com/i/api/2/search/adaptive.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&send_error_codes=true&simple_quoted_tweet=true&q=${query}&tweet_search_mode=live&count=${filter.count}&query_source=typed_query&cursor=${cursor}&pc=1&spelling_corrections=1&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CsuperFollowMetadata`
    }
    // If no cursor has been supplied
    else {
        url = `https://twitter.com/i/api/2/search/adaptive.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&send_error_codes=true&simple_quoted_tweet=true&q=${query}&tweet_search_mode=live&count=${filter.count}&query_source=typed_query&pc=1&spelling_corrections=1&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CsuperFollowMetadata`;
    }

    return url;
}

// Method to return the url for fetching the details of a single tweet
export function tweetDetailsUrl(
    tweetId: string
): string {
    var url = '';

    // If a cursor is provided
    url = `https://twitter.com/i/api/graphql/L5bZJ8DPGqZjl6dXJ8lApw/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Afalse%2C%22withCommunity%22%3Afalse%2C%22withQuickPromoteEligibilityTweetFields%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22withVoice%22%3Afalse%2C%22withV2Timeline%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text_enabled%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D`;

    console.log(url)

    return url;
}

// Method to return the url for fetching the replies to a tweet
export function tweetRepliesUrl(
    tweetId: string,
    cursor: string
): string {
    var url = '';

    // If a cursor is provided
    if(cursor) {
        url = `https://twitter.com/i/api/graphql/_wm_hv4oOe3Y8aSlObbnDw/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22cursor%22%3A%22${cursor}%22%2C%22referrer%22%3A%22tweet%22%2C%22controller_data%22%3A%22DAACDAABDAABCgABAAAAAJAAAAEKAAIAAAAAAQNACAMACAsKAAmpSxR7chHSNA8ADAMAAAAMAQAAkAAAAAAIQAMBAAAAAA%3D%3D%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Afalse%2C%22withCommunity%22%3Afalse%2C%22withQuickPromoteEligibilityTweetFields%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22withVoice%22%3Afalse%2C%22withV2Timeline%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`;
    }
    // If no cursor if provided
    else {
        url = `https://twitter.com/i/api/graphql/_wm_hv4oOe3Y8aSlObbnDw/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Afalse%2C%22withCommunity%22%3Afalse%2C%22withQuickPromoteEligibilityTweetFields%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22withVoice%22%3Afalse%2C%22withV2Timeline%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%7D`
    }

    return url;
}

// Method to return url for fetching the list of users who liked the given tweet
export function tweetLikesUrl(
    tweetId: string,
    count: number,
    cursor: string
): string {
    var url = '';

    // If a cursor if provided
    if(cursor) {
        url = `https://twitter.com/i/api/graphql/b6wPMcDnykulPTxt939GGw/Favoriters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D`;
    }
    // If no cursor is provided
    else {
        url = `https://twitter.com/i/api/graphql/b6wPMcDnykulPTxt939GGw/Favoriters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D`
    }

    return url;
}

// Method to return the url for fetching the details of a single tweet
export function tweetRetweetUrl(
    tweetId: string,
    count: number,
    cursor: string
): string {
    var url = '';

    // If a cursor is provided
    if(cursor) {
        url = `https://twitter.com/i/api/graphql/vj-x0V5P9wItF63wXbA6uQ/Retweeters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D`;
    }
    // If no cursor if provided
    else {
        url = `https://twitter.com/i/api/graphql/vj-x0V5P9wItF63wXbA6uQ/Retweeters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Afalse%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%7D`
    }

    return url;
}

// HEADERS
// Method to return a header for unauthorized guest users
export function authorizedHeader(
    authToken: string,
    csrfToken: string,
    cookie: string
) {
    return {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": `Bearer ${authToken}`,
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Microsoft Edge\";v=\"98\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token": `${csrfToken}`,
        "x-twitter-active-user": "no",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",
        "cookie": `${cookie}`,
    };
}

