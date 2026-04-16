import { Extractors } from '../../collections/Extractors';
import { ResourceType } from '../../enums/Resource';
import { CommunityTweetsSortType } from '../../enums/Tweet';
import { Community } from '../../models/data/Community';
import { CommunityJoin } from '../../models/data/CommunityJoin';
import { CommunityLeave } from '../../models/data/CommunityLeave';
import { CommunityMembersSlice } from '../../models/data/CommunityMembersSlice';
import { CursoredData } from '../../models/data/CursoredData';
import { Tweet } from '../../models/data/Tweet';
import { RettiwtConfig } from '../../models/RettiwtConfig';
import { ICommunityDetailsResponse } from '../../types/raw/community/Details';
import { ICommunityJoinResponse } from '../../types/raw/community/Join';
import { ICommunityLeaveResponse } from '../../types/raw/community/Leave';
import { ICommunityMembersSliceResponse, ICommunityModeratorsSliceResponse } from '../../types/raw/community/Slices';
import { ICommunityTweetsResponse } from '../../types/raw/community/Tweets';

import { FetcherService } from './FetcherService';

/**
 * Handles interacting with resources related to communities.
 *
 * @public
 */
export class CommunityService extends FetcherService {
	/**
	 * @param config - The config object for configuring the Rettiwt instance.
	 *
	 * @internal
	 */
	public constructor(config: RettiwtConfig) {
		super(config);
	}

	/**
	 * Get the details of a community.
	 *
	 * @param id - The ID of the target community.
	 *
	 * @returns The details of the community with the given ID.
	 */
	public async details(id: string): Promise<Community | undefined> {
		const resource = ResourceType.COMMUNITY_DETAILS;

		const response = await this.request<ICommunityDetailsResponse>(resource, {
			id: id,
		});

		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Join a community.
	 *
	 * @param id - The ID of the target community.
	 *
	 * @returns The result of the join attempt.
	 */
	public async join(id: string): Promise<CommunityJoin | undefined> {
		const resource = ResourceType.COMMUNITY_JOIN;

		const response = await this.request<ICommunityJoinResponse>(resource, {
			id: id,
		});

		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Leave a community.
	 *
	 * @param id - The ID of the target community.
	 *
	 * @returns The result of the leave attempt.
	 */
	public async leave(id: string): Promise<CommunityLeave | undefined> {
		const resource = ResourceType.COMMUNITY_LEAVE;

		const response = await this.request<ICommunityLeaveResponse>(resource, {
			id: id,
		});

		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get the members slice of a community.
	 *
	 * @param id - The ID of the target community.
	 * @param cursor - The cursor to the next batch of members.
	 *
	 * @returns A cursored batch of community members.
	 */
	public async members(id: string, cursor?: string): Promise<CommunityMembersSlice | undefined> {
		const resource = ResourceType.COMMUNITY_MEMBERS;

		const response = await this.request<ICommunityMembersSliceResponse>(resource, {
			id: id,
			cursor: cursor,
		});

		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get the moderators slice of a community.
	 *
	 * @param id - The ID of the target community.
	 * @param count - The number of moderators to fetch.
	 * @param cursor - The cursor to the next batch of moderators.
	 *
	 * @returns A cursored batch of community moderators.
	 */
	public async moderators(id: string, count?: number, cursor?: string): Promise<CommunityMembersSlice | undefined> {
		const resource = ResourceType.COMMUNITY_MODERATORS;

		const response = await this.request<ICommunityModeratorsSliceResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
		});

		const data = Extractors[resource](response.data);

		return data;
	}

	/**
	 * Get the tweets from a community timeline.
	 *
	 * @param id - The ID of the target community.
	 * @param count - The number of tweets to fetch.
	 * @param cursor - The cursor to the next batch of tweets.
	 * @param sortBy - The ranking mode to use.
	 *
	 * @returns A cursored batch of community tweets.
	 */
	public async tweets(
		id: string,
		count?: number,
		cursor?: string,
		sortBy?: CommunityTweetsSortType,
	): Promise<CursoredData<Tweet>> {
		const resource = ResourceType.COMMUNITY_TWEETS;

		const response = await this.request<ICommunityTweetsResponse>(resource, {
			id: id,
			count: count,
			cursor: cursor,
			communitySortBy: sortBy,
		});

		const data = Extractors[resource](response.data);

		return data;
	}
}
