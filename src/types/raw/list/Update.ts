import { IList } from '../base/List';

/**
 * The raw data received when updating a tweet list.
 *
 * @public
 */
export interface IListUpdateResponse {
	data?: {
		list?: IList;
	};
}
