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
            },
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "3746b662cfe1dcd03c19bcb39122811488ae140ebbf291d8a0d8a81efa567f5543e2a0e616f5369e6badbcf0724e83a1f10de8190aa169b4536741f626ecc52996d826dd0f4d5512fa9eb950f93d8fa6",
                "cookie": `guest_id_marketing=v1%3A164743009218936450; guest_id_ads=v1%3A164743009218936450; personalization_id=\"v1_pld2+09T6/La89Poy6kaHQ==\"; guest_id=v1%3A164743009218936450; gt=1504056942032949250; _ga=GA1.2.525163959.1647430095; _gid=GA1.2.2123901236.1647430095; g_state={\"i_p\":1647437298742,\"i_l\":1}; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; kdt=Nx8dmTiqLrU5Spsz6qKQxXQ8tIPdx9ZayABd7WLW; auth_token=7ba15f8b6f249a6561243862403e63daaa1e4c06; ct0=3746b662cfe1dcd03c19bcb39122811488ae140ebbf291d8a0d8a81efa567f5543e2a0e616f5369e6badbcf0724e83a1f10de8190aa169b4536741f626ecc52996d826dd0f4d5512fa9eb950f93d8fa6; twid=u%3D1504057225576259586; lang=en`
            },
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "443dbb479bd469e11bf4b58f77f64b246093355836a06bcb822744520b5f781c27d82d091db401cc87ccf90175bb9898c7a90b3871fa9da6dc46f79cbc07d603bbef1c6284ffd058955065a021a88b46",
                "cookie": `guest_id_marketing=v1%3A164743031442254014; guest_id_ads=v1%3A164743031442254014; personalization_id=\"v1_JPi/hE2gzlqu/YFfuR+ONg==\"; guest_id=v1%3A164743031442254014; gt=1504057876083806210; _ga=GA1.2.181749203.1647430318; _gid=GA1.2.158798836.1647430318; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPe0f5J%252FAToMY3NyZl9p%250AZCIlYjlkMjZmMDYzMzY2MTNiZDI5YTg2YjUxZTc5MzY2ODg6B2lkIiVmMmFj%250AMTcxN2JmNDIxN2YyYzQxMzk0NzRiOWVmNzlmYw%253D%253D--e150e40d326968b608007e6d29892134f2d39f86; kdt=YYZl74wIjZDv5yutzVysoXskAZEVR8i1ZWIec1KK; auth_token=3730c884617a28b5fa991ed1f13e17e3371c454c; ct0=443dbb479bd469e11bf4b58f77f64b246093355836a06bcb822744520b5f781c27d82d091db401cc87ccf90175bb9898c7a90b3871fa9da6dc46f79cbc07d603bbef1c6284ffd058955065a021a88b46; twid=u%3D1504056223066619904; att=1-7Hojo3XpCJ0gcyYgievV3apzyipR00MvnJQH7dI8; lang=en`
            }
        ]
    }
}