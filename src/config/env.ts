export const config = {
    "server": {
        "db": {
            "enabled": true,
            "databases": {
                "cache": {
                    "name": "data-cache",
                    "index": "index"
                }
            }
        }
    },
    "twitter": {
        "root_url": "https://twitter.com/",
        "auth": {
            "authToken": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            "credentials": [
                {
                    "csrfToken": "6a1d860c745bb9dc0c7f378765ff97453e150f82135ec663ad7e93b22c1ea175e44dc5769d735f7d1ea3a6e8f4b3200e88a5c1cc16691c2ab7ed4d79070a7d8e0b8f31c10c5472b2cd6a4e3e5267b6fd",
                    "cookie": `guest_id_marketing=v1%3A164803333976351163; guest_id_ads=v1%3A164803333976351163; personalization_id=\"v1_DrUAQcxkoKhawCHeK6J3lg==\"; guest_id=v1%3A164803333976351163; gt=1506587145360011264; _ga=GA1.2.626418894.1648033343; _gid=GA1.2.1006828816.1648033343; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPYncbZ%252FAToMY3NyZl9p%250AZCIlNjNjZjY4ZDhhOTkyODllMWE4MTE1YTZiMTYzZmVkMjc6B2lkIiUxM2U0%250ANGUyMDNiZWQzMTBhYzVlYWQ5YWJlYjJiMDBlOA%253D%253D--0fae8be66a55c2e4c731aa42934792fffb6a7a34; kdt=qCPrUgPiB4H7Y9dhMb0PuWzoUWLCAhmLUo46UNOF; auth_token=7c1440ef053382da33400ec862db2d1c50ac8a19; ct0=6a1d860c745bb9dc0c7f378765ff97453e150f82135ec663ad7e93b22c1ea175e44dc5769d735f7d1ea3a6e8f4b3200e88a5c1cc16691c2ab7ed4d79070a7d8e0b8f31c10c5472b2cd6a4e3e5267b6fd; twid=u%3D1490533552408043522; att=1-NLyqojCQElXFQF1LxlcAkSU3gNf455hGEm6b4eMu; lang=en`
                },
                {
                    "csrfToken": "8af1ba428a20cb216b5538bfbf2bc02e6281c3b34d9a8397dc77464b26731e5fc020a7e1733972bfae9a3fe83bfc95c57055812f9d7c5b5c226349226739f4f71692f5dfd99c5bd8f90cc9cf4e7c1743",
                    "cookie": `guest_id_marketing=v1%3A164803345494044740; guest_id_ads=v1%3A164803345494044740; personalization_id=\"v1_zMjpNdowOQ+WcObEXyB68Q==\"; guest_id=v1%3A164803345494044740; gt=1506587627725950983; _ga=GA1.2.756530826.1648033457; _gid=GA1.2.80411269.1648033457; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCPnhcrZ%252FAToMY3NyZl9p%250AZCIlYWZjNTVjZmYyMjQxYmVlMTUwMTYxNGZmNmI5Y2EzYzk6B2lkIiU3YTA0%250AOTQ3MjdiMmM0M2MyMGVlZDUzNzE2ZTYwODU2Yg%253D%253D--75533b4fb498abf0130aa1b642c4a0755fc7b68d; kdt=7lPYtvjnqfPAbF1EJbVOI1E9CsZJ9Wgj8cwWfnPL; auth_token=b2d916cd79ac38a8e517a49026a2dfae65dbb9b7; ct0=8af1ba428a20cb216b5538bfbf2bc02e6281c3b34d9a8397dc77464b26731e5fc020a7e1733972bfae9a3fe83bfc95c57055812f9d7c5b5c226349226739f4f71692f5dfd99c5bd8f90cc9cf4e7c1743; twid=u%3D1504056223066619904; att=1-JtvpfPF78lYsxudE73uY2a2akxf5MsS0qKzAbN3U; lang=en`
                },
                {
                    "csrfToken": "ee012070073f0ea4c80f57e73858d226e7e86acaa067f3fb7c6258c9e5d9752fd55d17d198005638bce817e55cc931f2389a0ce683740d1c394b406bc3bb654409190fe83ebf7e84e8a07a103c9c6913",
                    "cookie": `guest_id_marketing=v1%3A164803352288987030; guest_id_ads=v1%3A164803352288987030; personalization_id=\"v1_agus2Bi+zUgjZcocr8FXyQ==\"; guest_id=v1%3A164803352288987030; gt=1506587913202843652; _ga=GA1.2.943415683.1648033526; _gid=GA1.2.1727683143.1648033526; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCDXtc7Z%252FAToMY3NyZl9p%250AZCIlYzFmOWM3YzFiYTMwYzNkNTNkZGM4ZTY5YjliODNiMDQ6B2lkIiUyNDEy%250AMDI0ZjJhNDY5MWE0NzNhYWU2N2U4NzVhYjE3OA%253D%253D--682be26cb35fcb6cf21ed97bd5e14e366e9a1ca0; kdt=jiHhQCDpyTL907ZkL2OVi2lslflymGY6Tjulht6a; auth_token=f0cbcadcc2cfc390653dc337644fac30cd44a4a6; ct0=ee012070073f0ea4c80f57e73858d226e7e86acaa067f3fb7c6258c9e5d9752fd55d17d198005638bce817e55cc931f2389a0ce683740d1c394b406bc3bb654409190fe83ebf7e84e8a07a103c9c6913; twid=u%3D1504057225576259586; att=1-FlzROPPZR1Gj9HnvScSocmj97HKh9z0rtGGbbRIv; lang=en`
                }
            ]
        }
    }
}