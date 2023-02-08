/**
 * A data structure representing a collection of trending topics.
 *
 * @interface Trends
 *
 * @property {trendEntry[]} trendingNow - An array of `trendEntry` objects representing the trending topics.
 *  * @property {string} trendCategory - the category the trending topic list are all trending in.
 */
export default interface Trends {
    trendingNow:trendEntry[];
    trendCategory:string
}
/**
 * A data structure representing a trend entry.
 *
 * @interface trendEntry
 *
 * @property {string} name - The name of the trend.
 * @property {number} rank - The rank of the trend.
 * @property {number} approxtweetCount - The approximate number of tweets for the trend.
 * @property {string[]} relatedTopics - An array of related topics for the trend.

 * @property {string} domainContext - The domain context for the trend. i.e. what category is it specifically trenging on
 */
export interface trendEntry {
    name:string;
    rank:number;
    approxtweetCount:number;
    relatedTopics:string[];
    domainContext:string

}

/**
 * An enum representing the different trend categories.
 *
 * @enum {string}
 * @constant
 *
 * @property {string} foryou - Trending topics for the user.
 * @property {string} overall - Overall trending topics.
 * @property {string} news - Trending news topics.
 * @property {string} sports - Trending sports topics.
 * @property {string} entertainment - Trending entertainment topics.
 */

export const enum trendOn{
    foryou="for-you",
    overall="trending",
    news="news-unified",
    sports="sports-unified",
    entertainment="entertainment-unified"
}
