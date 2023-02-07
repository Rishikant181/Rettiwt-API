import http.client
import json
from bs4 import BeautifulSoup as bs
conn = http.client.HTTPSConnection("api.twitter.com")
payload = ''
headers = {
'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
'x-twitter-client-language': 'en',
'x-csrf-token': '8eb48c70a4ea0caa8ca97c9968630354',
'sec-ch-ua-mobile': '?0',
'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
'x-guest-token': '1621451735536668673',
'x-twitter-active-user': 'yes',
'X-Twitter-UTCOffset': '+0530',
'sec-ch-ua-platform': '"Windows"',
'Accept': '*/*',
'Sec-Fetch-Site': 'same-site',
'Sec-Fetch-Mode': 'cors',
'Sec-Fetch-Dest': 'empty',
'host': 'api.twitter.com'
}

conn.request("GET", f"/2/guide.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=false&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_collab_control=true&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&count=20&requestContext=launch&include_page_configuration=true&initial_tab_id=trending&entity_tokens=false&ext=mediaStats%252ChighlightedLabel%252ChasNftAvatar%252CvoiceInfo%252Cenrichments%252CsuperFollowMetadata%252CunmentionInfo%252CeditControl%252Ccollab_control%252Cvibe", payload, headers)
res = conn.getresponse()
data = res.read()

x=json.loads(data.decode("utf-8"))
trends=x['timeline']['instructions'][1]['addEntries']['entries'][1]['content']['timelineModule']['items']

#SECTION: Test

# print(trends)
# print(json.dumps(trends[1], sort_keys=False, indent=4))
print(json.dumps(trends[1], sort_keys=False, indent=4))
print('______________________________________________________________________________________________________')
print(json.dumps(trends[2], sort_keys=False, indent=4))
print('______________________________________________________________________________________________________')
print(json.dumps(trends[3], sort_keys=False, indent=4))



#!SECTION