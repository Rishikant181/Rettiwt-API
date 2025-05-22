import { ERawTweetRepliesSortType } from '../enums/raw/Tweet';
import { ETweetRepliesSortType } from '../enums/Tweet';

/**
 * Collection of mapping from parsed reply sort type to raw reply sort type.
 *
 * @internal
 */
export const rawTweetRepliesSortType: { [key in keyof typeof ETweetRepliesSortType]: ERawTweetRepliesSortType } = {
	/* eslint-disable @typescript-eslint/naming-convention */

	LATEST: ERawTweetRepliesSortType.LATEST,
	LIKES: ERawTweetRepliesSortType.LIKES,
	RELEVANCE: ERawTweetRepliesSortType.RELEVACE,

	/* eslint-enable @typescript-eslint/naming-convention */
};
