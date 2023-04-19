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
}
