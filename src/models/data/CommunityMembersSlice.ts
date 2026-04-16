import { LogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { ICommunityMembersSlice } from '../../types/data/CommunityMembersSlice';
import {
	ICommunityMembersSliceResponse,
	ICommunityModeratorsSliceResponse,
	ICommunitySlice,
	ICommunitySliceItem,
} from '../../types/raw/community/Slices';

import { CommunityMember } from './CommunityMember';

/**
 * A cursored batch of community members or moderators.
 *
 * @public
 */
export class CommunityMembersSlice implements ICommunityMembersSlice {
	public list: CommunityMember[];
	public next: string;

	/**
	 * @param slice - The raw community slice.
	 */
	public constructor(slice?: ICommunitySlice) {
		this.list = CommunityMembersSlice._mapItems(slice?.items_results);
		this.next = slice?.slice_info?.next_cursor ?? '';
	}

	/**
	 * Maps raw slice items to deserialized members.
	 *
	 * @param items - The raw slice items.
	 */
	private static _mapItems(items?: ICommunitySliceItem[]): CommunityMember[] {
		const members: CommunityMember[] = [];

		for (const item of items ?? []) {
			const user = item.result;

			if (user?.rest_id) {
				LogService.log(LogActions.DESERIALIZE, { id: user.rest_id });
				members.push(new CommunityMember(user));
			}
		}

		return members;
	}

	/**
	 * Extracts a members slice from the given raw response data.
	 *
	 * @param response - The raw response data.
	 */
	public static members(response: ICommunityMembersSliceResponse): CommunityMembersSlice | undefined {
		const slice = response.data?.communityResults?.result?.members_slice;

		if (slice) {
			return new CommunityMembersSlice(slice);
		}

		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: 'Community members not found, skipping',
		});

		return undefined;
	}

	/**
	 * Extracts a moderators slice from the given raw response data.
	 *
	 * @param response - The raw response data.
	 */
	public static moderators(response: ICommunityModeratorsSliceResponse): CommunityMembersSlice | undefined {
		const slice = response.data?.communityResults?.result?.moderators_slice;

		if (slice) {
			return new CommunityMembersSlice(slice);
		}

		LogService.log(LogActions.WARNING, {
			action: LogActions.DESERIALIZE,
			message: 'Community moderators not found, skipping',
		});

		return undefined;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICommunityMembersSlice {
		return {
			list: this.list.map((member) => member.toJSON()),
			next: this.next,
		};
	}
}
