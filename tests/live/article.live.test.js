const assert = require('node:assert/strict');
const test = require('node:test');

const { Rettiwt } = require('../../dist');

const apiKey = process.env.RETTIWT_API_KEY;
const userId = process.env.RETTIWT_TEST_USER_ID ?? '1466675689554202624';
const tweetId = process.env.RETTIWT_TEST_ARTICLE_TWEET_ID ?? '2083935229757337948';
const testNextPage = process.env.RETTIWT_TEST_NEXT_PAGE === '1';

function rateLimitSummary(headers) {
	return {
		limit: headers['x-rate-limit-limit'],
		remaining: headers['x-rate-limit-remaining'],
		reset: headers['x-rate-limit-reset'],
	};
}

function assertArticle(article) {
	assert.ok(article, 'Expected the tweet to contain an article');
	assert.ok(article.id, 'Article ID should be present');
	assert.ok(article.tweetId, 'Source tweet ID should be present');
	assert.ok(article.title, 'Article title should be present');
	assert.ok(article.text, 'Article plain text should be present');
	assert.ok(article.author?.id, 'Article author should be present');
	assert.ok(article.url, 'Article URL should be present');
	assert.ok(Array.isArray(article.blocks), 'Rich-text blocks should be an array');
	assert.ok(Array.isArray(article.media), 'Article media should be an array');
}

test(
	'fetches a real article list and article detail from X',
	{ skip: apiKey ? false : 'Set RETTIWT_API_KEY to run this live test', timeout: 60_000 },
	async (context) => {
		const rateLimits = [];
		const rettiwt = new Rettiwt({
			apiKey,
			errorHandler: {
				handle(error) {
					throw error;
				},
			},
			responseMiddleware(response) {
				rateLimits.push({
					operation: response.config.url?.split('/').pop(),
					...rateLimitSummary(response.headers),
				});
			},
		});

		const firstPage = await rettiwt.user.articles(userId, 20);
		assert.ok(Array.isArray(firstPage.list));
		assert.ok(firstPage.list.length > 0, `Expected user ${userId} to have at least one article`);
		assert.equal(typeof firstPage.next, 'string');
		firstPage.list.forEach(assertArticle);

		if (testNextPage && firstPage.next) {
			const secondPage = await rettiwt.user.articles(userId, 20, firstPage.next);
			assert.ok(Array.isArray(secondPage.list));
			assert.equal(typeof secondPage.next, 'string');
			secondPage.list.forEach(assertArticle);
		}

		const article = await rettiwt.tweet.article(tweetId);
		assertArticle(article);
		assert.equal(article.tweetId, tweetId);

		context.diagnostic(
			JSON.stringify({
				articleCount: firstPage.list.length,
				hasNextPage: Boolean(firstPage.next),
				detail: {
					id: article.id,
					title: article.title,
					textLength: article.text.length,
					blockCount: article.blocks.length,
					mediaCount: article.media.length + (article.coverMedia ? 1 : 0),
				},
				rateLimits,
			}),
		);
	},
);
