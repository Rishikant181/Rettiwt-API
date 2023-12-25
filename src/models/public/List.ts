// PACKAGES
import { IList as IRawList } from 'rettiwt-core';

// TYPES
import { IList } from '../../types/public/List';

/**
 * The details of a single Twitter List.
 *
 * @public
 */
export class List implements IList {
	public id: string;
	public name: string;
	public createdAt: string;
	public description: string;
	public memberCount: number;
	public subscriberCount: number;
	public createdBy: string;

	/**
	 * Initializes a new Tweet List from the given raw list data.
	 *
	 * @param list - list The raw tweet list data.
	 */
	public constructor(list: IRawList) {
		this.id = list.id_str;
		this.name = list.name;
		this.createdAt = new Date(list.created_at).toISOString();
		this.description = list.description;
		this.memberCount = list.member_count;
		this.subscriberCount = list.subscriber_count;
		this.createdBy = list.user_results.result.id;
	}
}
