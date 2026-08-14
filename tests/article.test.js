const assert = require('node:assert/strict');
const test = require('node:test');

const { Article, BaseType, CursoredData, ResourceType, Tweet, UserRequests } = require('../dist');
const { FetchResourcesGroup } = require('../dist/collections/Groups');

function rawTweet() {
	return {
		__typename: 'Tweet',
		rest_id: '2083935229757337948',
		core: {
			user_results: {
				result: {
					__typename: 'User',
					rest_id: '1466675689554202624',
					core: {
						created_at: 'Wed Jan 01 00:00:00 +0000 2020',
						name: 'Article Author',
						screen_name: 'article_author',
					},
					is_blue_verified: true,
					legacy: {
						created_at: 'Wed Jan 01 00:00:00 +0000 2020',
						description: '',
						favourites_count: 1,
						followers_count: 2,
						friends_count: 3,
						location: '',
						name: 'Article Author',
						pinned_tweet_ids_str: [],
						profile_banner_url: '',
						profile_image_url_https: 'https://example.com/avatar.jpg',
						screen_name: 'article_author',
						statuses_count: 4,
					},
				},
			},
		},
		legacy: {
			bookmark_count: 0,
			conversation_id_str: '2083935229757337948',
			created_at: 'Wed Jan 01 00:00:00 +0000 2025',
			entities: { hashtags: [], media: [], symbols: [], urls: [], user_mentions: [] },
			extended_entities: { media: [] },
			favorite_count: 0,
			full_text: 'Article post',
			lang: 'en',
			quote_count: 0,
			reply_count: 0,
			retweet_count: 0,
		},
		article: {
			article_results: {
				result: {
					rest_id: '2083915397791891456',
					title: 'An article title',
					preview_text: 'A short preview',
					content_state: {
						blocks: [
							{ key: 'a', text: 'First paragraph' },
							{ key: 'b', text: 'Second paragraph' },
						],
						entityMap: { image: { type: 'MEDIA' } },
					},
					cover_media: {
						rest_id: 'cover-1',
						type: 'photo',
						media_info: {
							original_img_url: 'https://example.com/cover.jpg',
							original_img_width: 1200,
							original_img_height: 630,
						},
					},
					media_entities: [],
					metadata: { first_published_at_secs: 1735689600 },
					lifecycle_state: { modified_at_secs: 1735776000 },
				},
			},
		},
	};
}

test('Article deserializes rich content and media from a tweet', () => {
	const article = new Article(rawTweet());

	assert.equal(article.id, '2083915397791891456');
	assert.equal(article.tweetId, '2083935229757337948');
	assert.equal(article.text, 'First paragraph\n\nSecond paragraph');
	assert.equal(article.author.userName, 'article_author');
	assert.equal(article.coverMedia.url, 'https://example.com/cover.jpg');
	assert.equal(article.publishedAt, '2025-01-01T00:00:00.000Z');
	assert.equal(article.url, 'https://x.com/article_author/status/2083935229757337948');
});

test('Tweet exposes its attached article', () => {
	const tweet = new Tweet(rawTweet());

	assert.equal(tweet.article.title, 'An article title');
	assert.equal(tweet.toJSON().article.id, '2083915397791891456');
});

test('CursoredData extracts an article timeline and bottom cursor', () => {
	const response = {
		data: {
			entries: [
				{ __typename: 'TimelineTweet', tweet_results: { result: rawTweet() } },
				{ cursorType: 'Bottom', value: 'next-page' },
			],
		},
	};
	const page = new CursoredData(response, BaseType.ARTICLE);

	assert.equal(page.list.length, 1);
	assert.equal(page.list[0].title, 'An article title');
	assert.equal(page.next, 'next-page');
});

test('UserRequests.articles builds the authenticated article timeline request', () => {
	const request = UserRequests.articles('1466675689554202624', 20, 'next-page');
	const variables = JSON.parse(request.params.variables);
	const fieldToggles = JSON.parse(request.params.fieldToggles);

	assert.match(request.url, /UserArticlesTweets$/);
	assert.deepEqual(variables, {
		userId: '1466675689554202624',
		count: 20,
		includePromotedContent: false,
		withVoice: true,
		cursor: 'next-page',
	});
	assert.equal(fieldToggles.withArticleRichContentState, true);
	assert.equal(fieldToggles.withArticlePlainText, true);
});

test('article list and detail resources use the standard fetch pipeline', () => {
	assert.equal(FetchResourcesGroup.includes(ResourceType.USER_ARTICLES), true);
	assert.equal(FetchResourcesGroup.includes(ResourceType.TWEET_ARTICLE), true);
});
