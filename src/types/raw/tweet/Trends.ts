export default interface Trends {
    trendingNow:trendEntry[];
}
export interface trendEntry {
    name:string;
    rank:number;
    approxtweetCount:number;
}
