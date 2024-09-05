import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'user' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'user' command.
 */
function createUserCommand(rettiwt: Rettiwt): Command {
	// Creating the 'user' command
	const user = createCommand('user').description('Access resources releated to users');

	// Details
	user.command('details')
		.description('Fetch the details of the user with the given id/username')
		.argument('<id>', 'The username/id of the user whose details are to be fetched')
		.action(async (id: string) => {
			try {
				const details = await rettiwt.user.details(id);
				output(details);
			} catch (error) {
				output(error);
			}
		});

	// Follow
	user.command('follow')
		.description('Follow a user')
		.argument('<id>', 'The user to follow')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.user.follow(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Followed
	user.command('followed')
		.description('Fetch your followed feed')
		.argument('[cursor]', 'The cursor to the batch of feed items to fetch')
		.action(async (cursor?: string) => {
			try {
				const tweets = await rettiwt.user.followed(cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Followers
	user.command('followers')
		.description('Fetch the list of users who follow the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of followers to fetch')
		.argument('[cursor]', 'The cursor to the batch of followers to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.user.followers(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Following
	user.command('following')
		.description('Fetch the list of users who are followed by the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of following to fetch')
		.argument('[cursor]', 'The cursor to the batch of following to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.user.following(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Highlights
	user.command('highlights')
		.description('Fetch the list of highlighted tweets of the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of highlighted tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of highlights to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.user.highlights(id, count ? parseInt(count) : undefined, cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Likes
	user.command('likes')
		.description('Fetch your list of liked tweet')
		.argument('[count]', 'The number of liked tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of liked tweets to fetch')
		.action(async (count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.user.likes(count ? parseInt(count) : undefined, cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Media
	user.command('media')
		.description('Fetch the media timeline the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of media to fetch')
		.argument('[cursor]', 'The cursor to the batch of media to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const media = await rettiwt.user.media(id, count ? parseInt(count) : undefined, cursor);
				output(media);
			} catch (error) {
				output(error);
			}
		});

	// Recommended
	user.command('recommended')
		.description('Fetch your recommended feed')
		.argument('[cursor]', 'The cursor to the batch of feed items to fetch')
		.action(async (cursor?: string) => {
			try {
				const tweets = await rettiwt.user.recommended(cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Replies
	user.command('replies')
		.description('Fetch the replies timeline the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of replies to fetch')
		.argument('[cursor]', 'The cursor to the batch of replies to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const replies = await rettiwt.user.replies(id, count ? parseInt(count) : undefined, cursor);
				output(replies);
			} catch (error) {
				output(error);
			}
		});

	// Subscriptions
	user.command('subscriptions')
		.description('Fetch the list of users who are subscribed by the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of subscriptions to fetch')
		.argument('[cursor]', 'The cursor to the batch of subscriptions to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.user.subscriptions(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Timeline
	user.command('timeline')
		.description('Fetch the tweets timeline the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.user.timeline(id, count ? parseInt(count) : undefined, cursor);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// Unfollow
	user.command('unfollow')
		.description('Unfollow a user')
		.argument('<id>', 'The user to unfollow')
		.action(async (id: string) => {
			try {
				const result = await rettiwt.user.unfollow(id);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	return user;
}

export default createUserCommand;
