export const config = {
    port: Number(process.env.APP_PORT),
    is_development: (process.env.DEVELOPMENT == 'true'),
    use_cache: (process.env.USE_CACHE == 'true'),
    cache_url: process.env.CACHE_DB_URL as string,
    twitter_url: 'https://www.twitter.com/',
    twitter_auth_token: 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'
}