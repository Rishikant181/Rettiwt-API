// TYPES
import { IVariables } from '../../types/Query';
import { ResourceType } from '../../enums/Resources';

export class Variables implements IVariables {
    tweetId?: string;
    focalTweetId?: string;
    userId?: string;
    screen_name?: string;
    count?: number;
    cursor?: string;
    referrer: string = '';
    with_rux_injections: boolean = false;
    includePromotedContent: boolean = false;
    withCommunity: boolean = false;
    withQuickPromoteEligibilityTweetFields: boolean = false;
    withBirdwatchNotes: boolean = false;
    withSuperFollowsUserFields: boolean = false;
    withDownvotePerspective: boolean = false;
    withReactionsMetadata: boolean = false;
    withReactionsPerspective: boolean = false;
    withSuperFollowsTweetFields: boolean = false;
    withClientEventToken: boolean = false;
    withVoice: boolean = false;
    withV2Timeline: boolean = true;

    /**
     * Initializes the appropriate Variables object based on the requred resource type and parameters.
     * 
     * @param resourceType The type of resource that is requested.
     * @param params The additional paramters for fetching the resource.
     */
    constructor(resourceType: ResourceType, params: { id?: string, count?: number, cursor?: string }) {
        if (resourceType == ResourceType.TWEET_DETAILS) {
            this.focalTweetId = params.id;
        }
        else if (resourceType == ResourceType.TWEET_REPLIES) {
            this.focalTweetId = params.id;
            this.count = params.count;
            this.cursor = params.cursor;
        }
        else if (resourceType == (ResourceType.TWEET_LIKES || ResourceType.TWEET_RETWEETS)) {
            this.tweetId = params.id;
            this.count = params.count;
            this.cursor = params.cursor;
        }
        else if (resourceType == ResourceType.USER_DETAILS) {
            this.screen_name = params.id;
        }
        else if (resourceType == ResourceType.USER_DETAILS_BY_ID) {
            this.userId = params.id;
        }
        else if (resourceType == (ResourceType.USER_FOLLOWERS || ResourceType.USER_FOLLOWING || ResourceType.USER_LIKES || ResourceType.USER_TWEETS)) {
            this.userId = params.id;
            this.count = params.count;
            this.cursor = params.cursor;
        }
    }

    /**
     * Converts this object to it's string representation.
     * 
     * @returns 'this' object's string representation.
     */
    toString(): string {
        return `variables=${encodeURIComponent(JSON.stringify(this))}`;
    }
}
