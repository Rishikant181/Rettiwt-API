import { readFileSync } from 'fs';
import { createInterface } from 'readline/promises';
import { Writable } from 'stream';

import { Command, createCommand } from 'commander';

import { RawAnalyticsGranularity, RawAnalyticsMetric } from '../enums/raw/Analytics';
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
	const user = createCommand('user').description('Access resources related to users');

	// Affiliates
	user.command('affiliates')
		.description('Fetch the list of users who affiliated to the given user')
		.argument('<id>', 'The id of the user')
		.argument('[count]', 'The number of affiliates to fetch')
		.argument('[cursor]', 'The cursor to the batch of affiliates to fetch')
		.action(async (id: string, count?: string, cursor?: string) => {
			try {
				const users = await rettiwt.user.affiliates(id, count ? parseInt(count) : undefined, cursor);
				output(users);
			} catch (error) {
				output(error);
			}
		});

	// Analytics
	user.command('analytics')
		.description('Fetch the analytics of the logged-in user (premium accounts only)')
		.option('-f, --from-time <string>', 'The start time for fetching analytics')
		.option('-t, --to-time <string>', 'The end time for fetching analytics')
		.option(
			'-g, --granularity <string>',
			'The granularity of the analytics data. Defaults to daily. Check https://rishikant181.github.io/Rettiwt-API/enums/RawAnalyticsGranularity.html for granularity options',
		)
		.option(
			'-m, --metrics <string>',
			'Comma-separated list of metrics required. Check https://rishikant181.github.io/Rettiwt-API/enums/RawAnalyticsMetric.html for available metrics',
		)
		.option(
			'-v, --verified-followers',
			'Whether to include verified follower count and relationship counts in the response. Defaults to true',
		)
		.action(async (options?: UserAnalyticsOptions) => {
			try {
				const analytics = await rettiwt.user.analytics(
					options?.fromTime ? new Date(options.fromTime) : undefined,
					options?.toTime ? new Date(options.toTime) : undefined,
					options?.granularity
						? RawAnalyticsGranularity[options.granularity as keyof typeof RawAnalyticsGranularity]
						: undefined,
					options?.metrics
						? options.metrics
								.split(',')
								.map((item) => RawAnalyticsMetric[item as keyof typeof RawAnalyticsMetric])
						: undefined,
					options?.verifiedFollowers,
				);
				output(analytics);
			} catch (error) {
				output(error);
			}
		});

	user.command('bookmarks')
		.description('Fetch your list of bookmarks')
		.argument('[count]', 'The number of bookmarks to fetch')
		.argument('[cursor]', 'The cursor to the batch of bookmarks to fetch')
		.action(async (count?: string, cursor?: string) => {
			try {
				const bookmarks = await rettiwt.user.bookmarks(count ? parseInt(count) : undefined, cursor);
				output(bookmarks);
			} catch (error) {
				output(error);
			}
		});

	user.command('bookmark-folders')
		.description('Fetch your list of bookmark folders')
		.argument('[cursor]', 'The cursor to the batch of bookmark folders to fetch')
		.action(async (cursor?: string) => {
			try {
				const folders = await rettiwt.user.bookmarkFolders(cursor);
				output(folders);
			} catch (error) {
				output(error);
			}
		});

	user.command('bookmark-folder-tweets')
		.description('Fetch tweets from a specific bookmark folder')
		.argument('<folderId>', 'The ID of the bookmark folder')
		.argument('[count]', 'The number of tweets to fetch')
		.argument('[cursor]', 'The cursor to the batch of tweets to fetch')
		.action(async (folderId: string, count?: string, cursor?: string) => {
			try {
				const tweets = await rettiwt.user.bookmarkFolderTweets(
					folderId,
					count ? parseInt(count) : undefined,
					cursor,
				);
				output(tweets);
			} catch (error) {
				output(error);
			}
		});

	// About
	user.command('about')
		.description('Fetch the about profile of the user with the given username')
		.argument('<username>', 'The username of the user')
		.action(async (username: string) => {
			try {
				const about = await rettiwt.user.about(username);
				output(about);
			} catch (error) {
				output(error);
			}
		});

	// Details
	user.command('details')
		.description('Fetch the details of the user with the given id/username')
		.argument('<id>', 'The username/id of the user whose details are to be fetched')
		.action(async (id: string) => {
			try {
				// Getting the different IDs
				const ids: string[] = id.split(',');

				// If single ID given
				if (ids.length <= 1) {
					const details = await rettiwt.user.details(ids[0]);
					output(details);
				}
				// If multiple IDs given
				else {
					const details = await rettiwt.user.details(ids);
					output(details);
				}
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

	// Lists
	user.command('lists')
		.description('Fetch your lists')
		.argument('[count]', 'The number of lists to fetch')
		.argument('[cursor]', 'The cursor to the batch of lists to fetch')
		.action(async (count?: string, cursor?: string) => {
			try {
				const lists = await rettiwt.user.lists(count ? parseInt(count) : undefined, cursor);
				output(lists);
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

	// Replies
	user.command('search')
		.description('Search for a username')
		.argument('<username>', 'The username to search for')
		.argument('[count]', 'The number of results to fetch')
		.argument('[cursor]', 'The cursor to the batch of results to fetch')
		.action(async (userName: string, count?: string, cursor?: string) => {
			try {
				const replies = await rettiwt.user.search(userName, count ? parseInt(count) : undefined, cursor);
				output(replies);
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

	// Update Profile
	user.command('update-profile')
		.description('Update your profile information')
		.option('-n, --name <string>', 'Display name (max 50 characters)')
		.option('-u, --url <string>', 'Profile URL')
		.option('-l, --location <string>', 'Location (max 30 characters)')
		.option('-d, --description <string>', 'Description/bio (max 160 characters)')
		.action(async (options?: UserProfileUpdateOptions) => {
			try {
				const result = await rettiwt.user.updateProfile({
					name: options?.name,
					url: options?.url,
					location: options?.location,
					description: options?.description,
				});
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Change Password
	user.command('change-password')
		.description('Change your account password')
		.option('--show-new-key', 'Include rotated apiKey in the output')
		.action(async (options?: UserPasswordChangeOptions) => {
			try {
				const initialApiKey = rettiwt.apiKey;
				const currentPassword = await promptHidden('Current password: ');
				const newPassword = await promptHidden('New password: ');
				const confirmPassword = await promptHidden('Confirm new password: ');

				if (newPassword !== confirmPassword) {
					throw new Error('New password confirmation does not match');
				}
				if (newPassword === currentPassword) {
					throw new Error('New password must be different from current password');
				}

				const result = await rettiwt.user.changePassword(currentPassword, newPassword);
				const apiKeyUpdated = initialApiKey !== rettiwt.apiKey;
				const response = {
					success: result,
					apiKeyUpdated: result ? apiKeyUpdated : false,
					...(options?.showNewKey ? { apiKey: rettiwt.apiKey } : {}),
				};

				output(response);
			} catch (error) {
				output(error);
			}
		});

	// Change Username
	user.command('change-username')
		.description('Change your username')
		.argument('<username>', 'The new username (with or without @)')
		.action(async (username: string) => {
			try {
				const result = await rettiwt.user.changeUsername(username);
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Update Profile Banner
	user.command('update-profile-banner')
		.description('Update your profile banner from an image file path')
		.argument('<path>', 'The path to the banner image file')
		.action(async (path: string) => {
			try {
				const result = await rettiwt.user.updateProfileBanner(fileToBase64(path));
				output(result);
			} catch (error) {
				output(error);
			}
		});

	// Update Profile Image
	user.command('update-profile-image')
		.description('Update your profile image from an image file path')
		.argument('<path>', 'The path to the profile image file')
		.action(async (path: string) => {
			try {
				const result = await rettiwt.user.updateProfileImage(fileToBase64(path));
				output(result);
			} catch (error) {
				output(error);
			}
		});

	return user;
}

/**
 * Reads a file and returns its base64 representation.
 *
 * @param path - The path to the file.
 * @returns The base64 representation of the file contents.
 */
function fileToBase64(path: string): string {
	if (path.trim().length === 0) {
		throw new Error('File path cannot be empty');
	}

	try {
		return readFileSync(path).toString('base64');
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Could not read file at '${path}': ${error.message}`);
		}

		throw new Error(`Could not read file at '${path}'`);
	}
}

/**
 * Prompts user for hidden input without echoing typed characters.
 *
 * @param query - The prompt text.
 * @returns The provided value.
 */
async function promptHidden(query: string): Promise<string> {
	if (!process.stdin.isTTY || !process.stdout.isTTY) {
		throw new Error('Password prompt requires an interactive terminal');
	}

	let queryShown = false;

	const mutedOutput = new Writable({
		write(chunk: Buffer | string, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
			const text = chunk.toString();

			if (!queryShown) {
				process.stdout.write(text);
				queryShown = text.includes(query);
			}

			callback();
		},
	});

	const input = createInterface({
		input: process.stdin,
		output: mutedOutput,
		terminal: true,
	});

	try {
		const value = await input.question(query);
		process.stdout.write('\n');

		return value;
	} finally {
		input.close();
	}
}

/**
 * The options for fetching user analytics.
 */
type UserAnalyticsOptions = {
	fromTime?: string;
	toTime?: string;
	granularity?: string;
	metrics?: string;
	verifiedFollowers?: boolean;
};

/**
 * The options for updating user profile.
 */
type UserProfileUpdateOptions = {
	name?: string;
	url?: string;
	location?: string;
	description?: string;
};

/**
 * The options for changing account password.
 */
type UserPasswordChangeOptions = {
	showNewKey?: boolean;
};

export default createUserCommand;
