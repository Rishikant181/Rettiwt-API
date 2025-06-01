import { FetcherService } from './FetcherService';
import { RettiwtConfig } from '../../models/RettiwtConfig';

export class DmService extends FetcherService {
    public constructor(config: RettiwtConfig) {
        super(config);
    }

    /**
     * Fetches the DM inbox initial state.
     */
    public async conversations(): Promise<unknown> {
        const url =
            'https://x.com/i/api/1.1/dm/inbox_initial_state.json?nsfw_filtering_enabled=false&include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&include_ext_profile_image_shape=1&skip_status=1&dm_secret_conversations_enabled=false&krs_registration_enabled=false&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=true&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_views=true&dm_users=true&include_groups=true&include_inbox_timelines=true&include_ext_media_color=true&supports_reactions=true&supports_edit=true&include_ext_edit_control=true&include_ext_business_affiliations_label=true&include_ext_parody_commentary_fan_label=true&ext=mediaColor%2CaltText%2CmediaStats%2ChighlightedLabel%2CparodyCommentaryFanLabel%2CvoiceInfo%2CbirdwatchPivot%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Carticle';

        const config = {
            method: 'GET',
            url,
            headers: {
                ...this.config.headers,
            },
            httpAgent: this.config.httpsAgent,
            httpsAgent: this.config.httpsAgent,
        };

        const axios = (await import('axios')).default;
        const response = await axios(config);
        return response.data;
    }
}
