// PACKAGE LIBS
import { MongoClient } from "mongodb";

// CUSTOM LIBS
import { config } from '../config/env';
import { User } from "../schema/types/UserAccountData";
import { Tweet } from "../schema/types/TweetData";

/**
 * This service handles reading and writing of data from and to cache
 */
export class CacheService {
    // MEMBER DATA
    private client: MongoClient;                                        // To store the connection to mongodb database
    private connUrl: string;                                            // To store the connection url
    private dbName: string;                                             // To store the name of database
    private userCol: string;                                            // To store the name of user collection
    private tweetCol: string;                                           // To store the name of tweet collection

    // MEMBER METHODS
    constructor() {
        // Initialising the connection url to database server
        this.connUrl = `${config['server']['db']['host']}:${config['server']['db']['port']}`;

        // Initialising database and collection names
        this.dbName = config['server']['db']['databases']['ai-cache']['name'];
        this.userCol = config['server']['db']['databases']['ai-cache']['collections']['users'];
        this.tweetCol = config['server']['db']['databases']['ai-cache']['collections']['tweets'];

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

            console.log("Connected to caching server successfully!");

            success = true;
        }
        // If connecting to database failed
        catch(err) {
            console.log("Failed to connect to caching server");
            console.log(err);
        }

        // Returning success or failure
        return Promise.resolve(success);
    }

    /**
     * Stores the input data into the cache
     * @param data The input data to store
     */
    write(data: User | Tweet): Promise<boolean> {
        
    }
}