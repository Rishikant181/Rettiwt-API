export const config = {
    port: Number(process.env.APP_PORT),
    use_cache: (process.env.USE_CACHE == 'true'),
    store_logs: (process.env.STORE_LOGS == 'true'),
    twitter: {
        auth: {
            authToken: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    }
}