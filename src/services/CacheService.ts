// PACKAGE LIBS
import Redis from 'ioredis';

// CUSTOM LIBS
import { dataToList, findJSONKey } from './helper/Parser';

/**
 * @summary Handles reading and writing of data from and to cache.
 * 
 * **Note**: To be able to CacheService, the data to be cached must have a unique "id" field.
 */
export class CacheService {
    // MEMBER DATA
    private static instance: CacheService;                              // To store the current instance of this service
    private update: boolean;                                            // Whether to update existing data or not
    private connUrl: string;                                            // To store the connection url string to redis
    private client: Redis;                                              // To store the redis client instance
    
    // MEMBER METHODS
    private constructor() {
        this.connUrl = `redis://${process.env.CACHE_DB_HOST}:${process.env.CACHE_DB_PORT}`;
        // Connecting to redis cache
        try {
            this.client = new Redis(this.connUrl);
        }
        // If failed to connect to cache
        catch(err) {
            console.log("Failed to connect to redis cache");
            throw err;
        }
    }

    /**
     * @returns The current working instance of CacheService
     */
    static async getInstance(): Promise<CacheService> {
        // If an instance doesnt exists already
        if (!this.instance) {
            this.instance = new CacheService();
            return this.instance;
        }
        // If an instance already exists, returning it
        else {
            return this.instance;
        }
    }

    /**
     * @summary Stores the input data into the cache.
     * @returns Whether writing to cache was successful or not
     * @param data The input data to store
     */
    async write(data: any): Promise<boolean> {
        // Converting the data to a list of data
        data = dataToList(data);

        // Iterating over the list of data
        for (var item of data) {
            // Storing whether data is already cached or not
            var cached = await this.client.exists(findJSONKey(item, 'id'));

            // If data already exists in cache and no update required, skip
            if (cached && this.update == false) {
                continue;
            }
            // If data does not exist or update is required
            else {
                // Updating data in cache
                await this.client.set(findJSONKey(item, 'id'), JSON.stringify(item));
            }
        }

        return true;
    }

    /**
     * @returns The data with the given id/rest id from cache
     * @param id The id/rest id of the data to be fetched from cache
     */
    async read(id: string): Promise<any> {
        // Getting data from cache
        var res = await this.client.get(id);

        // If data exists in cache
        if (res) {
            // Converting the string data to JSON and returning it
            return JSON.parse(res);
        }
    }
}