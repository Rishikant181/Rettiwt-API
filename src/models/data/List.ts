import { LogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';
import { LogService } from '../../services/internal/LogService';
import { IList } from '../../types/data/List';
import { IList as IRawList } from '../../types/raw/base/List';
import { ITimelineList } from '../../types/raw/composite/TimelineList';
import { IListDetailsResponse } from '../../types/raw/list/Details';

/**
 * The details of a single Twitter List.
 *
 * @public
 */
export class List implements IList {
	/** The raw list details. */
	private readonly _raw: IRawList;

	public createdAt: string;
	public createdBy: string;
	public description?: string;
	public id: string;
	public isFollowing: boolean;
	public isMember: boolean;
	public memberCount: number;
	public name: string;
	public subscriberCount: number;

	/**
	 * @param list - The raw list details.
	 */
	public constructor(list: IRawList) {
		this._raw = { ...list };
		this.id = list.id_str;
		this.name = list.name;
		this.createdAt = new Date(list.created_at).toISOString();
		this.description = list.description.length ? list.description : undefined;
		this.isFollowing = list.following;
		this.isMember = list.is_member;
		this.memberCount = list.member_count;
		this.subscriberCount = list.subscriber_count;
		this.createdBy = list.user_results.result.rest_id;
	}

	/** The raw list details. */
	public get raw(): IRawList {
		return { ...this._raw };
	}

	/**
	 * Extracts and deserializes a single target list from the given raw response data.
	 *
	 * @param response - The raw response data.
	 * @param id - The id of the target list.
	 *
	 * @returns The target deserialized list.
	 */
	public static single(response: IListDetailsResponse, id: string): List | undefined {
		// If list found
		if (response.data.list.id_str === id) {
			return new List(response.data.list as unknown as IRawList);
		}
		// If not found
		else {
			return undefined;
		}
	}

	/**
	 * Extracts and deserializes the timeline of lists followed from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized timeline of lists.
	 */
	public static timeline(response: NonNullable<unknown>): List[] {
		const lists: List[] = [];

		// Extracting the matching data
		const extract = findByFilter<ITimelineList>(response, '__typename', 'TimelineTwitterList').map(
			(item) => item.list,
		);

		// Deserializing valid data
		for (const item of extract) {
			// If valid list
			if (item !== undefined && item.id !== undefined && item.following === true) {
				// Logging
				LogService.log(LogActions.DESERIALIZE, { id: item.id });

				lists.push(new List(item));
			}
		}

		return lists;
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): IList {
		return {
			createdAt: this.createdAt,
			createdBy: this.createdBy,
			description: this.description,
			id: this.id,
			isFollowing: this.isFollowing,
			isMember: this.isMember,
			memberCount: this.memberCount,
			name: this.name,
			subscriberCount: this.subscriberCount,
		};
	}
}
