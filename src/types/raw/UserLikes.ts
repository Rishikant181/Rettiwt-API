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
    timeline_v2: TimelineV2
}

export interface TimelineV2 {
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
    tweet_results: TweetResults
    tweetDisplayType: string
}

export interface TweetResults {
    result: Result2
}

export interface Result2 {
    __typename: string
    rest_id: string
    core: Core
    legacy: Legacy2
    card?: Card
    quoted_status_result?: QuotedStatusResult
}

export interface Core {
    user_results: UserResults
}

export interface UserResults {
    result: Result3
}

export interface Result3 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel
    has_nft_avatar: boolean
    legacy: Legacy
    professional?: Professional
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
    profile_banner_extensions: ProfileBannerExtensions
    profile_banner_url: string
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

export interface Legacy2 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities2
    extended_entities?: ExtendedEntities
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive?: boolean
    possibly_sensitive_editable?: boolean
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    source: string
    user_id_str: string
    id_str: string
    in_reply_to_screen_name?: string
    in_reply_to_status_id_str?: string
    in_reply_to_user_id_str?: string
    quoted_status_id_str?: string
    quoted_status_permalink?: QuotedStatusPermalink
    self_thread?: SelfThread
}

export interface Entities2 {
    media?: Medum[]
    user_mentions: UserMention[]
    urls: Url4[]
    hashtags: Hashtag[]
    symbols: any[]
}

