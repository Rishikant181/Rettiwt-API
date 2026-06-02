import { ICommunityJoin } from '../../types/data/CommunityJoin';
import { ICommunityJoinResponse, IRawCommunityJoin } from '../../types/raw/community/Join';

/**
 * The result of attempting to join a community.
 *
 * @public
 */
export class CommunityJoin implements ICommunityJoin {
	/** The raw join result. */
	private readonly _raw: IRawCommunityJoin;

	public id?: string;
	public isMember: boolean;
	public memberCount?: number;
	public message?: string;
	public name?: string;
	public reason?: string;
	public role?: string;

	/**
	 * @param result - The raw join result.
	 */
	public constructor(result: IRawCommunityJoin) {
		this._raw = { ...result };
		this.id = result.id_str;
		this.name = result.name;
		this.memberCount = result.member_count;
		this.role = result.role;
		this.message = result.actions?.join_action_result?.message;
		this.reason = result.actions?.join_action_result?.reason;

		const joinType = result.actions?.join_action_result?.__typename;
		this.isMember =
			joinType === 'CommunityJoinAction' ||
			result.actions?.join_action_result?.reason === 'ViewerIsMember' ||
			this.role === 'Member' ||
			this.role === 'Admin' ||
			this.role === 'Moderator';
	}

	/** The raw join result. */
	public get raw(): IRawCommunityJoin {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes a community join result from raw response data.
	 *
	 * @param response - The raw response data.
	 */
	public static single(response: ICommunityJoinResponse): CommunityJoin | undefined {
		const result = response.data?.community_join;

		if (result) {
			return new CommunityJoin(result);
		}

		return undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICommunityJoin {
		return {
			id: this.id,
			name: this.name,
			isMember: this.isMember,
			memberCount: this.memberCount,
			role: this.role,
			message: this.message,
			reason: this.reason,
		};
	}
}
