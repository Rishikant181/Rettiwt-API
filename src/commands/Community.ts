import { Command, createCommand } from 'commander';

import { CommunityTweetsSortType } from '../enums/Tweet';
import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

interface ICommunityMembersOptions {
	cursor?: string;
}

interface ICommunityModeratorsOptions {
	count?: string;
	cursor?: string;
}

interface ICommunityTweetsOptions {
	sortBy?: string;
}

/**
 * Creates a new 'community' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'community' command.
 */
function createCommunityCommand(rettiwt: Rettiwt): Command {
	const community = createCommand('community').description('Access resources related to communities');

	community
		.command('join')
		.description('Join the community with the given id')
		.argument('<id>', 'The id of the community')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.community.join(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	community
		.command('leave')
		.description('Leave the community with the given id')
		.argument('<id>', 'The id of the community')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.community.leave(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	community
		.command('members')
		.description('Fetch a batch of members from a community')
		.argument('<id>', 'The id of the community')
		.option('--cursor <cursor>', 'The cursor to the next members batch')
		.action(async (id: string, options?: ICommunityMembersOptions) => {
			try {
				const members = await rettiwt.community.members(id, options?.cursor);
				output(members);
			} catch (error) {
				output(error);
			}
		});

	community
		.command('moderators')
		.description('Fetch a batch of moderators from a community')
		.argument('<id>', 'The id of the community')
		.option('--count <number>', 'The number of moderators to fetch')
		.option('--cursor <cursor>', 'The cursor to the next moderators batch')
		.action(async (id: string, options?: ICommunityModeratorsOptions) => {
			try {
				const moderators = await rettiwt.community.moderators(
					id,
					options?.count ? Number(options.count) : undefined,
					options?.cursor,
				);
				output(moderators);
			} catch (error) {
				output(error);
			}
		});

	community
		.command('tweets')
		.description('Fetch a batch of tweets from a community')
		.argument('<id>', 'The id of the community')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.option('--sort-by <string>', 'Sort by top or latest, default is top')
		.action(async (id: string, count?: string, cursor?: string, options?: ICommunityTweetsOptions) => {
			try {
				let sortType: CommunityTweetsSortType | undefined = undefined;

				if (options?.sortBy === 'latest') {
					sortType = CommunityTweetsSortType.LATEST;
				} else if (options?.sortBy === 'top') {
					sortType = CommunityTweetsSortType.TOP;
				}

				const tweets = await rettiwt.community.tweets(id, count ? parseInt(count) : undefined, cursor, sortType);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	community
		.command('details')
		.description('Fetch the details of a community with the given id')
		.argument('<id>', 'The id of the community')
		.action(async (id: string) => {
			try {
				const details = await rettiwt.community.details(id);
				output(details);
			} catch (error) {
				output(error);
			}
		});

	return community;
}

export default createCommunityCommand;
