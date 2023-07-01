export default interface Root {
    errors: Error[]
    data: Data
}

export interface Error {
    message: string
    locations: Location[]
    path: any[]
    extensions: Extensions
    code: number
    kind: string
    name: string
    source: string
    retry_after: number
    tracing: Tracing2
}

export interface Location {
    line: number
    column: number
}

export interface Extensions {
    name: string
    source: string
    retry_after: number
    code: number
    kind: string
    tracing: Tracing
}

export interface Tracing {
    trace_id: string
}

export interface Tracing2 {
    trace_id: string
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
    legacy: Legacy2
    quick_promote_eligibility: QuickPromoteEligibility
    card?: Card2
    unified_card?: UnifiedCard2
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
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy
    super_follow_eligible: boolean
    verified_phone_status: boolean
}

export interface Legacy {
    following: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: any[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
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

export interface Legacy2 {
    bookmark_count: number
    bookmarked: boolean
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities2
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
    retweeted_status_result?: RetweetedStatusResult
    possibly_sensitive?: boolean
    possibly_sensitive_editable?: boolean
    extended_entities?: ExtendedEntities2
    quoted_status_id_str?: string
    quoted_status_permalink?: QuotedStatusPermalink
}

export interface Entities2 {
    user_mentions: UserMention[]
    urls: Url[]
    hashtags: Hashtag[]
    symbols: any[]
    media?: Medum[]
}

export interface UserMention {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Hashtag {
    indices: number[]
    text: string
}

export interface Medum {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    sizes: Sizes
    original_info: OriginalInfo
    source_status_id_str?: string
    source_user_id_str?: string
}

export interface Sizes {
    large: Large
    medium: Medium
    small: Small
    thumb: Thumb
}

export interface Large {
    h: number
    w: number
    resize: string
}

export interface Medium {
    h: number
    w: number
    resize: string
}

export interface Small {
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

export interface RetweetedStatusResult {
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
    note_tweet?: NoteTweet
    legacy: Legacy4
    card?: Card
    unified_card?: UnifiedCard
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
    affiliates_highlighted_label: AffiliatesHighlightedLabel
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy3
    professional?: Professional
    verified_phone_status: boolean
    super_follow_eligible?: boolean
}

export interface AffiliatesHighlightedLabel {
    label?: Label
}

export interface Label {
    url: Url2
    badge: Badge
    description: string
    userLabelType: string
    userLabelDisplayType: string
}

export interface Url2 {
    url: string
    urlType: string
}

export interface Badge {
    url: string
}

export interface Legacy3 {
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities3
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: string[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    screen_name: string
    statuses_count: number
    translator_type: string
    url?: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
    following?: boolean
    verified_type?: string
}

export interface Entities3 {
    description: Description2
    url?: Url4
}

export interface Description2 {
    urls: Url3[]
}

export interface Url3 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url4 {
    urls: Url5[]
}

export interface Url5 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Professional {
    rest_id: string
    professional_type: string
    category: Category[]
}

export interface Category {
    id: number
    name: string
    icon_name: string
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

export interface NoteTweet {
    is_expandable: boolean
    note_tweet_results: NoteTweetResults
}

export interface NoteTweetResults {
    result: Result6
}

export interface Result6 {
    id: string
    text: string
    entity_set: EntitySet
    richtext: Richtext
}

export interface EntitySet {
    user_mentions: any[]
    urls: any[]
    hashtags: any[]
    symbols: any[]
}

export interface Richtext {
    richtext_tags: RichtextTag[]
}

export interface RichtextTag {
    from_index: number
    to_index: number
    richtext_types: string[]
}

export interface Legacy4 {
    bookmark_count: number
    bookmarked: boolean
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
    reply_count: number
    retweet_count: number
    retweeted: boolean
    user_id_str: string
    id_str: string
    possibly_sensitive?: boolean
    possibly_sensitive_editable?: boolean
    extended_entities?: ExtendedEntities
    self_thread?: SelfThread
    in_reply_to_screen_name?: string
    in_reply_to_status_id_str?: string
    in_reply_to_user_id_str?: string
}

export interface Entities4 {
    user_mentions: UserMention2[]
    urls: Url6[]
    hashtags: Hashtag2[]
    symbols: any[]
    media?: Medum2[]
}

export interface UserMention2 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url6 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Hashtag2 {
    indices: number[]
    text: string
}

export interface Medum2 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    sizes: Sizes2
    original_info: OriginalInfo2
}

export interface Sizes2 {
    large: Large2
    medium: Medium2
    small: Small2
    thumb: Thumb2
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

export interface ExtendedEntities {
    media: Medum3[]
}

export interface Medum3 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_key: string
    media_url_https: string
    type: string
    url: string
    ext_media_availability: ExtMediaAvailability
    sizes: Sizes3
    original_info: OriginalInfo3
    additional_media_info?: AdditionalMediaInfo
    mediaStats?: MediaStats
    video_info?: VideoInfo
}

export interface ExtMediaAvailability {
    status: string
}

export interface Sizes3 {
    large: Large3
    medium: Medium3
    small: Small3
    thumb: Thumb3
}

export interface Large3 {
    h: number
    w: number
    resize: string
}

export interface Medium3 {
    h: number
    w: number
    resize: string
}

export interface Small3 {
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

export interface AdditionalMediaInfo {
    monetizable: boolean
    title?: string
    description?: string
    embeddable?: boolean
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

export interface SelfThread {
    id_str: string
}

export interface Card {
    rest_id: string
    legacy: Legacy5
}

export interface Legacy5 {
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
    string_value?: string
    type: string
    scribe_key?: string
    user_value?: UserValue
    image_value?: ImageValue
    boolean_value?: boolean
    image_color_value?: ImageColorValue
}

export interface UserValue {
    id_str: string
    path: any[]
}

export interface ImageValue {
    height: number
    width: number
    url: string
}

export interface ImageColorValue {
    palette: Palette[]
}

export interface Palette {
    rgb: Rgb
    percentage: number
}

export interface Rgb {
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
    result: Result7
}

export interface Result7 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel2
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy6
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel2 { }

export interface Legacy6 {
    following: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities5
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: string[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
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
    url: Url8
}

export interface Description3 {
    urls: Url7[]
}

export interface Url7 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url8 {
    urls: Url9[]
}

export interface Url9 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface UnifiedCard {
    card_fetch_state: string
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
    ext_media_availability: ExtMediaAvailability2
    sizes: Sizes4
    original_info: OriginalInfo4
    source_status_id_str?: string
    source_user_id_str?: string
    additional_media_info?: AdditionalMediaInfo2
    mediaStats?: MediaStats2
    video_info?: VideoInfo2
}

export interface ExtMediaAvailability2 {
    status: string
}

export interface Sizes4 {
    large: Large4
    medium: Medium4
    small: Small4
    thumb: Thumb4
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

export interface AdditionalMediaInfo2 {
    monetizable: boolean
    source_user: SourceUser
    title?: string
    description?: string
    embeddable?: boolean
}

export interface SourceUser {
    user_results: UserResults3
}

export interface UserResults3 {
    result: Result8
}

export interface Result8 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel3
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy7
    professional?: Professional2
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel3 { }

export interface Legacy7 {
    following: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities6
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: string[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    verified_type: string
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities6 {
    description: Description4
    url: Url10
}

export interface Description4 {
    urls: any[]
}

export interface Url10 {
    urls: Url11[]
}

export interface Url11 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Professional2 {
    rest_id: string
    professional_type: string
    category: any[]
}

export interface MediaStats2 {
    viewCount: number
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

export interface QuotedStatusPermalink {
    url: string
    expanded: string
    display: string
}

export interface QuickPromoteEligibility {
    eligibility: string
}

export interface Card2 {
    rest_id: string
    legacy: Legacy8
}

export interface Legacy8 {
    binding_values: BindingValue2[]
    card_platform: CardPlatform2
    name: string
    url: string
    user_refs_results: UserRefsResult2[]
}

export interface BindingValue2 {
    key: string
    value: Value2
}

export interface Value2 {
    string_value?: string
    type: string
    scribe_key?: string
    user_value?: UserValue2
    image_value?: ImageValue2
    boolean_value?: boolean
    image_color_value?: ImageColorValue2
}

export interface UserValue2 {
    id_str: string
    path: any[]
}

export interface ImageValue2 {
    height: number
    width: number
    url: string
}

export interface ImageColorValue2 {
    palette: Palette2[]
}

export interface Palette2 {
    rgb: Rgb2
    percentage: number
}

export interface Rgb2 {
    blue: number
    green: number
    red: number
}

export interface CardPlatform2 {
    platform: Platform2
}

export interface Platform2 {
    audience: Audience2
    device: Device2
}

export interface Audience2 {
    name: string
}

export interface Device2 {
    name: string
    version: string
}

export interface UserRefsResult2 {
    result: Result9
}

export interface Result9 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel4
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy9
    verified_phone_status: boolean
}

export interface AffiliatesHighlightedLabel4 { }

export interface Legacy9 {
    following: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities7
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: string[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    verified_type: string
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities7 {
    description: Description5
    url: Url13
}

export interface Description5 {
    urls: Url12[]
}

export interface Url12 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface Url13 {
    urls: Url14[]
}

export interface Url14 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
}

export interface UnifiedCard2 {
    card_fetch_state: string
}

export interface QuotedStatusResult {
    result: Result10
}

export interface Result10 {
    __typename: string
    rest_id: string
    core: Core3
    unmention_data: UnmentionData3
    edit_control: EditControl3
    edit_perspective: EditPerspective3
    is_translatable: boolean
    views: Views3
    source: string
    legacy: Legacy11
}

export interface Core3 {
    user_results: UserResults4
}

export interface UserResults4 {
    result: Result11
}

export interface Result11 {
    __typename: string
    id: string
    rest_id: string
    affiliates_highlighted_label: AffiliatesHighlightedLabel5
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy10
    verified_phone_status: boolean
    professional?: Professional3
    super_follow_eligible?: boolean
}

export interface AffiliatesHighlightedLabel5 { }

export interface Legacy10 {
    following?: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities8
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: string[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    screen_name: string
    statuses_count: number
    translator_type: string
    url: string
    verified: boolean
    verified_type?: string
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities8 {
    description: Description6
    url: Url15
}

export interface Description6 {
    urls: any[]
}

export interface Url15 {
    urls: Url16[]
}

export interface Url16 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
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

export interface Legacy11 {
    bookmark_count: number
    bookmarked: boolean
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities9
    extended_entities?: ExtendedEntities3
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
    user_id_str: string
    id_str: string
    self_thread?: SelfThread2
}

export interface Entities9 {
    media?: Medum5[]
    user_mentions: UserMention3[]
    urls: Url17[]
    hashtags: any[]
    symbols: any[]
}

export interface Medum5 {
    display_url: string
    expanded_url: string
    id_str: string
    indices: number[]
    media_url_https: string
    type: string
    url: string
    sizes: Sizes5
    original_info: OriginalInfo5
}

export interface Sizes5 {
    large: Large5
    medium: Medium5
    small: Small5
    thumb: Thumb5
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

export interface UserMention3 {
    id_str: string
    name: string
    screen_name: string
    indices: number[]
}

export interface Url17 {
    display_url: string
    expanded_url: string
    url: string
    indices: number[]
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
    ext_media_availability: ExtMediaAvailability3
    sizes: Sizes6
    original_info: OriginalInfo6
    additional_media_info?: AdditionalMediaInfo3
    mediaStats?: MediaStats3
    video_info?: VideoInfo3
}

export interface ExtMediaAvailability3 {
    status: string
}

export interface Sizes6 {
    large: Large6
    medium: Medium6
    small: Small6
    thumb: Thumb6
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

export interface AdditionalMediaInfo3 {
    monetizable: boolean
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

export interface SelfThread2 {
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
    result: Result12
}

export interface Result12 {
    __typename: string
    rest_id: string
    core: Core4
    unmention_data: UnmentionData4
    edit_control: EditControl4
    edit_perspective: EditPerspective4
    is_translatable: boolean
    views: Views4
    source: string
    legacy: Legacy13
    quick_promote_eligibility: QuickPromoteEligibility2
    note_tweet?: NoteTweet2
}

export interface Core4 {
    user_results: UserResults5
}

export interface UserResults5 {
    result: Result13
}

export interface Result13 {
    __typename: string
    id: string
    rest_id: string
    has_graduated_access: boolean
    is_blue_verified: boolean
    profile_image_shape: string
    legacy: Legacy12
    super_follow_eligible: boolean
    verified_phone_status: boolean
}

export interface Legacy12 {
    following: boolean
    can_dm: boolean
    can_media_tag: boolean
    created_at: string
    default_profile: boolean
    default_profile_image: boolean
    description: string
    entities: Entities10
    fast_followers_count: number
    favourites_count: number
    followers_count: number
    friends_count: number
    has_custom_timelines: boolean
    is_translator: boolean
    listed_count: number
    location: string
    media_count: number
    name: string
    normal_followers_count: number
    pinned_tweet_ids_str: any[]
    possibly_sensitive: boolean
    profile_banner_url: string
    profile_image_url_https: string
    profile_interstitial_type: string
    screen_name: string
    statuses_count: number
    translator_type: string
    verified: boolean
    want_retweets: boolean
    withheld_in_countries: any[]
}

export interface Entities10 {
    description: Description7
}

export interface Description7 {
    urls: any[]
}

export interface UnmentionData4 { }

export interface EditControl4 {
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

export interface Legacy13 {
    bookmark_count: number
    bookmarked: boolean
    created_at: string
    conversation_id_str: string
    display_text_range: number[]
    entities: Entities11
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
    self_thread: SelfThread3
    in_reply_to_screen_name?: string
    in_reply_to_status_id_str?: string
    in_reply_to_user_id_str?: string
}

export interface Entities11 {
    user_mentions: any[]
    urls: any[]
    hashtags: Hashtag3[]
    symbols: any[]
}

export interface Hashtag3 {
    indices: number[]
    text: string
}

export interface SelfThread3 {
    id_str: string
}

export interface QuickPromoteEligibility2 {
    eligibility: string
}

export interface NoteTweet2 {
    is_expandable: boolean
    note_tweet_results: NoteTweetResults2
}

export interface NoteTweetResults2 {
    result: Result14
}

export interface Result14 {
    id: string
    text: string
    entity_set: EntitySet2
}

export interface EntitySet2 {
    user_mentions: any[]
    urls: any[]
    hashtags: any[]
    symbols: any[]
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
