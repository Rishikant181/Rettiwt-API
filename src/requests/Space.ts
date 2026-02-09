import { AxiosRequestConfig } from 'axios';

import { RawTweetSearchResultType } from '../enums/raw/Tweet';

/**
 * Collection of requests related to spaces.
 *
 * @public
 */
export class SpaceRequests {
	/**
	 * Normalize search query for spaces.
	 *
	 * @param query - The query to normalize.
	 * @returns The normalized query.
	 */
	private static _normalizeSearchQuery(query: string): string {
		const normalized = query.trim();

		if (normalized.includes('filter:spaces')) {
			return normalized;
		}

		return `${normalized} filter:spaces`.trim();
	}

	/**
	 * @param id - The id of the space whose details are to be fetched.
	 * @param withReplays - Whether to include replay information.
	 * @param withListeners - Whether to include listeners information.
	 * @param isMetatagsQuery - Whether the request is a metatags query.
	 */
	public static details(
		id: string,
		withReplays?: boolean,
		withListeners?: boolean,
		isMetatagsQuery?: boolean,
	): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/rR7CQrr8kxb6fatlUaB61Q/AudioSpaceById',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					id: id,
					isMetatagsQuery: isMetatagsQuery ?? false,
					withReplays: withReplays ?? true,
					withListeners: withListeners ?? false,
				}),
				features: JSON.stringify({
					spaces_2022_h2_spaces_communities: true,
					spaces_2022_h2_clipping: true,
					creator_subscriptions_tweet_preview_api_enabled: true,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					premium_content_api_read_enabled: false,
					communities_web_enable_tweet_community_results_fetch: true,
					c9s_tweet_anatomy_moderator_badge_enabled: true,
					responsive_web_grok_analyze_button_fetch_trends_enabled: false,
					responsive_web_grok_analyze_post_followups_enabled: true,
					responsive_web_jetfuel_frame: true,
					responsive_web_grok_share_attachment_enabled: true,
					responsive_web_grok_annotations_enabled: false,
					articles_preview_enabled: true,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					post_ctas_fetch_enabled: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_grok_imagine_annotation_enabled: true,
					responsive_web_graphql_timeline_navigation_enabled: true,
					responsive_web_grok_community_note_auto_translation_is_enabled: false,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param query - The search query. `filter:spaces` is appended if absent.
	 * @param count - The number of items to fetch.
	 * @param cursor - The cursor to the batch of results.
	 * @param top - Whether to fetch top results.
	 */
	public static search(query: string, count?: number, cursor?: string, top = true): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/f_A-Gyo204PRxixpkrchJg/SearchTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					rawQuery: SpaceRequests._normalizeSearchQuery(query),
					count: count,
					cursor: cursor,
					querySource: 'typed_query',
					product: top ? RawTweetSearchResultType.TOP : RawTweetSearchResultType.LATEST,
					withGrokTranslatedBio: false,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
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
					responsive_web_grok_annotations_enabled: true,
					articles_preview_enabled: true,
					responsive_web_edit_tweet_api_enabled: true,
					graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
					view_counts_everywhere_api_enabled: true,
					longform_notetweets_consumption_enabled: true,
					responsive_web_twitter_article_tweet_consumption_enabled: true,
					tweet_awards_web_tipping_enabled: false,
					responsive_web_grok_show_grok_translated_post: false,
					responsive_web_grok_analysis_button_from_backend: true,
					post_ctas_fetch_enabled: true,
					creator_subscriptions_quote_tweet_preview_enabled: false,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: true,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_grok_imagine_annotation_enabled: true,
					responsive_web_grok_community_note_auto_translation_is_enabled: false,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}
}
