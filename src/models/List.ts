// PACKAGES
import { IList as IRawList } from 'rettiwt-core';

// TYPES
import { IList } from '../types/List';

/**
 * The details of a single Twitter List.
 *
 * @public
 */
export class List implements IList {
	/** The rest id of the list. */
	id: string;

	/** The name of the list. */
	name: string;

	/** The date and time of creation of the list, int UTC string format. */
	createdAt: string;

	/** The list description. */
	description: string;

	/** The number of memeber of the list. */
	memberCount: number;

	/** The number of subscribers of the list. */
	subscriberCount: number;

	/** The rest id of the user who created the list. */
	createdBy: string;

	/**
	 * Initializes a new Tweet List from the given raw list data.
	 *
	 * @param list - list The raw tweet list data.
	 */
	constructor(list: IRawList) {
		this.id = list.id_str;
		this.name = list.name;
		this.createdAt = new Date(list.created_at).toISOString();
		this.description = list.description;
		this.memberCount = list.member_count;
		this.subscriberCount = list.subscriber_count;
		this.createdBy = list.user_results.result.id;
	}
}
