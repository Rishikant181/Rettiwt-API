// RESOLVERS
import ResolverBase from './ResolverBase';

// TYPES
import { IDataContext } from '../../types/Rettiwt'
import { Cursor } from '../../models/data/CursoredData';
import { DataErrors } from '../enums/Errors';

export default class UserResolver extends ResolverBase {
    // MEMBER DATA
    private batchSize: number;                                                // To store the batch size when fetching data

    // MEMBER METHODS
    constructor(context: IDataContext) {
        super(context);
        this.batchSize = 40;
    }

    /**
     * @returns The details of the target twitter user
     * @param userName The user name of the target twitter user
     * @param id The id/username of the target twitter user
     */
    async resolveUserDetails(id: string): Promise<any> {
        return await this.context.users.getUserDetails(id).catch(error => {
            throw this.getGraphQLError(error);
        });
    }

    /**
     * @returns The list of tweets made by the given user
     * @param userName The username of the user whose tweets are to be fetched
     * @param count The number of tweets to fetch, must be >= 10
     * @param all Whether to fetch list of all tweets made by user
     * @param cursor The cursor to the batch of tweets to fetch
     * @param statusesCount The total number of tweets made by target user
     */
    async resolveUserTweets(userName: string, count: number, all: boolean, cursor: string, statusesCount: number): Promise<any> {
        let likes: any[] = [];                                                      // To store the list of tweets
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of tweets fetched

        // If all tweets are to be fetched
        count = all ? statusesCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining tweets
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.tweets.getTweets({ fromUsers: [userName] }, this.batchSize, next.value).catch(error => {
                throw this.getGraphQLError(error);
            });

            // If data is available
            if (res.list?.length) {
                // Adding fetched tweets to list of tweets
                likes = likes.concat(res.list);

                // Updating total tweets fetched
                total = likes.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // If no likes found
        if (!likes.length) {
            return new Error(DataErrors.NoUserTweetsFound);
        }

        // Adding the cursor to the end of list of data
        likes.push(next);

        return likes;
    }

    /**
     * @returns The list of tweets liked by the given user
     * @param id The id of the user whose likes are to be fetched
     * @param count The number of likes to fetch, must be >= 40
     * @param all Whether to fetch list of all tweets liked by user
     * @param cursor The cursor to the batch of likes to fetch
     * @param favouritesCount The total number of tweets liked by target user
     */
    async resolveUserLikes(id: string, count: number, all: boolean, cursor: string, favouritesCount: number): Promise<any> {
        let likes: any[] = [];                                                      // To store the list of liked tweets
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of liked tweets fetched

        // If all liked tweets are to be fetched
        count = all ? favouritesCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining tweets
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.users.getUserLikes(id, this.batchSize, next.value).catch(error => {
                throw this.getGraphQLError(error);
            });

            // If data is available
            if (res.list?.length) {
                // Adding fetched tweets to list of tweets
                likes = likes.concat(res.list);

                // Updating total tweets fetched
                total = likes.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // If no likes found
        if (!likes.length) {
            return new Error(DataErrors.NoLikedTweetsFound);
        }

        // Adding the cursor to the end of list of data
        likes.push(next);

        return likes;
    }

    /**
     * @returns The list of followers of the given twiiter user
     * @param id The id of the user whose followers are to be fetched
     * @param count The number of followers to fetch, must be >= 40 when no cursor is provided
     * @param all Whether to fetch all followers list
     * @param cursor The cursor to the batch of followers to fetch
     * @param followerCount The total number of followers of the target user
     */
    async resolveUserFollowers(id: string, count: number, all: boolean, cursor: string, followersCount: number): Promise<any> {
        let followers: any[] = [];                                                  // To store the list of followers
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of followers fetched

        // If all followers are to be fetched
        count = all ? followersCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining followers
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.users.getUserFollowers(id, this.batchSize, next.value).catch(error => {
                throw this.getGraphQLError(error);
            });

            // If data is available
            if (res.list?.length) {
                // Adding fetched followers to list of followers
                followers = followers.concat(res.list);

                // Updating total followers fetched
                total = followers.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // If no followers found
        if (!followers.length) {
            return new Error(DataErrors.NoFollowsFound);
        }

        // Adding the cursor to the end of list of data
        followers.push(next);

        return followers;
    }

    /**
     * @returns The list of following of the given twiiter user
     * @param id The id of the user whose followings are to be fetched
     * @param count The number of following to fetch, should be >= 40 when no cursor is provided
     * @param all Whether to fetch list of all followings
     * @param cursor The cursor to the batch of followings to fetch
     * @param followingsCount The total number of followings of the target user
     */
    async resolveUserFollowing(id: string, count: number, all: boolean, cursor: string, followingsCount: number): Promise<any> {
        let following: any[] = [];                                                  // To store the list of following
        let next: Cursor = new Cursor(cursor);                                      // To store cursor to next batch
        let total: number = 0;                                                      // To store the total number of following fetched

        // If all followings are to be fetched
        count = all ? followingsCount : count;

        // If required count less than batch size, setting batch size to required count
        this.batchSize = (count < this.batchSize) ? count : this.batchSize;

        // Repeatedly fetching data as long as total data fetched is less than requried
        do {
            // If this is the last batch, change batch size to number of remaining following
            this.batchSize = ((count - total) < this.batchSize) ? (count - total) : this.batchSize;

            // Getting the data
            const res = await this.context.users.getUserFollowing(id, this.batchSize, next.value).catch(error => {
                throw this.getGraphQLError(error);
            });

            // If data is available
            if (res.list?.length) {
                // Adding fetched following to list of following
                following = following.concat(res.list);

                // Updating total following fetched
                total = following.length;

                // Getting cursor to next batch
                next = res.next as Cursor;
            }
            // If no more data is available
            else {
                break;
            }
        } while (total < count);

        // If no following found
        if (!following.length) {
            return new Error(DataErrors.NoFollowsFound);
        }

        // Adding the cursor to the end of list of data
        following.push(next);

        return following;
    }
}