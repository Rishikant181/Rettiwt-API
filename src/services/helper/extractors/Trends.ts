
import RawTrends from '../../../types/raw/general/Trends';
import Trends, { trendEntry } from '../../../types/Trends';
import * as Parsers from '../Parser'



export function extractTrendData(res:RawTrends):Trends {
    
    // Setting Initial values
    let currentTrends:Trends={
        trendingNow:[],
        trendCategory: res.pageConfiguration.tabs.initialTabId,
    }

    // Fetching each Trend and its data and push it to currentTrends.trendingNow
    res.timeline.instructions[1].addEntries?.entries[1].content.timelineModule?.items.forEach(entry=>{
        const trend:trendEntry={
            name: entry.item.content.trend.name,
            rank: Number(entry.item.content.trend.rank),
            
            //Getting approx amount of tweets done if it exists in the metaData 
            approxtweetCount : Parsers.convertToNumber(entry.item.content.trend.trendMetadata.metaDescription??''),

            relatedTopics : entry.item.clientEventInfo.details.guideDetails.transparentGuideDetails.trendMetadata.associatedCuratedTweetIds,
            domainContext : entry.item.content.trend.trendMetadata.domainContext

        }
        currentTrends.trendingNow.push(trend)
    })
    
    return currentTrends
}