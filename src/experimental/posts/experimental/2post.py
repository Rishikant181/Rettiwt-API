import requests
import json

url = "https://api.twitter.com/graphql/pTlmPgesqtCzLeWNTVORjA/CreateTweet"

payload = json.dumps({
  "variables": {
    "tweet_text": "aasutttoossss",
    "dark_request": False,
    "media": {
      "media_entities": [],
      "possibly_sensitive": False
    },
    "withDownvotePerspective": False,
    "withReactionsMetadata": False,
    "withReactionsPerspective": False,
    "withSuperFollowsTweetFields": True,
    "withSuperFollowsUserFields": True,
    "semantic_annotation_ids": []
  },
  "features": {
    "longform_notetweets_consumption_enabled": True,
    "tweetypie_unmention_optimization_enabled": True,
    "vibe_api_enabled": True,
    "responsive_web_edit_tweet_api_enabled": True,
    "graphql_is_translatable_rweb_tweet_is_translatable_enabled": True,
    "view_counts_everywhere_api_enabled": True,
    "interactive_text_enabled": True,
    "responsive_web_text_conversations_enabled": False,
    "responsive_web_twitter_blue_verified_badge_is_enabled": True,
    "responsive_web_graphql_exclude_directive_enabled": False,
    "verified_phone_label_enabled": False,
    "freedom_of_speech_not_reach_appeal_label_enabled": False,
    "standardized_nudges_misinfo": True,
    "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": False,
    "responsive_web_graphql_timeline_navigation_enabled": True,
    "responsive_web_graphql_skip_user_profile_image_extensions_enabled": False,
    "responsive_web_enhance_cards_enabled": False
  },
  "queryId": "pTlmPgesqtCzLeWNTVORjA"
})
headers = {
  'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
  'x-twitter-client-language': 'en',
  'x-csrf-token': '44e875ff162ddcab0637dda27a5170ee3d4f9ec3fdb17f600380b972f6b293b7a0665eec1727e6d6f9dd31120a3b2e8963e6668c8fe03a9680175200ac6b40513e2e67bbb8dc8374d4bb453bf0fead9f',
  'sec-ch-ua-mobile': '?0',
  'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'content-type': 'application/json',
  'x-twitter-auth-type': 'OAuth2Session',
  'x-twitter-active-user': 'yes',
  'sec-ch-ua-platform': '"Windows"',
  'Accept': '*/*',
  'Sec-Fetch-Site': 'same-site',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Dest': 'empty',
  'host': 'api.twitter.com',
  'Cookie': 'auth_token=88f044a5151e54ea4e3085071211100d9f434ea6; ct0=44e875ff162ddcab0637dda27a5170ee3d4f9ec3fdb17f600380b972f6b293b7a0665eec1727e6d6f9dd31120a3b2e8963e6668c8fe03a9680175200ac6b40513e2e67bbb8dc8374d4bb453bf0fead9f; guest_id=v1%3A166174926364069823; guest_id_ads=v1%3A166174926364069823; guest_id_marketing=v1%3A166174926364069823; kdt=iK5Gu08LYGwj7SViBynzdqtp8gTLbPYUMrwcFm0x; personalization_id="v1_wcYZ8Dem2RqPaBCTBHgfsQ=="; twid=u%3D1528656392932192263'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
