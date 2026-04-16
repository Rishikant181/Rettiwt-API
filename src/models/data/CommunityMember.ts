import { ICommunityMember } from '../../types/data/CommunityMember';
import { ICommunitySliceUser } from '../../types/raw/community/Slices';

/**
 * The details of a single community member or moderator from a slice response.
 *
 * @public
 */
export class CommunityMember implements ICommunityMember {
	/** The raw community member details. */
	private readonly _raw: ICommunitySliceUser;

	public avatarUrl?: string;
	public communityRole?: string;
	public id: string;
	public isBlocked?: boolean;
	public isFollowed?: boolean;
	public isFollowing?: boolean;
	public isProtected?: boolean;
	public isVerified?: boolean;
	public name?: string;
	public screenName?: string;

	/**
	 * @param member - The raw community member details.
	 */
	public constructor(member: ICommunitySliceUser) {
		this._raw = { ...member };
		this.id = member.rest_id ?? '';
		this.name = member.core?.name;
		this.screenName = member.core?.screen_name;
		this.avatarUrl = member.avatar?.image_url;
		this.communityRole = member.community_role;
		this.isVerified = member.verification?.verified ?? member.is_blue_verified;
		this.isProtected = member.privacy?.protected;
		this.isFollowed = member.relationship_perspectives?.following;
		this.isFollowing = member.relationship_perspectives?.followed_by;
		this.isBlocked = member.relationship_perspectives?.blocking;
	}

	/** The raw community member details. */
	public get raw(): ICommunitySliceUser {
		return { ...this._raw };
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICommunityMember {
		return {
			id: this.id,
			name: this.name,
			screenName: this.screenName,
			avatarUrl: this.avatarUrl,
			communityRole: this.communityRole,
			isVerified: this.isVerified,
			isProtected: this.isProtected,
			isFollowed: this.isFollowed,
			isFollowing: this.isFollowing,
			isBlocked: this.isBlocked,
		};
	}
}
