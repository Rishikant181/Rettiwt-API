// PACKAGE LIBS
import { createClient as redisClient, RedisClientType } from 'redis';

// CUSTOM LIBS
import { dataToList, findJSONKey } from '../helper/Parser';

/**
 * @summary Handles reading and writing of data from and to cache.
 * 
 * **Note**: To be able to CacheService, the data to be cached must of a unique "id" field.
 */
export class CacheService {
    // MEMBER DATA
    private update: boolean;                                            // Whether to update existing data or not
    private connUrl: string;                                            // To store the connection url string to redis
    private client: RedisClientType;                                    // To store the redis client instance
    
    // MEMBER METHODS
    constructor() {
        this.connUrl = `redis://${process.env.CACHE_DB_HOST}:${process.env.CACHE_DB_PORT}`;
        this.client = redisClient({ url: this.connUrl });
        this.client.connect();
    }

    /**
     * @summary Indexes the data inserted into the cache by mapping their id/rest id to their internal Object id and collection name
     * @param res The InsertManyResult from the write operation
     * @param data The data to be indexed
     * @param table The name of the table in which the given data is cached
     */
    /*
    private async index(res: InsertOneResult<Document>, data: any, table: string): Promise<void> {
        var index = [];

        // If data insertion failed, skipping indexing
        if (!res.acknowledged) {
            return;
        }

        // Preparing the index to be inserted
        var indexItem = {
            "id": findJSONKey(data, 'id'),
            "_id": new ObjectId(res.insertedId.toHexString()),
            "collection": table
        }

        index.push(indexItem);

        // Inserting the index into index collection
        await this.client.db(this.dbName).collection(this.dbIndex).insertMany(index);
    }
    */

    /**
     * @returns If the given data item is already cached or not
     * @param id The id/rest id of the data item to be checked
     */
    /*
    private async isCached(id: string): Promise<boolean> {
        // Finding a matching data from cache
        var res = await this.client.db(this.dbName).collection(this.dbIndex).findOne({ "id": id })

        return res ? true : false;
    }
    */

    /**
     * @summary Stores the input data into the cache.
     * @returns Whether writing to cache was successful or not
     * @param data The input data to store
     * @param table The name of the table to insert the data into
     */
    async write(data: any, table: string): Promise<boolean> {
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
            // Getting the actual data
            return JSON.parse(res);
        }
    }
}