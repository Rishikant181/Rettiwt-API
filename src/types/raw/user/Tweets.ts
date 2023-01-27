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
    __typename: string
    itemContent?: ItemContent
    items?: Item[]
    metadata?: Metadata
    displayType?: string
    clientEventInfo?: ClientEventInfo2
    value?: string
    cursorType?: string
    stopOnEmptyResponse?: boolean
}

export interface ItemContent {
    itemType: string
    __typename: string
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
    unmention_data: UnmentionData
    edit_control: EditControl
    edit_perspective: EditPerspective
    is_translatable: boolean
    views: Views
    source: string
    quoted_status_result?: QuotedStatusResult
    legacy: Legacy4
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
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
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
    pinned_tweet_ids_str: any[]
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

export interface UnmentionData { }

export interface EditControl {
    edit_tweet_ids: string[]
    editable_until_msecs: string
    is_edit_eligible: boolean
    edits_remaining: string
}

export interface EditPerspective {
    favorited: boolean
    retweeted: boolean
}

export interface Views {
    count: string
    state: string
}

export interface QuotedStatusResult {
    result: Result4
}

export interface Result4 {
    __typename: string
    rest_id: string
    core: Core2
    unmention_data: UnmentionData2
    edit_control: EditControl2
    edit_perspective: EditPerspective2
    is_translatable: boolean
    views: Views2
    source: string
    legacy: Legacy3
}

export interface Core2 {
    user_results: UserResults2
}

export interface UserResults2 {
    result: Result5
}

export interface Result5 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel2
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy2
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel2 { }

export interface Legacy2 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities2
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
    profile_banner_extensions: ProfileBannerExtensions2
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions2
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

export interface Entities2 {
    description: Description2
    url: Url
}

export interface Description2 {
    urls: any[]
}

export interface Url {
    urls: Url2[]
}

export interface Url2 {
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

export interface UnmentionData2 { }

export interface EditControl2 {
    edit_tweet_ids: string[]
    editable_until_msecs: string
    is_edit_eligible: boolean
    edits_remaining: string
}

export interface EditPerspective2 {
    favorited: boolean
    retweeted: boolean
}

export interface Views2 {
    count: string
    state: string
}

export interface Legacy3 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities3
    extended_entities: ExtendedEntities
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive: boolean
    possibly_sensitive_editable: boolean
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
}

export interface Entities3 {
    media: Medum[]
    user_mentions: UserMention[]
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

export interface UserMention {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
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

export interface Legacy4 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities4
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    quote_count: number
    quoted_status_id_str?: string
    quoted_status_permalink?: QuotedStatusPermalink
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
    retweeted_status_result?: RetweetedStatusResult
}

export interface Entities4 {
    user_mentions: UserMention2[]
    urls: any[]
    hashtags: any[]
    symbols: any[]
}

export interface UserMention2 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface QuotedStatusPermalink {
    url: string
    expanded: string
    display: string
}

export interface RetweetedStatusResult {
    result: Result6
}

export interface Result6 {
    __typename: string
    rest_id: string
    core: Core3
    unmention_data: UnmentionData3
    edit_control: EditControl3
    edit_perspective: EditPerspective3
    is_translatable: boolean
    views: Views3
    source: string
    legacy: Legacy6
}

export interface Core3 {
    user_results: UserResults3
}

export interface UserResults3 {
    result: Result7
}

export interface Result7 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel3
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy5
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
    professional?: Professional
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
    possibly_sensitive: boolean
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
    verified_type: string
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities5 {
    description: Description3
    url: Url3
}

export interface Description3 {
    urls: any[]
}

export interface Url3 {
    urls: Url4[]
}

export interface Url4 {
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

export interface Professional {
    rest_id: string
    professional_type: string
    category: any[]
}

export interface UnmentionData3 { }

export interface EditControl3 {
    edit_tweet_ids: string[]
    editable_until_msecs: string
    is_edit_eligible: boolean
    edits_remaining: string
}

export interface EditPerspective3 {
    favorited: boolean
    retweeted: boolean
}

export interface Views3 {
    count: string
    state: string
}

export interface Legacy6 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities6
    extended_entities: ExtendedEntities2
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive: boolean
    possibly_sensitive_editable: boolean
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
    self_thread?: SelfThread
}

export interface Entities6 {
    media: Medum3[]
    user_mentions: any[]
    urls: Url5[]
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

export interface Features3 {
    large?: Large5
    medium?: Medium5
    small?: Small5
    orig?: Orig3
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
    focus_rects?: FocusRect3[]
}

export interface FocusRect3 {
    x: number
    y: number
    w: number
    h: number
}

export interface Url5 {
    display_url: string
    expanded_url: string
    url: string
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
    additional_media_info?: AdditionalMediaInfo
    ext_media_color: ExtMediaColor2
    mediaStats?: MediaStats
    ext_media_availability: ExtMediaAvailability2
    features: Features4
    sizes: Sizes4
    original_info: OriginalInfo4
    video_info?: VideoInfo
}

export interface AdditionalMediaInfo {
    monetizable: boolean
}

export interface ExtMediaColor2 {
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

export interface MediaStats {
    viewCount: number
}

export interface ExtMediaAvailability2 {
    status: string
}

export interface Features4 {
    large?: Large7
    medium?: Medium7
    small?: Small7
    orig?: Orig4
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
    focus_rects?: FocusRect4[]
}

export interface FocusRect4 {
    x: number
    y: number
    w: number
    h: number
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

export interface SelfThread {
    id_str: string
}

export interface Item {
    entryId: string
    dispensable: boolean
    item: Item2
}

export interface Item2 {
    itemContent: ItemContent2
    clientEventInfo: ClientEventInfo
}

export interface ItemContent2 {
    itemType: string
    __typename: string
    tweet_results: TweetResults2
    tweetDisplayType: string
}

export interface TweetResults2 {
    result: Result8
}

export interface Result8 {
    __typename: string
    rest_id: string
    core: Core4
    unmention_data: UnmentionData4
    edit_control: EditControl4
    edit_perspective: EditPerspective4
    is_translatable: boolean
    views: Views4
    source: string
    legacy: Legacy8
    card?: Card
    unified_card?: UnifiedCard
    quoted_status_result?: QuotedStatusResult2
    previous_counts?: PreviousCounts
}

export interface Core4 {
    user_results: UserResults4
}

export interface UserResults4 {
    result: Result9
}

export interface Result9 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel4
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy7
    professional?: Professional2
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel4 { }

export interface Legacy7 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities7
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
    profile_banner_extensions?: ProfileBannerExtensions4
    profile_banner_url?: string
    profile_image_extensions: ProfileImageExtensions4
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

export interface Entities7 {
    description: Description4
    url?: Url7
}

export interface Description4 {
    urls: Url6[]
}

export interface Url6 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
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
    category: Category[]
}

export interface Category {
    id: number
    name: string
    icon_name: string
}

export interface UnmentionData4 { }

export interface EditControl4 {
    edit_tweet_ids?: string[]
    editable_until_msecs?: string
    is_edit_eligible?: boolean
    edits_remaining?: string
    initial_tweet_id?: string
    edit_control_initial?: EditControlInitial
}

export interface EditControlInitial {
    edit_tweet_ids: string[]
    editable_until_msecs: string
    is_edit_eligible: boolean
    edits_remaining: string
}

export interface EditPerspective4 {
    favorited: boolean
    retweeted: boolean
}

export interface Views4 {
    count: string
    state: string
}

export interface Legacy8 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities8
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
    in_reply_to_screen_name?: string
    in_reply_to_status_id_str?: string
    in_reply_to_user_id_str?: string
    possibly_sensitive?: boolean
    possibly_sensitive_editable?: boolean
    extended_entities?: ExtendedEntities3
    self_thread?: SelfThread2
    quoted_status_id_str?: string
    quoted_status_permalink?: QuotedStatusPermalink2
}

export interface Entities8 {
    user_mentions: UserMention3[]
    urls: Url9[]
    hashtags: any[]
    symbols: any[]
    media?: Medum5[]
}

export interface UserMention3 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url9 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Medum5 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    features: Features5
    sizes: Sizes5
    original_info: OriginalInfo5
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface Features5 {
    all?: All
    large?: Large9
    medium?: Medium9
    small?: Small9
    orig?: Orig5
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

export interface Large9 {
    faces: Face9[]
}

export interface Face9 {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium9 {
    faces: Face10[]
}

export interface Face10 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small9 {
    faces: Face11[]
}

export interface Face11 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig5 {
    faces: Face12[]
}

export interface Face12 {
    x: number
    y: number
    h: number
    w: number
}

export interface Sizes5 {
    large: Large10
    medium: Medium10
    small: Small10
    thumb: Thumb5
}

export interface Large10 {
    h: number
    w: number
    resize: string
}

export interface Medium10 {
    h: number
    w: number
    resize: string
}

export interface Small10 {
    h: number
    w: number
    resize: string
}

export interface Thumb5 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo5 {
    height: number
    width: number
    focus_rects?: FocusRect5[]
}

export interface FocusRect5 {
    x: number
    y: number
    w: number
    h: number
}

export interface ExtendedEntities3 {
    media: Medum6[]
}

export interface Medum6 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_key: string
    media_url_https: string
    type: string
    url: string
    ext_media_color: ExtMediaColor3
    ext_media_availability: ExtMediaAvailability3
    features: Features6
    sizes: Sizes6
    original_info: OriginalInfo6
    additional_media_info?: AdditionalMediaInfo2
    mediaStats?: MediaStats2
    video_info?: VideoInfo2
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface ExtMediaColor3 {
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

export interface ExtMediaAvailability3 {
    status: string
}

export interface Features6 {
    all?: All2
    large?: Large11
    medium?: Medium11
    small?: Small11
    orig?: Orig6
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

export interface Large11 {
    faces: Face13[]
}

export interface Face13 {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium11 {
    faces: Face14[]
}

export interface Face14 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small11 {
    faces: Face15[]
}

export interface Face15 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig6 {
    faces: Face16[]
}

export interface Face16 {
    x: number
    y: number
    h: number
    w: number
}

export interface Sizes6 {
    large: Large12
    medium: Medium12
    small: Small12
    thumb: Thumb6
}

export interface Large12 {
    h: number
    w: number
    resize: string
}

export interface Medium12 {
    h: number
    w: number
    resize: string
}

export interface Small12 {
    h: number
    w: number
    resize: string
}

export interface Thumb6 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo6 {
    height: number
    width: number
    focus_rects?: FocusRect6[]
}

export interface FocusRect6 {
    x: number
    y: number
    w: number
    h: number
}

export interface AdditionalMediaInfo2 {
    monetizable: boolean
    source_user?: SourceUser
}

export interface SourceUser {
    user_results: UserResults5
}

export interface UserResults5 {
    result: Result10
}

export interface Result10 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel5
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy9
    professional: Professional3
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel5 { }

export interface Legacy9 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities9
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
    profile_banner_extensions: ProfileBannerExtensions5
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions5
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

export interface Entities9 {
    description: Description5
    url: Url11
}

export interface Description5 {
    urls: Url10[]
}

export interface Url10 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url11 {
    urls: Url12[]
}

export interface Url12 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions5 {
    mediaColor: MediaColor9
}

export interface MediaColor9 {
    r: R9
}

export interface R9 {
    ok: Ok9
}

export interface Ok9 {
    palette: Palette12[]
}

export interface Palette12 {
    percentage: number
    rgb: Rgb12
}

export interface Rgb12 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions5 {
    mediaColor: MediaColor10
}

export interface MediaColor10 {
    r: R10
}

export interface R10 {
    ok: Ok10
}

export interface Ok10 {
    palette: Palette13[]
}

export interface Palette13 {
    percentage: number
    rgb: Rgb13
}

export interface Rgb13 {
    blue: number
    green: number
    red: number
}

export interface Professional3 {
    rest_id: string
    professional_type: string
    category: Category2[]
}

export interface Category2 {
    id: number
    name: string
    icon_name: string
}

export interface MediaStats2 {
    viewCount: number
}

export interface VideoInfo2 {
    aspect_ratio: number[]
    duration_millis?: number
    variants: Variant2[]
}

export interface Variant2 {
    bitrate?: number
    content_type: string
    url: string
}

export interface SelfThread2 {
    id_str: string
}

export interface QuotedStatusPermalink2 {
    url: string
    expanded: string
    display: string
}

export interface Card {
    rest_id: string
    legacy: Legacy10
}

export interface Legacy10 {
    binding_values: BindingValue[]
    card_platform: CardPlatform
    name: string
    url: string
    user_refs_results: UserRefsResult[]
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
    height: number
    width: number
    url: string
}

export interface UserValue {
    id_str: string
    path: any[]
}

export interface ImageColorValue {
    palette: Palette14[]
}

export interface Palette14 {
    rgb: Rgb14
    percentage: number
}

export interface Rgb14 {
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

export interface UserRefsResult {
    result: Result11
}

export interface Result11 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel6
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy11
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel6 { }

export interface Legacy11 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities10
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
    profile_banner_extensions: ProfileBannerExtensions6
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions6
    profile_image_url_https: string
    profile_interstitial_type: string
    protected: boolean
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    verified_type?: string
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities10 {
    description: Description6
    url: Url14
}

export interface Description6 {
    urls: Url13[]
}

export interface Url13 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url14 {
    urls: Url15[]
}

export interface Url15 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions6 {
    mediaColor: MediaColor11
}

export interface MediaColor11 {
    r: R11
}

export interface R11 {
    ok: Ok11
}

export interface Ok11 {
    palette: Palette15[]
}

export interface Palette15 {
    percentage: number
    rgb: Rgb15
}

export interface Rgb15 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions6 {
    mediaColor: MediaColor12
}

export interface MediaColor12 {
    r: R12
}

export interface R12 {
    ok: Ok12
}

export interface Ok12 {
    palette: Palette16[]
}

export interface Palette16 {
    percentage: number
    rgb: Rgb16
}

export interface Rgb16 {
    blue: number
    green: number
    red: number
}

export interface UnifiedCard {
    card_fetch_state: string
}

export interface QuotedStatusResult2 {
    result: Result12
}

export interface Result12 {
    __typename: string
    rest_id: string
    core: Core5
    unmention_data: UnmentionData5
    edit_control: EditControl5
    edit_perspective: EditPerspective5
    is_translatable: boolean
    views: Views5
    source: string
    legacy: Legacy13
}

export interface Core5 {
    user_results: UserResults6
}

export interface UserResults6 {
    result: Result13
}

export interface Result13 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel7
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy12
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
    professional?: Professional4
}

export interface AffiliatesHighlightedLabel7 { }

export interface Legacy12 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities11
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
    profile_banner_extensions: ProfileBannerExtensions7
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions7
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

export interface Entities11 {
    description: Description7
    url: Url17
}

export interface Description7 {
    urls: Url16[]
}

export interface Url16 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url17 {
    urls: Url18[]
}

export interface Url18 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions7 {
    mediaColor: MediaColor13
}

export interface MediaColor13 {
    r: R13
}

export interface R13 {
    ok: Ok13
}

export interface Ok13 {
    palette: Palette17[]
}

export interface Palette17 {
    percentage: number
    rgb: Rgb17
}

export interface Rgb17 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions7 {
    mediaColor: MediaColor14
}

export interface MediaColor14 {
    r: R14
}

export interface R14 {
    ok: Ok14
}

export interface Ok14 {
    palette: Palette18[]
}

export interface Palette18 {
    percentage: number
    rgb: Rgb18
}

export interface Rgb18 {
    blue: number
    green: number
    red: number
}

export interface Professional4 {
    rest_id: string
    professional_type: string
    category: Category3[]
}

export interface Category3 {
    id: number
    name: string
    icon_name: string
}

export interface UnmentionData5 { }

export interface EditControl5 {
    edit_tweet_ids: string[]
    editable_until_msecs: string
    is_edit_eligible: boolean
    edits_remaining: string
}

export interface EditPerspective5 {
    favorited: boolean
    retweeted: boolean
}

export interface Views5 {
    count: string
    state: string
}

export interface Legacy13 {
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities12
    extended_entities: ExtendedEntities4
    favorite_count: number
    favorited: boolean
    full_text: string
    is_quote_status: boolean
    lang: string
    possibly_sensitive: boolean
    possibly_sensitive_editable: boolean
    quote_count: number
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
}

export interface Entities12 {
    media: Medum7[]
    user_mentions: UserMention4[]
    urls: Url19[]
    hashtags: Hashtag[]
    symbols: any[]
}

export interface Medum7 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    features: Features7
    sizes: Sizes7
    original_info: OriginalInfo7
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface Features7 {
    large?: Large13
    medium?: Medium13
    small?: Small13
    orig?: Orig7
}

export interface Large13 {
    faces: Face17[]
}

export interface Face17 {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium13 {
    faces: Face18[]
}

export interface Face18 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small13 {
    faces: Face19[]
}

export interface Face19 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig7 {
    faces: Face20[]
}

export interface Face20 {
    x: number
    y: number
    h: number
    w: number
}

export interface Sizes7 {
    large: Large14
    medium: Medium14
    small: Small14
    thumb: Thumb7
}

export interface Large14 {
    h: number
    w: number
    resize: string
}

export interface Medium14 {
    h: number
    w: number
    resize: string
}

export interface Small14 {
    h: number
    w: number
    resize: string
}

export interface Thumb7 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo7 {
    height: number
    width: number
    focus_rects?: FocusRect7[]
}

export interface FocusRect7 {
    x: number
    y: number
    w: number
    h: number
}

export interface UserMention4 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url19 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Hashtag {
    indices: number[]
    text: string
}

export interface ExtendedEntities4 {
    media: Medum8[]
}

export interface Medum8 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_key: string
    media_url_https: string
    type: string
    url: string
    ext_media_color: ExtMediaColor4
    ext_media_availability: ExtMediaAvailability4
    features: Features8
    sizes: Sizes8
    original_info: OriginalInfo8
    source_status_id_str?: string
    source_user_id_str?: string
    additional_media_info?: AdditionalMediaInfo3
    mediaStats?: MediaStats3
    video_info?: VideoInfo3
}

export interface ExtMediaColor4 {
    palette: Palette19[]
}

export interface Palette19 {
    percentage: number
    rgb: Rgb19
}

export interface Rgb19 {
    blue: number
    green: number
    red: number
}

export interface ExtMediaAvailability4 {
    status: string
}

export interface Features8 {
    large?: Large15
    medium?: Medium15
    small?: Small15
    orig?: Orig8
}

export interface Large15 {
    faces: Face21[]
}

export interface Face21 {
    x: number
    y: number
    h: number
    w: number
}

export interface Medium15 {
    faces: Face22[]
}

export interface Face22 {
    x: number
    y: number
    h: number
    w: number
}

export interface Small15 {
    faces: Face23[]
}

export interface Face23 {
    x: number
    y: number
    h: number
    w: number
}

export interface Orig8 {
    faces: Face24[]
}

export interface Face24 {
    x: number
    y: number
    h: number
    w: number
}

export interface Sizes8 {
    large: Large16
    medium: Medium16
    small: Small16
    thumb: Thumb8
}

export interface Large16 {
    h: number
    w: number
    resize: string
}

export interface Medium16 {
    h: number
    w: number
    resize: string
}

export interface Small16 {
    h: number
    w: number
    resize: string
}

export interface Thumb8 {
    h: number
    w: number
    resize: string
}

export interface OriginalInfo8 {
    height: number
    width: number
    focus_rects?: FocusRect8[]
}

export interface FocusRect8 {
    x: number
    y: number
    w: number
    h: number
}

export interface AdditionalMediaInfo3 {
    monetizable: boolean
    source_user: SourceUser2
}

export interface SourceUser2 {
    user_results: UserResults7
}

export interface UserResults7 {
    result: Result14
}

export interface Result14 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel8
    has_graduated_access: boolean
    has_nft_avatar: boolean
    is_blue_verified: boolean
    legacy: Legacy14
    professional: Professional5
    super_follow_eligible: boolean
    super_followed_by: boolean
    super_following: boolean
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel8 { }

export interface Legacy14 {
    blocked_by: boolean
    blocking: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities13
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
    profile_banner_extensions: ProfileBannerExtensions8
    profile_banner_url: string
    profile_image_extensions: ProfileImageExtensions8
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

export interface Entities13 {
    description: Description8
    url: Url21
}

export interface Description8 {
    urls: Url20[]
}

export interface Url20 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url21 {
    urls: Url22[]
}

export interface Url22 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface ProfileBannerExtensions8 {
    mediaColor: MediaColor15
}

export interface MediaColor15 {
    r: R15
}

export interface R15 {
    ok: Ok15
}

export interface Ok15 {
    palette: Palette20[]
}

export interface Palette20 {
    percentage: number
    rgb: Rgb20
}

export interface Rgb20 {
    blue: number
    green: number
    red: number
}

export interface ProfileImageExtensions8 {
    mediaColor: MediaColor16
}

export interface MediaColor16 {
    r: R16
}

export interface R16 {
    ok: Ok16
}

export interface Ok16 {
    palette: Palette21[]
}

export interface Palette21 {
    percentage: number
    rgb: Rgb21
}

export interface Rgb21 {
    blue: number
    green: number
    red: number
}

export interface Professional5 {
    rest_id: string
    professional_type: string
    category: Category4[]
}

export interface Category4 {
    id: number
    name: string
    icon_name: string
}

export interface MediaStats3 {
    viewCount: number
}

export interface VideoInfo3 {
    aspect_ratio: number[]
    duration_millis: number
    variants: Variant3[]
}

export interface Variant3 {
    bitrate?: number
    content_type: string
    url: string
}

export interface PreviousCounts {
    favorite_count: number
    quote_count: number
    reply_count: number
    retweet_count: number
}

export interface ClientEventInfo {
    component: string
    details: Details
}

export interface Details {
    timelinesDetails: TimelinesDetails
}

export interface TimelinesDetails {
    injectionType: string
    controllerData: string
}

export interface Metadata {
    conversationMetadata: ConversationMetadata
}

export interface ConversationMetadata {
    allTweetIds: string[]
    enableDeduplication: boolean
}

export interface ClientEventInfo2 {
    component: string
    details: Details2
}

export interface Details2 {
    timelinesDetails: TimelinesDetails2
}

export interface TimelinesDetails2 {
    injectionType: string
    controllerData: string
}

export interface ResponseObjects {
    feedbackActions: any[]
    immediateReactions: any[]
}
