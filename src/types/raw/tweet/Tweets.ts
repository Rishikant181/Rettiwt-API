export default interface Root {
    globalObjects: GlobalObjects
    timeline: Timeline
}

export interface GlobalObjects {
    tweets: Tweets
    users: Users
    moments: Moments
    cards: Cards
    places: Places
    media: Media
    broadcasts: Broadcasts
    topics: Topics
    lists: Lists
}

export interface Tweets {
    [key: string]: Tweet
}

export interface Tweet {
    created_at: string
    id: number
    id_str: string
    full_text: string
    truncated: boolean
    display_text_range: number[]
    entities: Entities
    source: string
    in_reply_to_status_id: number
    in_reply_to_status_id_str: string
    in_reply_to_user_id: number
    in_reply_to_user_id_str: string
    in_reply_to_screen_name: string
    user_id: number
    user_id_str: string
    geo: any
    coordinates: any
    place: any
    contributors: any
    is_quote_status: boolean
    retweet_count: number
    favorite_count: number
    reply_count: number
    quote_count: number
    conversation_id: number
    conversation_id_str: string
    favorited: boolean
    retweeted: boolean
    lang: string
    supplemental_language: any
    ext: Ext
}

export interface Entities {
    hashtags: any[]
    symbols: any[]
    user_mentions: UserMention[]
    urls: any[]
}

export interface UserMention {
    screen_name: string
    name: string
    id: number
    id_str: string
    indices: number[]
}

export interface Ext {
    unmentionInfo: UnmentionInfo
    superFollowMetadata: SuperFollowMetadata
}

export interface UnmentionInfo {
    r: R
    ttl: number
}

export interface R {
    ok: Ok
}

export interface Ok { }

export interface SuperFollowMetadata {
    r: R2
    ttl: number
}

export interface R2 {
    ok: Ok2
}

export interface Ok2 { }

export interface Users {
    [key: string]: User
}

export interface User {
    id: number
    id_str: string
    name: string
    screen_name: string
    location: string
    description: string
    url: any
    entities: Entities2
    protected: boolean
    followers_count: number
    fast_followers_count: number
    normal_followers_count: number
    friends_count: number
    listed_count: number
    created_at: string
    favourites_count: number
    utc_offset: any
    time_zone: any
    geo_enabled: boolean
    verified: boolean
    statuses_count: number
    media_count: number
    lang: any
    contributors_enabled: boolean
    is_translator: boolean
    is_translation_enabled: boolean
    profile_background_color: string
    profile_background_image_url: string
    profile_background_image_url_https: string
    profile_background_tile: boolean
    profile_image_url: string
    profile_image_url_https: string
    profile_banner_url: string
    profile_image_extensions_sensitive_media_warning: any
    profile_image_extensions_media_availability: any
    profile_image_extensions_alt_text: any
    profile_image_extensions_media_color: ProfileImageExtensionsMediaColor
    profile_image_extensions: ProfileImageExtensions
    profile_banner_extensions_sensitive_media_warning: any
    profile_banner_extensions_media_availability: any
    profile_banner_extensions_alt_text: any
    profile_banner_extensions_media_color: ProfileBannerExtensionsMediaColor
    profile_banner_extensions: ProfileBannerExtensions
    profile_link_color: string
    profile_sidebar_border_color: string
    profile_sidebar_fill_color: string
    profile_text_color: string
    profile_use_background_image: boolean
    has_extended_profile: boolean
    default_profile: boolean
    default_profile_image: boolean
    pinned_tweet_ids: number[]
    pinned_tweet_ids_str: string[]
    has_custom_timelines: boolean
    can_dm: boolean
    can_media_tag: boolean
    following: boolean
    follow_request_sent: boolean
    notifications: boolean
    muting: boolean
    blocking: boolean
    blocked_by: boolean
    want_retweets: boolean
    advertiser_account_type: string
    advertiser_account_service_levels: string[]
    profile_interstitial_type: string
    business_profile_state: string
    translator_type: string
    withheld_in_countries: any[]
    followed_by: boolean
    ext_has_nft_avatar: boolean
    ext: Ext2
    require_some_consent: boolean
}

export interface Entities2 {
    description: Description
}

export interface Description {
    urls: any[]
}

