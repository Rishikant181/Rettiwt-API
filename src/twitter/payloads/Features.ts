// TYPES
import { IFeatures } from '../types/request/Query';

/**
 * The additional features that may be fetched while making requests to Twitter API.
 */
export class Features implements IFeatures {
    graphql_is_translatable_rweb_tweet_is_translatable_enabled = false;
    interactive_text_enabled = false;
    longform_notetweets_consumption_enabled = false;
    responsive_web_edit_tweet_api_enabled = false;
    responsive_web_enhance_cards_enabled = false;
    responsive_web_graphql_timeline_navigation_enabled = false;
    responsive_web_text_conversations_enabled = false;
    responsive_web_twitter_blue_verified_badge_is_enabled = false;
    responsive_web_uc_gql_enabled = false;
    standardized_nudges_misinfo = false;
    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled = false;
    tweetypie_unmention_optimization_enabled = false;
    verified_phone_label_enabled = false;
    vibe_api_enabled = false;
    view_counts_everywhere_api_enabled = false;
    view_counts_public_visibility_enabled = false;

    /**
     * Converts this object to it's string representation.
     * 
     * @returns 'this' object's string representation.
     */
    toString(): string {
        return `${encodeURIComponent(JSON.stringify(this))}`;
    }
}