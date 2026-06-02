import { ICommunityLeave } from '../../types/data/CommunityLeave';
import { ICommunityLeaveResponse, IRawCommunityLeave } from '../../types/raw/community/Leave';

/**
 * The result of attempting to leave a community.
 *
 * @public
 */
export class CommunityLeave implements ICommunityLeave {
	/** The raw leave result. */
	private readonly _raw: IRawCommunityLeave;

	public id?: string;
	public isMember: boolean;
	public memberCount?: number;
	public message?: string;
	public name?: string;
	public reason?: string;
	public role?: string;

	/**
	 * @param result - The raw leave result.
	 */
	public constructor(result: IRawCommunityLeave) {
		this._raw = { ...result };
		this.id = result.id_str;
		this.name = result.name;
		this.memberCount = result.member_count;
		this.role = result.role;
		this.message = result.actions?.leave_action_result?.message;
		this.reason = result.actions?.leave_action_result?.reason;

		const leaveType = result.actions?.leave_action_result?.__typename;
		this.isMember =
			leaveType !== 'CommunityLeaveAction' &&
			result.actions?.leave_action_result?.reason !== 'ViewerNotMember' &&
			this.role !== 'NonMember';
	}

	/** The raw leave result. */
	public get raw(): IRawCommunityLeave {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes a community leave result from raw response data.
	 *
	 * @param response - The raw response data.
	 */
	public static single(response: ICommunityLeaveResponse): CommunityLeave | undefined {
		const result = response.data?.community_leave;

		if (result) {
			return new CommunityLeave(result);
		}

		return undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICommunityLeave {
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
