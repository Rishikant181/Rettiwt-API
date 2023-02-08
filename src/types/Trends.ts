export default interface Trends {
    trendingNow:trendEntry[];
}

export interface trendEntry {
    name:string;
    rank:number;
    approxtweetCount:number;
    relatedTopics:string[];
    trendOn:trendOn;

}
export const enum trendOn{
    foryou="for-you",
    overall="trending",
    news="news-unified",
    sports="sports-unified",
    entertainment="entertainment-unified"
}
