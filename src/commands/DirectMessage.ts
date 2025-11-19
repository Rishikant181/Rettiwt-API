import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'dm' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'dm' command.
 */
function createDirectMessageCommand(rettiwt: Rettiwt): Command {
	// Creating the 'dm' command
	const dm = createCommand('dm').description('Access resources related to direct messages');

	// Conversation
	dm.command('conversation')
		.description('Get the full conversation history for a specific conversation')
		.argument('<conversation-id>', 'The ID of the conversation (e.g., "394028042-1712730991884689408")')
		.argument('[cursor]', 'The cursor for pagination (maxId from previous response)')
		.action(async (conversationId: string, cursor?: string) => {
			try {
				const conversation = await rettiwt.dm.conversation(conversationId, cursor);
				output(conversation);
			} catch (error) {
				output(error);
			}
		});

	// Delete conversation
	dm.command('delete-conversation')
		.description('Delete a conversation (you will leave the conversation and it will be removed from your inbox)')
		.argument('<conversation-id>', 'The ID of the conversation to delete')
		.action(async (conversationId: string) => {
			try {
				await rettiwt.dm.deleteConversation(conversationId);
				output({ success: true, message: 'Conversation deleted successfully' });
			} catch (error) {
				output(error);
			}
		});

	// Inbox
	dm.command('inbox')
		.description('Get your DM inbox')
		.argument(
			'[cursor]',
			'The cursor to the batch of conversations to fetch. If not provided, initial inbox is fetched',
		)
		.action(async (cursor?: string) => {
			try {
				const inbox = await rettiwt.dm.inbox(cursor);
				output(inbox);
			} catch (error) {
				output(error);
			}
		});

	return dm;
}

export default createDirectMessageCommand;
