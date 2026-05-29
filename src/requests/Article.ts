import { AxiosRequestConfig } from 'axios';

import { ArticleLifecycle } from '../enums/Article';

/**
 * Collection of requests related to Articles.
 *
 * @public
 */
export class ArticleRequests {
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
}
