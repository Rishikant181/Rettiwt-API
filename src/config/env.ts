export const config = {
    "server": {
        "db": {
            "databases": {
                "auth": {
                    "name": "auth-credentials",
                    "tables": {
                        "cookies": "cookies"
                    },
                    "index": "index"
                },
                "cache": {
                    "name": "data-cache",
                    "index": "index",
                    "enabled": true,
                    "tables": {
                        "users": "users",
                        "tweets": "tweets"
                    }
                }
            }
        }
    },
    "twitter": {
        "root_url": "https://twitter.com/",
        "auth": {
            "authToken": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    }
}