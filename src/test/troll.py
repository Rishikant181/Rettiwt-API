import requests
import json

url = "https://api.twitter.com/graphql/Tz_cZL9zkkY2806vRiQP0Q/CreateTweet"

headers = {
  'sec-ch-ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
  'x-twitter-client-language': 'en',
  'x-csrf-token': 'b8c3baa0ba076a7ba30ea27095ce37af78ef5ddbe6e2c7d582431d0240516eed140eaaa79a285adac8f0653ce9bcbace1934c9299adc110ef5eca69e2ae81592978419ddba49b51fb615a67d8ab41ac2',
  'sec-ch-ua-mobile': '?0',
  'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
  'host': 'api.twitter.com',
  'Cookie': 'auth_multi="1528656392932192263:88f044a5151e54ea4e3085071211100d9f434ea6"; auth_token=905db396e293e0d34748245f749a76662fd601de; ct0=b8c3baa0ba076a7ba30ea27095ce37af78ef5ddbe6e2c7d582431d0240516eed140eaaa79a285adac8f0653ce9bcbace1934c9299adc110ef5eca69e2ae81592978419ddba49b51fb615a67d8ab41ac2; dnt=1; guest_id=v1%3A167736258166230250; guest_id_ads=v1%3A166174926364069823; guest_id_marketing=v1%3A166174926364069823; kdt=iK5Gu08LYGwj7SViBynzdqtp8gTLbPYUMrwcFm0x; personalization_id="v1_dmzTGQ0wd9bJ5WVJf80cWA=="; twid=u%3D1629601467777818625'
}
import random
s='Cumpdump got served XD \n Thats what I can do in fuckin seconds. Next time think thrice before trollin\' somebody there is gonna be some nightmare like me \n to serve you cum dumps a chilled fuckin\' nightmare.\n Blockin me, deleting the post aint gonna help you consider this my last warning'
for _ in range(40):
    for i in s.split('\n'):
        payload = json.dumps({
        "variables": {
        "tweet_text": i+str(random.randint(1000,99999))+str(random.randint(1000,99999))+str(random.randint(1000,99999))+str(random.randint(1000,99999)),
        "reply": {
        "in_reply_to_tweet_id": "1629594481283538944",
        "exclude_reply_user_ids": []
        },
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
        "tweetypie_unmention_optimization_enabled": True,
        "vibe_api_enabled": True,
        "responsive_web_edit_tweet_api_enabled": True,
        "graphql_is_translatable_rweb_tweet_is_translatable_enabled": True,
        "view_counts_everywhere_api_enabled": True,
        "longform_notetweets_consumption_enabled": True,
        "tweet_awards_web_tipping_enabled": False,
        "interactive_text_enabled": True,
        "responsive_web_text_conversations_enabled": False,
        "responsive_web_twitter_blue_verified_badge_is_enabled": True,
        "responsive_web_graphql_exclude_directive_enabled": False,
        "verified_phone_label_enabled": False,
        "freedom_of_speech_not_reach_fetch_enabled": False,
        "standardized_nudges_misinfo": True,
        "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": False,
        "responsive_web_graphql_timeline_navigation_enabled": True,
        "responsive_web_graphql_skip_user_profile_image_extensions_enabled": False,
        "responsive_web_enhance_cards_enabled": False
        },
        "queryId": "Tz_cZL9zkkY2806vRiQP0Q"
        })
        response = requests.request("POST", url, headers=headers, data=payload)

        print(json.dumps(response.text,indent=3))
