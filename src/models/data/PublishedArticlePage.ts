import { findByFilter } from '../../helper/JsonUtils';
import { IPublishedArticlePage } from '../../types/data/PublishedArticlePage';
import { ICursor as IRawCursor } from '../../types/raw/base/Cursor';

import { Tweet } from './Tweet';
import { TweetArticle } from './TweetArticle';

/**
 * A cursor-based page of published X Articles extracted from a user timeline.
 *
 * @public
 */
export class PublishedArticlePage implements IPublishedArticlePage {
	public list: TweetArticle[];
	public next: string;

	/**
	 * @param response - The raw `UserArticlesTweets` timeline response.
	 */
	public constructor(response: NonNullable<unknown>) {
		this.list = Tweet.timeline(response)
			.map((tweet) => tweet.article)
			.filter((article): article is TweetArticle => article !== undefined);
		this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
	}

	/**
	 * @returns A serializable representation of this page.
	 */
	public toJSON(): IPublishedArticlePage {
		return {
			list: this.list.map((article) => article.toJSON()),
			next: this.next,
		};
	}
}
