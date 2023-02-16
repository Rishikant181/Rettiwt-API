// TYPES
import { User } from '../../../types/data/User';
import { Result as RawUser } from '../../../types/raw/user/User';

/**
 * @returns A User object containing the user details
 * @param data The raw user data from Twitter API
 */
export function toUser(data: RawUser): User {
    return {
        id: data.rest_id,
        userName: data.legacy.screen_name,
        fullName: data.legacy.name,
        createdAt: data.legacy.created_at,
        description: data.legacy.description,
        isVerified: data.legacy.verified,
        favouritesCount: data.legacy.favourites_count,
        followersCount: data.legacy.followers_count,
        followingsCount: data.legacy.friends_count,
        statusesCount: data.legacy.statuses_count,
        location: data.legacy.location,
        pinnedTweet: data.legacy.pinned_tweet_ids_str[0],
        profileBanner: data.legacy.profile_banner_url,
        profileImage: data.legacy.profile_image_url_https
    };
}