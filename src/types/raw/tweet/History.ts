/* eslint-disable */

import { ITimelineTweet } from '../composite/TimelineTweet';

/**
 * Represents the raw response received when fetching a tweet's edit history.
 *
 * @public
 */
export interface ITweetHistoryResponse {
	data?: {
		tweet_result_by_rest_id?: {
			result?: {
				edit_history_timeline?: {
					timeline?: ITweetHistoryTimeline;
				};
			};
		};
	};
}

export interface ITweetHistoryTimeline {
	instructions?: ITweetHistoryInstruction[];
}

export interface ITweetHistoryInstruction {
	direction?: string;
	entries?: ITweetHistoryEntry[];
	type: string;
}

export interface ITweetHistoryEntry {
	content?: ITweetHistoryModule;
	entryId: string;
	sortIndex?: string;
}

export interface ITweetHistoryModule {
	__typename: string;
	displayType: string;
	entryType: string;
	header?: ITweetHistoryHeader;
	items?: ITweetHistoryItem[];
}

export interface ITweetHistoryHeader {
	displayType: string;
	sticky: boolean;
	text: string;
}

export interface ITweetHistoryItem {
	entryId: string;
	item: {
		itemContent: ITimelineTweet;
	};
}