export interface Medum {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    features: Features
    sizes: Sizes
    original_info: OriginalInfo
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface Features {
    large?: Large
    medium?: Medium
    small?: Small
    orig?: Orig
    all?: All
}

export interface Large {
    faces: Face[]
}

export interface Face {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium {
    faces: Face2[]
}

export interface Face2 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small {
    faces: Face3[]
}

export interface Face3 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig {
    faces: Face4[]
}

export interface Face4 {
    x: number
    y: number
    h: number
    w: number
}

export interface All {
    tags: Tag[]
}

export interface Tag {
    user_id: string
    name: string
    screen_name: string
    type: string
}

export interface Sizes {
    large: Large2
    medium: Medium2
    small: Small2
    thumb: Thumb
}

export interface Large2 {
    h: number
    w: number
    resize: string
}

export interface Medium2 {
    h: number
    w: number
    resize: string
}

export interface Small2 {
    h: number
    w: number
    resize: string
}

export interface Thumb {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo {
    height: number
    width: number
    focus_rects?: FocusRect[]
}

export interface FocusRect {
    x: number
    y: number
    w: number
    h: number
}

export interface UserMention {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url4 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Hashtag {
    indices: number[]
    text: string
}

export interface ExtendedEntities {
    media: Medum2[]
}

export interface Medum2 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_key: string
    media_url_https: string
    type: string
    url: string
    ext_media_color: ExtMediaColor
    ext_media_availability: ExtMediaAvailability
    features: Features2
    sizes: Sizes2
    original_info: OriginalInfo2
    additional_media_info?: AdditionalMediaInfo
    mediaStats?: MediaStats
    video_info?: VideoInfo
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface ExtMediaColor {
    palette: Palette3[]
}

export interface Palette3 {
    percentage: number
    rgb: Rgb3
}

export interface Rgb3 {
    blue: number
    green: number
    red: number
}

export interface ExtMediaAvailability {
    status: string
}

export interface Features2 {
    large?: Large3
    medium?: Medium3
    small?: Small3
    orig?: Orig2
    all?: All2
}

export interface Large3 {
    faces: Face5[]
}

export interface Face5 {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium3 {
    faces: Face6[]
}

export interface Face6 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small3 {
    faces: Face7[]
}

export interface Face7 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig2 {
    faces: Face8[]
}

export interface Face8 {
    x: number
    y: number
    h: number
    w: number
}

export interface All2 {
    tags: Tag2[]
}

export interface Tag2 {
    user_id: string
    name: string
    screen_name: string
    type: string
}

export interface Sizes2 {
    large: Large4
    medium: Medium4
    small: Small4
    thumb: Thumb2
}

export interface Large4 {
    h: number
    w: number
    resize: string
}

export interface Medium4 {
    h: number
    w: number
    resize: string
}

export interface Small4 {
    h: number
    w: number
    resize: string
}

export interface Thumb2 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo2 {
    height: number
    width: number
    focus_rects?: FocusRect2[]
}

export interface FocusRect2 {
    x: number
    y: number
    w: number
    h: number
}

export interface AdditionalMediaInfo {
    monetizable: boolean
    source_user?: SourceUser
}

export interface SourceUser {
    user_results: UserResults2
}

export interface UserResults2 {
    result: Result4
}

export interface Result4 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel2
    has_nft_avatar: boolean
    legacy: Legacy3
}

export interface AffiliatesHighlightedLabel2 { }

export interface Legacy3 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities3
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
    profile_banner_extensions: ProfileBannerExtensions2
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions2
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

export interface Entities3 {
    description: Description2
}

export interface Description2 {
    urls: any[]
}

export interface ProfileBannerExtensions2 {
    mediaColor: MediaColor3
}

export interface MediaColor3 {
    r: R3
}

export interface R3 {
    ok?: Ok3
}

export interface Ok3 {
    palette: Palette4[]
}

export interface Palette4 {
    percentage: number
    rgb: Rgb4
}

export interface Rgb4 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions2 {
    mediaColor: MediaColor4
}

export interface MediaColor4 {
    r: R4
}

export interface R4 {
    ok: Ok4
}

export interface Ok4 {
    palette: Palette5[]
}

export interface Palette5 {
    percentage: number
    rgb: Rgb5
}

export interface Rgb5 {
    blue: number
    green: number
    red: number
}

export interface MediaStats {
    viewCount: number
}

export interface VideoInfo {
    aspect_ratio: number[]
    duration_millis: number
    variants: Variant[]
}

export interface Variant {
    bitrate?: number
    content_type: string
    url: string
}

export interface QuotedStatusPermalink {
    url: string
    expanded: string
    display: string
}

export interface SelfThread {
    id_str: string
}

export interface Card {
    rest_id: string
    legacy: Legacy4
}

export interface Legacy4 {
    binding_values: BindingValue[]
    card_platform: CardPlatform
    name: string
    url: string
    user_refs: UserRef[]
}

export interface BindingValue {
    key: string
    value: Value
}

export interface Value {
    image_value?: ImageValue
    type: string
    string_value?: string
    scribe_key?: string
    user_value?: UserValue
    image_color_value?: ImageColorValue
}

export interface ImageValue {
    alt: string
    height: number
    width: number
    url: string
}

export interface UserValue {
    id_str: string
    path: any[]
}

export interface ImageColorValue {
    palette: Palette6[]
}

export interface Palette6 {
    rgb: Rgb6
    percentage: number
}

export interface Rgb6 {
    blue: number
    green: number
    red: number
}

export interface CardPlatform {
    platform: Platform
}

export interface Platform {
    audience: Audience
    device: Device
}

export interface Audience {
    name: string
}

export interface Device {
    name: string
    version: string
}

export interface UserRef {
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel3
    has_nft_avatar: boolean
    legacy: Legacy5
}

export interface AffiliatesHighlightedLabel3 { }

export interface Legacy5 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities4
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
    pinned_tweet_ids_str: any[]
    profile_banner_extensions: ProfileBannerExtensions3
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions3
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities4 {
    description: Description3
    url: Url5
}

export interface Description3 {
    urls: any[]
}

export interface Url5 {
    urls: Url6[]
}

export interface Url6 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions3 {
    mediaColor: MediaColor5
}

export interface MediaColor5 {
    r: R5
}

export interface R5 {
    ok: Ok5
}

export interface Ok5 {
    palette: Palette7[]
}

export interface Palette7 {
    percentage: number
    rgb: Rgb7
}

export interface Rgb7 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions3 {
    mediaColor: MediaColor6
}

export interface MediaColor6 {
    r: R6
}

export interface R6 {
    ok: Ok6
}

export interface Ok6 {
    palette: Palette8[]
}

export interface Palette8 {
    percentage: number
    rgb: Rgb8
}

export interface Rgb8 {
    blue: number
    green: number
    red: number
}

export interface QuotedStatusResult {
    result: Result5
}

export interface Result5 {
    __typename: string
    rest_id: string
    core: Core2
    legacy: Legacy7
}

export interface Core2 {
    user_results: UserResults3
}

export interface UserResults3 {
    result: Result6
}

export interface Result6 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel4
    has_nft_avatar: boolean
    legacy: Legacy6
    professional?: Professional2
}

export interface AffiliatesHighlightedLabel4 { }

export interface Legacy6 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities5
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
    profile_banner_extensions: ProfileBannerExtensions4
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions4
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities5 {
    description: Description4
    url: Url7
}

export interface Description4 {
    urls: any[]
}

export interface Url7 {
    urls: Url8[]
}

export interface Url8 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions4 {
    mediaColor: MediaColor7
}

export interface MediaColor7 {
    r: R7
}

export interface R7 {
    ok: Ok7
}

export interface Ok7 {
    palette: Palette9[]
}

export interface Palette9 {
    percentage: number
    rgb: Rgb9
}

export interface Rgb9 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions4 {
    mediaColor: MediaColor8
}

export interface MediaColor8 {
    r: R8
}

export interface R8 {
    ok: Ok8
}

export interface Ok8 {
    palette: Palette10[]
}

export interface Palette10 {
    percentage: number
    rgb: Rgb10
}

export interface Rgb10 {
    blue: number
    green: number
    red: number
}

export interface Professional2 {
    rest_id: string
    professional_type: string
    category: Category2[]
}

export interface Category2 {
    id: number
    name: string
}

export interface Legacy7 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities6
    extended_entities?: ExtendedEntities2
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive?: boolean
    possibly_sensitive_editable?: boolean
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    source: string
    user_id_str: string
    id_str: string
}

export interface Entities6 {
    media?: Medum3[]
    user_mentions: UserMention2[]
    urls: any[]
    hashtags: any[]
    symbols: any[]
}

export interface Medum3 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    features: Features3
    sizes: Sizes3
    original_info: OriginalInfo3
}

export interface Features3 { }

export interface Sizes3 {
    large: Large5
    medium: Medium5
    small: Small5
    thumb: Thumb3
}

export interface Large5 {
    h: number
    w: number
    resize: string
}

export interface Medium5 {
    h: number
    w: number
    resize: string
}

export interface Small5 {
    h: number
    w: number
    resize: string
}

export interface Thumb3 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo3 {
    height: number
    width: number
}

export interface UserMention2 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface ExtendedEntities2 {
    media: Medum4[]
}

export interface Medum4 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_key: string
    media_url_https: string
    type: string
    url: string
    additional_media_info: AdditionalMediaInfo2
    ext_media_color: ExtMediaColor2
    mediaStats: MediaStats2
    ext_media_availability: ExtMediaAvailability2
    features: Features4
    sizes: Sizes4
    original_info: OriginalInfo4
    video_info: VideoInfo2
}

export interface AdditionalMediaInfo2 {
    monetizable: boolean
}

export interface ExtMediaColor2 {
    palette: Palette11[]
}

export interface Palette11 {
    percentage: number
    rgb: Rgb11
}

export interface Rgb11 {
    blue: number
    green: number
    red: number
}

export interface MediaStats2 {
    viewCount: number
}

export interface ExtMediaAvailability2 {
    status: string
}

export interface Features4 { }

export interface Sizes4 {
    large: Large6
    medium: Medium6
    small: Small6
    thumb: Thumb4
}

export interface Large6 {
    h: number
    w: number
    resize: string
}

export interface Medium6 {
    h: number
    w: number
    resize: string
}

export interface Small6 {
    h: number
    w: number
    resize: string
}

export interface Thumb4 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo4 {
    height: number
    width: number
}

export interface VideoInfo2 {
    aspect_ratio: number[]
    duration_millis: number
    variants: Variant2[]
}

export interface Variant2 {
    bitrate?: number
    content_type: string
    url: string
}

export interface ResponseObjects {
    feedbackActions: any[]
    immediateReactions: any[]
}
