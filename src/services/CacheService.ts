// PACKAGES
import NodeCache from 'node-cache';

// PARSERS
import * as Parsers from './helper/Parser';

/**
 * Handles reading and writing of data from and to cache.
 * 
 * This services uses a local node-cache instance to cache data, since the data to be cached has no real purpose outside of the server session.
 * This serivce follows a singleton pattern, where at any point, only a single instance of this class exists.
 * This is done so that all the data is cached in a single instance, which makes sharing of cached data between different endpoints possible.
 * @internal
 */
export class CacheService {
    // MEMBER DATA
    private static instance: CacheService;                              // To store the current instance of this service
    private client: NodeCache;                                          // To store the redis client instance

    // MEMBER METHODS
    private constructor() {
        // Initializing new cache
        this.client = new NodeCache();
    }

    /**
     * @returns The current working instance of CacheService
     */
    static getInstance(): CacheService {
        // If an instance doesnt exists already
        if (!this.instance) {
            this.instance = new CacheService();
        }
        
        // Returning the current instance
        return this.instance;
    }

    /**
     * Stores the input data in the cache.
     * 
     * @param data The input data to store.
     * @returns Whether writing to cache was successful or not.
     * @remarks In order to cache data, the data to be cached must have a unique 'id' field.
     */
    public write(data: any): void {
        // Converting the data to a list of data
        data = Parsers.dataToList(data);

        // Iterating over the list of data
        for (let item of data) {
            // Storing whether data is already cached or not
            let cached = this.client.has(Parsers.findJSONKey(item, 'id'));

            // If data does not already exist in cache
            if(!cached) {
                // Adding data to cache
                this.client.set(Parsers.findJSONKey(item, 'id'), item);
            }
        }
    }

    /**
     * @param id The id id of the data to be fetched from cache.
     * @returns The data with the given id.
     */
    public read(id: string): any {
        // Getting data from cache
        let res = this.client.get(id);

        return res;
    }
}