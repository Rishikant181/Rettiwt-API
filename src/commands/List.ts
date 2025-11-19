import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'list' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'list' command.
 */
function createListCommand(rettiwt: Rettiwt): Command {
	// Creating the 'list' command
	const list = createCommand('list').description('Access resources related to lists');

	// Add member
	list.command('add-member')
		.description('Add a new member to a list')
		.argument('<list-id>', 'The ID of the tweet list')
		.argument('<user-id>', 'The ID of the user to add')
		.action(async (listId: string, userId: string) => {
			try {
				const memberCount = await rettiwt.list.addMember(listId, userId);
				output(memberCount);
			} catch (error) {
				output(error);
			}
		});

	// Details
	list.command('details')
		.description('Fetch the details of a list')
		.argument('<id>', 'The ID of the tweet list')
		.action(async (id: string) => {
			try {
				const details = await rettiwt.list.details(id);
				output(details);
			} catch (error) {
				output(error);
			}
		});

	// Members
	list.command('members')
		.description('Fetch the list of members of the given tweet list')
		.argument('<id>', 'The ID of the tweet list')
		.argument('[count]', 'The number of members to fetch')
		.argument('[cursor]', 'The cursor to the batch of members to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const members = await rettiwt.list.members(id, count ? parseInt(count) : undefined, cursor);
				output(members);
			} catch (error) {
				output(error);
			}
		});

	// Remove member
	list.command('remove-member')
		.description('Remove a new member from a list')
		.argument('<list-id>', 'The ID of the tweet list')
		.argument('<user-id>', 'The ID of the user to remove')
		.action(async (listId: string, userId: string) => {
			try {
				const memberCount = await rettiwt.list.removeMember(listId, userId);
				output(memberCount);
			} catch (error) {
				output(error);
			}
		});

	// Tweets
	list.command('tweets')
		.description('Fetch the list of tweets in the tweet list with the given id')
		.argument('<id>', 'The ID of the tweet list')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.list.tweets(id, count ? parseInt(count) : undefined, cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	return list;
}

export default createListCommand;
