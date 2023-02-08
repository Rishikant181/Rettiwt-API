import Trends from "../../types/raw/tweet/Trends";
import { AuthService } from "../AuthService";
import { FetcherService } from "../FetcherService";

// URLS
import * as Urls from '../helper/Urls';

export class TrendService extends FetcherService{
    constructor(auth: AuthService) {
        super(auth);
    }

    async getTrends(): Promise<Trends> {
        let res = await this.request<RawTrends>(Urls.trendsUrl()).then(res => res.data);
        return res;
    }
}