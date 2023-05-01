// TYPES
import { IVariables } from '../../types/Query';

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
     * Generates the query variables object for fetching tweet details.
     * 
     * @param focalTweetId The id of the target tweet.
     * 
     * @returns The query variable object.
     */
    tweetDetail(focalTweetId: string): Variables {
        // Setting necessary parameters
        this.focalTweetId = focalTweetId;

        // Removing unnecessary paramteters
        delete this.tweetId;
        delete this.userId;
        delete this.screen_name;
        delete this.count;
        delete this.cursor;

        return this;
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
