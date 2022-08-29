// This files contains resolvers for user specific operations

// CUSTOM LIBS

// SERVICES
import { UserAccountService } from "../../services/data/UserAccountService";
import { LogService } from "../../services/LogService";

// TYPES
import { Cursor } from '../../types/Service';

// HELPERS
import { ValidationErrors } from '../types/Errors';

/**
 * @returns The details of the target twitter user
 * @param userName The user name of the target twitter user
 * @param id The id of the target twitter user
 */
export async function resolveUserDetails(userName: string, id: string): Promise<any> {
    // Initialsing the service to fetch data related to twitter user
    var userService = new UserAccountService(await LogService.getInstance());
    
    // If user name is supplied
    if (userName) {
        return await userService.getUserAccountDetails(userName);
    }
    // If id is supplied
    else if (id) {
        return await userService.getUserAccountDetailsById(id);
    }
    // If neither userName nor id is supplied
    else {
        throw new Error(ValidationErrors.NoUserIdentification);
    }
}

/**
 * @returns The list of tweets liked by the given user
 * @param id The id of the user whose likes are to be fetched
 * @param count The number of likes to fetch
 * @param all Whether to fetch list of all tweets liked by user
 * @param cursor The cursor to the batch of likes to fetch
 * @param favouritesCount The total number of tweets liked by target user
 */
export async function resolveUserLikes(
    id: string,
    count: number,
    all: boolean,
    cursor: string,
    favouritesCount: number
): Promise<any> {
    var likes: any[] = [];                                                      // To store the list of liked tweets
    var next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of liked twets fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // Initialsing the service to fetch data related to twitter user
    var userService = new UserAccountService(await LogService.getInstance());

    // If all liked tweets are to be fetched
    count = all ? favouritesCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining tweets
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserLikes(id, count, next.value);

        // If data is available
        if (res.list.length) {
            // Adding fetched followers to list of followers
            likes = likes.concat(res.list);

            // Updating total followers fetched
            total = likes.length;

            // Getting cursor to next batch
            next = res.next;
        }
        // If no more data is available
        else {
            break;
        }
    }

    // Adding the cursor to the end of list of data
    likes.push(next);

    return likes;
}

/**
 * @returns The list of followers of the given twiiter user
 * @param id The id of the user whose followers are to be fetched
 * @param count The number of followers to fetch
 * @param all Whether to fetch all followers list
 * @param cursor The cursor to the batch of followers to fetch
 * @param followerCount The total number of followers of the target user
 */
export async function resolveUserFollowers(
    id: string,
    count: number,
    all: boolean,
    cursor: string,
    followersCount: number
): Promise<any> {
    var followers: any[] = [];                                                  // To store the list of followers
    var next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of followers fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // Initialsing the service to fetch data related to twitter user
    var userService = new UserAccountService(await LogService.getInstance());

    // If all followers are to be fetched
    count = (all || count > followersCount) ? followersCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining followers
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserFollowers(id, count, next.value);

        // If data is available
        if (res.list.length) {
            // Adding fetched followers to list of followers
            followers = followers.concat(res.list);

            // Updating total followers fetched
            total = followers.length;

            // Getting cursor to next batch
            next = res.next;
        }
        // If no more data is available
        else {
            break;
        }
    }

    // Adding the cursor to the end of list of data
    followers.push(next);

    return followers;
}

/**
 * @returns The list of following of the given twiiter user
 * @param id The id of the user whose followings are to be fetched
 * @param count The number of following to fetch
 * @param all Whether to fetch list of all followings
 * @param cursor The cursor to the batch of followings to fetch
 * @param followingsCount The total number of followings of the target user
 */
export async function resolveUserFollowing(
    id: string,
    count: number,
    all: boolean,
    cursor: string,
    followingsCount: number
): Promise<any> {
    var following: any[] = [];                                                  // To store the list of following
    var next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
    var total: number = 0;                                                      // To store the total number of following fetched
    var batchSize: number = 20;                                                 // To store the batchsize to use

    // Initialsing the service to fetch data related to twitter user
    var userService = new UserAccountService(await LogService.getInstance());

    // If all followings are to be fetched
    count = (all || count > followingsCount) ? followingsCount : count;

    // If required count less than batch size, setting batch size to required count
    batchSize = (count < batchSize) ? count : batchSize;

    // Repeatedly fetching data as long as total data fetched is less than requried
    while (total < count) {
        // If this is the last batch, change batch size to number of remaining following
        batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

        // Getting the data
        const res = await userService.getUserFollowing(id, count, next.value);

        // If data is available
        if (res.list.length) {
            // Adding fetched following to list of following
            following = following.concat(res.list);

            // Updating total following fetched
            total = following.length;

            // Getting cursor to next batch
            next = res.next;
        }
        // If no more data is available
        else {
            break;
        }
    }

    // Adding the cursor to the end of list of data
    following.push(next);

    return following;
}