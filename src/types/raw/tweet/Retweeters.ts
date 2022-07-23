export default interface Root {
    data: Data
}

export interface Data {
    retweeters_timeline: RetweetersTimeline
}

export interface RetweetersTimeline {
    timeline: Timeline
}

export interface Timeline {
    instructions: Instruction[]
    responseObjects: ResponseObjects
}

export interface Instruction {
    type: string
    entries: Entry[]
}

export interface Entry {
    entryId: string
    sortIndex: string
    content: Content
}

export interface Content {
    entryType: string
    itemContent?: ItemContent
    value?: string
    cursorType?: string
    stopOnEmptyResponse?: boolean
}

export interface ItemContent {
    itemType: string
    user_results: UserResults
    userDisplayType: string
}

export interface UserResults {
    result: Result
}

export interface Result {
    __typename: string
    id?: string
    rest_id?: string
    affiliates_highlighted_label?: AffiliatesHighlightedLabel
    has_nft_avatar?: boolean
    legacy?: Legacy
    super_follow_eligible?: boolean
    super_followed_by?: boolean
    super_following?: boolean
    professional?: Professional
    reason?: string
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
    possibly_sensitive: boolean
    profile_banner_extensions?: ProfileBannerExtensions
    profile_banner_url?: string
    profile_image_extensions: ProfileImageExtensions
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
    url?: string
}

export interface Entities {
    description: Description
    url?: Url2
}

export interface Description {
    urls: Url[]
}

export interface Url {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url2 {
    urls: Url3[]
}

export interface Url3 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
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

export interface Professional {
    rest_id: string
    professional_type: string
    category: Category[]
}

export interface Category {
    id: number
    name: string
}

export interface ResponseObjects {
    feedbackActions: any[]
    immediateReactions: any[]
}
