const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

const { Article, BaseType, CursoredData, ResourceType, UserRequests } = require('../dist');
const { FetchResourcesGroup } = require('../dist/collections/Groups');

function rawUser() {
	return {
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
	};
}

function rawTweet() {
	return {
		__typename: 'Tweet',
		rest_id: '2083935229757337948',
		core: { user_results: { result: rawUser() } },
		article: {
			article_results: {
				result: {
					rest_id: '2083915397791891456',
					title: 'An article title',
					preview_text: 'A short preview',
					content_state: {
						blocks: [
							{ key: 'a', text: 'First paragraph', type: 'unstyled' },
							{ key: 'b', text: 'Second paragraph', type: 'unstyled' },
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
					media_entities: {},
					metadata: { first_published_at_secs: '1735689600' },
					lifecycle_state: { lifecycle: 'Published', modified_at_secs: '1735776000' },
				},
			},
		},
	};
}

test('Article parses lifecycle Article entities from PR #877', () => {
	const article = Article.fromRawArticle({
		rest_id: 'article-1',
		title: 'Draft title',
		content_state: { blocks: [], entityMap: {} },
		lifecycle_state: { lifecycle: 'Draft' },
	});

	assert.equal(article.id, 'article-1');
	assert.equal(article.title, 'Draft title');
	assert.equal(article.lifecycle, 'Draft');
});

test('published timelines deserialize into the shared Article model', () => {
	const response = {
		data: {
			entries: [
				{ __typename: 'TimelineTweet', tweet_results: { result: rawTweet() } },
				{ cursorType: 'Bottom', value: 'next-page' },
			],
		},
	};
	const page = new CursoredData(response, BaseType.ARTICLE);
	const article = page.list[0];

	assert.equal(page.next, 'next-page');
	assert.equal(article instanceof Article, true);
	assert.equal(article.id, '2083915397791891456');
	assert.equal(article.tweetId, '2083935229757337948');
	assert.equal(article.text, 'First paragraph\n\nSecond paragraph');
	assert.equal(article.author.userName, 'article_author');
	assert.equal(article.coverMedia.url, 'https://example.com/cover.jpg');
	assert.equal(article.publishedAt, '2025-01-01T00:00:00.000Z');
	assert.equal(article.url, 'https://x.com/article_author/status/2083935229757337948');
	assert.equal(Article.single(response, '2083935229757337948').id, article.id);
});

test('UserRequests.articles builds a cursored UserArticlesTweets request', () => {
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
	assert.equal(FetchResourcesGroup.includes(ResourceType.USER_ARTICLES), true);
	assert.equal(FetchResourcesGroup.includes(ResourceType.ARTICLE_DETAILS), true);
});

test('Article commands are exposed by the CLI', () => {
	const articleHelp = execFileSync(process.execPath, ['dist/cli.js', 'article', '--help'], { encoding: 'utf8' });
	const userHelp = execFileSync(process.execPath, ['dist/cli.js', 'user', 'articles', '--help'], {
		encoding: 'utf8',
	});

	assert.match(articleHelp, /create-draft/);
	assert.match(articleHelp, /details/);
	assert.match(articleHelp, /update-title/);
	assert.match(userHelp, /Fetch the Articles published/);
});
