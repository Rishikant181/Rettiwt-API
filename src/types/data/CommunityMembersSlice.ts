import { ICommunityMember } from './CommunityMember';

/**
 * A cursored batch of community members or moderators.
 *
 * @public
 */
export interface ICommunityMembersSlice {
	/** The batch of members. */
	list: ICommunityMember[];

	/** The cursor to the next batch. */
	next: string;
}
