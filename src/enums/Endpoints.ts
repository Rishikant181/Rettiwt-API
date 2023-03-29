/**
 * The different endpoints for detching data from Twitter.
 */
export enum Endpoints {
    /** The endpoint for fetching the details of a Tweet with the given id. */
    TweetDetails = '/graphql/lXI2kaM2hgmbf7h42kpxuA/TweetDetail',

    /** The endpoint for fetching the list of likers of a Tweet with the given id. */
    TweetLikes = '/graphql/56ZwFC3Vui31fF8IYX8EGA/Favoriters',

    /** The endpoint for fetching the list of retweeters of a Tweet with the given id. */
    TweetRetweets = '/graphql/Wd7DVeLqMj_JQiTL0tjJwQ/Retweeters',

    /** The endpoint for searching for Tweets matching the given filter/query. */
    TweetSearch = '/2/search/adaptive.json',

    /** The endpoint for fetching the details of a User with the given username. */
    UserDetails = '/graphql/hVhfo_TquFTmgL7gYwf91Q/UserByScreenName',

    /** The endpoint for fetching the details of a User with the given id. */
    UserDetailsById = '/graphql/mi_IjXgFyr41N9zkszPz9w/UserByRestId',

    /** The endpoint for fetching the list of following of a User with the given id. */
    UserFollowing = '/graphql/mSnjZc5CTm2Z5Lu_i4XsPQ/Following',

    /** The endpoint for fetching the list of followers of a User with the given id. */
    UserFollowers = '/graphql/nwlAnaw7oKXcVLi91ehy7Q/Followers',

    /** The endpoint for fetching the list of tweets liked by the User with the given id. */
    UserLikes = '/graphql/gP4ZKghLd4tpILgS6VudAQ/Likes'
};