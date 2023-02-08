import requests

url = "https://api.twitter.com/2/guide.json?include_profile_interstitial_type=1&include_blocking=1&include_blocked_by=1&include_followed_by=1&include_want_retweets=1&include_mute_edge=1&include_can_dm=1&include_can_media_tag=1&include_ext_has_nft_avatar=1&include_ext_is_blue_verified=1&include_ext_verified_type=1&skip_status=1&cards_platform=Web-12&include_cards=1&include_ext_alt_text=true&include_ext_limited_action_results=false&include_quote_count=true&include_reply_count=1&tweet_mode=extended&include_ext_collab_control=true&include_ext_views=true&include_entities=true&include_user_entities=true&include_ext_media_color=true&include_ext_media_availability=true&include_ext_sensitive_media_warning=true&include_ext_trusted_friends_metadata=true&send_error_codes=true&simple_quoted_tweet=true&tab_category=unified_events_tab&sc_category_id=3&count=20&ext=mediaStats%2ChighlightedLabel%2ChasNftAvatar%2CvoiceInfo%2Cenrichments%2CsuperFollowMetadata%2CunmentionInfo%2CeditControl%2Ccollab_control%2Cvibe"

payload={}
headers = {
  'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
  'x-twitter-client-language': 'en',
  'x-csrf-token': '0968c8431c13a701fb220edd1608cf1e',
  'sec-ch-ua-mobile': '?0',
  'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  'x-guest-token': '1623010276932227072',
  'x-twitter-active-user': 'yes',
  'X-Twitter-UTCOffset': '+0530',
  'sec-ch-ua-platform': '"Windows"',
  'Accept': '*/*',
  'host': 'api.twitter.com',
  'Cookie': '_ga=GA1.2.1990571155.1675790776; _gid=GA1.2.382811932.1675790776; guest_id=v1%3A167579185159233298; guest_id_ads=v1%3A167579185159233298; guest_id_marketing=v1%3A167579185159233298; personalization_id="v1_39YcGIfwO3jpH6vnW7mCNw=="'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
