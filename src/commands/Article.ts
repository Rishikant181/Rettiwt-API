import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates an `article` command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created command.
 */
function createArticleCommand(rettiwt: Rettiwt): Command {
	const article = createCommand('article').description('Access resources related to Articles');

	article
		.command('details')
		.description('Fetch a published Article by its containing tweet ID')
		.argument('<id>', 'The ID of the tweet containing the Article')
		.action(async (id: string) => {
			try {
				output(await rettiwt.article.details(id));
			} catch (error) {
				output(error);
			}
		});

	return article;
}

export default createArticleCommand;
