import { AxiosRequestConfig } from 'axios';

import { CommunityTweetsSortType } from '../enums/Tweet';

/**
 * Collection of requests related to communities.
 *
 * @public
 */
export class CommunityRequests {
	/**
	 * @param id - The id of the community whose details are to be fetched.
	 */
	public static details(id: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/uBpODvS60xZ1q2L88d-W2A/CommunityQuery',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					communityId: id,
				}),
				features: JSON.stringify({
					c9s_list_members_action_api_enabled: false,
					c9s_superc9s_indication_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the community to join.
	 */
	public static join(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/TQ-ErN9XPSjNkSY4ZB7W6Q/JoinCommunity',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					communityId: id,
				},
				features: {
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				},
				queryId: 'TQ-ErN9XPSjNkSY4ZB7W6Q',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the community to leave.
	 */
	public static leave(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/q9LMMKLXMQ5t9AdHYjm7Ew/LeaveCommunity',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					communityId: id,
				},
				features: {
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				},
				queryId: 'q9LMMKLXMQ5t9AdHYjm7Ew',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the community whose members slice is to be fetched.
	 * @param cursor - The cursor to the next members batch.
	 */
	public static members(id: string, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/WSbJGJjZaVasSj9bnqSZSA/membersSliceTimeline_Query',
			params: {
				variables: JSON.stringify({
					communityId: id,
					cursor: cursor ?? null,
				}),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the community whose moderators slice is to be fetched.
	 * @param count - The number of moderators to fetch.
	 * @param cursor - The cursor to the next moderators batch.
	 */
	public static moderators(id: string, count?: number, cursor?: string): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/GBMT3GOWy5dYsYC4XJfvow/moderatorsSliceTimeline_Query',
			params: {
				variables: JSON.stringify({
					communityId: id,
					count: count ?? 20,
					cursor: cursor ?? null,
				}),
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the community whose tweets are to be fetched.
	 * @param count - The number of tweets to fetch.
	 * @param cursor - The cursor to the next tweets batch.
	 * @param sortBy - The ranking mode to use.
	 */
	public static tweets(
		id: string,
		count?: number,
		cursor?: string,
		sortBy?: CommunityTweetsSortType,
	): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/gTPTEkxMCEDGhrKZn9_uxQ/CommunityTweetsTimeline',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					communityId: id,
					count: count ?? 40,
					cursor: cursor ?? 'DAAJAAA',
					displayLocation: 'Community',
					rankingMode: sortBy === CommunityTweetsSortType.LATEST ? 'Recency' : 'Relevance',
					withCommunity: true,
				}),
				features: JSON.stringify({
					rweb_video_screen_enabled: false,
					rweb_cashtags_enabled: false,
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
					content_disclosure_indicator_enabled: true,
					content_disclosure_ai_generated_indicator_enabled: true,
					responsive_web_grok_show_grok_translated_post: true,
					responsive_web_grok_analysis_button_from_backend: true,
					post_ctas_fetch_enabled: true,
					freedom_of_speech_not_reach_fetch_enabled: true,
					standardized_nudges_misinfo: true,
					tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
					longform_notetweets_rich_text_read_enabled: true,
					longform_notetweets_inline_media_enabled: false,
					responsive_web_grok_image_annotation_enabled: true,
					responsive_web_grok_imagine_annotation_enabled: true,
					responsive_web_grok_community_note_auto_translation_is_enabled: true,
					responsive_web_enhance_cards_enabled: false,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}
}
