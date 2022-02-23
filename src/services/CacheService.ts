// PACKAGE LIBS
import { MongoClient } from "mongodb";

// CUSTOM LIBS
import { config } from '../config/env';
import { User } from '../schema/types/UserAccountData';
import { Tweet } from '../schema/types/TweetData';
import {
    dataToList,
    findJSONKey
} from './helper/Parser';

/**
 * This service handles reading and writing of data from and to cache
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
     * Tries to connect to the database
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
     * Indexes the data inserted into the cache by mapping their id/rest id to their internal Object id and collection name
     * @param objectId The ObjectID(s) of the document(s) inserted into db
     * @param data The data to be indexed
     */
    private async index(objectId: string[], data: any[]): Promise<void> {
        // Preparing the indexes to insert
        for(var i = 0; i < objectId.length; i++) {
            data[i] = {
                "_id": findJSONKey(data[i], 'id'),
                "objectId": objectId[i],
                "collection": data[i].constructor.name
            }
        };

        // Inserting the indexes
        await this.client.db(this.dbName).collection(this.dbIndex).insertMany(data);
    }

    /**
     * Stores the input data into the cache.
     * Each type of data is stored in it's respective collection in the database
     * @param data The input data to store
     * @returns Whether writing to cache was successful or not
     */
    async write(data: User | User[] | Tweet | Tweet[]): Promise<boolean> {
        // Converting the data to a list of data
        data = dataToList(data);
        
        // If connection to database successful
        if (await this.connectDB()) {
            return (await this.client.db(this.dbName).collection(data[0].constructor.name).insertMany(data)).acknowledged;
        }
        // If connection to database failed
        else {
            return Promise.resolve(false);
        }
    }
}