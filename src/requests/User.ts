import qs from 'querystring';

import { AxiosRequestConfig } from 'axios';

import { RawAnalyticsGranularity, RawAnalyticsMetric } from '../enums/raw/Analytics';

/**
 * Collection of requests related to users.
 *
 * @public
 */
export class UserRequests {
	/**
	 * @param id - The id of the user whose affiliates are to be fetched.
	 * @param count - The number of affiliates to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of affiliates to fetch.
	 */
	public static affiliates(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/OVFfg1hExk_AygiMVSJd-Q/UserBusinessProfileTeamTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					teamName: 'NotAssigned',
					includePromotedContent: false,
					withClientEventToken: false,
					withVoice: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param fromTime - The start time of the analytic data to be fetched.
	 * @param toTime - The end time of the analytic data to be fetched.
	 * @param granularity - The granularity of the analytic data to be fetched.
	 * @param requestedMetrics - The metrics to be fetched.
	 * @param showVerifiedFollowers - Whether to show verified followers in the analytics.
	 */
	public static analytics(
		fromTime: Date,
		toTime: Date,
		granularity: RawAnalyticsGranularity,
		requestedMetrics: RawAnalyticsMetric[],
		showVerifiedFollowers: boolean,
	): AxiosRequestConfig {
		console.log(
			`Fetching analytics from ${fromTime?.toString()} to ${toTime?.toString()} with granularity ${granularity} and metrics ${requestedMetrics.join(', ')}`,
		);
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/LwtiA7urqM6eDeBheAFi5w/AccountOverviewQuery',
			params: {
				variables: JSON.stringify({
					/* eslint-disable @typescript-eslint/naming-convention */
					from_time: fromTime,
					to_time: toTime,
					granularity: granularity,
					requested_metrics: requestedMetrics,
					show_verified_followers: showVerifiedFollowers,
					/* eslint-enable @typescript-eslint/naming-convention */
				}),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param count - The number of bookmarks to fetch.
	 * @param cursor - The cursor to the batch of bookmarks to fetch.
	 */
	public static bookmarks(count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/-LGfdImKeQz0xS_jjUwzlA/Bookmarks',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					count: count,
					cursor: cursor,
					includePromotedContent: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param ids - The IDs of the users whose details are to be fetched.
	 */
	public static bulkDetailsByIds(ids: string[]): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/PyRggX3LQweP9nSF6PHliA/UsersByRestIds',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({ userIds: ids }),
				features: JSON.stringify({
					hidden_profile_likes_enabled: false,
					hidden_profile_subscriptions_enabled: false,
					responsive_web_graphql_exclude_directive_enabled: true,
					verified_phone_label_enabled: true,
					subscriptions_verification_info_verified_since_enabled: true,
					highlights_tweets_tab_ui_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: false,
					rweb_tipjar_consumption_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose details are to be fetched.
	 */
	public static detailsById(id: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/WJ7rCtezBVT6nk6VM5R8Bw/UserByRestId',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({ userId: id, withSafetyModeUserFields: true }),
				features: JSON.stringify({
					hidden_profile_subscriptions_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					highlights_tweets_tab_ui_enabled: true,
					responsive_web_twitter_article_notes_tab_enabled: true,
					subscriptions_feature_can_gift_premium: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param userName - The username of the user whose details are to be fetched.
	 */
	public static detailsByUsername(userName: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/1VOOyvKkiI3FMmkeDNxM9A/UserByScreenName',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({ screen_name: userName, withSafetyModeUserFields: true }),
				features: JSON.stringify({
					hidden_profile_subscriptions_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					subscriptions_verification_info_is_identity_verified_enabled: true,
					subscriptions_verification_info_verified_since_enabled: true,
					highlights_tweets_tab_ui_enabled: true,
					responsive_web_twitter_article_notes_tab_enabled: true,
					subscriptions_feature_can_gift_premium: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				}),
				fieldToggles: JSON.stringify({ withAuxiliaryUserLabels: true }),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user to follow.
	 */
	public static follow(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/1.1/friendships/create.json',
			data: qs.stringify({
				/* eslint-disable @typescript-eslint/naming-convention */
				user_id: id,
				/* eslint-enable @typescript-eslint/naming-convention */
			}),
		};
	}

	/**
	 * @param count - The number of timeline items to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of followed timeline items to fetch.
	 */
	public static followed(count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/CRprHpVA12yhsub-KRERIg/HomeLatestTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					latestControlAvailable: true,
					withCommunity: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose followers are to be fetched.
	 * @param count - The number of followers to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of followers to fetch.
	 */
	public static followers(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/Elc_-qTARceHpztqhI9PQA/Followers',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose followings are to be fetched.
	 * @param count - The number of followings to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of followings to fetch.
	 */
	public static following(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/C1qZ6bs-L3oc_TKSZyxkXQ/Following',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose highlights are to be fetched.
	 * @param count - The number of highlights to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of highlights to fetch.
	 */
	public static highlights(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/cr8FsaThDCa9LKeD9CNZ4w/UserHighlightsTweets',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					withVoice: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose likes are to be fetched.
	 * @param count - The number of likes to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of likes to fetch.
	 */
	public static likes(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/eQl7iWsCr2fChppuJdAeRw/Likes',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					withClientEventToken: false,
					withBirdwatchNotes: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose lists are to be fetched.
	 * @param count - The number of lists to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of lists to fetch.
	 */
	public static lists(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/tZg2CHWw-NAL0nKO2Q-P4Q/ListsManagementPageTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({ count: 100, cursor: cursor }),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					payments_enabled: false,
					rweb_xchat_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: true,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_grok_community_note_auto_translation_is_enabled: false,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose media is to be fetched.
	 * @param count - The number of media to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of media to fetch.
	 */
	public static media(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/vFPc2LVIu7so2uA_gHQAdg/UserMedia',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					withClientEventToken: false,
					withBirdwatchNotes: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param count - The number of notifications to fetch.
	 * @param cursor - The cursor to the batch of notifications to fetch.
	 */
	public static notifications(count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/gaBVLalXDBRDJz6maKgdWg/NotificationsTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					timeline_type: 'All',
					count: count,
					cursor: cursor,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param count - The number of timeline items to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of recommended timeline items to fetch.
	 */
	public static recommended(count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/Q_P3YVnmHunGFkZ8ISM-7w/HomeTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					latestControlAvailable: true,
					withCommunity: false,
					seenTweetIds: [],
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	public static scheduled(): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/ITtjAzvlZni2wWXwf295Qg/FetchScheduledTweets?variables=%7B%22ascending%22%3Atrue%7D',
			params: {
				variables: JSON.stringify({ ascending: true }),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose subscriptions are to be fetched.
	 * @param count - The number of subscriptions to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of subscriptions to fetch.
	 */
	public static subscriptions(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/UWlxAhUnBNK0BYmeqNPqAw/UserCreatorSubscriptions',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
				}),
				features: JSON.stringify({
					responsive_web_graphql_exclude_directive_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					tweetypie_unmention_optimization_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					rweb_video_timestamps_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose timeline tweets are to be fetched.
	 * @param count - The number of timeline tweets to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of timeline tweets to fetch.
	 */
	public static tweets(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/HeWHY26ItCfUmm1e6ITjeA/UserTweets',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					withQuickPromoteEligibilityTweetFields: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user whose timeline tweets and replies are to be fetched.
	 * @param count - The number of timeline tweets and replies to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of timeline tweets and replies to fetch.
	 */
	public static tweetsAndReplies(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/OAx9yEcW3JA9bPo63pcYlA/UserTweetsAndReplies',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: id,
					count: count,
					cursor: cursor,
					includePromotedContent: false,
					withCommunity: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				fieldToggles: { withArticlePlainText: false },
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the user to be unfollowed.
	 */
	public static unfollow(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/1.1/friendships/destroy.json',
			data: qs.stringify({
				/* eslint-disable @typescript-eslint/naming-convention */
				user_id: id,
				/* eslint-enable @typescript-eslint/naming-convention */
			}),
		};
	}
}
