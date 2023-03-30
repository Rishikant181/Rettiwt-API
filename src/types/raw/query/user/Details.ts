export interface Variables {
    userId: string
    screen_name: string
    count: number
    cursor: string
    includePromotedContent: boolean
    withSuperFollowsUserFields: boolean
    withDownvotePerspective: boolean
    withReactionsMetadata: boolean
    withReactionsPerspective: boolean
    withSuperFollowsTweetFields: boolean
    withClientEventToken: boolean
    withBirdwatchNotes: boolean
    withVoice: boolean
    withV2Timeline: boolean
}

export interface Features {
    responsive_web_twitter_blue_verified_badge_is_enabled: boolean
    verified_phone_label_enabled: boolean
    responsive_web_graphql_timeline_navigation_enabled: boolean
    view_counts_public_visibility_enabled: boolean
    longform_notetweets_consumption_enabled: boolean
    tweetypie_unmention_optimization_enabled: boolean
    responsive_web_uc_gql_enabled: boolean
    vibe_api_enabled: boolean
    responsive_web_edit_tweet_api_enabled: boolean
    graphql_is_translatable_rweb_tweet_is_translatable_enabled: boolean
    view_counts_everywhere_api_enabled: boolean
    standardized_nudges_misinfo: boolean
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: boolean
    interactive_text_enabled: boolean
    responsive_web_text_conversations_enabled: boolean
    responsive_web_enhance_cards_enabled: boolean
}