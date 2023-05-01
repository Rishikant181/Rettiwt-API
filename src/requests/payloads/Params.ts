// PAYLOADS
import { Variables } from './Variables';
import { Features } from './Features';
import { QueryArgs } from './QueryArgs';

// TYPES
import { IParams } from '../../types/raw/requests/Query';

// ENUMS
import { ResourceType } from '../../enums/Resources';

/**
 * The URL parameters that must be sent as payload while making requests to Twitter API.
 */
export class Params implements IParams {
    cards_platform?: string;
    count?: number;
    cursor?: string;
    ext?: string;
    include_blocked_by?: number;
    include_blocking?: number;
    include_can_dm?: number;
    include_can_media_tag?: number;
    include_cards?: number;
    include_entities?: boolean = true;
    include_ext_alt_text?: boolean;
    include_ext_collab_control?: boolean;
    include_ext_edit_control?: boolean;
    include_ext_has_nft_avatar?: number;
    include_ext_is_blue_verified?: number;
    include_ext_limited_action_results?: boolean;
    include_ext_media_availability?: boolean;
    include_ext_media_color?: boolean;
    include_ext_sensitive_media_warning?: boolean;
    include_ext_trusted_friends_metadata?: boolean;
    include_ext_verified_type?: number;
    include_ext_views?: boolean;
    include_followed_by?: number;
    include_mute_edge?: number;
    include_profile_interstitial_type?: number;
    include_quote_count?: boolean = true;
    include_reply_count?: number = 1;
    include_user_entities?: boolean = true;
    include_want_retweets?: number = 1;
    pc?: number;
    q?: string;
    query_source?: string;
    send_error_codes?: boolean;
    simple_quoted_tweet?: boolean;
    skip_status?: number;
    spelling_corrections?: number;
    tweet_mode?: string = 'extended';
    tweet_search_mode?: string = 'live';

    /**
     * Variables for fetching data.
     */
    variables?: string;

    /**
     * Additional data features that must be fetched.
     */
    features?: string;

    /**
     * Initializes the URL parameters.
     * 
     * @param resourceType The type of resource requested.
     * @param args Additional user-defined arguments to be sent in the request.
     */
    constructor(resourceType: ResourceType, args: QueryArgs) {
        /**
         * Only the endpoint for fetching tweets (using advanced search) requires the parameters defined in this class.
         * All other endpoints required only 'variables' and 'features' fields.
         */
        if (resourceType == ResourceType.TWEETS) {
            this.q = args.query;
        }
        else {
            this.variables = new Variables(resourceType, args).toString();
            this.features = new Features().toString();
        }
    }

    /**
     * Converts this object to it's string representation.
     * 
     * @returns 'this' object's string representation.
     */
    toString(): string {
        let params: string = '';

        // Iterating over the keys of this object
        for (let [key, value] of Object.entries(this)) {
            // Appending non-empty paramters to the parameter string
            if (value) {
                params += `?${key}=${value}`;
            }
        }

        return params;
    }
}