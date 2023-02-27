
import { AuthService } from "../AuthService";
import { FetcherService } from "../FetcherService";

// TYPES
import Trends, { trendOn } from "../../types/Trends";
import RawTrends from "../../types/raw/general/Trends";

// URLS
import * as Urls from '../helper/urls/Trends';
import { extractTrendData } from "../helper/extractors/Trends";

/**
 * A class that handles trend-related functionalities.
 *
 * @class TrendService
 * @extends FetcherService
 *
 * @param {AuthService} auth - An instance of the `AuthService` class.
 *
 * @property {(type: trendOn) => Promise<Trends>} getTrends - A method to retrieve trends based on the specified type.
 */

export class TrendService extends FetcherService{
    constructor(auth: AuthService) {
        super(auth);
        this.isAuthenticated = auth.isAuthenticated;
    }

    async getTrends(type:trendOn): Promise<Trends> {
        let res = await this.request<RawTrends>(Urls.trendsUrl(type), false);
        let Data = extractTrendData(res.data);
        return Data;
    }

}