/* eslint-disable */

/**
 * The raw data received when creating a tweet list.
 *
 * @public
 */
export interface IListCreateResponse {
	data?: {
		list?: IListCreateList;
	};
}

interface IListCreateList {
	id_str?: string;
}
