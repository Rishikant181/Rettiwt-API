export default interface Root {
    data: Data
}

export interface Data {
    user: User
}

export interface User {
    result: Result
}

export interface Result {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel
    has_nft_avatar: boolean
    legacy: Legacy
    smart_blocked_by: boolean
    smart_blocking: boolean
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
}

export interface AffiliatesHighlightedLabel { }

export interface Legacy {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities
    fast_followers_count: number
    favourites_count: number
    follow_request_sent: boolean
    followed_by: boolean
    followers_count: number
    following: boolean
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    muting: boolean
    name: string
    normal_followers_count: number
    notifications: boolean
    pinned_tweet_ids_str: string[]
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities {
    description: Description
}

export interface Description {
    urls: any[]
}

export interface ProfileBannerExtensions {
    mediaColor: MediaColor
}

export interface MediaColor {
    r: R
}

export interface R {
    ok: Ok
}

export interface Ok {
    palette: Palette[]
}

export interface Palette {
    percentage: number
    rgb: Rgb
}

export interface Rgb {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions {
    mediaColor: MediaColor2
}

export interface MediaColor2 {
    r: R2
}

export interface R2 {
    ok: Ok2
}

export interface Ok2 {
    palette: Palette2[]
}

export interface Palette2 {
    percentage: number
    rgb: Rgb2
}

export interface Rgb2 {
    blue: number
    green: number
    red: number
}

export interface LegacyExtendedProfile { }
