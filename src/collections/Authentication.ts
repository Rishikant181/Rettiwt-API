import { EResourceType } from '../enums/Resource';

/**
 * Collection of resources that allow guest authentication.
 *
 * @internal
 */
export const allowGuestAuthentication = [
	EResourceType.TWEET_DETAILS,
	EResourceType.USER_DETAILS_BY_USERNAME,
	EResourceType.USER_TWEETS,
];
