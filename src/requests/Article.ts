import { AxiosRequestConfig } from 'axios';

import { ArticleLifecycle } from '../enums/Article';
import { IArticleDraft } from '../types/args/PostArgs';

import { TweetRequests } from './Tweet';

/**
 * Collection of requests related to Articles.
 *
 * @public
 */
export class ArticleRequests {
	/**
	 * @param articleDraft - The Article draft to create.
	 */
	public static createDraft(articleDraft?: IArticleDraft): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/g1l5N8BxGewYuCy5USe_bQ/ArticleEntityDraftCreate',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					content_state: {
						blocks: articleDraft?.contentState?.blocks ?? [],
						entity_map: articleDraft?.contentState?.entityMap ?? [],
					},
					title: articleDraft?.title ?? '',
				},
				features: {
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				},
				queryId: 'g1l5N8BxGewYuCy5USe_bQ',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}

	/**
	 * @param id - The id of the Article to delete.
	 */
	public static delete(id: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/e4lWqB6m2TA8Fn_j9L9xEA/ArticleEntityDelete',
			data: {
				variables: {
					articleEntityId: id,
				},
				queryId: 'e4lWqB6m2TA8Fn_j9L9xEA',
			},
		};
	}

	/**
	 * Builds the request used to fetch a published Article by its containing tweet ID.
	 *
	 * X exposes the complete public Article payload within its tweet-detail response.
	 *
	 * @param id - The id of the tweet containing the Article.
	 */
	public static details(id: string): AxiosRequestConfig {
		return TweetRequests.replies(id);
	}

	/**
	 * @param userId - The id of the user whose Articles are to be fetched.
	 * @param lifecycle - The lifecycle state of the Articles to fetch.
	 * @param count - The number of Articles to fetch.
	 * @param cursor - The cursor to the batch of Articles to fetch.
	 */
	public static entities(
		userId: string,
		lifecycle: ArticleLifecycle = ArticleLifecycle.DRAFT,
		count = 20,
		cursor?: string,
	): AxiosRequestConfig {
		return {
			method: 'get',
			url: 'https://x.com/i/api/graphql/N1zzFzRPspT-sP9Q42n_bg/ArticleEntitiesSlice',
			params: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: JSON.stringify({
					userId: userId,
					lifecycle: lifecycle,
					count: count,
					cursor: cursor,
				}),
				features: JSON.stringify({
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				}),
				/* eslint-enable @typescript-eslint/naming-convention */
			},
			paramsSerializer: { encode: encodeURIComponent },
		};
	}

	/**
	 * @param id - The id of the Article whose title is to be updated.
	 * @param title - The new title to set.
	 */
	public static updateTitle(id: string, title: string): AxiosRequestConfig {
		return {
			method: 'post',
			url: 'https://x.com/i/api/graphql/x75E2ABzm8_mGTg1bz8hcA/ArticleEntityUpdateTitle',
			data: {
				/* eslint-disable @typescript-eslint/naming-convention */
				variables: {
					articleEntityId: id,
					title: title,
				},
				features: {
					profile_label_improvements_pcf_label_in_post_enabled: true,
					responsive_web_profile_redirect_enabled: false,
					rweb_tipjar_consumption_enabled: false,
					verified_phone_label_enabled: false,
					responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
					responsive_web_graphql_timeline_navigation_enabled: true,
				},
				queryId: 'x75E2ABzm8_mGTg1bz8hcA',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		};
	}
}
