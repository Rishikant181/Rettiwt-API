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
                "csrfToken": "2e42a260732432f5daeacd862961164773d7fa56e0c406c034b75cb3b25f29b6ee3043e408fbe10996ef0553c548e383738d1dc41d374d9a276322d8d7297da6e022bf97d6d5f3322b54ae78bde1533b",
                "cookie": `guest_id_marketing=v1%3A164801892232933638; guest_id_ads=v1%3A164801892232933638; personalization_id=\"v1_wYAkjm9MSRvoBEsVRwd+OQ==\"; guest_id=v1%3A164801892232933638; _ga=GA1.2.132298921.1648018925; _gid=GA1.2.701261507.1648018925; gt=1506526674598633474; g_state={\"i_p\":1648026131450,\"i_l\":1}; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; kdt=UT5sbAwLNWAGgD7jkJlnLVCJDtqIaENo0kbNeB1A; auth_token=4d24b7ac0d94acf07c94349084eb15e76abd60fd; ct0=2e42a260732432f5daeacd862961164773d7fa56e0c406c034b75cb3b25f29b6ee3043e408fbe10996ef0553c548e383738d1dc41d374d9a276322d8d7297da6e022bf97d6d5f3322b54ae78bde1533b; twid=u%3D1506526927729094664; lang=en`
            },
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "57eea82bcbe91f474d94abd05455e0cd2f738ce8fe9a968707b807fd77d0371c7862d025c32f08acbb6ce3cb0c849ce624bff74f28461473dde8a9eec7545512dd9179048c4342c8e1d0625161051d17",
                "cookie": `guest_id_marketing=v1%3A164801939057309963; guest_id_ads=v1%3A164801939057309963; personalization_id=\"v1_QSJH8WvU6fkubsPGwYbWQw==\"; guest_id=v1%3A164801939057309963; _ga=GA1.2.1621405280.1648019393; _gid=GA1.2.656352267.1648019393; gt=1506528638883172358; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; kdt=81dc1zGftraLCDrXJ4h4P4l5UsL1AqHok5dRyKdA; auth_token=fb4edacfe00cab9e7bdc7b7354161d3517aefb72; ct0=57eea82bcbe91f474d94abd05455e0cd2f738ce8fe9a968707b807fd77d0371c7862d025c32f08acbb6ce3cb0c849ce624bff74f28461473dde8a9eec7545512dd9179048c4342c8e1d0625161051d17; twid=u%3D1506528829027741702; lang=en`
            },
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "455bdbad0824f18c0f17c551ec8c99168ce8a5361721fa82b11396e7cc046d216e9a37746c2c202f5fc5e2a2058afa7b3bc3d677bb2bf12a993f375c30eb3f29e47545b5c91500a451da4b8f95a5fc7b",
                "cookie": `guest_id_marketing=v1%3A164801970981153599; guest_id_ads=v1%3A164801970981153599; personalization_id=\"v1_JwJFluucHZ3f+hh4vhDx/Q==\"; guest_id=v1%3A164801970981153599; _ga=GA1.2.1684785339.1648019712; _gid=GA1.2.1039934042.1648019712; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; kdt=l1XS1CiKrR6KlmBmH7WrgdzFlq5wRBl97aaiJdx2; auth_token=d5e5e7a9ce512655dd8861ff8a4da448e410000a; ct0=455bdbad0824f18c0f17c551ec8c99168ce8a5361721fa82b11396e7cc046d216e9a37746c2c202f5fc5e2a2058afa7b3bc3d677bb2bf12a993f375c30eb3f29e47545b5c91500a451da4b8f95a5fc7b; gt=1506530299660083203; twid=u%3D1506530253472399361; lang=en`
            },
            {
                "authToken": "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
                "csrfToken": "db3578ab59e1f2ff97edaaa9b17b19d552dedd244d0ad98b6015a7e56b514a5dc81def2f383cf2c1c98eddf6546f61a035ec4e6f8542d715ea208f1825bde9dd440ae749120f6e0099420fcaa101cd25",
                "cookie": `guest_id_marketing=v1%3A164801988603171676; guest_id_ads=v1%3A164801988603171676; personalization_id=\"v1_4I7I0/MOXEeopsB3QsT5Hw==\"; guest_id=v1%3A164801988603171676; gt=1506530716292907018; _ga=GA1.2.2145259156.1648019889; _gid=GA1.2.404566007.1648019889; _twitter_sess=BAh7BiIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7AA%253D%253D--1164b91ac812d853b877e93ddb612b7471bebc74; kdt=rLmrOXwTrp2GtrQmAyCNjOel92QsQUEPOQGE6SIB; auth_token=65f9ffffbdb289e00d04919099632fba8f3e4e35; ct0=db3578ab59e1f2ff97edaaa9b17b19d552dedd244d0ad98b6015a7e56b514a5dc81def2f383cf2c1c98eddf6546f61a035ec4e6f8542d715ea208f1825bde9dd440ae749120f6e0099420fcaa101cd25; twid=u%3D1506531078559113218; lang=en`
            }
        ]
    }
}