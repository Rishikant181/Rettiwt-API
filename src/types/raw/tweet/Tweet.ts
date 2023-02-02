export default interface Root {
    data: Data
}

export interface Data {
    threaded_conversation_with_injections: ThreadedConversationWithInjections
}

export interface ThreadedConversationWithInjections {
    instructions: Instruction[]
    metadata: Metadata
}

export interface Instruction {
    type: string
    entries?: Entry[]
    direction?: string
}

export interface Entry {
    entryId: string
    sortIndex: string
    content: Content
}

export interface Content {
    entryType: string
    itemContent?: ItemContent
    items?: Item[]
    displayType?: string
    clientEventInfo?: ClientEventInfo2
}

export interface ItemContent {
    itemType: string
    value?: string
    cursorType?: string
    tweet_results?: TweetResults
    tweetDisplayType?: string
    hasModeratedReplies?: boolean
}

export interface TweetResults {
    result: Result
}

export interface Result {
    __typename: string
    rest_id: string
    core: Core
    unmention_info: UnmentionInfo
    legacy: Legacy2
    quick_promote_eligibility: QuickPromoteEligibility
}

export interface Core {
    user_results: UserResults
}

export interface UserResults {
    result: Result2
}

export interface Result2 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel
    has_nft_avatar: boolean
    legacy: Legacy
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
    possibly_sensitive: boolean
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

export interface UnmentionInfo { }

export interface Legacy2 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities2
    extended_entities: ExtendedEntities
    favorite_count: number
    favorited: boolean
    text: string
    in_reply_to_status_id_str: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive: boolean
    possibly_sensitive_editable: boolean
    quote_count: number
    quoted_status_id_str: string
    reply_count: number
    retweet_count: number
    retweeted: boolean
    source: string
    user_id_str: string
    id_str: string
    self_thread: SelfThread
}

export interface Entities2 {
    media: Medum[]
    user_mentions: any[]
    urls: any[]
    hashtags: any[]
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
}

export interface Features {
    large: Large
    medium: Medium
    small: Small
    orig: Orig
}

export interface Large {
    faces: any[]
}

export interface Medium {
    faces: any[]
}

export interface Small {
    faces: any[]
}

export interface Orig {
    faces: any[]
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
    focus_rects: FocusRect[]
}

export interface FocusRect {
    x: number
    y: number
    w: number
    h: number
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
    large: Large3
    medium: Medium3
    small: Small3
    orig: Orig2
}

export interface Large3 {
    faces: any[]
}

export interface Medium3 {
    faces: any[]
}

export interface Small3 {
    faces: any[]
}

export interface Orig2 {
    faces: any[]
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
    focus_rects: FocusRect2[]
}

export interface FocusRect2 {
    x: number
    y: number
    w: number
    h: number
}

export interface SelfThread {
    id_str: string
}

export interface QuickPromoteEligibility {
    eligibility: string
}

export interface Item {
    entryId: string
    item: Item2
}

export interface Item2 {
    itemContent: ItemContent2
    clientEventInfo: ClientEventInfo
}

export interface ItemContent2 {
    itemType: string
    tweet_results?: TweetResults2
    tweetDisplayType?: string
    value?: string
    cursorType?: string
    displayTreatment?: DisplayTreatment
}

export interface TweetResults2 {
    result: Result3
}

export interface Result3 {
    __typename: string
    rest_id: string
    core: Core2
    unmention_info: UnmentionInfo2
    legacy: Legacy4
    quick_promote_eligibility: QuickPromoteEligibility2
}

export interface Core2 {
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
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    professional?: Professional
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
    possibly_sensitive: boolean
    profile_banner_extensions?: ProfileBannerExtensions2
    profile_banner_url?: string
    profile_image_extensions?: ProfileImageExtensions2
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    url?: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities3 {
    description: Description2
    url?: Url2
}

export interface Description2 {
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

export interface ProfileBannerExtensions2 {
    mediaColor: MediaColor3
}

export interface MediaColor3 {
    r: R3
}

export interface R3 {
    ok: Ok3
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

export interface Professional {
    rest_id: string
    professional_type: string
    category: Category[]
}

export interface Category {
    id: number
    name: string
}

export interface UnmentionInfo2 { }

export interface Legacy4 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities4
    extended_entities?: ExtendedEntities2
    favorite_count: number
    favorited: boolean
    full_text: string
    in_reply_to_screen_name: string
    in_reply_to_status_id_str: string
    in_reply_to_user_id_str: string
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
    self_thread?: SelfThread2
}

export interface Entities4 {
    media?: Medum3[]
    user_mentions: UserMention[]
    urls: any[]
    hashtags: Hashtag[]
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

export interface Features3 {
    large: Large5
    medium: Medium5
    small: Small5
    orig: Orig3
}

export interface Large5 {
    faces: any[]
}

export interface Medium5 {
    faces: any[]
}

export interface Small5 {
    faces: any[]
}

export interface Orig3 {
    faces: any[]
}

export interface Sizes3 {
    large: Large6
    medium: Medium6
    small: Small6
    thumb: Thumb3
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

export interface Thumb3 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo3 {
    height: number
    width: number
    focus_rects: FocusRect3[]
}

export interface FocusRect3 {
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

export interface Hashtag {
    indices: number[]
    text: string
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
    ext_media_color: ExtMediaColor2
    ext_media_availability: ExtMediaAvailability2
    features: Features4
    sizes: Sizes4
    original_info: OriginalInfo4
}

export interface ExtMediaColor2 {
    palette: Palette6[]
}

export interface Palette6 {
    percentage: number
    rgb: Rgb6
}

export interface Rgb6 {
    blue: number
    green: number
    red: number
}

export interface ExtMediaAvailability2 {
    status: string
}

export interface Features4 {
    large: Large7
    medium: Medium7
    small: Small7
    orig: Orig4
}

export interface Large7 {
    faces: any[]
}

export interface Medium7 {
    faces: any[]
}

export interface Small7 {
    faces: any[]
}

export interface Orig4 {
    faces: any[]
}

export interface Sizes4 {
    large: Large8
    medium: Medium8
    small: Small8
    thumb: Thumb4
}

export interface Large8 {
    h: number
    w: number
    resize: string
}

export interface Medium8 {
    h: number
    w: number
    resize: string
}

export interface Small8 {
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
    focus_rects: FocusRect4[]
}

export interface FocusRect4 {
    x: number
    y: number
    w: number
    h: number
}

export interface SelfThread2 {
    id_str: string
}

export interface QuickPromoteEligibility2 {
    eligibility: string
}

export interface DisplayTreatment {
    actionText: string
}

export interface ClientEventInfo {
    details: Details
}

export interface Details {
    conversationDetails: ConversationDetails
    timelinesDetails?: TimelinesDetails
}

export interface ConversationDetails {
    conversationSection: string
}

export interface TimelinesDetails {
    controllerData: string
}

export interface ClientEventInfo2 {
    details: Details2
}

export interface Details2 {
    conversationDetails: ConversationDetails2
}

export interface ConversationDetails2 {
    conversationSection: string
}

export interface Metadata {
    reader_mode_config: ReaderModeConfig
}

export interface ReaderModeConfig {
    is_reader_mode_available: boolean
}
