import { IList as IRawList } from 'rettiwt-core';

/**
 * The details of a single Twitter List.
 *
 * @public
 */
export class List {
	/** The date and time of creation of the list, int UTC string format. */
	public createdAt: string;

	/** The rest id of the user who created the list. */
	public createdBy: string;

	/** The list description. */
	public description?: string;

	/** The rest id of the list. */
	public id: string;

	/** The number of memeber of the list. */
	public memberCount: number;

	/** The name of the list. */
	public name: string;

	/** The number of subscribers of the list. */
	public subscriberCount: number;

	/**
	 * @param list - The raw list details.
	 */
	public constructor(list: IRawList) {
		this.id = list.id_str;
		this.name = list.name;
		this.createdAt = new Date(list.created_at).toISOString();
		this.description = list.description.length ? list.description : undefined;
		this.memberCount = list.member_count;
		this.subscriberCount = list.subscriber_count;
		this.createdBy = list.user_results.result.id;
	}
}
