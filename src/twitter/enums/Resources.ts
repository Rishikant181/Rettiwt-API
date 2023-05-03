/**
 * The different types of resources that can be fetched.
 */
export enum ResourceType {
    'TWEETS' = '/2/search/adaptive.json',
    'TWEET_DETAILS' = '/graphql/lXI2kaM2hgmbf7h42kpxuA/TweetDetail',
    'TWEET_LIKES' = '/graphql/56ZwFC3Vui31fF8IYX8EGA/Favoriters',
    'TWEET_RETWEETS' = '/graphql/Wd7DVeLqMj_JQiTL0tjJwQ/Retweeters',
    'USER_DETAILS' = '/graphql/hVhfo_TquFTmgL7gYwf91Q/UserByScreenName',
    'USER_DETAILS_BY_ID' = '/graphql/mi_IjXgFyr41N9zkszPz9w/UserByRestId',
    'USER_TWEETS' = '/graphql/xxLjoOBBPpYBHbBTI-hevQ/UserTweetsAndReplies',
    'USER_FOLLOWING' = '/graphql/mSnjZc5CTm2Z5Lu_i4XsPQ/Following',
    'USER_FOLLOWERS' = '/graphql/nwlAnaw7oKXcVLi91ehy7Q/Followers',
    'USER_LIKES' = '/graphql/gP4ZKghLd4tpILgS6VudAQ/Likes'
};