export const config = {
    server: {
        urls: {
            core: `${process.env.CORE_HOST}:${process.env.CORE_PORT}}`
        },
        db: {
            databases: {
                auth: {
                    name: "auth-credentials",
                    tables: {
                        cookies: "cookies"
                    },
                    index: "index"
                }
            }
        }
    },
    twitter: {
        root_url: "https://twitter.com/",
        auth: {
            authToken: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    }
}