import { IResponse, ITweetLikeResponse, ITweetPostResponse, ITweetRetweetResponse } from 'rettiwt-core';

import { EResourceType } from '../enums/Resource';

/**
 * Collection of validators that validate if post was successful or not.
 *
 * @internal
 */
export const postValidators: {
	[key in keyof typeof EResourceType]?: (response: IResponse<unknown>) => boolean;
} = {
	/* eslint-disable @typescript-eslint/naming-convention */
	TWEET_CREATE: (response) => ((response as IResponse<ITweetPostResponse>)?.data?.data?.create_tweet ? true : false),
	TWEET_FAVORITE: (response) =>
		(response as IResponse<ITweetLikeResponse>)?.data?.data?.favorite_tweet ? true : false,
	TWEET_RETWEET: (response) =>
		(response as IResponse<ITweetRetweetResponse>)?.data?.data?.create_retweet ? true : false,
	/* eslint-enable @typescript-eslint/naming-convention */
};
