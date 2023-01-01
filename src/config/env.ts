export const config = {
    port: Number(process.env.APP_PORT),
    isDevelopment: (process.env.DEVELOPMENT == 'true'),
    use_cache: (process.env.USE_CACHE == 'true'),
    twitter: {
        auth: {
            authToken: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    }
}