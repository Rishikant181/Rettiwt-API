// RESOLVERS
import ResolverBase from './ResolverBase';

// TYPES
import { Cursor, DataContext } from '../types/Service';

// HELPERS
import { ValidationErrors } from '../types/graphql/Errors';

export default class UserResolver extends ResolverBase {
    // MEMBER METHODS
    constructor(context: DataContext) {
        super(context);
    }

    /**
     * @returns The details of the target twitter user
     * @param userName The user name of the target twitter user
     * @param id The id of the target twitter user
     */
    async resolveUserDetails(userName: string, id: string): Promise<any> {
        // If user name is supplied
        if (userName) {
            return await this.context.users.getUserAccountDetails(userName);
        }
        // If id is supplied
        else if (id) {
            return await this.context.users.getUserAccountDetailsById(id);
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
    async resolveUserLikes(id: string, count: number, all: boolean, cursor: string, favouritesCount: number): Promise<any> {
        let likes: any[] = [];                                                      // To store the list of liked tweets
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of liked twets fetched
        let batchSize: number = 20;                                                 // To store the batchsize to use

        // If all liked tweets are to be fetched
        count = all ? favouritesCount : count;

        // If required count less than batch size, setting batch size to required count
        batchSize = (count < batchSize) ? count : batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        while (total < count) {
            // If this is the last batch, change batch size to number of remaining tweets
            batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

            // Getting the data
            const res = await this.context.users.getUserLikes(id, count, next.value);

            // If data is available
            if (res.list.length) {
                // Adding fetched tweets to list of tweets
                likes = likes.concat(res.list);

                // Updating total tweets fetched
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
    async resolveUserFollowers(id: string, count: number, all: boolean, cursor: string, followersCount: number): Promise<any> {
        let followers: any[] = [];                                                  // To store the list of followers
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of followers fetched
        let batchSize: number = 20;                                                 // To store the batchsize to use

        // If all followers are to be fetched
        count = (all || count > followersCount) ? followersCount : count;

        // If required count less than batch size, setting batch size to required count
        batchSize = (count < batchSize) ? count : batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        while (total < count) {
            // If this is the last batch, change batch size to number of remaining followers
            batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

            // Getting the data
            const res = await this.context.users.getUserFollowers(id, count, next.value);

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
    async resolveUserFollowing(id: string, count: number, all: boolean, cursor: string, followingsCount: number): Promise<any> {
        let following: any[] = [];                                                  // To store the list of following
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of following fetched
        let batchSize: number = 20;                                                 // To store the batchsize to use

        // If all followings are to be fetched
        count = (all || count > followingsCount) ? followingsCount : count;

        // If required count less than batch size, setting batch size to required count
        batchSize = (count < batchSize) ? count : batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        while (total < count) {
            // If this is the last batch, change batch size to number of remaining following
            batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

            // Getting the data
            const res = await this.context.users.getUserFollowing(id, count, next.value);

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

    /**
     * @returns The list of tweets made by the given user
     * @param id The id of the user whose tweets are to be fetched
     * @param count The number of tweets to fetch
     * @param all Whether to fetch list of all tweets made by user
     * @param cursor The cursor to the batch of tweets to fetch
     * @param statusesCount The total number of tweets made by target user
     */
    async resolveUserTweets(id: string, count: number, all: boolean, cursor: string, statusesCount: number): Promise<any> {
        let tweets: any[] = [];                                                     // To store the list of tweets
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of tweets fetched
        let batchSize: number = 20;                                                 // To store the batchsize to use

        // If all tweets are to be fetched
        count = all ? statusesCount : count;

        // If required count less than batch size, setting batch size to required count
        batchSize = (count < batchSize) ? count : batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        while (total < count) {
            // If this is the last batch, change batch size to number of remaining tweets
            batchSize = ((count - total) < batchSize) ? (count - total) : batchSize;

            // Getting the data
            const res = await this.context.users.getUserTweets(id, count, next.value);

            // If data is available
            if (res.list.length) {
                // Adding fetched tweets to list of tweets
                tweets = tweets.concat(res.list);

                // Updating total tweets fetched
                total = tweets.length;

                // Getting cursor to next batch
                next = res.next;
            }
            // If no more data is available
            else {
                break;
            }
        }

        // Adding the cursor to the end of list of data
        tweets.push(next);

        return tweets;
    }
}