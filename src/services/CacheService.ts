// PACKAGE LIBS
import Redis from 'ioredis';

// CUSTOM LIBS
import { config } from '../config/env';
import { dataToList, findJSONKey } from './helper/Parser';

/**
 * @summary Handles reading and writing of data from and to cache.
 * 
 * **Note**: To be able to CacheService, the data to be cached must have a unique "id" field.
 */
export class CacheService {
    // MEMBER DATA
    private allowCache: boolean;                                        // To store whether to use cache or not
    private static instance: CacheService;                              // To store the current instance of this service
    private update: boolean;                                            // To store whether to update existing data or not
    private connUrl: string;                                            // To store the connection url string to redis
    private client: Redis;                                              // To store the redis client instance

    // MEMBER METHODS
    private constructor() {
        this.allowCache = config.use_cache;
        this.connUrl = config.cache_url;
        this.client = new Redis(this.connUrl);
        this.update = false;

        // If failed to connect to redis caching server
        this.client.on("error", (err) => {
            console.log("Failed to connect to caching server");
            console.log("Continuing without caching");

            // Disabling caching
            this.allowCache = false;

            // Closing connection to redis cache
            this.client.quit();
        });
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
    async write(data: any): Promise<void> {
        if (this.allowCache) {
            // Converting the data to a list of data
            data = dataToList(data);

            // Iterating over the list of data
            for (let item of data) {
                // Storing whether data is already cached or not
                let cached = await this.client.exists(findJSONKey(item, 'id'));

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
        }
    }

    /**
     * @returns The data with the given id/rest id from cache
     * @param id The id/rest id of the data to be fetched from cache
     */
    async read(id: string): Promise<any> {
        if (this.allowCache) {
            // Getting data from cache
            let res = await this.client.get(id);

            // If data exists in cache
            if (res) {
                // Converting the string data to JSON and returning it
                return JSON.parse(res);
            }
        }
    }
}