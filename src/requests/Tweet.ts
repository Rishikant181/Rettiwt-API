import { AxiosRequestConfig } from 'axios';

import { ERawTweetSearchResultType } from '../enums/raw/Tweet';
import { TweetFilter } from '../models/args/FetchArgs';
import { NewTweet } from '../models/args/PostArgs';
import { MediaVariable, ReplyVariable } from '../models/params/Variables';
import { ITweetFilter } from '../types/args/FetchArgs';
import { INewTweet } from '../types/args/PostArgs';

/**
 * Collection of requests related to tweets.
 *
 * @public
 */
export class TweetRequests {
	/**
	 * @param ids - The IDs of the tweets whose details are to be fetched.
	 */
	public static bulkDetails(ids: string[]): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/kPnxYjNX2HCKu8aY96er5w/TweetResultsByRestIds',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					tweetIds: ids,
					referrer: 'home',
					with_rux_injections: false,
					includePromotedContent: false,
					withCommunity: false,
					withQuickPromoteEligibilityTweetFields: false,
					withBirdwatchNotes: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					rweb_lists_timeline_redesign_enabled: true,
					responsive_web_graphql_exclude_directive_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					tweetypie_unmention_optimization_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: false,
					tweet_awards_web_tipping_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_media_download_video_enabled: false,
					responsive_web_enhance_cards_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analyze_post_followups_enabled: false,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_image_annotation_enabled: false,
					communities_web_enable_tweet_community_results_fetch: false,
					c9s_tweet_anatomy_moderator_badge_enabled: false,
					premium_content_api_read_enabled: false,
					responsive_web_grok_analysis_button_from_backend: false,
					profile_label_improvements_pcf_label_in_post_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					articles_preview_enabled: false,
					responsive_web_grok_share_attachment_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the tweet whose details are to be fetched.
	 */
	public static details(id: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/zAz9764BcLZOJ0JU2wrd1A/TweetResultByRestId',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					tweetId: id,
					referrer: 'home',
					with_rux_injections: false,
					includePromotedContent: false,
					withCommunity: false,
					withQuickPromoteEligibilityTweetFields: false,
					withBirdwatchNotes: false,
					withVoice: false,
					withV2Timeline: false,
				}),
				features: JSON.stringify({
					creator_subscriptions_tweet_preview_api_enabled: true,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: false,
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
					responsive_web_grok_analysis_button_from_backend: false,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the tweet to be liked.
	 */
	public static like(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/lI07N6Otwv1PhnEgXILM7A/FavoriteTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					tweet_id: id,
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the tweet whose likers are to be fetched.
	 * @param count - The number of likers to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of likers to fetch.
	 */
	public static likers(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/4AzoFlLkEcs2bx5pO1mvsQ/Favoriters',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					tweetId: id,
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
	 * @param args - The configuration object for the tweet to be posted.
	 */
	public static post(args: INewTweet): AxiosRequestConfig {
		// Parsing the args
		const parsedArgs = new NewTweet(args);

		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/IID9x6WsdMnTlXnzXGq8ng/CreateTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					tweet_text: parsedArgs.text,
					dark_request: false,
					attachment_url: parsedArgs.quote ? `https://x.com/i/status/${parsedArgs.quote}` : undefined,
					media: parsedArgs.media ? new MediaVariable(parsedArgs.media) : undefined,
					reply: parsedArgs.replyTo ? new ReplyVariable(parsedArgs.replyTo) : undefined,
					semantic_annotation_ids: [],
				},
				features: {
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: false,
					responsive_web_grok_share_attachment_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					rweb_tipjar_consumption_enabled: true,
					verified_phone_label_enabled: true,
					articles_preview_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the tweet whose replies are to be fetched.
	 * @param cursor - The cursor to the batch of replies to fetch.
	 */
	public static replies(id: string, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/_8aYOgEDz35BrBcBal1-_w/TweetDetail',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					focalTweetId: id,
					cursor: cursor,
					referrer: 'tweet',
					controller_data: cursor,
					with_rux_injections: false,
					includePromotedContent: false,
					withCommunity: true,
					withQuickPromoteEligibilityTweetFields: true,
					withBirdwatchNotes: true,
					withVoice: true,
					withV2Timeline: true,
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
				fieldToggles: JSON.stringify({
					withArticleRichContentState: true,
					withArticlePlainText: false,
					withGrokAnalyze: false,
					withDisallowedReplyControls: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the tweet which is to be retweeted.
	 */
	public static retweet(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/ojPdsZsimiJrUGLR1sjUtA/CreateRetweet',
			data: {
				variables: {
					/* eslint-disable @typescript-eslint/naming-convention */
					tweet_id: id,
					dark_request: false,
					/* eslint-enable @typescript-eslint/naming-convention */
				},
			},
		};
	}

	/**
	 * @param id - The id of the tweet whose retweeters are to be fetched.
	 * @param count - The number of retweeters to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of retweeters to fetch.
	 */
	public static retweeters(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/i-CI8t2pJD15euZJErEDrg/Retweeters',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					tweetId: id,
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
	 * @param args - The configuration object for the tweet to be posted.
	 *
	 * @remarks - Only `text` and `media.id` parameters are supported.
	 */
	public static schedule(args: INewTweet): AxiosRequestConfig {
		// Parsing the args
		const parsedArgs = new NewTweet(args);

		return {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://x.com/i/api/graphql/LCVzRQGxOaGnOnYH01NQXg/CreateScheduledTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					post_tweet_request: {
						auto_populate_reply_metadata: false,
						status: parsedArgs.text,
						exclude_reply_user_ids: [],
						media_ids: parsedArgs.media?.map((item) => item.id) ?? [],
					},
					execute_at: Math.floor((parsedArgs.scheduleFor ?? new Date()).getTime() / 1000),
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param filter - The filter to use for searching tweets.
	 * @param count - The number of tweets to fetch. Only works as a lower limit when used with a cursor.
	 * @param cursor - The cursor to the batch of tweets to fetch.
	 */
	public static search(filter: ITweetFilter, count?: number, cursor?: string): AxiosRequestConfig {
		// Parsing the filter
		const parsedFilter = new TweetFilter(filter);

		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/nK1dw4oV3k4w5TdtcAdSww/SearchTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					rawQuery: new TweetFilter(parsedFilter).toString(),
					count: count,
					cursor: cursor,
					querySource: 'typed_query',
					product: parsedFilter.top ? ERawTweetSearchResultType.TOP : ERawTweetSearchResultType.LATEST,
					withAuxiliaryUserLabels: false,
					withArticleRichContentState: false,
					withArticlePlainText: false,
					withGrokAnalyze: false,
					withDisallowedReplyControls: false,
				}),
				features: JSON.stringify({
					rweb_lists_timeline_redesign_enabled: true,
					responsive_web_graphql_exclude_directive_enabled: true,
					verified_phone_label_enabled: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					tweetypie_unmention_optimization_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: false,
					tweet_awards_web_tipping_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_media_download_video_enabled: false,
					responsive_web_enhance_cards_enabled: false,
					c9s_tweet_anatomy_moderator_badge_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					premium_content_api_read_enabled: false,
					rweb_video_screen_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: false,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					communities_web_enable_tweet_community_results_fetch: false,
					rweb_tipjar_consumption_enabled: false,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: false,
					responsive_web_grok_image_annotation_enabled: false,
					responsive_web_jetfuel_frame: false,
					articles_preview_enabled: false,
					responsive_web_grok_share_attachment_enabled: false,
					responsive_web_grok_analysis_button_from_backend: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the tweet to be unliked.
	 */
	public static unlike(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/ZYKSe-w7KEslx3JhSIk5LA/UnfavoriteTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					tweet_id: id,
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the tweet to be unposted.
	 */
	public static unpost(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					tweet_id: id,
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the source tweet (which was retweeted), to be unretweeted.
	 */
	public static unretweet(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/iQtK4dl5hBmXewYZuEOKVw/DeleteRetweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					source_tweet_id: id,
				},
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the scheduled tweet to be unscheduled.
	 */
	public static unschedule(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/CTOVqej0JBXAZSwkp1US0g/DeleteScheduledTweet',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					scheduled_tweet_id: id,
				},
				queryId: 'CTOVqej0JBXAZSwkp1US0g',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}
}
