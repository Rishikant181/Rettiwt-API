export default interface Root {
    globalObjects: GlobalObjects
    timeline: Timeline
    pageConfiguration: PageConfiguration
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

export interface Tweets { }

export interface Users { }

export interface Moments { }

export interface Cards { }

export interface Places { }

export interface Media { }

export interface Broadcasts { }

export interface Topics { }

export interface Lists { }

export interface Timeline {
    id: string
    instructions: Instruction[]
    responseObjects: ResponseObjects
}

export interface Instruction {
    clearCache?: ClearCache
    addEntries?: AddEntries
    terminateTimeline?: TerminateTimeline
}

export interface ClearCache { }

export interface AddEntries {
    entries: Entry[]
}

export interface Entry {
    entryId: string
    sortIndex: string
    content: Content
}

export interface Content {
    operation?: Operation
    timelineModule?: TimelineModule
}

export interface Operation {
    cursor: Cursor
}

export interface Cursor {
    value: string
    cursorType: string
}

export interface TimelineModule {
    items: Item[]
    displayType: string
    header: Header
    clientEventInfo: ClientEventInfo3
}

export interface Item {
    entryId: string
    item: Item2
}

export interface Item2 {
    content: Content2
    clientEventInfo: ClientEventInfo
    feedbackInfo: FeedbackInfo
}

export interface Content2 {
    trend: Trend
}

export interface Trend {
    name: string
    url: Url
    associatedCardUrls: any[]
    trendMetadata: TrendMetadata
    rank: string
}

export interface Url {
    urlType: string
    url: string
    urtEndpointOptions: UrtEndpointOptions
}

export interface UrtEndpointOptions {
    requestParams: RequestParams
}

export interface RequestParams {
    cd: string
}

export interface TrendMetadata {
    metaDescription?: string
    url: Url2
    domainContext: string
}

export interface Url2 {
    urlType: string
    url: string
    urtEndpointOptions: UrtEndpointOptions2
}

export interface UrtEndpointOptions2 {
    requestParams: RequestParams2
}

export interface RequestParams2 {
    cd: string
}

export interface ClientEventInfo {
    component: string
    element: string
    details: Details
}

export interface Details {
    guideDetails: GuideDetails
}

export interface GuideDetails {
    identifier: string
    token: string
    transparentGuideDetails: TransparentGuideDetails
}

export interface TransparentGuideDetails {
    trendMetadata: TrendMetadata2
}

export interface TrendMetadata2 {
    impressionId: string
    impressionToken: string
    position: number
    trendName: string
    relatedTerms?: string[]
    clusterId?: string
    associatedCuratedTweetIds: any[]
    containsCuratedTitle: boolean
    topicIds?: string[]
    displayedTopicId?: string
}

export interface FeedbackInfo {
    feedbackKeys: string[]
    feedbackMetadata: string
    clientEventInfo: ClientEventInfo2
}

export interface ClientEventInfo2 {
    component: string
    element: string
    action: string
}

export interface Header {
    text: string
    sticky: boolean
    displayType: string
}

export interface ClientEventInfo3 {
    component: string
    details: Details2
}

export interface Details2 {
    guideDetails: GuideDetails2
}

export interface GuideDetails2 {
    identifier: string
}

export interface TerminateTimeline {
    direction: string
}

export interface ResponseObjects {
    feedbackActions: FeedbackActions
}

export interface FeedbackActions {
    trend_irrelevant_content_feedback_key: TrendIrrelevantContentFeedbackKey
    spotlight_dismiss_feedback_key: SpotlightDismissFeedbackKey
    trend_abusive_feedback_key: TrendAbusiveFeedbackKey
    guide_not_interested_feedback_key: GuideNotInterestedFeedbackKey
    guide_see_more_feedback_key: GuideSeeMoreFeedbackKey
    trend_spam_feedback_key: TrendSpamFeedbackKey
    trend_low_quality_feedback_key: TrendLowQualityFeedbackKey
    guide_see_less_feedback_key: GuideSeeLessFeedbackKey
    trend_not_interested_in_this_feedback_key: TrendNotInterestedInThisFeedbackKey
    trend_abusive_or_harmful_feedback_key: TrendAbusiveOrHarmfulFeedbackKey
    guide_hide_topic_key: GuideHideTopicKey
    trend_duplicate_feedback_key: TrendDuplicateFeedbackKey
}

export interface TrendIrrelevantContentFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface SpotlightDismissFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface TrendAbusiveFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface GuideNotInterestedFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
    icon: string
}

export interface GuideSeeMoreFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface TrendSpamFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface TrendLowQualityFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface GuideSeeLessFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface TrendNotInterestedInThisFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface TrendAbusiveOrHarmfulFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface GuideHideTopicKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
    icon: string
}

export interface TrendDuplicateFeedbackKey {
    feedbackType: string
    prompt: string
    confirmation: string
    feedbackUrl: string
    hasUndoAction: boolean
    confirmationDisplayType: string
}

export interface PageConfiguration {
    id: string
    title: string
    tabs: Tabs
    scribeConfig: ScribeConfig2
}

export interface Tabs {
    tabs: Tab[]
    initialTabId: string
}

export interface Tab {
    id: string
    labelText: string
    urtEndpoint: UrtEndpoint
    scribeConfig: ScribeConfig
}

export interface UrtEndpoint {
    urlType: string
    url: string
    urtEndpointOptions: UrtEndpointOptions3
}

export interface UrtEndpointOptions3 {
    requestParams: RequestParams3
    cacheId?: string
}

export interface RequestParams3 {
    tab_category: string
    sc_category_id?: string
}

export interface ScribeConfig {
    page: string
    section: string
}

export interface ScribeConfig2 {
    page: string
    section: string
}
