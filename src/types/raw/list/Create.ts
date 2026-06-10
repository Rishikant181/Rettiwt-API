/* eslint-disable */

/**
 * The raw data received when creating a tweet list.
 *
 * @public
 */
export interface IListCreateResponse {
	data?: {
		list?: IListCreateList;
		create_list?: {
			list?: IListCreateList;
		};
		list_create?: {
			list?: IListCreateList;
		};
	};
}

interface IListCreateList {
	id?: string;
	id_str?: string;
}
