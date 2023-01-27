// TYPES
import { TweetFilter } from "../../types/Tweet";

/**
 * @returns The url for fetching user account details.
 * @param screenName The screen name of the target user
 */
export function userAccountUrl(screenName: string): string {
    return `https://api.twitter.com/graphql/hVhfo_TquFTmgL7gYwf91Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screenName}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D`
}

/**
 * @returns The url for fetching user account details.
 * @param restid The restId of the target user
 */
export function userAccountByIdUrl(restId: string): string {
    return `https://twitter.com/i/api/graphql/I5nvpI91ljifos1Y3Lltyg/UserByRestId?variables=%7B%22userId%22%3A%22${restId}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D`
}

/**
 * @returns The url for fetching the list of users followed bu target user.
 * @param userId The rest id of the target user
 * @param count The batch size of the list of following
 * @param cursor The cursor to next batch
 */
export function userFollowingUrl(userId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/mSnjZc5CTm2Z5Lu_i4XsPQ/Following?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @return The url for fetching the list of followers of the target user
 * @param userId The rest id of the target user
 * @param count The batch size for the list of followers
 * @param cursor The cusor to next batch
 */
export function userFollowersUrl(userId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/nwlAnaw7oKXcVLi91ehy7Q/Followers?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of tweets liked by the target user
 * @param userId The rest id of the target user
 * @param count The batch size for the list of tweets
 * @param cursor The cusor to next batch
 */
export function userLikesUrl(userId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/gP4ZKghLd4tpILgS6VudAQ/Likes?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of tweets made by the target user
 * @param userId The rest id of the target user
 * @param count The batch size for the list of tweets
 * @param cursor The cursor to next batch
 */
export function userTweetsUrl(userId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/xxLjoOBBPpYBHbBTI-hevQ/UserTweetsAndReplies?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of tweets matching the given filter
 * @param filter The filter to be used for searching tweets
 * @param cursor The cusor to next batch * 
 */
export function tweetsUrl(filter: TweetFilter, cursor: string): string {
    // Concatenating the input argument lists to a URL query formatted string
    let query = [
        filter.words ? filter.words.join(' ') : '',
        filter.hashtags ? `(${filter.hashtags.map(hashtag => '%23' + hashtag).join(' OR ')})` : '',
        filter.fromUsers ? `(${filter.fromUsers.map(user => `from:${user}`).join(' OR ')})` : '',
        filter.toUsers ? `(${filter.toUsers.map(user => `to:${user}`).join(' OR ')})` : '',
        filter.mentions ? `(${filter.mentions.map(mention => '%40' + mention).join(' OR ')})` : '',
        filter.startDate ? `since:${filter.startDate}` : '',
        filter.endDate ? `until:${filter.endDate}` : '',
        filter.quoted ? `quoted_tweet_id:${filter.quoted}` : ''
    ]
    .filter(item => item !== '()' && item !== '')
    .join(' ');

    let url = '';

    // If a cursor has been supplied
    if (cursor) {
        url = `https://twitter.com/i/api/2/search/adaptive.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&send_error_codes=true&simple_quoted_tweet=true&q=${query}&tweet_search_mode=live&count=${filter.count}&query_source=typed_query&cursor=${cursor}&pc=1&spelling_corrections=1&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CsuperFollowMetadata`
    }
    // If no cursor has been supplied
    else {
        url = `https://twitter.com/i/api/2/search/adaptive.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&send_error_codes=true&simple_quoted_tweet=true&q=${query}&tweet_search_mode=live&count=${filter.count}&query_source=typed_query&pc=1&spelling_corrections=1&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2CsuperFollowMetadata`;
    }

    return url;
}

/**
 * @returns The url for fetching the details of a given tweet
 * @param tweetId The rest id of the target tweet
 */
export function tweetDetailsUrl(tweetId: string): string {
    return `https://api.twitter.com/graphql/lXI2kaM2hgmbf7h42kpxuA/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22referrer%22%3A%22profile%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of replies to a given tweet
 * @param tweetId The rest of the target tweet
 * @param cursor The curor to next batch
 */
export function tweetRepliesUrl(tweetId: string, cursor: string): string {
    return `https://api.twitter.com/graphql/lXI2kaM2hgmbf7h42kpxuA/TweetDetail?variables=%7B%22focalTweetId%22%3A%22${tweetId}%22%2C%22cursor%22%3A%22${cursor}%22%2C%22referrer%22%3A%22tweet%22%2C%22with_rux_injections%22%3Afalse%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of users who liked a given tweet
 * @param tweetId The rest id of the target tweet
 * @param count The batch size of the list of users
 * @param cursor The curor to next batch
 */
export function tweetLikesUrl(tweetId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/56ZwFC3Vui31fF8IYX8EGA/Favoriters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of user who retweeted the given tweet
 * @param tweetId The rest id of the target tweet
 * @param count The batch size of the list of users
 * @param cursor The curor to next batch
 */
export function tweetRetweetUrl(tweetId: string, count: number, cursor: string): string {
    return `https://api.twitter.com/graphql/Wd7DVeLqMj_JQiTL0tjJwQ/Retweeters?variables=%7B%22tweetId%22%3A%22${tweetId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}