export interface ProfileImageExtensionsMediaColor {
    palette: Palette[]
}

export interface Palette {
    rgb: Rgb
    percentage: number
}

export interface Rgb {
    red: number
    green: number
    blue: number
}

export interface ProfileImageExtensions {
    mediaStats: MediaStats
}

export interface MediaStats {
    r: R3
    ttl: number
}

export interface R3 {
    missing: any
}

export interface ProfileBannerExtensionsMediaColor {
    palette: Palette2[]
}

export interface Palette2 {
    rgb: Rgb2
    percentage: number
}

export interface Rgb2 {
    red: number
    green: number
    blue: number
}

export interface ProfileBannerExtensions {
    mediaStats: MediaStats2
}

export interface MediaStats2 {
    r: R4
    ttl: number
}

export interface R4 {
    missing: any
}

export interface Ext2 {
    hasNftAvatar: HasNftAvatar
    superFollowMetadata: SuperFollowMetadata2
    highlightedLabel: HighlightedLabel
}

export interface HasNftAvatar {
    r: R5
    ttl: number
}

export interface R5 {
    ok: boolean
}

export interface SuperFollowMetadata2 {
    r: R6
    ttl: number
}

export interface R6 {
    ok: Ok3
}

export interface Ok3 {
    superFollowEligible: boolean
    superFollowing: boolean
    superFollowedBy: boolean
    exclusiveTweetFollowing: boolean
    privateSuperFollowing: boolean
}

export interface HighlightedLabel {
    r: R7
    ttl: number
}

export interface R7 {
    ok: Ok4
}

export interface Ok4 { }

export interface Moments { }

export interface Cards { }

export interface Places { }

export interface Media { }

export interface Broadcasts { }

export interface Topics { }

export interface Lists { }

export interface Timeline {
    id: string
    instructions: [
        {
            addEntries: AddEntries
        },
        {
            replaceEntry: ReplaceEntry
        },
        {
            replaceEntry: ReplaceEntry
        }
    ]
    responseObjects: ResponseObjects
}

export interface AddEntries {
    entries: Entry[]
}

export interface ReplaceEntry {
    entryIdToReplace: string
    entry: Entry
}

export interface Entry {
    entryId: string
    sortIndex: string
    content: Content
}

export interface Content {
    item?: Item
    operation?: Operation
}

export interface Item {
    content: Content2
    clientEventInfo: ClientEventInfo
    feedbackInfo: FeedbackInfo
}

export interface Content2 {
    tweet: Tweet2
}

export interface Tweet2 {
    id: string
    displayType: string
}

export interface ClientEventInfo {
    component: string
    element: string
    details: Details
}

export interface Details {
    timelinesDetails: TimelinesDetails
}

export interface TimelinesDetails {
    controllerData: string
}

export interface FeedbackInfo {
    feedbackKeys: string[]
    displayContext: DisplayContext
    clientEventInfo: ClientEventInfo2
}

export interface DisplayContext {
    reason: string
}

export interface ClientEventInfo2 {
    component: string
    element: string
    action: string
}

export interface Operation {
    cursor: Cursor
}

export interface Cursor {
    value: string
    cursorType: string
}

export interface ResponseObjects {
    feedbackActions: FeedbackActions
}

export interface FeedbackActions {
    givefeedback: Givefeedback
    notrelevant: Notrelevant
    notcredible: Notcredible
}

export interface Givefeedback {
    feedbackType: string
    prompt: string
    confirmation: string
    childKeys: string[]
    hasUndoAction: boolean
    confirmationDisplayType: string
    clientEventInfo: ClientEventInfo3
    icon: string
}

export interface ClientEventInfo3 {
    component: string
    element: string
    action: string
}

export interface Notrelevant {
    feedbackType: string
    prompt: string
    confirmation: string
    hasUndoAction: boolean
    confirmationDisplayType: string
    clientEventInfo: ClientEventInfo4
}

export interface ClientEventInfo4 {
    component: string
    element: string
    action: string
}

export interface Notcredible {
    feedbackType: string
    prompt: string
    confirmation: string
    hasUndoAction: boolean
    confirmationDisplayType: string
    clientEventInfo: ClientEventInfo5
}

export interface ClientEventInfo5 {
    component: string
    element: string
    action: string
}
