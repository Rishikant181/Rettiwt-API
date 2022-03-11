// PACKAGE LIBS
import {
    MongoClient,
    InsertOneResult,
    ObjectId
} from "mongodb";

// CUSTOM LIBS
import { config } from '../config/env';
import { User } from '../schema/types/UserAccountData';
import { Tweet } from '../schema/types/TweetData';
import {
    dataToList,
    findJSONKey
} from './helper/Parser';

/**
 * @summary Handles reading and writing of data from and to cache.
 * 
 * **Note**: To be able to CacheService, the data to be cached must of a unique "id" field.
 */
export class CacheService {
    // MEMBER DATA
    private client: MongoClient;                                        // To store the connection to mongodb database
    private connUrl: string;                                            // To store the connection url
    private dbName: string;                                             // To store the name of database
    private dbIndex: string;                                            // To store the name of the index table of db

    // MEMBER METHODS
    constructor() {
        // Initialising the connection url to database server
        this.connUrl = `${config['server']['db']['host']}:${config['server']['db']['port']}`;

        // Initialising database and index name
        this.dbName = config['server']['db']['databases']['ai-cache']['name'];
        this.dbIndex = config['server']['db']['databases']['ai-cache']['index'];

        // Creating connection to database
        this.client = new MongoClient(this.connUrl);
    }

    /**
     * @summary Connects to the database
     * @returns Whether connection was successful or not
     */
    private async connectDB(): Promise<boolean> {
        var success: boolean = false;                                           // To store whether connection to db successful or not

        // Trying to connect to database
        try {
            // Connecting to db
            await this.client.connect();

            // Verifying connection
            await this.client.db(this.dbName).command({ ping: 1 });

            success = true;
        }
        // If connecting to database failed
        catch (err) {
            console.log("Failed to connect to caching server");
            console.log(err);
        }

        // Returning success or failure
        return Promise.resolve(success);
    }

    /**
     * @summary Indexes the data inserted into the cache by mapping their id/rest id to their internal Object id and collection name
     * @param res The InsertManyResult from the write operation
     * @param data The data to be indexed
     */
    private async index(res: InsertOneResult<Document>, data: any): Promise<void> {
        var index = [];

        // If data insertion failed, skipping indexing
        if (!res.acknowledged) {
            return;
        }

        // Preparing the index to be inserted
        var indexItem = {
            "id": findJSONKey(data, 'id'),
            "_id": new ObjectId(res.insertedId.toHexString()),
            "collection": data.constructor.name
        }

        index.push(indexItem);

        // Inserting the index into index collection
        await this.client.db(this.dbName).collection(this.dbIndex).insertMany(index);
    }

    /**
     * @returns If the given data item is already cached or not
     * @param id The id/rest id of the data item to be checked
     */
    private async isCached(id: string): Promise<boolean> {
        // Finding a matching data from cache
        var res = await this.client.db(this.dbName).collection(this.dbIndex).findOne({ "id": id })

        return res ? true : false;
    }

    /**
     * @summary Stores the input data into the cache.
     * @returns Whether writing to cache was successful or not
     * @param data The input data to store
     * @param update Whether to update the store data or not
     */
    async write(data: User | User[] | Tweet | Tweet[], update = false): Promise<boolean> {
        // Converting the data to a list of data
        data = dataToList(data);

        // If connection to database successful
        if (await this.connectDB()) {
            // Iterating over the list of data
            for (var item of data) {
                // Storing whether data is already cached or not
                var cached = await this.isCached(findJSONKey(item, 'id'));

                // If data already exists in cache and no update required, skip
                if (cached && update == false) {
                    continue;
                }
                // If data already exists in cache and update required
                else if (cached && update) {
                    // Getting the object id of data from index
                    var objectId = (await this.client.db(this.dbName).collection(this.dbIndex).findOne({ "id": findJSONKey(item, "id") }))?._id.toHexString();
                    
                    // Updating data in cache
                    await this.client.db(this.dbName).collection(data[0].constructor.name).updateOne({ "_id": new ObjectId(objectId) }, { $set: item });
                }
                // If new data to be added
                else {
                    // Writing data to cache
                    var res = await this.client.db(this.dbName).collection(data[0].constructor.name).insertOne(item);

                    // Indexing the data
                    this.index(res, item);
                }
            }

            return true;
        }
        // If connection to database failed
        else {
            return false;
        }
    }

    /**
     * @returns The data with the given id/rest id from cache
     * @param id The id/rest id of the data to be fetched from cache
     */
    async read(id: string): Promise<any> {
        // If connection to database successful
        if (await this.connectDB()) {
            // Getting data from cache
            var res = await this.client.db(this.dbName).collection(this.dbIndex).findOne({ "id": id });

            // If data exists in cache
            if (res) {
                // Getting object id and table name of data from index
                var objectId = res['_id'];
                var collection = res['collection'];

                // Getting the actual data
                return await this.client.db(this.dbName).collection(collection).findOne({ "_id": new ObjectId(objectId) });
            }
        }
        else {
            return null;
        }
    }

    /**
     * @summary Clears the cache completely, including all indexes
     * @returns Whether clearing was successful or not
     */
    async clear(): Promise<boolean> {
        // If connection to database successful
        if (await this.connectDB()) {
            // Clearing the cache
            return await this.client.db(this.dbName).dropDatabase();
        }
        else {
            return false;
        }
    }
}