import fetch from 'node-fetch';

fetch("https://twitter.com/i/api/graphql/BSKxQ9_IaCoVyIvQHQROIQ/UserTweetsAndReplies?variables=%7B%22userId%22%3A%2244196397%22%2C%22count%22%3A40%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Afalse%2C%22__fs_interactive_text%22%3Afalse%2C%22__fs_responsive_web_uc_gql_enabled%22%3Afalse%2C%22__fs_dont_mention_me_view_api_enabled%22%3Afalse%7D", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Microsoft Edge\";v=\"98\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "8803093c2b93c517faa06b8d1d48c2ba78303f1e442639db20647634549ae579fd367a4fc1aa24a2aa09a0bb61a4271187c8d18763818a36442160ccf3524a99c2f0ce5b13b49ff8fe02c9aca6e3ddfd",
    "x-twitter-active-user": "yes",
    "x-twitter-auth-type": "OAuth2Session",
    "x-twitter-client-language": "en",
    "cookie": "guest_id_marketing=v1%3A164420676322155370; guest_id_ads=v1%3A164420676322155370; personalization_id=\"v1_h5p6J1T7hvof7Eu+d/AHTQ==\"; guest_id=v1%3A164420676322155370; _ga=GA1.2.690652556.1644206766; _gid=GA1.2.792904356.1644206766; gt=1490537319618670593; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCBhEXNJ%252BAToMY3NyZl9p%250AZCIlZDMzMDVhODVkMTBlNzA2YzRkMmFlNjNhOWYzYWQ5ZTY6B2lkIiVlM2Jh%250AYTYwZTU4ZDYxYjc2NzRjZTQ3M2EyZmMwNDExYQ%253D%253D--e17e81c7fa6931bebdd27a421541c3891038d944; kdt=l2If38u1JyXXefmpqk6ePX4YUpBh0EGp6viq1d3L; auth_token=71160955da2e072d161b6e6bbd1bec76d79e526c; ct0=8803093c2b93c517faa06b8d1d48c2ba78303f1e442639db20647634549ae579fd367a4fc1aa24a2aa09a0bb61a4271187c8d18763818a36442160ccf3524a99c2f0ce5b13b49ff8fe02c9aca6e3ddfd; twid=u%3D1490533552408043522; att=1-P58cLwPiP6gJJCIFwaPF55MihAVLRLh6KVADxY36; lang=en",
  },
  "body": null,
  "method": "GET"
})
.then(data => data.json())
.then(data => console.log(data));