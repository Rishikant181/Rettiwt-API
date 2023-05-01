// TYPES
import { IVariables } from '../../types/Query';

/**
 * The different types of resources that can be fetched.
 */
export enum ResourceType {
    'TWEET_DETAILS',
    'TWEET_REPLIES',
    'TWEET_LIKES',
    'TWEET_RETWEETS'
};

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
