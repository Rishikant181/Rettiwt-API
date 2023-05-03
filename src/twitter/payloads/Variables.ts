// PAYLOADS
import { Args } from './Args';

// TYPES
import { IVariables } from '../types/request/Query';

// ENUMS
import { ResourceType } from '../enums/Resources';

/**
 * The variables that must be sent as payload while making requests to Twitter API.
 */
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
     * @param args The additional user-defined arguments for fetching the resource.
     */
    constructor(resourceType: ResourceType, args: Args) {
        if (resourceType == ResourceType.TWEET_DETAILS) {
            this.focalTweetId = args.id;
            this.count = args.count;
            this.cursor = args.cursor;
        }
        else if (resourceType == (ResourceType.TWEET_LIKES || ResourceType.TWEET_RETWEETS)) {
            this.tweetId = args.id;
            this.count = args.count;
            this.cursor = args.cursor;
        }
        else if (resourceType == ResourceType.USER_DETAILS) {
            this.screen_name = args.id;
        }
        else if (resourceType == ResourceType.USER_DETAILS_BY_ID) {
            this.userId = args.id;
        }
        else if (resourceType == (ResourceType.USER_FOLLOWERS || ResourceType.USER_FOLLOWING || ResourceType.USER_LIKES || ResourceType.USER_TWEETS)) {
            this.userId = args.id;
            this.count = args.count;
            this.cursor = args.cursor;
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
