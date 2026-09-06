import { Command, createCommand } from 'commander';

import { ArticleLifecycle } from '../enums/Article';
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
		.command('create-draft')
		.description('Create an Article draft')
		.argument('[title]', 'The title of the draft')
		.action(async (title?: string) => {
			try {
				output(await rettiwt.article.createDraft(title === undefined ? undefined : { title: title }));
			} catch (error) {
				output(error);
			}
		});

	article
		.command('delete')
		.description('Delete an Article')
		.argument('<id>', 'The ID of the Article')
		.action(async (id: string) => {
			try {
				output(await rettiwt.article.delete(id));
			} catch (error) {
				output(error);
			}
		});

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

	article
		.command('drafts')
		.description('Fetch draft Articles of the logged-in user')
		.argument('[count]', 'The number of Articles to fetch')
		.argument('[cursor]', 'The cursor to the batch of Articles to fetch')
		.action(async (count?: string, cursor?: string) => {
			try {
				output(await rettiwt.article.drafts(count ? parseInt(count) : undefined, cursor));
			} catch (error) {
				output(error);
			}
		});

	article
		.command('list')
		.description('Fetch Articles for a user by lifecycle state')
		.argument('[id]', 'The target user ID; defaults to the logged-in user')
		.argument('[lifecycle]', 'The lifecycle state: draft or published', 'draft')
		.argument('[count]', 'The number of Articles to fetch')
		.argument('[cursor]', 'The cursor to the batch of Articles to fetch')
		.action(async (id?: string, lifecycle?: string, count?: string, cursor?: string) => {
			try {
				const state = parseLifecycle(lifecycle);
				output(await rettiwt.article.list(id, state, count ? parseInt(count) : undefined, cursor));
			} catch (error) {
				output(error);
			}
		});

	article
		.command('update-title')
		.description('Update the title of an Article')
		.argument('<id>', 'The ID of the Article')
		.argument('<title>', 'The new Article title')
		.action(async (id: string, title: string) => {
			try {
				output(await rettiwt.article.updateTitle(id, title));
			} catch (error) {
				output(error);
			}
		});

	return article;
}

/** Converts a CLI lifecycle value to the public enum. */
function parseLifecycle(value = 'draft'): ArticleLifecycle {
	if (value.toLowerCase() === 'published') {
		return ArticleLifecycle.PUBLISHED;
	}

	if (value.toLowerCase() === 'draft') {
		return ArticleLifecycle.DRAFT;
	}

	throw new Error("Lifecycle must be either 'draft' or 'published'");
}

export default createArticleCommand;
