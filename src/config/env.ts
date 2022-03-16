export const config = {
    "server": {
        "port": 3000,
        "db": {
            "host": "mongodb://127.0.0.1",
            "port": 27017,
            "databases": {
                "ai-cache": {
                    "name": "ai-cache",
                    "index": "index"
                }
            }
        }
    },
    "twitter": {
        "root_url": "https://twitter.com/",
        "auth": [
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "b98a95062e259237b31c8031147b6a59c0e2d563fe629ff6c7928ccb7647497fe51825b16d24f9ac73a82d991076e4e65610e58299288ed8c03b9c6ed95515922c13719ea6956ca353cb83f1bf7523a9",
                "cookie": `des_opt_in=Y; kdt=J7xYhDLN2pqAgmT4k1fUDMIxOhgJSC2YhS6dBMaf; remember_checked_on=1; cd_user_id=17ae33d8c52317-019d4bb1b31a33-7e687a6e-100200-17ae33d8c53c47; dnt=1; G_ENABLED_IDPS=google; guest_id_marketing=v1%3A162834252695824370; guest_id_ads=v1%3A162834252695824370; mbox=PC#50e2e61bdf8e4e568d8bf362995a06c8.31_0#1709382685|session#b94de8f0a7c0465bb0c712068b84f6a9#1646139745; personalization_id=\"v1_TGqiJxUHApSx9oGXzIUk2g==\"; guest_id=v1%3A164687604817500681; g_state={\"i_l\":4,\"i_p\":1649299274535}; external_referer=padhuUp37zgAhLEOSt9XaA3F3P9nnSqSXOKqGVvnHPdUmeA063VbPAo5hB5TshMCaLyD7RQLpltjSLA4ZCu%2Fyrg1eA7S5juAgoZ%2B3DLmjXg2HBxmjiIhgbLZpMakxdoM4gnpO0eOdQc%3D|0|GlWr2u5wzZipnVja1ZbglFG7jRzcDRbyg7bgNkbeVpaLb%2FFalG86sucSHqcJy5ZsQqSTGYVy4BaM3KI6B1BfKT6XCTKpILQE; gt=1502122195535147009; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCHgKeXd%252FAToMY3NyZl9p%250AZCIlMDczYjEyODFkOGNjMGNkYjQ5YTM4OGFjOTkwOTc0Mjk6B2lkIiUyNTQ1%250ANTQxMzYwYzlkZDA1MDRjNzI2ZDhmYjBiZmVhZA%253D%253D--320de0707ff4bba3fa7eba258644877bd849b481; auth_token=72f3a606b7bcf15476578ced08c1759114b0ee9d; ct0=b98a95062e259237b31c8031147b6a59c0e2d563fe629ff6c7928ccb7647497fe51825b16d24f9ac73a82d991076e4e65610e58299288ed8c03b9c6ed95515922c13719ea6956ca353cb83f1bf7523a9; twid=u%3D1490533552408043522; att=1-MMKjiU34IM9x8aTSKzmsNkeVvE6pkoPvQrIDCfmZ`
            }
        ]
    }
}