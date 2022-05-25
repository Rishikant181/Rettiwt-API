// This files contains resolvers for user specific operations

// CUSTOM LIBS

// SERVICES
import { UserAccountService } from "../../services/data/UserAccountService";

// HELPERS
import { ValidationErrors } from './helper/Validation';

// Initialsing the service to fetch user details
var userService = new UserAccountService();

/**
 * @returns The details of the target twitter user
 * @param userName The user name of the target twitter user
 * @param id The id of the target twitter user
 */
export async function resolveUserDetails(userName: string, id: string): Promise<any> {
    var res: any;                                                               // To store response data

    // If user name is supplied
    if (userName) {
        res = await userService.getUserAccountDetails(userName);
    }
    // If id is supplied
    else if (id) {
        res = await userService.getUserAccountDetailsById(id);
    }
    // If neither userName nor id is supplied
    else {
        throw new Error(ValidationErrors.NoUserIdentification);
    }

    return res.data;
}

/**
 * @returns The list of tweets liked by the given user
 * @param id The id of the user whose likes are to be fetched
 * @param count The number of likes to fetch
 * @param all Whether to fetch list of all tweets liked by user
 * @param favouritesCount The total number of tweets liked by target user
 */
export async function resolveUserLikes(
    id: string,
    count: number,
    all: boolean,
    favouritesCount: number
): Promise<any> {
    var likes: any[] = [];                                                      // To store the list of liked tweets
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of liked twets fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If all liked tweets are to be fetched
    count = all ? favouritesCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining tweets
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserLikes(id, count, next);

        // If data is available
        if (res.success) {
            // Adding fetched followers to list of followers
            likes = likes.concat(res.data?.list);

            // Updating total followers fetched
            total = likes.length;

            // Getting cursor to next batch
            next = res.data?.next!;
        }
        // If no more data is available
        else {
            break;
        }
    }

    return likes;
}

/**
 * @returns The list of followers of the given twiiter user
 * @param id The id of the user whose followers are to be fetched
 * @param count The number of followers to fetch
 * @param all Whether to fetch all followers list
 * @param followerCount The total number of followers of the target user
 */
export async function resolveUserFollowers(
    id: string,
    count: number,
    all: boolean,
    followersCount: number
): Promise<any> {
    var followers: any[] = [];                                                  // To store the list of followers
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of followers fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If all followers are to be fetched
    count = (all || count > followersCount) ? followersCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining followers
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserFollowers(id, count, next);

        // If data is available
        if (res.success) {
            // Adding fetched followers to list of followers
            followers = followers.concat(res.data?.list);

            // Updating total followers fetched
            total = followers.length;

            // Getting cursor to next batch
            next = res.data?.next!;
        }
        // If no more data is available
        else {
            break;
        }
    }

    return followers;
}

/**
 * @returns The list of following of the given twiiter user
 * @param id The id of the user whose followings are to be fetched
 * @param count The number of following to fetch
 * @param all Whether to fetch list of all followings
 * @param followingsCount The total number of followings of the target user
 */
export async function resolveUserFollowing(
    id: string,
    count: number,
    all: boolean,
    followingsCount: number
): Promise<any> {
    var following: any[] = [];                                                  // To store the list of following
    var next: string = '';                                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of following fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // If all followings are to be fetched
    count = (all || count > followingsCount) ? followingsCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining following
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserFollowing(id, count, next);

        // If data is available
        if (res.success) {
            // Adding fetched following to list of following
            following = following.concat(res.data?.list);

            // Updating total following fetched
            total = following.length;

            // Getting cursor to next batch
            next = res.data?.next!;
        }
        // If no more data is available
        else {
            break;
        }
    }

    return following;
}