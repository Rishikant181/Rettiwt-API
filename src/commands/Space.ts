import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

interface ISpaceDetailsOptions {
	withReplays?: boolean;
	withListeners?: boolean;
	metatags?: boolean;
}

interface ISpaceSearchOptions {
	latest?: boolean;
}

/**
 * Creates a new 'space' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'space' command.
 */
function createSpaceCommand(rettiwt: Rettiwt): Command {
	// Creating the 'space' command
	const space = createCommand('space').description('Access resources related to spaces');

	// Details
	space
		.command('details')
		.description('Fetch the details of a space with the given id')
		.argument('<id>', 'The id of the space')
		.option('--with-replays', 'Include replay information')
		.option('--with-listeners', 'Include listeners information')
		.option('--metatags', 'Request metatags in the response')
		.action(async (id: string, options?: ISpaceDetailsOptions) => {
			try {
				const details = await rettiwt.space.details(id, {
					withReplays: options?.withReplays,
					withListeners: options?.withListeners,
					isMetatagsQuery: options?.metatags,
				});
				output(details);
			} catch (error) {
				output(error);
			}
		});

	// Search
	space
		.command('search')
		.description('Search for spaces')
		.argument('<query>', 'The search query')
		.argument('[count]', 'The number of results to fetch')
		.argument('[cursor]', 'The cursor to the batch of results to fetch')
		.option('--latest', 'Fetch latest results instead of top results')
		.action(async (query: string, count?: string, cursor?: string, options?: ISpaceSearchOptions) => {
			try {
				const results = await rettiwt.space.search(
					query,
					count ? parseInt(count) : undefined,
					cursor,
					!options?.latest,
				);
				output(results);
			} catch (error) {
				output(error);
			}
		});

	return space;
}

export default createSpaceCommand;
