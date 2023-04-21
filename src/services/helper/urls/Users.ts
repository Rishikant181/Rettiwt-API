/**
 * @returns The url for fetching user account details.
 * @param screenName The screen name of the target user
 */
export function userDetailsUrl(screenName: string): string {
	return `https://api.twitter.com/graphql/hVhfo_TquFTmgL7gYwf91Q/UserByScreenName?variables=%7B%22screen_name%22%3A%22${screenName}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D`;
}

/**
 * @returns The url for fetching user account details.
 * @param restid The restId of the target user
 */
export function userDetailsByIdUrl(restId: string): string {
	return `https://api.twitter.com/graphql/mi_IjXgFyr41N9zkszPz9w/UserByRestId?variables=%7B%22userId%22%3A%22${restId}%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D`;
}

/**
 * @returns The url for fetching the list of tweet made by target user.
 * @param userId The rest id of the target user
 * @param count The batch size of the list of tweets, should be >= 40 and <=100
 * @param cursor The cursor to next batch
 */
export function userTweets(userId: string, count: number, cursor: string): string {
	return `https://api.twitter.com/graphql/xxLjoOBBPpYBHbBTI-hevQ/UserTweetsAndReplies?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of users followed by target user.
 * @param userId The rest id of the target user
 * @param count The batch size of the list of following, should be >= 40 and <=100
 * @param cursor The cursor to next batch
 */
export function userFollowingUrl(userId: string, count: number, cursor: string): string {
	/**
	 * Twitter has a ver odd behaviour here.
	 * If no cursor is provided, the number of followings fetched is slightly more the given count.
	 * If a cursor if provided, the number of followings is sometimes less than the provided count.
	 * NO SOLUTION EXISTS AS OF NOW!
	 */
	return `https://api.twitter.com/graphql/mSnjZc5CTm2Z5Lu_i4XsPQ/Following?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${encodeURIComponent(
		cursor,
	)}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @return The url for fetching the list of followers of the target user
 * @param userId The rest id of the target user
 * @param count The batch size for the list of followers, should be >= 40 and <=100
 * @param cursor The cusor to next batch
 */
export function userFollowersUrl(userId: string, count: number, cursor: string): string {
	/**
	 * Twitter has a very odd behaviour here.
	 * If no cursor is provided, the number of followers fetched is equal to count + 20.
	 * If a cursor is provided, the number of followers fetched is equal to count.
	 * The solution is to check accordingly, if a cursor if provided or not and manipulate the count
	 */
	// If no cursor if provided
	if (!cursor) {
		count = count - 20;
	}

	return `https://api.twitter.com/graphql/nwlAnaw7oKXcVLi91ehy7Q/Followers?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${encodeURIComponent(
		cursor,
	)}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}

/**
 * @returns The url for fetching the list of tweets liked by the target user
 * @param userId The rest id of the target user
 * @param count The batch size for the list of tweets
 * @param cursor The cusor to next batch
 */
export function userLikesUrl(userId: string, count: number, cursor: string): string {
	return `https://api.twitter.com/graphql/gP4ZKghLd4tpILgS6VudAQ/Likes?variables=%7B%22userId%22%3A%22${userId}%22%2C%22count%22%3A${count}%2C%22cursor%22%3A%22${encodeURIComponent(
		cursor,
	)}%22%2C%22includePromotedContent%22%3Afalse%2C%22withSuperFollowsUserFields%22%3Atrue%2C%22withDownvotePerspective%22%3Afalse%2C%22withReactionsMetadata%22%3Afalse%2C%22withReactionsPerspective%22%3Afalse%2C%22withSuperFollowsTweetFields%22%3Atrue%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22responsive_web_twitter_blue_verified_badge_is_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22view_counts_public_visibility_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Afalse%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_uc_gql_enabled%22%3Atrue%2C%22vibe_api_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Afalse%2C%22interactive_text_enabled%22%3Atrue%2C%22responsive_web_text_conversations_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`;
}
