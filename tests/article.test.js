const assert = require('node:assert/strict');
const test = require('node:test');

const {
	Article,
	BaseArticle,
	BaseType,
	CursoredData,
	PublishedArticle,
	ResourceType,
	UserRequests,
} = require('../dist');
const { FetchResourcesGroup } = require('../dist/collections/Groups');

function rawTweet() {
	return {
		__typename: 'Tweet',
		rest_id: '2083935229757337948',
		article: {
			article_results: {
				result: {
					rest_id: '2083915397791891456',
					id: 'QXJ0aWNsZUVudGl0eToyMDgzOTE1Mzk3NzkxODkxNDU2',
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
						id: 'QXBpTWVkaWE6Y292ZXItMQ',
						media_id: '2083926695506255872',
						media_key: '3_2083926695506255872',
						media_info: {
							__typename: 'ApiImage',
							original_img_url: 'https://example.com/cover.jpg',
							original_img_width: 1200,
							original_img_height: 630,
						},
					},
					media_entities: [],
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

test('Article keeps lifecycle identity and defaults from PR #877', () => {
	const articleWithoutRestId = new Article({ id: 'internal-id-only', preview_text: '' });
	assert.equal(articleWithoutRestId.id, undefined);
	assert.equal(articleWithoutRestId.previewText, undefined);

	const article = Article.fromRawArticle({ rest_id: 'lifecycle-article', id: 'internal-entity-id' });
	assert.equal(article.id, 'lifecycle-article');
	assert.deepEqual(article.contentState, { blocks: [], entityMap: [] });
	assert.equal(article.media, undefined);
	assert.equal('text' in article, false);
});

test('Article keeps PR #877 list and cursor behavior isolated from published timelines', () => {
	const response = {
		data: {
			user: {
				result: {
					articles_article_mixer_slice: {
						items: { unexpected: 'non-array' },
					},
				},
			},
			entries: [{ cursorType: 'Bottom', value: 'published-timeline-cursor' }],
		},
	};
	const page = new CursoredData(response, BaseType.ARTICLE);

	assert.deepEqual(page.list, []);
	assert.equal(page.next, '');
});

test('PublishedArticle uses rest_id and ignores invalid timestamps', () => {
	const tweet = rawTweet();
	const rawArticle = tweet.article.article_results.result;
	rawArticle.metadata.first_published_at_secs = 'Infinity';
	const article = PublishedArticle.fromTweet(tweet);

	assert.equal(article.id, '2083915397791891456');
	assert.notEqual(article.id, rawArticle.id);
	assert.equal(article.publishedAt, undefined);
});

test('PublishedArticle rejects a GraphQL id without rest_id', () => {
	const tweet = rawTweet();
	const rawArticle = tweet.article.article_results.result;
	delete rawArticle.rest_id;

	assert.equal(PublishedArticle.fromTweet(tweet), undefined);
	assert.throws(() => new PublishedArticle(rawArticle), /Published Article ID is required/);
});

test('PublishedArticle preserves blank paragraphs and reads the observed media shape directly', () => {
	const tweet = rawTweet();
	const rawArticle = tweet.article.article_results.result;
	rawArticle.content_state.blocks = [
		{ key: 'a', text: 'First', type: 'unstyled' },
		{ key: 'b', text: '', type: 'unstyled' },
		{ key: 'c', text: 'Third', type: 'unstyled' },
	];
	rawArticle.media_entities = [
		{
			id: 'QXBpTWVkaWE6aW5saW5lLTE',
			media_id: '2101819722128052224',
			media_key: '3_2101819722128052224',
			media_info: {
				__typename: 'ApiImage',
				original_img_url: 'https://example.com/inline.png',
				original_img_width: 1600,
				original_img_height: 900,
			},
		},
	];
	const article = PublishedArticle.fromTweet(tweet);

	assert.equal(article.text, 'First\n\n\n\nThird');
	assert.deepEqual(article.media[0].toJSON(), {
		height: 900,
		id: 'QXBpTWVkaWE6aW5saW5lLTE',
		mediaId: '2101819722128052224',
		mediaKey: '3_2101819722128052224',
		url: 'https://example.com/inline.png',
		width: 1600,
	});
});

test('published timelines deserialize into a sibling Article model', () => {
	const response = {
		data: {
			entries: [
				{ __typename: 'TimelineTweet', tweet_results: { result: rawTweet() } },
				{ cursorType: 'Bottom', value: 'next-page' },
			],
		},
	};
	const page = new CursoredData(response, BaseType.PUBLISHED_ARTICLE);
	const article = page.list[0];

	assert.equal(page.next, 'next-page');
	assert.equal(article instanceof BaseArticle, true);
	assert.equal(article instanceof Article, false);
	assert.equal(article instanceof PublishedArticle, true);
	assert.equal(article.id, '2083915397791891456');
	assert.equal(article.text, 'First paragraph\n\nSecond paragraph');
	assert.equal(article.coverMedia.url, 'https://example.com/cover.jpg');
	assert.equal(article.publishedAt, '2025-01-01T00:00:00.000Z');
	assert.equal(PublishedArticle.single(response, '2083935229757337948').id, article.id);
	assert.equal(PublishedArticle.single(response, article.id).id, article.id);
	assert.equal('tweetId' in article, false);
	assert.equal('author' in article, false);
	assert.equal('url' in article, false);
});

test('PublishedArticle does not retain its containing tweet', () => {
	const tweet = rawTweet();
	tweet.rest_id = '';
	const article = PublishedArticle.fromTweet(tweet);

	assert.equal(article.id, '2083915397791891456');
	assert.equal('tweetId' in article.toJSON(), false);
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
test('UserRequests.articles omits absent optional parameters', () => {
	const request = UserRequests.articles('1466675689554202624');
	const variables = JSON.parse(request.params.variables);

	assert.deepEqual(variables, {
		userId: '1466675689554202624',
		includePromotedContent: false,
		withVoice: true,
	});
});
